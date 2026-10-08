// Prof. Dr. Rigoroso — catedrático irônico, exigente e (secretamente) torcendo pelo seu sucesso.

export type Mood =
  | "start"
  | "error"
  | "errorStreak"
  | "combo"
  | "finishBad"
  | "finishOk"
  | "finishGreat"
  | "levelUp"
  | "levelDown";

const LINES: Record<Mood, string[]> = {
  start: [
    "Vista o terno da concentração. Hoje a pauta está cheia e não temos tempo para lentidão.",
    "Já separei a jurisprudência para quem digita olhando para o teclado: é sempre desfavorável.",
    "O escrivão está aguardando as notas taquigráficas. Mostre que seus dedos são mais rápidos que a voz.",
    "Lembre-se: cada tecla errada é um embargo de declaração que você vai ter que responder. Comece!",
    "Sente direito, coluna ereta e dedos na fileira guia. Hoje eu não estou para brincadeira.",
    "Mais uma sessão. Vamos ver se hoje você honra o diploma ou se continuo passando vergonha alheia.",
    "Silêncio no plenário. Acabe com essa petição antes das 23:59.",
    "Meu café está esfriando e a sua hesitação está me dando sono. Digite.",
    "O PJe fecha para manutenção à meia-noite. Considere isso um simulado de prazo fatal.",
    "Dormientibus non succurrit ius... e quem dorme no teclado não passa nem na primeira fase.",
    "Mão esquerda no ASDF, mão direita no JKLÇ. Quem catar milho com indicador vai levar advertência verbal.",
    "Postura de tribunal, olhar na tela e memória muscular ligada. Comece já.",
  ],
  error: [
    'Errou o "{k}"? Cuidado, esse erro material pode mudar o sentido da cláusula penal!',
    '" {k} "? Mais atenção, doutor! O juízo não é obrigado a aceitar aditamento à petição inicial toda hora.',
    "Isso foi um erro de digitação ou você está tentando inovar no ordenamento jurídico?",
    'Você digitou "{k}"? Até um sistema legar dos anos 90 sabe que isso não faz sentido.',
    'Se o erro no "{k}" fosse crime, a tipicidade seria indiscutível e a materialidade está na tela.',
    'Com um erro no "{k}" desse, a parte contrária vai pedir litigância de má-fé por embaraço processual.',
    'Errou o "{k}". Isso é cerceamento de defesa contra o próprio teclado.',
    '"{k}"?! Até o estagiário do primeiro semestre em dia de greve acerta essa.',
    'Errar o "{k}" assim deveria ser infração disciplinar perante o TED da OAB.',
    "Olhou pro teclado, não olhou? Eu vi pela webcam da minha mente. Eu sempre vejo.",
    '"{k}" de novo? Indeferido por absoluta falta de fundamentação motora.',
    "Com essa pontaria seu agravo de instrumento vai cair por vício formal insanável.",
    "Data venia, isso foi uma agressão visual à memória muscular.",
    'Onde você achou que o "{k}" estava? No monitor vizinho?',
    "Errou a barra de espaço?! Ela tem dez centímetros de largura, pelo amor dos Tribunais!",
    '"{k}"?! Se errar mais uma dessa eu vou pedir busca e apreensão do seu teclado.',
    "In dubio pro reo... mas nesse erro, a culpa foi exclusivamente sua.",
    'O dedo indicador foi parar no "{k}" por engano? Cada dedo tem sua comarca!',
    "Errou a tecla. Respire, não entre em desespero como advogado em sustentação oral surpresa.",
  ],
  errorStreak: [
    "Que sequencia de erros! Você está tentando psicografar a petição ou o quê?",
    "Isso é uma confissão ficta de que você não treinou o suficiente. Pare, respire e foque!",
    "Três erros consecutivos! O CNJ vai abrir uma sindicância para apurar essa digitação.",
    "Pare de bater no teclado como se fosse um martelo de juiz! Suavidade e precisão, por favor!",
    "Chega! Três erros seguidos. Desacelere ou eu peço a cassação da sua matrícula.",
    "Você está digitando com luva de boxe ou usando o cotovelo? Pare, respire e acerte.",
    "Isso não é digitação, é um atentado processual contra a língua portuguesa.",
    "Quer que eu convoque a Defensoria Pública para te defender dessa sequência vexatória?",
    "Devagar! Velocidade sem precisão é pura litigância de má-fé.",
    "Três erros em linha! O juiz já mandou desentranhar essa sua tentativa dos autos.",
    "Calma! Se você digitar afobado assim, vai mandar a contestação sem o pedido de improcedência.",
    "O teclado não morde, doutor(a). Precisão primeiro, velocidade depois. Sempre.",
  ],
  combo: [
    "{n} teclas! Está fluindo como uma liminar deferida inaudita altera pars.",
    "{n} seguidas! Parece até que contratou um parecerista de peso para redigir por você.",
    "Combo de {n}. Se continuar assim vou ter que pedir vistas para não me sentir humilhado.",
    "{n}! O ritmo está tão bom que já podemos despachar com o presidente do tribunal.",
    "{n} acertos seguidos. Hum. Não vou elogiar, mas não vou te repreender agora.",
    "Combo de {n}! Milagre processual reconhecido de ofício sem necessidade de dilação probatória.",
    "{n} sem errar? Quem é você e o que fez com o aluno descoordenado de ontem?",
    "{n} seguidos. Mantenha o ritmo, antes que eu mande juntar certidão de preclusão.",
    "Combo de {n}! A sustentação oral está fluindo como voto de relator experiente.",
    "{n} acertos sem olhar! Quase me fez derramar uma lágrima no meu Vade Mecum.",
    "Excelente cadência ({n} teclas). O ritmo é a alma do touch-typing.",
  ],
  finishBad: [
    "Essa performance pede uma suspensão condicional do processo de aprendizagem. Foque e repita!",
    "Inépcia da inicial! Com essa taxa de acertos, melhor pedir para o estagiário digitar.",
    "O tribunal indeferiu seu pleito de velocidade por manifesta falta de precisão. Tente de novo.",
    "Sentença: improcedente com condenação em custas e repetição obrigatória da sessão.",
    "Com essa precisão, nem procuração ad judicia eu assinaria com você.",
    "Reprovado no exame prático. Mas eu sou exigente porque vejo potencial. Volte e refaça.",
    "Se esse texto fosse uma cautelar, a liminar teria sido negada liminarmente com multa.",
    "Nem o corretor automático revisando conseguiria salvar esse índice de erros. Tente outra vez.",
    "O parecer é desfavorável. Recomece agora mesmo para salvar sua honra.",
  ],
  finishOk: [
    "Desempenho admitido em parte. Mas ainda cabe muito embargo infringente aí.",
    "Deferido com ressalvas. O laudo pericial apontou que seus dedos mindinhos ainda hesitam.",
    "Despacho mero expediente. Nada brilhante, mas também não prejudicou o andamento do feito.",
    "Razoável. Nem medalha de honra, nem processo disciplinar. Na próxima eu exijo excelência.",
    "Aprovado com ressalvas. Bastantes ressalvas, mas os autos estão regulares.",
    "Passou raspando, como recurso adesivo admitido no último dia do prazo.",
    "Aceitável para uma audiência de conciliação. Para o STJ ainda falta técnica.",
    "Dentro da média. Mas quem quer passar em concurso de ponta não se contenta com a média.",
  ],
  finishGreat: [
    "Sustentação oral impecável! Os ministros acompanharam o relator à unanimidade. Parabéns!",
    "Velocidade de liminar em plantão e precisão de doutrinador clássico. Excelente trabalho!",
    "Você não digitou, você prolatou uma obra-prima. Pode arquivar com trânsito em julgado.",
    "Magistral! Digitação digna de quem redige acórdão com café fresco na mão.",
    "Isso sim é touch-typing de alto nível! O cartório inteiro aplaudiu em silêncio.",
    "Trânsito em julgado com louvor. Não sobrou nada para a outra parte recorrer.",
    "Espetacular. Você dominou a mecânica muscular e a precisão técnica. Parabéns.",
    "Voto com o relator: desempenho brilhante, com ritmo fluido e zero hesitação.",
  ],
  levelUp: [
    "Promoção por merecimento! A vara assumida agora tem processos bem mais espinhosos. Preparado?",
    "Novo nível! Agora não basta citar a lei, tem que dominar a súmula vinculante dos teclados.",
    "Subiu de nível! Não se empolgue: o tribunal de segunda instância é muito mais impiedoso.",
    "Promoção homologada! Vou subir o rigor dos exercícios só para ver sua postura.",
    "Parabéns pela ascensão! Mas lembre-se: quanto maior o cargo, mais denso é o relatório.",
    "Novo nível alcançado. Agora o sarrafo subiu de verdade. Mantenha o foco.",
  ],
  levelDown: [
    "Rebaixamento administrativo. Volte para a vara do juizado especial para treinar a base.",
    "Agravo não conhecido. Descemos um grau de jurisdição para não ferir a ampla defesa dos seus dedos.",
    "Rebaixado de patente. Voltamos à base até você aprender a respeitar o teclado.",
    "Nível reduzido para reeducação muscular. Humildade também é virtude dos grandes juristas.",
    "Descida temporária de degrau. Respire fundo, posicione os dedos e recupere seu posto.",
  ],
};

export function professorSays(mood: Mood, vars: { k?: string; n?: number } = {}): string {
  const list = LINES[mood];
  const line = list[Math.floor(Math.random() * list.length)]!;
  const keyLabel = vars.k === " " ? "espaço" : (vars.k ?? "");
  return line.replace("{k}", keyLabel.toUpperCase()).replace("{n}", String(vars.n ?? ""));
}

export const RANKS = [
  "Estagiário",
  "Bacharel",
  "Advogado Júnior",
  "Advogado Pleno",
  "Advogado Sênior",
  "Sócio",
  "Promotor",
  "Juiz",
  "Desembargador",
  "Ministro do STF",
];

export function rankOf(xp: number) {
  const idx = Math.min(RANKS.length - 1, Math.floor(xp / 500));
  return {
    name: RANKS[idx]!,
    progress: idx === RANKS.length - 1 ? 1 : (xp % 500) / 500,
    next: RANKS[idx + 1],
  };
}
