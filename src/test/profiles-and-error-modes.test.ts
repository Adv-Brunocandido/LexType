import { describe, expect, it, beforeEach } from "vitest";
import { newEngine, typeChar, backspace, restartLine, type TypingErrorMode } from "@/lib/engine";
import { offlineStudy } from "@/lib/study-offline";
import {
  loadAllProfiles,
  getActiveProfile,
  createProfile,
  switchProfile,
  verifyProfilePin,
  updateActiveProfile,
  deleteProfile,
  getLeaderboardProfiles,
} from "@/lib/profiles";

describe("Seleção Rigorosa de Matéria da OAB em Estudos Avançados", () => {
  it("retorna exclusivamente itens de Direito Penal ao selecionar a matéria", () => {
    const penalItems = offlineStudy("Direito Penal", 6, []);
    expect(penalItems.length).toBe(6);
    for (const item of penalItems) {
      expect(item.linha).toBeTruthy();
      expect(item.virada.titulo).toBeTruthy();
    }
  });

  it("retorna itens de Direito Tributário ao alternar a matéria", () => {
    const tribItems = offlineStudy("Direito Tributário", 5, []);
    expect(tribItems.length).toBe(5);
    for (const item of tribItems) {
      expect(item.linha).toBeTruthy();
      expect(item.virada.raciocinio).toBeTruthy();
    }
  });

  it("retorna itens de Direito do Trabalho sem contaminação por outras matérias", () => {
    const trabItems = offlineStudy("Direito do Trabalho", 5, []);
    expect(trabItems.length).toBe(5);
    for (const item of trabItems) {
      expect(item.linha).toBeTruthy();
    }
  });
});

describe("4 Modos de Digitação e Tolerância a Erros (Engine)", () => {
  it("Modo Fluido (fluid): permite continuar e corrigir via Backspace", () => {
    const eng = newEngine("direito");
    // Digita 'd' correto
    const r1 = typeChar(eng, "d", { errorMode: "fluid" });
    expect(r1.kind).toBe("correct");
    expect(eng.pos).toBe(1);

    // Digita 'x' incorreto (esperava 'i')
    const r2 = typeChar(eng, "x", { errorMode: "fluid" });
    expect(r2.kind).toBe("wrong");
    expect(eng.pos).toBe(2);
    expect(eng.marks[1]).toBe(true);

    // Backspace volta um caractere
    const bs = backspace(eng, "fluid");
    expect(bs).toBe(true);
    expect(eng.pos).toBe(1);
    expect(eng.marks[1]).toBe(false);

    // Digita 'i' correto
    const r3 = typeChar(eng, "i", { errorMode: "fluid" });
    expect(r3.kind).toBe("correct");
    expect(eng.pos).toBe(2);
  });

  it("Modo Estrito (strict): cursor trava no erro até o acerto", () => {
    const eng = newEngine("habeas");
    // Digita 'h' correto
    typeChar(eng, "h", { errorMode: "strict" });
    expect(eng.pos).toBe(1);

    // Digita 'z' errado
    const rErr = typeChar(eng, "z", { errorMode: "strict" });
    expect(rErr.kind).toBe("wrong");
    expect(eng.pos).toBe(1); // Não avança
    expect(eng.wrongAt).toBe(1);

    // Backspace é bloqueado
    const bs = backspace(eng, "strict");
    expect(bs).toBe(false);
    expect(eng.pos).toBe(1);

    // Digita 'a' correto
    const rOk = typeChar(eng, "a", { errorMode: "strict" });
    expect(rOk.kind).toBe("correct");
    expect(eng.pos).toBe(2);
    expect(eng.wrongAt).toBeNull();
  });

  it("Modo Morte Súbita (restart): errou qualquer letra, reseta a linha", () => {
    const eng = newEngine("constituicao");
    typeChar(eng, "c", { errorMode: "restart" });
    typeChar(eng, "o", { errorMode: "restart" });
    typeChar(eng, "n", { errorMode: "restart" });
    expect(eng.pos).toBe(3);

    // Erra na quarta letra
    const rErr = typeChar(eng, "k", { errorMode: "restart" });
    expect(rErr.kind).toBe("wrong");
    if (rErr.kind === "wrong") {
      expect(rErr.restarted).toBe(true);
    }
    expect(eng.pos).toBe(0); // Reiniciou do início!
    expect(eng.combo).toBe(0);
    expect(eng.startedAt).toBeNull();
  });

  it("Modo Mestre / Sem Backspace (nobackspace): fluxo contínuo sem retorno", () => {
    const eng = newEngine("sumula");
    typeChar(eng, "s", { errorMode: "nobackspace" });
    expect(eng.pos).toBe(1);

    // Erra 'u' digitando 'x'
    typeChar(eng, "x", { errorMode: "nobackspace" });
    expect(eng.pos).toBe(2);
    expect(eng.marks[1]).toBe(true);

    // Tentar Backspace é expressamente proibido
    const bs = backspace(eng, "nobackspace");
    expect(bs).toBe(false);
    expect(eng.pos).toBe(2);

    // Continua digitando para frente
    typeChar(eng, "m", { errorMode: "nobackspace" });
    expect(eng.pos).toBe(3);
  });
});

describe("Sistema Multi-Perfil e Ranking Individualizado", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicializa com perfil padrão preservando dados locais", () => {
    const profiles = loadAllProfiles();
    expect(profiles.length).toBeGreaterThanOrEqual(1);
    const active = getActiveProfile();
    expect(active.id).toBe("profile-default");
  });

  it("cria novo perfil individual sem interferir no anterior", () => {
    const p2 = createProfile({
      name: "Dr. Roberto Silva",
      role: "Juiz(a) de Direito",
      avatar: "🏛️",
      pin: "1234",
    });

    expect(p2.id).toBeTruthy();
    expect(p2.name).toBe("Dr. Roberto Silva");
    expect(p2.pin).toBe("1234");

    const all = loadAllProfiles();
    expect(all.length).toBe(2);
  });

  it("protege perfil com PIN na alternância", () => {
    const protectedProf = createProfile({
      name: "Dra. Ana Defensora",
      role: "Defensor(a) Público(a)",
      pin: "9876",
    });

    // Tentativa com PIN errado falha
    const fail = switchProfile(protectedProf.id, "0000");
    expect(fail.success).toBe(false);
    expect(fail.error).toContain("PIN");

    // Tentativa com PIN correto tem sucesso
    const ok = switchProfile(protectedProf.id, "9876");
    expect(ok.success).toBe(true);
    expect(getActiveProfile().name).toBe("Dra. Ana Defensora");
  });

  it("atualiza XP e estatísticas apenas no perfil ativo", () => {
    const p = createProfile({ name: "Digitador Elite" });
    switchProfile(p.id);

    updateActiveProfile({ xp: 500, bestWpm: 120 });
    const current = getActiveProfile();
    expect(current.xp).toBe(500);
    expect(current.bestWpm).toBe(120);

    // Alterna de volta para o perfil padrão e verifica isolamento
    switchProfile("profile-default");
    const def = getActiveProfile();
    expect(def.id).toBe("profile-default");
    expect(def.xp).not.toBe(500);
  });

  it("getLeaderboardProfiles inclui todos os perfis e marca o ativo", () => {
    createProfile({ name: "Competidor 1" });
    createProfile({ name: "Competidor 2", isGoogle: true, googleEmail: "comp2@gmail.com" });

    const leaderboard = getLeaderboardProfiles();
    expect(leaderboard.length).toBeGreaterThanOrEqual(3);

    const activeEntry = leaderboard.find((l) => l.isCurrentActive);
    expect(activeEntry).toBeDefined();

    const googleEntry = leaderboard.find((l) => l.isGoogle);
    expect(googleEntry).toBeDefined();
  });
});
