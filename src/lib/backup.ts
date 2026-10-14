// Sistema de Backup e Restauração Integral em JSON (.json) do LexType
// Proteção contra perda de dados, migração entre navegadores e restauração atômica

export interface LexTypeBackupPayload {
  appName: "LexType";
  schemaVersion: number;
  exportedAt: string;
  data: Record<string, string>;
}

export function generateBackupPayload(): LexTypeBackupPayload {
  const data: Record<string, string> = {};
  if (typeof localStorage !== "undefined") {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("lextype-")) {
        const val = localStorage.getItem(key);
        if (val !== null) {
          data[key] = val;
        }
      }
    }
  }

  return {
    appName: "LexType",
    schemaVersion: 2,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function downloadBackupFile(): string {
  const payload = generateBackupPayload();
  const jsonStr = JSON.stringify(payload, null, 2);

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  const filename = `lextype-backup-${timestamp}.json`;

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return filename;
}

export function validateBackup(jsonString: string): {
  valid: boolean;
  error?: string;
  payload?: LexTypeBackupPayload;
} {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object") {
      return { valid: false, error: "Arquivo de backup inválido: formato não reconhecido." };
    }

    if (parsed.appName !== "LexType") {
      // Também aceita se contiver chaves lextype no objeto direto
      if (!parsed.data && !Object.keys(parsed).some((k) => k.startsWith("lextype-"))) {
        return {
          valid: false,
          error: "Arquivo incompatível: não é um backup oficial do LexType.",
        };
      }
    }

    const dataObj = parsed.data || parsed;
    if (typeof dataObj !== "object" || Object.keys(dataObj).length === 0) {
      return { valid: false, error: "O arquivo de backup está vazio ou corrompido." };
    }

    return {
      valid: true,
      payload: {
        appName: "LexType",
        schemaVersion: parsed.schemaVersion || 1,
        exportedAt: parsed.exportedAt || new Date().toISOString(),
        data: dataObj,
      },
    };
  } catch {
    return { valid: false, error: "Falha ao processar o arquivo: JSON malformado." };
  }
}

export function restoreBackupData(jsonString: string): { success: boolean; message: string } {
  const validation = validateBackup(jsonString);
  if (!validation.valid || !validation.payload) {
    return { success: false, message: validation.error || "Erro desconhecido na validação." };
  }

  if (typeof localStorage === "undefined") {
    return { success: false, message: "Armazenamento local indisponível no ambiente." };
  }

  try {
    const data = validation.payload.data;
    let restoredCount = 0;

    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith("lextype-") && typeof value === "string") {
        localStorage.setItem(key, value);
        restoredCount++;
      }
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("lextype-data-restored", { detail: { restoredCount } }));
    }

    return {
      success: true,
      message: `Backup restaurado com sucesso! ${restoredCount} registros recuperados.`,
    };
  } catch (err) {
    return {
      success: false,
      message: `Falha ao gravar no armazenamento local: ${String(err)}`,
    };
  }
}
