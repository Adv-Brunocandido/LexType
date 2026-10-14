// Tipos e constantes fundamentais da Lei Seca
// Desacoplado do banco de dados pesado (vade-mecum-data) para permitir lazy-loading de alta performance
import type { StudyItem } from "@/lib/study.functions";

export interface LeiSecaItem {
  id: string;
  eixo: string;
  disciplina: string;
  diploma: string;
  dispositivo: string;
  texto: string;
  explicacao: string;
  palavrasComplexas?: { termo: string; semantica: string }[];
  fonteOficial: string;
  artigoNum?: number;
  atualidade?: string;
  casoConcreto?: string;
}

export const LEI_SECA_EIXOS = [
  "Todos os Eixos",
  "Direito Constitucional",
  "Ética e Prerrogativas (OAB)",
  "Direito Processual Civil",
  "Direito Civil",
  "Direito Penal",
  "Direito Processual Penal",
  "Direito do Trabalho",
  "Direito Tributário",
  "Direito Administrativo",
  "Súmulas Vinculantes do STF",
  "Súmulas do Superior Tribunal de Justiça (STJ)",
] as const;

export type LeiSecaEixo = (typeof LEI_SECA_EIXOS)[number];

export function leiSecaToStudyItem(item: LeiSecaItem): StudyItem {
  const atualidade =
    item.atualidade ||
    `Tese Vinculante / Exegese: ${item.explicacao}`;
  const caso = item.casoConcreto ? item.casoConcreto.trim() : "";

  return {
    linha: item.texto,
    termo: `${item.dispositivo} (${item.diploma})`,
    semantica: `${item.dispositivo} • ${item.fonteOficial}`,
    virada: {
      titulo: `${item.dispositivo} — ${item.diploma}`,
      conceito: item.explicacao,
      raciocinio: atualidade,
      exemplo: caso,
    },
  };
}
