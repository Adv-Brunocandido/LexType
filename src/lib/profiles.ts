// Sistema de Gerenciamento de Múltiplos Perfis, Autenticação Local/Google e Ranking Individualizado.
import type { KeyStats, SessionRecord } from "./typing";
import { loadKeyStats, loadNum, loadSessions, streakDays } from "./typing";

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  pin?: string | undefined;
  isGoogle?: boolean | undefined;
  googleEmail?: string | undefined;
  createdAt: string;
  lastLoginAt: string;
  xp: number;
  level: number;
  bestWpm: number;
  streak: number;
  practiceTodaySeconds: number;
  lastPracticeDate: string;
  sessions: SessionRecord[];
  keyStats: KeyStats;
}

export const PROFILE_AVATARS = [
  "⚖️",
  "🏛️",
  "🦅",
  "📜",
  "🛡️",
  "💼",
  "⚡",
  "🎯",
  "🎓",
  "🏆",
  "🦁",
  "🐉",
];

export const PROFILE_ROLES = [
  "Advogado(a)",
  "Estudante OAB",
  "Juiz(a) de Direito",
  "Promotor(a) de Justiça",
  "Defensor(a) Público(a)",
  "Procurador(a)",
  "Servidor(a) Judiciário",
  "Concurseiro(a) Jurídico",
  "Acadêmico(a) de Direito",
];

const PROFILES_STORAGE_KEY = "lextype-profiles-list";
const ACTIVE_PROFILE_STORAGE_KEY = "lextype-active-profile-id";

function getStoredProfiles(): UserProfile[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    void e;
  }
  return [];
}

function persistProfiles(profiles: UserProfile[]) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch (e) {
    void e;
  }
}

/** Inicializa ou recupera todos os perfis cadastrados no dispositivo. */
export function loadAllProfiles(): UserProfile[] {
  let list = getStoredProfiles();
  if (list.length === 0) {
    // Migração transparente dos dados pré-existentes do usuário para o primeiro perfil
    const existingNick =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("lextype-user-nickname") || "Doutor(a) Lex"
        : "Doutor(a) Lex";
    const existingXp = loadNum("lextype-xp", 0);
    const existingLvl = loadNum("lextype-level", 3);
    const existingBest = loadNum("lextype-best-wpm", 0);
    const existingSessions = loadSessions();
    const existingStats = loadKeyStats();
    const existingStreak = streakDays();

    const defaultProfile: UserProfile = {
      id: "profile-default",
      name: existingNick,
      role: "Advogado(a)",
      avatar: "⚖️",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      xp: existingXp,
      level: existingLvl,
      bestWpm: existingBest,
      streak: existingStreak,
      practiceTodaySeconds: 0,
      lastPracticeDate: new Date().toISOString().slice(0, 10),
      sessions: existingSessions,
      keyStats: existingStats,
    };

    list = [defaultProfile];
    persistProfiles(list);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(ACTIVE_PROFILE_STORAGE_KEY, defaultProfile.id);
    }
  }
  return list;
}

export function getActiveProfileId(): string {
  if (typeof localStorage === "undefined") return "profile-default";
  return localStorage.getItem(ACTIVE_PROFILE_STORAGE_KEY) || "profile-default";
}

export function setActiveProfileId(id: string) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(ACTIVE_PROFILE_STORAGE_KEY, id);
}

/** Retorna o perfil atualmente ativo com todos os seus dados. */
export function getActiveProfile(): UserProfile {
  const profiles = loadAllProfiles();
  const activeId = getActiveProfileId();
  const found = profiles.find((p) => p.id === activeId);
  if (found) return found;
  const first = profiles[0]!;
  setActiveProfileId(first.id);
  return first;
}

/** Cria um novo perfil individualizado com ou sem senha/PIN. */
export function createProfile(data: {
  name: string;
  role?: string | undefined;
  avatar?: string | undefined;
  pin?: string | undefined;
  isGoogle?: boolean | undefined;
  googleEmail?: string | undefined;
}): UserProfile {
  const profiles = loadAllProfiles();
  const id = `profile-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  const newProfile: UserProfile = {
    id,
    name: data.name.trim() || "Novo Doutor",
    role: data.role || "Advogado(a)",
    avatar: data.avatar || "⚖️",
    pin: data.pin ? data.pin.trim() : undefined,
    isGoogle: !!data.isGoogle,
    googleEmail: data.googleEmail,
    createdAt: now,
    lastLoginAt: now,
    xp: 0,
    level: 3,
    bestWpm: 0,
    streak: 0,
    practiceTodaySeconds: 0,
    lastPracticeDate: now.slice(0, 10),
    sessions: [],
    keyStats: {},
  };

  profiles.push(newProfile);
  persistProfiles(profiles);
  return newProfile;
}

/** Verifica se o PIN informado confere com o PIN do perfil. */
export function verifyProfilePin(profile: UserProfile, pinAttempt?: string): boolean {
  if (!profile.pin) return true;
  return (pinAttempt ?? "").trim() === profile.pin.trim();
}

/** Alterna com segurança para outro perfil individual. */
export function switchProfile(
  profileId: string,
  pinAttempt?: string,
): { success: boolean; error?: string; profile?: UserProfile } {
  const profiles = loadAllProfiles();
  const target = profiles.find((p) => p.id === profileId);
  if (!target) {
    return { success: false, error: "Perfil não encontrado." };
  }

  if (target.pin && !verifyProfilePin(target, pinAttempt)) {
    return { success: false, error: "Senha ou PIN incorreto." };
  }

  target.lastLoginAt = new Date().toISOString();
  persistProfiles(profiles);
  setActiveProfileId(target.id);

  // Sincroniza chaves de compatibilidade no localStorage
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("lextype-user-nickname", target.name);
    localStorage.setItem("lextype-xp", String(target.xp));
    localStorage.setItem("lextype-level", String(target.level));
    localStorage.setItem("lextype-best-wpm", String(target.bestWpm));
    localStorage.setItem("lextype-sessions", JSON.stringify(target.sessions || []));
    localStorage.setItem("lextype-stats", JSON.stringify(target.keyStats || {}));
  }

  return { success: true, profile: target };
}

/** Atualiza campos do perfil atualmente ativo e persiste. */
export function updateActiveProfile(patch: Partial<UserProfile>): UserProfile {
  const profiles = loadAllProfiles();
  const activeId = getActiveProfileId();
  const idx = profiles.findIndex((p) => p.id === activeId);
  if (idx === -1) {
    return profiles[0]!;
  }

  const current = profiles[idx]!;
  const updated: UserProfile = { ...current, ...patch };
  profiles[idx] = updated;
  persistProfiles(profiles);

  if (patch.name && typeof localStorage !== "undefined") {
    localStorage.setItem("lextype-user-nickname", patch.name);
  }
  if (patch.xp !== undefined && typeof localStorage !== "undefined") {
    localStorage.setItem("lextype-xp", String(patch.xp));
  }
  if (patch.bestWpm !== undefined && typeof localStorage !== "undefined") {
    localStorage.setItem("lextype-best-wpm", String(patch.bestWpm));
  }
  if (patch.sessions && typeof localStorage !== "undefined") {
    localStorage.setItem("lextype-sessions", JSON.stringify(patch.sessions));
  }
  if (patch.keyStats && typeof localStorage !== "undefined") {
    localStorage.setItem("lextype-stats", JSON.stringify(patch.keyStats));
  }

  return updated;
}

/** Remove um perfil (deve restar ao menos um). */
export function deleteProfile(profileId: string): { success: boolean; error?: string } {
  let profiles = loadAllProfiles();
  if (profiles.length <= 1) {
    return { success: false, error: "Não é possível excluir o único perfil existente." };
  }
  profiles = profiles.filter((p) => p.id !== profileId);
  persistProfiles(profiles);
  if (getActiveProfileId() === profileId) {
    setActiveProfileId(profiles[0]!.id);
  }
  return { success: true };
}

/** Retorna todos os perfis locais prontos para inclusão na tabela de Ranking. */
export function getLeaderboardProfiles() {
  const profiles = loadAllProfiles();
  const activeId = getActiveProfileId();

  return profiles.map((p) => {
    const accuracy = p.sessions.length
      ? Math.round(p.sessions.reduce((acc, s) => acc + (s.accuracy || 100), 0) / p.sessions.length)
      : 100;

    return {
      id: p.id,
      name: p.name,
      title: `${p.role} (Perfil Local)`,
      wpm: p.bestWpm || 0,
      accuracy,
      xp: p.xp || 0,
      badge: p.avatar,
      isUser: true,
      isCurrentActive: p.id === activeId,
      isGoogle: p.isGoogle,
    };
  });
}
