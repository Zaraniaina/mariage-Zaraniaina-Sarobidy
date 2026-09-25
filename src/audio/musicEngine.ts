import { basePath } from '../utils/basePath'

const AUDIO_URL = basePath('/audio/Amir-Longtemps.mp3')
const TARGET_VOLUME = 0.35
const FADE_STEP = 0.01
const FADE_INTERVAL_MS = 50
const SMOOTHING_MS = 90
const BEAT_DECAY_MS = 240
const BEAT_THRESHOLD = 0.08
const BEAT_GAP_MS = 220
const LEVEL_BIN_COUNT = 64
// Bandes de l'egaliseur : graves, bas-medium, medium, aigus.
const BANDS: Array<[number, number]> = [
  [1, 4],
  [5, 16],
  [17, 48],
  [49, 128],
]

const START_EVENTS: (keyof WindowEventMap)[] = [
  'touchstart',
  'scroll',
  'wheel',
  'touchmove',
  'touchend',
  'pointerdown',
  'keydown',
]

export interface MusicState {
  isPlaying: boolean
  isBlocked: boolean
}

export interface MusicLevels {
  level: number
  beat: number
  bands: number[]
  active: boolean
}

class MusicEngine {
  private audio: HTMLAudioElement | null = null
  private context: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private source: MediaElementAudioSourceNode | null = null
  private bins: Uint8Array | null = null
  private listeners = new Set<(state: MusicState) => void>()
  private fadeTimer: number | null = null
  private rafId: number | null = null
  private lastFrameAt = 0
  private lastBeatAt = 0
  private bassAverage = 0
  private started = false
  private userPaused = false
  private state: MusicState = { isPlaying: false, isBlocked: false }
  private levels: MusicLevels = { level: 0, beat: 0, bands: [0, 0, 0, 0], active: false }
  private written: Record<'level' | 'beat', number> = { level: -1, beat: -1 }

  init(): void {
    if (this.started) return
    this.started = true

    const audio = new Audio(AUDIO_URL)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audio.addEventListener('play', this.handlePlay)
    audio.addEventListener('pause', this.handlePause)
    audio.addEventListener('canplay', this.handleCanPlay, { once: true })
    this.audio = audio
    audio.load()

    if (document.readyState === 'complete') this.attemptPlay()
    else window.addEventListener('load', this.handlePageLoad, { once: true })

    START_EVENTS.forEach(event => window.addEventListener(event, this.handleGesture, { passive: true }))
    document.addEventListener('visibilitychange', this.handleVisibility)
  }

  toggle = (): void => {
    const audio = this.audio
    if (!audio) return
    if (audio.paused) {
      this.userPaused = false
      void this.attemptPlay()
    } else {
      this.userPaused = true
      this.stopFade()
      audio.pause()
    }
  }

  subscribe(listener: (state: MusicState) => void): () => void {
    this.listeners.add(listener)
    listener(this.state)
    return () => {
      this.listeners.delete(listener)
    }
  }

  getLevels(): MusicLevels {
    return this.levels
  }

  private setState(patch: Partial<MusicState>): void {
    const next: MusicState = { ...this.state, ...patch }
    if (next.isPlaying === this.state.isPlaying && next.isBlocked === this.state.isBlocked) return
    this.state = next
    this.listeners.forEach(listener => listener(next))
  }

  // Demarrage automatique des que l'audio est jouable, puis au chargement de la page.
  private attemptPlay = async (): Promise<boolean> => {
    const audio = this.audio
    if (!audio || this.userPaused) return false
    if (!audio.paused) {
      this.resumeAnalyser()
      return true
    }
    try {
      await audio.play()
      this.setState({ isBlocked: false })
      this.resumeAnalyser()
      this.startFade()
      return true
    } catch {
      // Politique d'autoplay : le repli sur la premiere interaction prend le relais.
      this.setState({ isBlocked: true })
      return false
    }
  }

  private handlePageLoad = () => {
    window.removeEventListener('load', this.handlePageLoad)
    void this.attemptPlay()
  }

  private handleCanPlay = () => {
    if (document.readyState === 'complete') void this.attemptPlay()
  }

  // Repli : premiere intention de scroll ou interaction (touch, clic, clavier).
  // Le controleur musique est exclu : sinon son propre clic demarre puis coupe
  // immediatement la lecture (le repli et le toggle s'enchainent dans le meme geste).
  private handleGesture = (event: Event) => {
    const target = event.target
    if (target instanceof Element && target.closest('[data-music-toggle]')) return
    this.resumeAnalyser()
    void this.attemptPlay().then(started => {
      if (started) START_EVENTS.forEach(event => window.removeEventListener(event, this.handleGesture))
    })
  }

  private handleVisibility = () => {
    if (document.hidden) {
      this.stopLoop()
      this.resetLevels()
      return
    }
    if (this.audio && !this.audio.paused) this.startLoop()
    else void this.attemptPlay()
  }

  private handlePlay = () => {
    this.setState({ isPlaying: true })
    this.startLoop()
  }

  private handlePause = () => {
    this.setState({ isPlaying: false })
  }

  private startFade(): void {
    const audio = this.audio
    if (!audio) return
    this.stopFade()
    this.fadeTimer = window.setInterval(() => {
      if (audio.volume < TARGET_VOLUME) audio.volume = Math.min(TARGET_VOLUME, audio.volume + FADE_STEP)
      else this.stopFade()
    }, FADE_INTERVAL_MS)
  }

  private stopFade(): void {
    if (this.fadeTimer !== null) {
      window.clearInterval(this.fadeTimer)
      this.fadeTimer = null
    }
  }

  // Le graphe d'analyse n'est cree qu'une fois le contexte audio autorise,
  // pour ne jamais couper le son d'une musique pourtant en lecture.
  private resumeAnalyser(): void {
    try {
      const Context =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Context) return
      if (!this.context) {
        this.context = new Context()
        this.analyser = this.context.createAnalyser()
        this.analyser.fftSize = 1024
        this.analyser.smoothingTimeConstant = 0.5
        this.bins = new Uint8Array(this.analyser.frequencyBinCount)
      }
      const context = this.context
      if (context.state === 'running') {
        this.connectAnalyser()
        return
      }
      void context
        .resume()
        .then(() => this.connectAnalyser())
        .catch(() => undefined)
    } catch {
      // Analyse indisponible : le site reste fonctionnel sans ambiance reactive.
    }
  }

  private connectAnalyser(): void {
    const context = this.context
    const analyser = this.analyser
    const audio = this.audio
    if (!context || !analyser || !audio || this.source || context.state !== 'running') return
    try {
      const source = context.createMediaElementSource(audio)
      source.connect(analyser)
      analyser.connect(context.destination)
      this.source = source
      this.levels.active = true
      if (!audio.paused) this.startLoop()
    } catch {
      this.levels.active = false
    }
  }

  private analyse(dt: number): void {
    const levels = this.levels
    const bins = this.bins
    const analyser = this.analyser
    const audio = this.audio
    const isActive = levels.active && analyser !== null && bins !== null && audio !== null && !audio.paused
    const rawBands = [0, 0, 0, 0]
    let rawLevel = 0

    if (isActive && analyser !== null && bins !== null) {
      analyser.getByteFrequencyData(bins)

      BANDS.forEach((band, bandIndex) => {
        let sum = 0
        for (let index = band[0]; index <= band[1]; index += 1) sum += bins[index]
        rawBands[bandIndex] = sum / ((band[1] - band[0] + 1) * 255)
      })

      let levelSum = 0
      for (let index = 0; index < LEVEL_BIN_COUNT; index += 1) levelSum += bins[index]
      rawLevel = levelSum / (LEVEL_BIN_COUNT * 255)

      // Detection de battement sur les graves.
      const rawBass = rawBands[0]
      this.bassAverage = this.bassAverage * 0.94 + rawBass * 0.06
      const now = performance.now()
      if (rawBass - this.bassAverage > BEAT_THRESHOLD && now - this.lastBeatAt > BEAT_GAP_MS) {
        this.lastBeatAt = now
        levels.beat = 1
      }
    }

    const smoothing = 1 - Math.exp(-dt / SMOOTHING_MS)
    levels.level += (rawLevel - levels.level) * smoothing
    levels.bands.forEach((value, index) => {
      levels.bands[index] = value + (rawBands[index] - value) * smoothing
    })
    levels.beat *= Math.exp(-dt / BEAT_DECAY_MS)
    if (levels.beat < 0.01) levels.beat = 0
  }

  private writeVars(): void {
    const setVar = (name: string, value: number, key: 'level' | 'beat') => {
      const rounded = Math.round(value * 100) / 100
      if (this.written[key] === rounded) return
      this.written[key] = rounded
      document.documentElement.style.setProperty(name, String(rounded))
    }
    setVar('--music-level', this.levels.level, 'level')
    setVar('--music-beat', this.levels.beat, 'beat')
  }

  private startLoop(): void {
    if (this.rafId !== null) return
    this.lastFrameAt = performance.now()
    this.rafId = requestAnimationFrame(this.tick)
  }

  private stopLoop(): void {
    if (this.rafId === null) return
    cancelAnimationFrame(this.rafId)
    this.rafId = null
  }

  private resetLevels(): void {
    this.levels.level = 0
    this.levels.beat = 0
    this.levels.bands = [0, 0, 0, 0]
    this.bassAverage = 0
    this.writeVars()
  }

  private tick = (now: number): void => {
    this.rafId = requestAnimationFrame(this.tick)
    const dt = Math.min(64, Math.max(0, now - this.lastFrameAt))
    this.lastFrameAt = now
    this.analyse(dt)
    this.writeVars()

    const audio = this.audio
    const isIdle = audio === null || audio.paused
    const isQuiet =
      this.levels.level < 0.004 &&
      this.levels.beat === 0 &&
      this.levels.bands.every(band => band < 0.004)
    if (isIdle && isQuiet) {
      this.stopLoop()
      this.resetLevels()
    }
  }
}

const music = new MusicEngine()

export default music
