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
    "{n} acertos seguidos. Hum. Não vou elogiar, mas não vou te repreender agora.",
    "Combo de {n}! Milagre processual reconhecido de ofício sem necessidade de dilação probatória.",
    "{n} sem errar? Quem é você e o que fez com o aluno descoordenado de ontem?",
    "{n} seguidos. Mantenha o ritmo, antes que eu mande juntar certidão de preclusão.",
    "Combo de {n}! A sustentação oral está fluindo como voto de relator experiente.",
    "{n} acertos sem olhar! Quase me fez derramar uma lágrima no meu Vade Mecum.",
    "Excelente cadência ({n} teclas). O ritmo é a alma do touch-typing.",
  ],
  finishBad: [
    "Sentença: improcedente com condenação em custas e repetição obrigatória da sessão.",
    "Com essa precisão, nem procuração ad judicia eu assinaria com você.",
    "Reprovado no exame prático. Mas eu sou exigente porque vejo potencial. Volte e refaça.",
    "Se esse texto fosse uma cautelar, a liminar teria sido negada liminarmente com multa.",
    "Nem o corretor automático revisando conseguiria salvar esse índice de erros. Tente outra vez.",
    "O parecer é desfavorável. Recomece agora mesmo para salvar sua honra.",
  ],
  finishOk: [
    "Razoável. Nem medalha de honra, nem processo disciplinar. Na próxima eu exijo excelência.",
    "Aprovado com ressalvas. Bastantes ressalvas, mas os autos estão regulares.",
    "Passou raspando, como recurso adesivo admitido no último dia do prazo.",
    "Aceitável para uma audiência de conciliação. Para o STJ ainda falta técnica.",
    "Dentro da média. Mas quem quer passar em concurso de ponta não se contenta com a média.",
  ],
  finishGreat: [
    "Magistral! Digitação digna de quem redige acórdão com café fresco na mão.",
    "Isso sim é touch-typing de alto nível! O cartório inteiro aplaudiu em silêncio.",
    "Trânsito em julgado com louvor. Não sobrou nada para a outra parte recorrer.",
    "Espetacular. Você dominou a mecânica muscular e a precisão técnica. Parabéns.",
    "Voto com o relator: desempenho brilhante, com ritmo fluido e zero hesitação.",
  ],
  levelUp: [
    "Subiu de nível! Não se empolgue: o tribunal de segunda instância é muito mais impiedoso.",
    "Promoção homologada! Vou subir o rigor dos exercícios só para ver sua postura.",
    "Parabéns pela ascensão! Mas lembre-se: quanto maior o cargo, mais denso é o relatório.",
    "Novo nível alcançado. Agora o sarrafo subiu de verdade. Mantenha o foco.",
  ],
  levelDown: [
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
