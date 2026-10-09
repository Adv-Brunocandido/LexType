// Sons sintetizados via Web Audio API (latência zero, sem requisições de rede, 100% offline).

export type SoundProfile = "cherry-blue" | "cherry-brown" | "cherry-red" | "typewriter";

export interface SoundProfileInfo {
  id: SoundProfile;
  name: string;
  desc: string;
  icon: string;
}

export const SOUND_PROFILES: SoundProfileInfo[] = [
  {
    id: "cherry-blue",
    name: "Cherry MX Blue",
    desc: "Clicky: estalo nítido, agudo e metálico com alta resposta tátil",
    icon: "🔵",
  },
  {
    id: "cherry-brown",
    name: "Cherry MX Brown",
    desc: "Tactile: batida suave, aveludada e equilibrada para digitação contínua",
    icon: "🟤",
  },
  {
    id: "cherry-red",
    name: "Cherry MX Red / Black",
    desc: "Linear: batida grave, encorpada e amortecida ('thocky')",
    icon: "🔴",
  },
  {
    id: "typewriter",
    name: "Máquina de Escrever",
    desc: "Vintage: impacto de alavanca mecânica com campainha clássica de retorno",
    icon: "📠",
  },
];

let ctx: AudioContext | null = null;

const initialProfile: SoundProfile = (() => {
  if (typeof localStorage === "undefined") return "cherry-blue";
  const p = localStorage.getItem("lextype-sound-profile") as SoundProfile;
  if (p && ["cherry-blue", "cherry-brown", "cherry-red", "typewriter"].includes(p)) return p;
  return "cherry-blue";
})();

export const soundSettings = {
  enabled: true,
  volume: 0.6,
  profile: initialProfile,
};

export function setSoundProfile(p: SoundProfile) {
  soundSettings.profile = p;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("lextype-sound-profile", p);
  }
}

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

// Buffers de ruído pré-calculados para máxima performance em >150 WPM
let noiseBuffers: Record<string, AudioBuffer[]> = {};

function getNoiseBuffer(a: AudioContext, profile: SoundProfile): AudioBuffer {
  if (!noiseBuffers[profile] || noiseBuffers[profile].length === 0) {
    const duration = profile === "typewriter" ? 0.045 : 0.03;
    const len = Math.floor(a.sampleRate * duration);
    noiseBuffers[profile] = Array.from({ length: 5 }, () => {
      const buf = a.createBuffer(1, len, a.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        const decay = profile === "cherry-red" ? (1 - i / len) ** 4 : (1 - i / len) ** 2.8;
        d[i] = (Math.random() * 2 - 1) * decay;
      }
      return buf;
    });
  }
  const pool = noiseBuffers[profile]!;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export function playKey() {
  const a = ac();
  if (!a) return;
  const profile = soundSettings.profile;
  const buf = getNoiseBuffer(a, profile);
  const src = a.createBufferSource();
  src.buffer = buf;

  const f = a.createBiquadFilter();
  const g = a.createGain();

  if (profile === "cherry-blue") {
    // Cherry MX Blue: clique agudo e seco (3200-4200 Hz, Q alto)
    f.type = "bandpass";
    f.frequency.value = 3200 + Math.random() * 900;
    f.Q.value = 3.8;
    g.gain.value = 0.65 * soundSettings.volume;
    src.connect(f).connect(g).connect(a.destination);
    src.start();
    // Segundo clique de release metálico
    tone(2800 + Math.random() * 400, 0.005, 0.018, "sine", 0.08);
  } else if (profile === "cherry-brown") {
    // Cherry MX Brown: batida intermediária suave (1900-2400 Hz, Q moderado)
    f.type = "bandpass";
    f.frequency.value = 1900 + Math.random() * 600;
    f.Q.value = 1.6;
    g.gain.value = 0.55 * soundSettings.volume;
    src.connect(f).connect(g).connect(a.destination);
    src.start();
    tone(210 + Math.random() * 40, 0, 0.035, "sine", 0.12);
  } else if (profile === "cherry-red") {
    // Cherry MX Red / Black: batida encorpada e grave ('thock', 500-750 Hz)
    f.type = "lowpass";
    f.frequency.value = 650 + Math.random() * 200;
    f.Q.value = 2.2;
    g.gain.value = 0.7 * soundSettings.volume;
    src.connect(f).connect(g).connect(a.destination);
    src.start();
    // Ressonância inferior quente
    tone(135 + Math.random() * 25, 0, 0.05, "sine", 0.18, 85);
  } else {
    // Typewriter: duplo clique mecânico de alavanca com ressonância metálica
    f.type = "bandpass";
    f.frequency.value = 1400 + Math.random() * 500;
    f.Q.value = 2.0;
    g.gain.value = 0.8 * soundSettings.volume;
    src.connect(f).connect(g).connect(a.destination);
    src.start();
    tone(450 + Math.random() * 50, 0, 0.02, "triangle", 0.22);
    tone(1600 + Math.random() * 200, 0.012, 0.025, "sine", 0.14);
  }
}

export function playTypewriterBell() {
  tone(1760, 0, 0.4, "sine", 0.35, 1720);
  tone(3520, 0, 0.25, "sine", 0.15);
}

export function playError() {
  tone(210, 0, 0.16, "triangle", 0.14, 120);
}

export function playCombo() {
  if (soundSettings.profile === "typewriter") {
    playTypewriterBell();
    return;
  }
  tone(880, 0, 0.08, "sine", 0.1);
  tone(1320, 0.07, 0.12, "sine", 0.1);
}

export function playWin() {
  if (soundSettings.profile === "typewriter") {
    playTypewriterBell();
  }
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.1, 0.25, "triangle", 0.16));
  [523.25, 659.25, 783.99].forEach((f) => tone(f, 0.45, 0.7, "sine", 0.08));
}
