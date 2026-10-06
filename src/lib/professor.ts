// Prof. Dr. Rigoroso — catedrático irônico, agressivo e (secretamente) torcendo por você.

export type Mood = "start" | "error" | "errorStreak" | "combo" | "finishBad" | "finishOk" | "finishGreat" | "levelUp" | "levelDown";

const LINES: Record<Mood, string[]> = {
  start: [
    "Sente direito, dedos na fileira central. Hoje eu não estou de bom humor.",
    "Mais uma sessão. Vamos ver se hoje você honra o diploma pendurado na parede.",
    "Silêncio no plenário. Digite.",
    "Meu tempo é caro e o seu progresso é lento. Comece.",
  ],
  error: [
    "Errou o \"{k}\". Isso é cerceamento de defesa contra o próprio teclado.",
    "\"{k}\"?! Até o estagiário do cartório acerta essa.",
    "Errar o \"{k}\" assim deveria ser crime de menor potencial ofensivo.",
    "Olhou pro teclado, não olhou? Eu vi. Eu sempre vejo.",
    "\"{k}\" de novo? Indeferido. Repita.",
    "Com essa digitação seu prazo vai precluir antes do protocolo.",
    "Data venia, isso foi horroroso.",
  ],
  errorStreak: [
    "Chega! Três erros seguidos. Desacelere ou eu peço sua carteira da OAB de volta.",
    "Você está digitando com o cotovelo? Pare, respire, precisão primeiro.",
    "Isso não é digitação, é um agravo contra a língua portuguesa.",
    "Quer que eu chame a Defensoria Pública pra te defender desse teclado?",
    "Devagar! Velocidade sem precisão é litigância de má-fé.",
  ],
  combo: [
    "{n} acertos seguidos. Hum. Não vou elogiar, mas também não vou reclamar.",
    "Combo de {n}! Milagre processual reconhecido de ofício.",
    "{n} sem errar? Quem é você e o que fez com meu aluno?",
    "{n} seguidos. Continue, antes que eu mude de ideia sobre você.",
  ],
  finishBad: [
    "Sentença: insuficiente. Cabe recurso — chama-se repetir a sessão.",
    "Com essa precisão nem petição de juntada eu deixaria você assinar.",
    "Reprovado. Mas eu reprovo quem tem potencial. Os outros eu ignoro. De novo.",
  ],
  finishOk: [
    "Razoável. Nem prêmio, nem castigo. A próxima eu quero melhor.",
    "Aprovado com ressalvas. Muitas ressalvas.",
    "Passou raspando, como embargos de declaração bem escritos.",
  ],
  finishGreat: [
    "Excelente. Não se acostume, eu raramente digo isso.",
    "Isso sim é digitação de desembargador. Quase me emocionei.",
    "Trânsito em julgado: você mandou bem. Próxima.",
  ],
  levelUp: [
    "Subiu de nível. Agora o jogo fica pesado — eu avisei.",
    "Promovido. Vou aumentar a dificuldade só pra ver você sofrer.",
  ],
  levelDown: [
    "Rebaixado. Voltamos ao básico até você aprender a respeitar o teclado.",
    "Nível reduzido. Humildade também é uma virtude jurídica.",
  ],
};

export function professorSays(mood: Mood, vars: { k?: string; n?: number } = {}): string {
  const list = LINES[mood];
  const line = list[Math.floor(Math.random() * list.length)]!;
  const keyLabel = vars.k === " " ? "espaço" : (vars.k ?? "");
  return line.replace("{k}", keyLabel.toUpperCase()).replace("{n}", String(vars.n ?? ""));
}

export const RANKS = [
  "Estagiário", "Bacharel", "Advogado Júnior", "Advogado Pleno", "Advogado Sênior",
  "Sócio", "Promotor", "Juiz", "Desembargador", "Ministro do STF",
];

export function rankOf(xp: number) {
  const idx = Math.min(RANKS.length - 1, Math.floor(xp / 500));
  return { name: RANKS[idx]!, progress: idx === RANKS.length - 1 ? 1 : (xp % 500) / 500, next: RANKS[idx + 1] };
}
