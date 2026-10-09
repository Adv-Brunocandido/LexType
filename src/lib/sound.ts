// Sons gerados via Web Audio API (sem arquivos, latência mínima).
let ctx: AudioContext | null = null;
export const soundSettings = { enabled: true, volume: 0.6 };

function ac(): AudioContext | null {
  if (typeof window === "undefined" || !soundSettings.enabled) return null;
  if (!ctx) {
    const C =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new C();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  endFreq?: number,
) {
  const a = ac();
  if (!a) return;
  const t = a.currentTime + start;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain * soundSettings.volume, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

let keyBuffers: AudioBuffer[] | null = null;

function getKeyBuffer(a: AudioContext): AudioBuffer {
  if (!keyBuffers || keyBuffers.length === 0) {
    const len = Math.floor(a.sampleRate * 0.03);
    keyBuffers = Array.from({ length: 4 }, () => {
      const buf = a.createBuffer(1, len, a.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
      return buf;
    });
  }
  return keyBuffers[Math.floor(Math.random() * keyBuffers.length)]!;
}

export function playKey() {
  const a = ac();
  if (!a) return;
  const buf = getKeyBuffer(a);
  const src = a.createBufferSource();
  src.buffer = buf;
  const f = a.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 2200 + Math.random() * 1400;
  f.Q.value = 0.9;
  const g = a.createGain();
  g.gain.value = 0.5 * soundSettings.volume;
  src.connect(f).connect(g).connect(a.destination);
  src.start();
  tone(170 + Math.random() * 30, 0, 0.045, "sine", 0.12);
}

export function playError() {
  tone(210, 0, 0.16, "triangle", 0.14, 120);
}

export function playCombo() {
  tone(880, 0, 0.08, "sine", 0.1);
  tone(1320, 0.07, 0.12, "sine", 0.1);
}

export function playWin() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.1, 0.25, "triangle", 0.16));
  [523.25, 659.25, 783.99].forEach((f) => tone(f, 0.45, 0.7, "sine", 0.08));
}
