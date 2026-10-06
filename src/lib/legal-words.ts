// Vocabulário jurídico em PT-BR para treino de digitação (advogados, juízes, serventuários).

export const LEGAL_WORDS: string[] = [
  // curtas
  "juiz", "foro", "ato", "lei", "prova", "autor", "réu", "multa", "pena", "prazo",
  "custa", "dolo", "dano", "bem", "uso", "fazenda", "valor", "ordem", "termo", "ata",
  // médias
  "tutela", "liminar", "sentença", "recurso", "apelação", "agravo", "embargo", "mandado",
  "petição", "defesa", "acusado", "testemunha", "perícia", "laudo", "contrato", "cláusula",
  "herança", "divórcio", "guarda", "alimentos", "usucapião", "hipoteca", "fiador", "caução",
  "arbitragem", "mediação", "acórdão", "relator", "desembargador", "promotor", "advogado",
  "jurisdição", "competência", "legitimidade", "mérito", "trânsito", "coisa", "julgada",
  "prescrição", "decadência", "nulidade", "anulação", "ratificação", "homologação",
  "execução", "penhora", "citação", "intimação", "audiência", "sustentação", "alegações",
  // longas / compostas
  "habeas corpus", "mandado de segurança", "ação civil pública", "responsabilidade civil",
  "dano moral", "dano material", "litisconsórcio", "assistência judiciária", "tutela antecipada",
  "jurisprudência", "súmula vinculante", "repercussão geral", "recurso extraordinário",
  "recurso especial", "improbidade administrativa", "princípio da legalidade", "devido processo legal",
  "ampla defesa", "contraditório", "in dubio pro reo", "pacta sunt servanda", "boa-fé objetiva",
  "poder de polícia", "desapropriação", "servidão", "usufruto", "posse", "propriedade",
  "inventário", "testamento", "legítima", "colação", "partilha", "curador", "tutor",
  "interdição", "emancipação", "capacidade civil", "pessoa jurídica", "domicílio",
];

export const LEGAL_PHRASES: string[] = [
  "O juiz determinou a citação do réu no prazo legal.",
  "A defesa apresentou alegações finais na audiência.",
  "O recurso foi negado por unanimidade pelo tribunal.",
  "A tutela de urgência foi deferida pelo relator.",
  "A sentença transitou em julgado sem recurso.",
  "O contrato foi rescindido por quebra de cláusula.",
  "A testemunha prestou depoimento sob compromisso legal.",
  "O perito apresentou o laudo dentro do prazo.",
  "O mandado de segurança foi concedido ao autor.",
  "A execução fiscal foi suspensa por decisão liminar.",
  "O advogado protocolou a petição inicial no foro.",
  "A mediação terminou com acordo entre as partes.",
  "O promotor ofereceu denúncia contra o acusado.",
  "A prescrição foi reconhecida de ofício pelo juiz.",
  "O inventário foi homologado com a partilha dos bens.",
  "A penhora recaiu sobre o imóvel do devedor.",
];

export const FINGER_INFO: Record<string, { hand: "E" | "D"; finger: string }> = {
  q: { hand: "E", finger: "mínimo" }, a: { hand: "E", finger: "mínimo" }, z: { hand: "E", finger: "mínimo" },
  w: { hand: "E", finger: "anelar" }, s: { hand: "E", finger: "anelar" }, x: { hand: "E", finger: "anelar" },
  e: { hand: "E", finger: "médio" }, d: { hand: "E", finger: "médio" }, c: { hand: "E", finger: "médio" },
  r: { hand: "E", finger: "indicador" }, f: { hand: "E", finger: "indicador" }, v: { hand: "E", finger: "indicador" },
  t: { hand: "E", finger: "indicador" }, g: { hand: "E", finger: "indicador" }, b: { hand: "E", finger: "indicador" },
  y: { hand: "D", finger: "indicador" }, h: { hand: "D", finger: "indicador" }, n: { hand: "D", finger: "indicador" },
  u: { hand: "D", finger: "indicador" }, j: { hand: "D", finger: "indicador" }, m: { hand: "D", finger: "indicador" },
  i: { hand: "D", finger: "médio" }, k: { hand: "D", finger: "médio" },
  o: { hand: "D", finger: "anelar" }, l: { hand: "D", finger: "anelar" },
  p: { hand: "D", finger: "mínimo" }, ç: { hand: "D", finger: "mínimo" },
};
