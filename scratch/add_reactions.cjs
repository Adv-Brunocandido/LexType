const fs = require("fs");

const path = "c:\\FOLDER APPS\\LexType\\src\\lib\\professor.ts";
let content = fs.readFileSync(path, "utf-8");

const newLines = {
  start: [
    '"Vista o terno da concentração. Hoje a pauta está cheia e não temos tempo para lentidão."',
    '"Já separei a jurisprudência para quem digita olhando para o teclado: é sempre desfavorável."',
    '"O escrivão está aguardando as notas taquigráficas. Mostre que seus dedos são mais rápidos que a voz."',
    '"Lembre-se: cada tecla errada é um embargo de declaração que você vai ter que responder. Comece!"',
  ],
  error: [
    '"Errou o \\"{k}\\"? Cuidado, esse erro material pode mudar o sentido da cláusula penal!"',
    '"\\" {k} \\"? Mais atenção, doutor! O juízo não é obrigado a aceitar aditamento à petição inicial toda hora."',
    '"Isso foi um erro de digitação ou você está tentando inovar no ordenamento jurídico?"',
    '"Você digitou \\"{k}\\"? Até um sistema legar dos anos 90 sabe que isso não faz sentido."',
    '"Se o erro no \\"{k}\\" fosse crime, a tipicidade seria indiscutível e a materialidade está na tela."',
    '"Com um erro no \\"{k}\\" desse, a parte contrária vai pedir litigância de má-fé por embaraço processual."',
  ],
  errorStreak: [
    '"Que sequencia de erros! Você está tentando psicografar a petição ou o quê?"',
    '"Isso é uma confissão ficta de que você não treinou o suficiente. Pare, respire e foque!"',
    '"Três erros consecutivos! O CNJ vai abrir uma sindicância para apurar essa digitação."',
    '"Pare de bater no teclado como se fosse um martelo de juiz! Suavidade e precisão, por favor!"',
  ],
  combo: [
    '"{n} teclas! Está fluindo como uma liminar deferida inaudita altera pars."',
    '"{n} seguidas! Parece até que contratou um parecerista de peso para redigir por você."',
    '"Combo de {n}. Se continuar assim vou ter que pedir vistas para não me sentir humilhado."',
    '"{n}! O ritmo está tão bom que já podemos despachar com o presidente do tribunal."',
  ],
  finishBad: [
    '"Essa performance pede uma suspensão condicional do processo de aprendizagem. Foque e repita!"',
    '"Inépcia da inicial! Com essa taxa de acertos, melhor pedir para o estagiário digitar."',
    '"O tribunal indeferiu seu pleito de velocidade por manifesta falta de precisão. Tente de novo."',
  ],
  finishOk: [
    '"Desempenho admitido em parte. Mas ainda cabe muito embargo infringente aí."',
    '"Deferido com ressalvas. O laudo pericial apontou que seus dedos mindinhos ainda hesitam."',
    '"Despacho mero expediente. Nada brilhante, mas também não prejudicou o andamento do feito."',
  ],
  finishGreat: [
    '"Sustentação oral impecável! Os ministros acompanharam o relator à unanimidade. Parabéns!"',
    '"Velocidade de liminar em plantão e precisão de doutrinador clássico. Excelente trabalho!"',
    '"Você não digitou, você prolatou uma obra-prima. Pode arquivar com trânsito em julgado."',
  ],
  levelUp: [
    '"Promoção por merecimento! A vara assumida agora tem processos bem mais espinhosos. Preparado?"',
    '"Novo nível! Agora não basta citar a lei, tem que dominar a súmula vinculante dos teclados."',
  ],
  levelDown: [
    '"Rebaixamento administrativo. Volte para a vara do juizado especial para treinar a base."',
    '"Agravo não conhecido. Descemos um grau de jurisdição para não ferir a ampla defesa dos seus dedos."',
  ],
};

Object.keys(newLines).forEach((key) => {
  const insertStr = newLines[key].join(",\n    ") + ",";
  // Encontra a lista e injeta no início
  const regex = new RegExp(`(${key}:\\s*\\[)`);
  content = content.replace(regex, `$1\n    ${insertStr}`);
});

fs.writeFileSync(path, content, "utf-8");
console.log("Done modifying professor.ts");
