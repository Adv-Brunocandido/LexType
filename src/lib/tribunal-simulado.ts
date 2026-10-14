// Simulado Oficial de Tribunal - Prova Prática Forense (5 Minutos)
// Padrão de pontuação dos Tribunais de Justiça e Concursos para Cartórios e Analistas

export interface TribunalExamText {
  id: string;
  tribunal: "STF" | "STJ" | "TST";
  origem: string;
  relator: string;
  ramo: string;
  ementa: string;
  texto: string;
}

export const TRIBUNAL_EXAM_BANK: TribunalExamText[] = [
  {
    id: "stf-hc-presuncao",
    tribunal: "STF",
    origem: "STF - HC 126.292/SP (Plenário)",
    relator: "Min. Teori Zavascki",
    ramo: "Direito Constitucional & Processual Penal",
    ementa: "A execução provisória de acórdão penal condenatório proferido em grau de apelação, ainda que sujeito a recurso especial ou extraordinário, não compromete o princípio constitucional da presunção de inocência.",
    texto: "A presunção de inocência não impede que, assentadas a autoria e a materialidade delitivas pelas instâncias ordinárias com ampla cognição fático-probatória, dê-se início à execução da pena privativa de liberdade imposta ao apenado. Os recursos de índole extraordinária não ostentam efeito suspensivo ope legis e não se prestam ao reexame de provas fáticas, consoante sedimentado na Súmula 279 desta Suprema Corte.",
  },
  {
    id: "stj-resp-taxatividade",
    tribunal: "STJ",
    origem: "STJ - REsp 1.704.520/MT (Corte Especial - Tema 988)",
    relator: "Min. Nancy Andrighi",
    ramo: "Direito Processual Civil",
    ementa: "O rol do art. 1.015 do CPC é de taxatividade mitigada, por isso admite a interposição de agravo de instrumento quando verificada a urgência decorrente da inutilidade do julgamento da questão no recurso de apelação.",
    texto: "O rol do art. 1.015 do CPC possui taxatividade mitigada pela necessidade de resguardar o princípio da celeridade e da efetividade jurisdicional. A demonstração pontual do perigo da demora e da inutilidade de postergar a análise da interlocutória para a preliminar de apelação impõe a admissibilidade recursal imediata pelo Tribunal ad quem.",
  },
  {
    id: "tst-rr-dano-moral",
    tribunal: "TST",
    origem: "TST - RR 1001245-78.2021.5.02.0014 (Subseção I Especializada)",
    relator: "Min. Aloysio Corrêa da Veiga",
    ramo: "Direito do Trabalho & Processo do Trabalho",
    ementa: "Dano moral in re ipsa. O atraso reiterado e contumaz no pagamento de salários mensais acarreta lesão à dignidade do trabalhador, dispensando prova cabal de prejuízo material objetivo.",
    texto: "O salário ostenta natureza eminentemente alimentar e destina-se a assegurar as condições mínimas de subsistência digna do obreiro e de sua família. O atraso salarial reiterado perpetrado pelo empregador enseja abalo psicológico notório, configurando dano moral in re ipsa, apto a atrair indenização compensatória proporcional à gravidade da conduta ilícita patronal.",
  },
  {
    id: "stf-re-direitos-fundamentais",
    tribunal: "STF",
    origem: "STF - RE 635.659/SP (Plenário)",
    relator: "Min. Gilmar Mendes",
    ramo: "Direito Constitucional & Direitos Fundamentais",
    ementa: "Autonomia individual, reserva de intimidade e proporcionalidade na intervenção punitiva estatal sobre a vida privada dos cidadãos.",
    texto: "A intervenção do Direito Penal na esfera individual subordina-se estritamente aos princípios da subsidiariedade, fragmentariedade e ofensividade concreta. Condutas que não transbordam a esfera íntima do indivíduo e não causam perigo idôneo a bens jurídicos de terceiros não justificam o recrudescimento da tutela estatal punitiva.",
  },
];

export interface TribunalScoreResult {
  grossChars: number;
  errors: number;
  netChars: number;
  wpm: number;
  accuracy: number;
  score: number; // 0.0 a 10.0
  isApproved: boolean;
  verdict: string;
  feedback: string;
}

export const TRIBUNAL_DURATION_SECONDS = 300; // 5 minutos oficiais
export const TRIBUNAL_TARGET_CHARS = 1500; // Padrão dos Tribunais (300 PPM / 60 WPM em 5 min)
export const TRIBUNAL_PASSING_SCORE = 8.0;

export function calculateTribunalScore(
  grossChars: number,
  errors: number,
  secondsElapsed: number,
): TribunalScoreResult {
  const safeSeconds = Math.max(1, secondsElapsed);
  // Fórmula oficial de concurso forense: Caracteres Líquidos = Brutos - (Erros * 2)
  const netChars = Math.max(0, grossChars - errors * 2);
  const wpm = Math.round((grossChars / 5) / (safeSeconds / 60));
  const accuracy =
    grossChars > 0 ? Number((((grossChars - errors) / grossChars) * 100).toFixed(1)) : 100;

  // Escala de 0.0 a 10.0 baseada no teto de 1500 caracteres líquidos esperados para 5 minutos
  const rawScore = (netChars / TRIBUNAL_TARGET_CHARS) * 10;
  const score = Math.min(10, Math.max(0, Number(rawScore.toFixed(1))));
  const isApproved = score >= TRIBUNAL_PASSING_SCORE;

  const verdict = isApproved
    ? "🏆 APROVADO PARA A PRÓXIMA FASE (Concurso Forense)"
    : "❌ REPROVADO (Nota de corte mínima: 8,0 / 10,0)";

  let feedback = "";
  if (isApproved && score >= 9.5) {
    feedback = "Desempenho de excelência absoluta. Velocidade, rigor gramatical e cadência forense impecáveis.";
  } else if (isApproved) {
    feedback = "Parabéns! Sua pontuação líquida superou com folga o rigor dos Tribunais de Justiça e Cartórios.";
  } else if (errors > 15) {
    feedback = "Atenção: A penalidade de 2 caracteres por erro prejudicou sua nota líquida. Priorize a precisão em vez da pressa.";
  } else {
    feedback = "Cadência insuficiente para o tempo limite de 5 minutos. Pratique o ritmo contínuo com o metrônomo para atingir a meta.";
  }

  return {
    grossChars,
    errors,
    netChars,
    wpm,
    accuracy,
    score,
    isApproved,
    verdict,
    feedback,
  };
}

export function getRandomTribunalAcordao(): TribunalExamText {
  const idx = Math.floor(Math.random() * TRIBUNAL_EXAM_BANK.length);
  return TRIBUNAL_EXAM_BANK[idx]!;
}
