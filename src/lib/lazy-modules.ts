// Gerenciador central de Lazy Loading com cache em memória
// Evita bundling síncrono dos megabancos de dados (Vade Mecum e Banco FGV Offline)

let studyOfflineModulePromise: Promise<typeof import("@/lib/study-offline")> | null = null;
let studyOfflineModule: typeof import("@/lib/study-offline") | null = null;

export async function getStudyOfflineModule(): Promise<typeof import("@/lib/study-offline")> {
  if (studyOfflineModule) return studyOfflineModule;
  if (!studyOfflineModulePromise) {
    studyOfflineModulePromise = import("@/lib/study-offline");
  }
  studyOfflineModule = await studyOfflineModulePromise;
  return studyOfflineModule;
}

export function isStudyOfflineLoaded(): boolean {
  return studyOfflineModule !== null;
}

let leiSecaModulePromise: Promise<typeof import("@/lib/lei-seca")> | null = null;
let leiSecaModule: typeof import("@/lib/lei-seca") | null = null;

export async function getLeiSecaModule(): Promise<typeof import("@/lib/lei-seca")> {
  if (leiSecaModule) return leiSecaModule;
  if (!leiSecaModulePromise) {
    leiSecaModulePromise = import("@/lib/lei-seca");
  }
  leiSecaModule = await leiSecaModulePromise;
  return leiSecaModule;
}

export function isLeiSecaLoaded(): boolean {
  return leiSecaModule !== null;
}
