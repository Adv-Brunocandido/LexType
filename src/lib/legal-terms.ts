import { DICIONARIO_JURIDICO } from "./dicionario-juridico";

export interface ComplexLegalTerm {
  termo: string;
  semantica: string;
  significado: string;
  virada?: string;
  categoria: string;
}

export const LEGAL_TERMS_GLOSSARY: Record<string, string> = {
  "subsidiária": "Responsabilidade em que o devedor secundário só pode ser executado após excutidos todos os bens do devedor principal (benefício de ordem).",
  "solidária": "Modalidade obrigacional em que cada devedor responde pela dívida inteira, podendo o credor exigir de qualquer um a totalidade.",
  "incompetência absoluta": "Vício processual inderrogável fixado em razão da matéria ou hierarquia; cognoscível de ofício a qualquer tempo, não preclui.",
  "incompetência relativa": "Vício fixado em razão do território ou valor da causa; preclui se não alegado em preliminar de contestação.",
  "preclusão": "Perda da faculdade de praticar ato processual por decurso de prazo (temporal), ato incompatível (lógica) ou realização prévia (consumativa).",
  "prescrição": "Perda da pretensão executória ou condenatória de um direito em virtude da inércia continuada de seu titular durante o prazo legal.",
  "decadência": "Extinção do próprio direito potestativo material pelo seu não exercício dentro do prazo fixado por lei ou contrato.",
  "contraditório substancial": "Garantia constitucional de influenciar concretamente a convicção do julgador, sendo nula qualquer decisão surpresa.",
  "inaudita altera parte": "Decisão liminar concedida com urgência pelo juiz sem a oitiva prévia da parte contrária, justificada pelo periculum in mora.",
  "múnus público": "Encargo ou função de relevante interesse social atribuído por lei, como o papel do advogado na administração da justiça.",
  "taxatividade mitigada": "Tese fixada pelo STJ que admite agravo de instrumento fora do art. 1.015 do CPC quando verificada urgência inadiável.",
  "litispendência": "Existência simultânea de duas ações idênticas em curso (mesmas partes, mesma causa de pedir e mesmo pedido).",
  "coisa julgada material": "Eficácia que torna imutável e indiscutível a decisão de mérito, impedindo nova apreciação judicial da lide.",
  "tutela de urgência": "Medida judicial cautelar ou antecipada concedida com base na probabilidade do direito e perigo de dano irreparável.",
  "tutela da evidência": "Medida concedida independentemente da demonstração de perigo de dano, fundada em prova documental irrefutável ou tese vinculante.",
  "improbidade": "Conduta desonesta, dolosa e lesiva ao erário ou aos princípios administrativos praticada por agente público ou terceiro.",
  "desídia": "Falta funcional caracterizada por negligência, desleixo ou desatenção reiterada nas obrigações trabalhistas.",
  "remissão": "Perdão legal ou extinção graciosa de uma dívida concedida pelo credor ao devedor nos moldes da lei.",
  "depósito recursal": "Garantia pecuniária prévia do juízo exigida no processo do trabalho para permitir a subida de recursos do empregador.",
  "anterioridade nonagesimal": "Impedimento constitucional de cobrança de tributo antes de 90 dias da publicação da lei que o criou ou majorou.",
  "imunidade tributária": "Incompetência constitucional absoluta dos entes federativos para instituir tributos sobre certas pessoas, bens ou serviços.",
  "tipicidade": "Adequação formal e material da conduta humana concreta ao modelo abstrato descrito na lei penal incriminadora.",
  "antijuridicidade": "Contrariedade entre o fato típico e o ordenamento jurídico, afastada pelas excludentes de ilicitude.",
  "culpabilidade": "Juízo de reprovação pessoal que recai sobre o autor de fato típico e ilícito que podia agir conforme o direito.",
  "provas ilícitas": "Elementos de convicção colhidos com violação a garantias constitucionais ou normas materiais, insuscetíveis de valoração.",
  "frutos da árvore envenenada": "Doutrina que contamina por ilicitude derivada todas as provas obtidas a partir de uma prova ilícita originária.",
  "prisão preventiva": "Medida cautelar de privação de liberdade antes do trânsito em julgado para garantia da ordem pública ou instrução criminal.",
  "incompatibilidade": "Proibição absoluta de exercer a advocacia decorrente da ocupação de determinados cargos públicos vedados.",
  "impedimento": "Proibição parcial de advogar contra as pessoas jurídicas ou esferas públicas às quais o profissional está vinculado.",
  "honorários sucumbenciais": "Verba de natureza alimentar devida pela parte derrotada diretamente ao advogado da parte vitoriosa.",
  "habeas corpus": "Ação constitucional que tutela a liberdade de locomoção contra ilegalidade ou abuso de poder de autoridade.",
  "mandado de segurança": "Ação constitucional que resguarda direito líquido e certo não amparado por HC ou HD contra ato de autoridade pública.",
};

export function extractComplexLegalTerm(text: string): ComplexLegalTerm | null {
  const lower = (text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const entry of DICIONARIO_JURIDICO) {
    const termNormalized = entry.termo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (lower.includes(termNormalized)) {
      return {
        termo: entry.termo,
        semantica: entry.significado,
        significado: entry.significado,
        virada: entry.viradaChave,
        categoria: entry.categoria,
      };
    }
  }
  for (const [term, meaning] of Object.entries(LEGAL_TERMS_GLOSSARY)) {
    const termNormalized = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (lower.includes(termNormalized)) {
      return {
        termo: term,
        semantica: meaning,
        significado: meaning,
        virada: `Exigência técnica frequente na FGV: diferencie o cabimento deste instituto e evite confundir com figuras afins.`,
        categoria: "Direito Material & Processual",
      };
    }
  }
  return null;
}
