// Procedural Web Audio API sound synthesizer for Chronos Time Machine
class SoundManager {
  private ctx: AudioContext | null = null
  private engineOsc: OscillatorNode | null = null
  private engineGain: GainNode | null = null
  private isMuted: boolean = false

  public initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    if (this.isMuted && this.engineGain && this.ctx) {
      this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime)
    }
    return this.isMuted
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  // Mechanical switch click
  public playSwitchClick() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.05)
    } catch {}
  }

  // Heavy mechanical lever clunk
  public playLeverClunk() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(140, now)
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.22)

      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.23)
    } catch {}
  }

  // Hologram radio greeting chime
  public playGreetingChime() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const notes = [440, 554.37, 659.25, 880] // A major arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.1)

        gain.gain.setValueAtTime(0.15, now + idx * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.45)

        osc.connect(gain)
        gain.connect(this.ctx!.destination)

        osc.start(now + idx * 0.1)
        osc.stop(now + idx * 0.1 + 0.46)
      })
    } catch {}
  }

  public startEngine() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx || this.engineOsc) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(45, now)

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(160, now)

      gain.gain.setValueAtTime(0.04, now)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      this.engineOsc = osc
      this.engineGain = gain
    } catch {}
  }

  public updateEnginePitch(speedRatio: number) {
    if (this.isMuted || !this.ctx || !this.engineOsc || !this.engineGain) return
    const now = this.ctx.currentTime
    const targetFreq = 42 + Math.min(speedRatio, 1.8) * 115
    const targetGain = 0.03 + Math.min(speedRatio, 1) * 0.05
    this.engineOsc.frequency.setTargetAtTime(targetFreq, now, 0.08)
    this.engineGain.gain.setTargetAtTime(targetGain, now, 0.08)
  }

  public playCrystalChime() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const freqs = [523.25, 659.25, 783.99, 1046.5]
      freqs.forEach((f, i) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(f, now + i * 0.06)

        gain.gain.setValueAtTime(0.12, now + i * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35)

        osc.connect(gain)
        gain.connect(this.ctx!.destination)

        osc.start(now + i * 0.06)
        osc.stop(now + i * 0.06 + 0.36)
      })
    } catch {}
  }

  public playBump() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(110, now)
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.18)

      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.19)
    } catch {}
  }

  public playBoost() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(160, now)
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.45)

      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.51)
    } catch {}
  }

  public playWarp() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime

      // Low frequency thunder charge
      const osc1 = this.ctx.createOscillator()
      const gain1 = this.ctx.createGain()
      osc1.type = 'sawtooth'
      osc1.frequency.setValueAtTime(60, now)
      osc1.frequency.exponentialRampToValueAtTime(450, now + 1.2)
      gain1.gain.setValueAtTime(0.05, now)
      gain1.gain.linearRampToValueAtTime(0.25, now + 1.0)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.8)
      osc1.connect(gain1)
      gain1.connect(this.ctx.destination)
      osc1.start(now)
      osc1.stop(now + 1.9)

      // Hyperspace sonic boom
      const osc2 = this.ctx.createOscillator()
      const gain2 = this.ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(500, now + 0.8)
      osc2.frequency.exponentialRampToValueAtTime(60, now + 2.2)
      gain2.gain.setValueAtTime(0.3, now + 0.8)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 2.3)
      osc2.connect(gain2)
      gain2.connect(this.ctx.destination)
      osc2.start(now + 0.8)
      osc2.stop(now + 2.3)
    } catch {}
  }
}

export const sounds = new SoundManager()
