import type { StudyItem } from "./study.functions";

// Mega-Banco Offline Consolidado: Viradas de chave de alta densidade e acerto na 1ª fase da OAB (FGV).
// Cobre as 20 matérias com foco em súmulas do STF/STJ, temas repetitivos e letra da lei.
export const BANK: { area: string; item: StudyItem }[] = [
  {
    area: "ética",
    linha: "a advocacia pro bono veda a captação de clientela ou cobrança futura",
    termo: "advocacia pro bono",
    semantica:
      "Prestação gratuita, eventual e voluntária de serviços jurídicos a pessoas físicas sem recursos ou entidades sem fins lucrativos (art. 30 do CED).",
    virada: {
      titulo: "Vedação à captação em pro bono",
      raciocinio:
        "O advogado pro bono não pode prestar serviços remunerados para a mesma entidade ou beneficiário no período de 3 anos, nem vincular a gratuidade à captação de clientes.",
      exemplo:
        "Advogado atende gratuitamente sindicato em litígio coletivo e depois oferece assessoria trabalhista privada aos sindicalizados: infração ética direta.",
    },
  },
  {
    area: "ética",
    linha: "os honorários sucumbenciais pertencem ao advogado e têm caráter alimentar",
    termo: "honorários sucumbenciais",
    semantica:
      "Verba fixada na sentença judicial devida pela parte vencida ao patrono da parte vencedora (art. 85 do CPC e art. 23 do EAOAB).",
    virada: {
      titulo: "Autonomia dos honorários sucumbenciais",
      raciocinio:
        "A transação ou acordo celebrado entre as partes sem anuência do advogado não pode dispensar nem renunciar aos honorários sucumbenciais (Súmula Vinculante 47 e art. 24, §4º do EAOAB).",
      exemplo:
        "Autor e réu fazem acordo extrajudicial e declaram quitação geral mútua; o advogado do autor segue com direito autônomo de executar a sucumbência fixada.",
    },
  },
  {
    area: "ética",
    linha: "o advogado detém imunidade por injúria e difamação em juízo",
    termo: "imunidade profissional",
    semantica:
      "Garantia legal que assegura inviolabilidade por atos e manifestações no exercício da profissão (art. 7º, §2º do EAOAB).",
    virada: {
      titulo: "Limites da imunidade penal",
      raciocinio:
        "A imunidade profissional cobre apenas injúria e difamação praticadas em debate judicial ou na profissão. Jamais cobre desacato ou calúnia (ADI 1.127 do STF).",
      exemplo:
        "Em contestação acalorada, o advogado imputa falsamente crime de corrupção ao magistrado: responde pelo crime de calúnia sem qualquer imunidade.",
    },
  },
  {
    area: "ética",
    linha: "a incompatibilidade proíbe o exercício total e o impedimento o parcial",
    termo: "incompatibilidade x impedimento",
    semantica:
      "Limitações ao exercício da advocacia previstas nos arts. 28 e 30 do Estatuto da Advocacia.",
    virada: {
      titulo: "Distinção entre art. 28 e 30",
      raciocinio:
        "Incompatibilidade gera proibição total de advogar (ex: policial, juiz, gerente de banco). Impedimento gera vedação apenas contra o órgão que o remunera (servidor público em geral).",
      exemplo:
        "Analista administrativo do TJ não pode advogar contra a Fazenda Pública Estadual, mas pode advogar em varas de família contra particulares.",
    },
  },
  {
    area: "ética",
    linha: "a prisão de advogado antes do trânsito exige sala de estado maior",
    termo: "sala de estado maior",
    semantica:
      "Prerrogativa profissional consistente em dependência com instalações condignas sem grades nem celas comuns (art. 7º, IV do EAOAB).",
    virada: {
      titulo: "Prisão cautelar de advogado",
      raciocinio:
        "Antes do trânsito em julgado da condenação, o advogado tem direito a sala de estado maior. Na sua falta comprovada, a conversão em prisão domiciliar é imperativa.",
      exemplo:
        "Advogado preso preventivamente é colocado em cela separada no presídio comum com grade: cabe habeas corpus para imediata remoção para domiciliar.",
    },
  },
  {
    area: "ética",
    linha: "a publicidade na advocacia é meramente informativa e sem mercantilização",
    termo: "publicidade sóbria",
    semantica:
      "Diretrizes de comunicação profissional estabelecidas no Código de Ética e no Provimento 205/2021 da OAB.",
    virada: {
      titulo: "Marketing jurídico permitido",
      raciocinio:
        "É lícito o impulsionamento de posts informativos nas redes sociais, mas são expressamente proibidos anúncios em rádio, TV, cinema ou outdoors, bem como promessas de resultado.",
      exemplo:
        "Escritório coloca placa em outdoor anunciando 'especialistas em aposentadoria rápida': comete infração disciplinar passível de censura.",
    },
  },
  {
    area: "ética",
    linha: "a retenção abusiva de autos por advogado enseja suspensão disciplinar",
    termo: "retenção de autos",
    semantica:
      "Retenção indevida de processo físico ou recusa em devolver autos com prazo excedido (art. 34, XXII do EAOAB).",
    virada: {
      titulo: "Sanção da retenção de autos",
      raciocinio:
        "Após formalmente intimado para devolver os autos em cartório e não o fazendo, o advogado comete infração sujeita a sanção disciplinar de suspensão, e não mera censura.",
      exemplo:
        "Advogado mantém autos por 6 meses para forçar adiamento de audiência e ignora mandado de busca e apreensão: é suspenso preventivamente pelo Tribunal de Ética.",
    },
  },
  {
    area: "ética",
    linha: "o prazo prescricional da ação de cobrança de honorários é de cinco anos",
    termo: "prescrição de honorários",
    semantica:
      "Prazo para pretensão de cobrança judicial de honorários convencionados ou arbitrados (art. 25 do EAOAB).",
    virada: {
      titulo: "Termo inicial da cobrança",
      raciocinio:
        "O prazo de 5 anos conta do vencimento do contrato, do trânsito em julgado da decisão que os fixar, ou da revogação do mandato.",
      exemplo:
        "Cliente revoga a procuração unilateralmente: os 5 anos para cobrar o trabalho proporcional correm da data da notificação da revogação.",
    },
  },
  {
    area: "ética",
    linha: "o cancelamento da inscrição extingue o registro e exige novo exame",
    termo: "cancelamento x licenciamento",
    semantica:
      "Cessação definitiva ou temporária do exercício da advocacia (arts. 11 e 12 do EAOAB).",
    virada: {
      titulo: "Novo exame no cancelamento",
      raciocinio:
        "O licenciamento é temporário (ex: doença, cargo transitório incompatível). O cancelamento é definitivo: caso o ex-advogado queira retornar por ter sido expulso ou sofrer exclusão, deve requerer reabilitação.",
      exemplo:
        "Advogado toma posse em cargo efetivo de juiz: sua inscrição na OAB é cancelada, e não apenas licenciada.",
    },
  },
  {
    area: "ética",
    linha: "o sigilo profissional do advogado é direito e dever de ordem pública",
    termo: "sigilo profissional",
    semantica:
      "Dever ético de confidencialidade sobre fatos confiados pelo cliente (art. 7º, XIX do EAOAB e arts. 35 a 38 do CED).",
    virada: {
      titulo: "Inviolabilidade e depoimento como testemunha",
      raciocinio:
        "O advogado tem o dever de recusar-se a depor como testemunha sobre fatos de que teve conhecimento no exercício da profissão, mesmo que autorizado pelo constituinte.",
      exemplo:
        "Juiz intima advogado para depor sobre confissão sigilosa de cliente em ação penal: o advogado tem o dever ético legal de manter silêncio.",
    },
  },
  {
    area: "constitucional",
    linha: "a ação direta de inconstitucionalidade não admite intervenção de terceiros",
    termo: "amigo da corte",
    semantica:
      "Órgão ou entidade que intervém no processo de controle abstrato para prestar subsídios técnicos (art. 7º da Lei 9.868/99).",
    virada: {
      titulo: "Terceiros no controle concentrado",
      raciocinio:
        "Em ADI não cabe assistência, oposição ou litisconsórcio. Apenas é admitida a figura do amicus curiae por decisão irrecorrível do relator.",
      exemplo:
        "Associação comercial requer ingresso como assistente simples do Procurador-Geral da República em ADI: pedido é liminarmente indeferido.",
    },
  },
  {
    area: "constitucional",
    linha: "o mandado de segurança possui prazo decadencial de cento e vinte dias",
    termo: "decadência no ms",
    semantica:
      "Extinção do direito de requerer mandado de segurança pela inércia temporal (art. 23 da Lei 12.016/2009).",
    virada: {
      titulo: "Prazo decadencial improrrogável",
      raciocinio:
        "O prazo de 120 dias é de decadência material: conta-se em dias corridos da ciência do ato e não se suspende nem se interrompe por pedido de reconsideração administrativa.",
      exemplo:
        "Servidor protocola pedido de reconsideração no 100º dia e impetra MS no 130º dia: o mandado é extinto pela decadência (Súmula 430 do STF).",
    },
  },
  {
    area: "constitucional",
    linha: "a cláusula de reserva de plenário veda decisão por órgão fracionário",
    termo: "reserva de plenário",
    semantica:
      "Regra do art. 97 da CF segundo a qual apenas a maioria absoluta do plenário ou órgão especial do tribunal pode declarar inconstitucionalidade de lei.",
    virada: {
      titulo: "Súmula Vinculante 10",
      raciocinio:
        "Viola a cláusula de reserva de plenário a decisão de câmara ou turma que, embora não declare expressamente a inconstitucionalidade, afasta a incidência de lei no caso concreto.",
      exemplo:
        "Câmara cível de TJ deixa de aplicar artigo de lei por considerá-lo incompatível com a CF sem remeter ao Órgão Especial: decisão nula por violar a SV 10.",
    },
  },
  {
    area: "constitucional",
    linha: "a ação popular é isenta de custas salvo comprovada má-fé do autor",
    termo: "ação popular",
    semantica:
      "Remédio constitucional destinado a anular ato lesivo ao patrimônio público, moralidade, meio ambiente ou patrimônio histórico (art. 5º, LXXIII da CF).",
    virada: {
      titulo: "Gratuidade da ação popular",
      raciocinio:
        "O cidadão autor da ação popular não paga custas judiciais nem sucumbência, exceto se comprovada má-fé no ajuizamento temeroso.",
      exemplo:
        "Cidadão perde ação popular contra prefeito: o juiz não pode condená-lo em honorários de sucumbência se não houver prova de má-fé.",
    },
  },
  {
    area: "constitucional",
    linha: "a comissão parlamentar de inquérito não pode decretar prisão preventiva",
    termo: "poderes de cpi",
    semantica: "Poderes instrutórios conferidos a comissões parlamentares no art. 58, §3º da CF.",
    virada: {
      titulo: "Reserva de jurisdição na CPI",
      raciocinio:
        "CPI tem poderes instrutórios de juiz para quebra de sigilo fiscal, bancário e telefônico, mas não pode ordenar interceptação telefônica (escuta), busca domiciliar nem prisão cautelar.",
      exemplo:
        "CPI determina prisão preventiva de investigado por risco de fuga: ordem manifestamente nula, passível de trancamento imediato por habeas corpus no STF.",
    },
  },
  {
    area: "constitucional",
    linha: "o habeas corpus e o habeas data são gratuitos na ordem constitucional",
    termo: "remédios gratuitos",
    semantica:
      "Ações constitucionais com isenção ampla de emolumentos e taxas judiciárias garantidas pelo art. 5º, LXXVII da CF.",
    virada: {
      titulo: "Gratuidade constitucional",
      raciocinio:
        "Habeas Corpus e Habeas Data são gratuitos por expressa previsão constitucional, independente de o impetrante demonstrar pobreza ou hipossuficiência.",
      exemplo:
        "Tribunal exige recolhimento de preparo recursal para apelação em Habeas Data: exigência inconstitucional que ofende o art. 5º, LXXVII.",
    },
  },
  {
    area: "constitucional",
    linha: "os legitimados especiais na ação direta devem provar pertinência temática",
    termo: "pertinência temática",
    semantica:
      "Exigência de vínculo direto entre o objeto da norma impugnada e os interesses corporativos do autor (art. 103 da CF).",
    virada: {
      titulo: "Legitimados universais vs especiais",
      raciocinio:
        "Governador de Estado, Mesa de Assembleia Legislativa e confederação sindical/entidade de classe nacional são legitimados especiais e devem provar pertinência temática no STF.",
      exemplo:
        "Governador do RJ ajuíza ADI contra lei que regulamenta tributo municipal no Acre: ação extinta sem resolução de mérito por falta de pertinência temática.",
    },
  },
  {
    area: "constitucional",
    linha: "a medida cautelar concedida em ação direta opera efeitos prospectivos",
    termo: "cautelar em adi",
    semantica:
      "Regime de eficácia temporal das decisões liminares em controle abstrato (art. 11, §1º da Lei 9.868/99).",
    virada: {
      titulo: "Eficácia ex nunc da cautelar",
      raciocinio:
        "A liminar em ADI opera efeitos ex nunc (para frente) e restaura a eficácia das leis anteriores que haviam sido revogadas (efeito repristinatório), salvo decisão expressa em contrário.",
      exemplo:
        "STF concede liminar contra lei estadual que aumentou ICMS: a cobrança fica suspensa a partir da publicação da liminar, não gerando devolução retroativa imediata.",
    },
  },
  {
    area: "processual civil",
    linha: "o agravo de instrumento possui taxatividade mitigada em caso de urgência",
    termo: "taxatividade mitigada",
    semantica:
      "Tese fixada pelo STJ no Tema 988 dos Recursos Repetitivos sobre o rol do art. 1.015 do CPC.",
    virada: {
      titulo: "Tema 988 do STJ",
      raciocinio:
        "O rol do art. 1.015 é de taxatividade mitigada: cabe agravo de instrumento fora das hipóteses legais quando demonstrada urgência decorrente da inutilidade do julgamento na apelação.",
      exemplo:
        "Decisão interlocutória rejeita segredo de justiça ou competência territorial: o agravo é cabível de imediato porque esperar a apelação tornaria o prejuízo irreversível.",
    },
  },
  {
    area: "processual civil",
    linha: "o julgamento antecipado parcial de mérito desafia agravo de instrumento",
    termo: "decisão parcial de mérito",
    semantica:
      "Pronunciamento judicial que julga definitivamente parte dos pedidos incontroversos ou maduros (art. 356 do CPC).",
    virada: {
      titulo: "Recurso no julgamento parcial",
      raciocinio:
        "A decisão que resolve parte do mérito é interlocutória e não extingue o processo: o recurso cabível é o agravo de instrumento, jamais a apelação.",
      exemplo:
        "Advogado interpõe apelação contra decisão que julgou antecipadamente um dos três pedidos cumulados: o recurso não é conhecido por erro grosseiro sem fungibilidade.",
    },
  },
  {
    area: "processual civil",
    linha: "os embargos de declaração interrompem o prazo para os demais recursos",
    termo: "interrupção recursal",
    semantica:
      "Efeito do art. 1.026 do CPC que zera e reinicia integralmente a contagem de prazo para os outros recursos cabíveis.",
    virada: {
      titulo: "Interrupção, não suspensão",
      raciocinio:
        "Os embargos de declaração interrompem o prazo recursal: ele recomeça do zero para ambas as partes após a intimação da decisão dos embargos.",
      exemplo:
        "No 10º dia do prazo da apelação, a parte opõe embargos de declaração: após julgados os embargos, o prazo de apelação recomeça do primeiro dia inteiro (15 dias úteis).",
    },
  },
  {
    area: "processual civil",
    linha: "a gratuidade da justiça opera efeitos ex nunc e não retroage",
    termo: "efeitos da gratuidade",
    semantica:
      "Regime temporal da concessão do benefício da assistência judiciária gratuita no CPC (art. 99).",
    virada: {
      titulo: "Não retroatividade da justiça gratuita",
      raciocinio:
        "O deferimento de gratuidade tem eficácia prospectiva (ex nunc): não isenta a parte de arcar com custas preexistentes ou sucumbência fixada em fase anterior.",
      exemplo:
        "Parte obtém justiça gratuita no tribunal ao interpor apelação: a concessão não cancela as custas iniciais e honorários de fases anteriores pendentes.",
    },
  },
  {
    area: "processual civil",
    linha: "o cumprimento de sentença impõe multa de dez por cento se não pago no prazo",
    termo: "multa do art. 523",
    semantica:
      "Penalidade legal pelo não pagamento voluntário da condenação líquida em 15 dias úteis (art. 523, §1º do CPC).",
    virada: {
      titulo: "Multa e honorários da fase de cumprimento",
      raciocinio:
        "Decorrido o prazo de 15 dias sem pagamento voluntário, incidem automaticamente 10% de multa e mais 10% de honorários advocatícios sobre o débito exequendo.",
      exemplo:
        "Devedor oferece bens à penhora no 15º dia em vez de depositar o dinheiro: incidem a multa de 10% e honorários de 10%, pois penhora não é pagamento voluntário.",
    },
  },
  {
    area: "processual civil",
    linha: "a ação rescisória não suspende a execução da sentença rescindenda",
    termo: "ação rescisória",
    semantica:
      "Ação autônoma de impugnação para desconstituir decisão com trânsito em julgado (arts. 966 e 969 do CPC).",
    virada: {
      titulo: "Ausência de efeito suspensivo automático",
      raciocinio:
        "A propositura de ação rescisória não suspende a eficácia da decisão rescindenda, salvo concessão expressa de tutela provisória de urgência pelo relator.",
      exemplo:
        "Executado requer que o juiz de 1º grau suspenda o leilão porque ajuizou ação rescisória no tribunal: pedido é indeferido, pois o ajuizamento não obsta o cumprimento.",
    },
  },
  {
    area: "civil",
    linha: "a desconsideração da personalidade jurídica no código civil adota a teoria maior",
    termo: "teoria maior",
    semantica:
      "Requisitos estritos do art. 50 do Código Civil para afastar episodicamente a autonomia patrimonial da pessoa jurídica.",
    virada: {
      titulo: "Teoria maior x teoria menor",
      raciocinio:
        "No Código Civil (art. 50) exige-se prova de desvio de finalidade ou confusão patrimonial. No CDC (art. 28, §5º) basta o mero inadimplemento (teoria menor).",
      exemplo:
        "Em execução cível contratual, credor pede desconsideração apenas porque a empresa não tem saldo bancário: pedido é indeferido pela falta de prova de abuso.",
    },
  },
  {
    area: "civil",
    linha: "a obrigação de prestar alimentos é irrepetível e incompensável",
    termo: "irrepetibilidade dos alimentos",
    semantica:
      "Princípio protetivo da subsistência humana que veda devolução de valores alimentares pagos indevidamente (art. 1.707 do CC).",
    virada: {
      titulo: "Irrepetibilidade alimentar",
      raciocinio:
        "Mesmo que ação de exoneração julgue procedente o pedido ou que exame de DNA prove ausência de paternidade, o alimentante não tem direito a ressarcimento dos alimentos pagos.",
      exemplo:
        "Pai paga alimentos por 5 anos e descobre que não é o pai biológico: não pode exigir da criança nem da mãe a devolução das parcelas já consumidas.",
    },
  },
  {
    area: "civil",
    linha: "os juros de mora fluem do evento danoso na responsabilidade extracontratual",
    termo: "juros extracontratuais",
    semantica:
      "Termo inicial da mora em ilícitos civis extracontratuais segundo a Súmula 54 do STJ e art. 398 do CC.",
    virada: {
      titulo: "Súmula 54 do STJ",
      raciocinio:
        "Na responsabilidade extracontratual, os juros de mora fluem a partir do evento danoso. Já no dano contratual, fluem a partir da citação (art. 405 do CC).",
      exemplo:
        "Vítima de atropelamento ajuíza ação após 2 anos: os juros de mora sobre os danos materiais e estéticos retroagem ao dia exato do atropelamento.",
    },
  },
  {
    area: "civil",
    linha: "a correção monetária do dano moral incide desde a data do arbitramento",
    termo: "correção do dano moral",
    semantica:
      "Momento a partir do qual a indenização por abalo moral é monetariamente atualizada (Súmula 362 do STJ).",
    virada: {
      titulo: "Súmula 362 do STJ",
      raciocinio:
        "A correção monetária do valor da indenização do dano moral incide desde a data da sentença ou acórdão que a arbitrar, e não do ajuizamento da petição inicial.",
      exemplo:
        "Sentença fixa R$ 20.000 de dano moral: a atualização monetária conta da data da publicação da sentença, mas os juros de mora correm do evento (Súmula 54).",
    },
  },
  {
    area: "civil",
    linha: "a prescrição atinge a pretensão e a decadência extingue o próprio direito",
    termo: "prescrição x decadência",
    semantica:
      "Conceitos fundamentais de perecimento temporal de direitos nos arts. 189 a 211 do Código Civil.",
    virada: {
      titulo: "Critério de Agnelo Amorim",
      raciocinio:
        "Ações condenatórias estão sujeitas à prescrição (atinge a pretensão). Ações constitutivas sujeitam-se à decadência. Ações puramente declaratórias são perpétuas/imprescritíveis.",
      exemplo:
        "Ação anulatória de negócio jurídico por erro ou coação é constitutiva: sujeita-se a prazo decadencial de 4 anos (art. 178 do CC), que não se interrompe.",
    },
  },
  {
    area: "civil",
    linha: "o cônjuge concorre com descendentes conforme o regime de bens do casamento",
    termo: "sucessão do cônjuge",
    semantica:
      "Ordem de vocação hereditária do cônjuge sobrevivente (art. 1.829, I do Código Civil).",
    virada: {
      titulo: "Art. 1.829, I do CC",
      raciocinio:
        "O cônjuge sobrevivente concorre com os descendentes na comunhão parcial apenas sobre os bens particulares do falecido. Não concorre se for comunhão universal ou separação obrigatória.",
      exemplo:
        "Marido falece deixando bens adquiridos antes do casamento sob comunhão parcial: a viúva é herdeira concorrente com os filhos sobre esses bens particulares.",
    },
  },
  {
    area: "penal",
    linha: "a atenuante na segunda fase não pode conduzir a pena aquém do mínimo legal",
    termo: "súmula 231 stj",
    semantica:
      "Baliza consolidada da dosimetria da pena no sistema trifásico (art. 68 do Código Penal).",
    virada: {
      titulo: "Súmula 231 do STJ",
      raciocinio:
        "Na segunda fase da dosimetria, atenuantes genéricas (como confissão espontânea ou menoridade relativa) não podem reduzir a pena aquém do mínimo cominado em abstrato.",
      exemplo:
        "Réu confessa furto simples cuja pena mínima é 1 ano: a pena-base fixada no mínimo não pode sofrer redução para 8 meses na segunda fase.",
    },
  },
  {
    area: "penal",
    linha:
      "na desistência voluntária e no arrependimento eficaz o agente responde pelos atos praticados",
    termo: "tentativa abandonada",
    semantica:
      "Institutos do art. 15 do Código Penal que excluem a tipicidade da tentativa original.",
    virada: {
      titulo: "Ponte de ouro (art. 15 CP)",
      raciocinio:
        "Quem desiste voluntariamente de prosseguir na execução ou impede eficazmente o resultado não responde por tentativa do crime pretendido, apenas pelos atos já consumados.",
      exemplo:
        "Agente atira na vítima para matar mas desiste e a socorre para o hospital evitando a morte: não responde por tentativa de homicídio, apenas por lesão corporal culposa/dolosa.",
    },
  },
  {
    area: "penal",
    linha: "o arrependimento posterior exige crime sem violência ou grave ameaça à pessoa",
    termo: "arrependimento posterior",
    semantica:
      "Causa de diminuição de pena prevista no art. 16 do Código Penal para reparação do dano.",
    virada: {
      titulo: "Requisitos do art. 16 do CP",
      raciocinio:
        "Exige 4 requisitos cumulativos: crime sem violência ou grave ameaça, reparação integral da coisa por ato voluntário e realizada antes do recebimento da denúncia ou queixa.",
      exemplo:
        "Autor de estelionato devolve todo o dinheiro à vítima antes da denúncia: tem direito subjetivo à redução de um a dois terços da pena.",
    },
  },
  {
    area: "penal",
    linha: "o erro de tipo exclui o dolo e o erro de proibição isenta de pena se inevitável",
    termo: "erro de tipo x erro de proibição",
    semantica: "Consequências jurídicas dos erros previstos nos arts. 20 e 21 do Código Penal.",
    virada: {
      titulo: "Dolo x Culpabilidade",
      raciocinio:
        "Erro de tipo incide sobre elementos do fato (exclui o dolo, permitindo punição culposa se prevista). Erro de proibição incide sobre a ilicitude da conduta (isenta a pena por inexigibilidade de consciência).",
      exemplo:
        "Caçador atira em arbusto acreditando ser animal e atinge homem: erro de tipo essencial (exclui dolo de matar, responde por homicídio culposo).",
    },
  },
  {
    area: "penal",
    linha: "o princípio da insignificância é inaplicável aos crimes de violência doméstica",
    termo: "súmula 589 stj",
    semantica:
      "Jurisprudência pacificada nos crimes cometidos contra a mulher no âmbito doméstico e familiar.",
    virada: {
      titulo: "Súmula 589 do STJ",
      raciocinio:
        "É inaplicável o princípio da insignificância aos crimes e contravenções penais praticados com violência ou grave ameaça contra a mulher no ambiente doméstico.",
      exemplo:
        "Marido empurra a esposa causando arranhão leve e alega bagatela penal: a tese é sumariamente rejeitada com base na Súmula 589.",
    },
  },
  {
    area: "processual penal",
    linha: "no processo penal a contagem recursal flui da intimação e não da juntada",
    termo: "súmula 710 stf",
    semantica: "Regra temporal estrita da contagem de prazos recursais penais (art. 798 do CPP).",
    virada: {
      titulo: "Súmula 710 do STF",
      raciocinio:
        "No processo penal, o prazo recursal conta da data da intimação pessoal ou publicação, e jamais da juntada aos autos do mandado ou carta precatória.",
      exemplo:
        "Advogado aguarda a certidão de juntada do mandado de intimação para apelar no 5º dia: apelação intempestiva porque o prazo correu da intimação física.",
    },
  },
  {
    area: "processual penal",
    linha: "o juiz não pode decretar prisão preventiva de ofício em nenhuma fase",
    termo: "vedação de prisão de ofício",
    semantica:
      "Consagração do sistema acusatório promovida pelo Pacote Anticrime (art. 311 do CPP).",
    virada: {
      titulo: "Sistema acusatório no CPP",
      raciocinio:
        "Tanto na fase investigativa quanto na instrução processual, a decretação de prisão preventiva depende obrigatoriamente de requerimento do MP ou representação da autoridade policial.",
      exemplo:
        "Durante audiência, réu ameaça testemunha e o juiz decreta a preventiva espontaneamente sem pedido do promotor: ato ilegal que gera concessão de habeas corpus.",
    },
  },
  {
    area: "processual penal",
    linha: "o delegado de polícia não pode mandar arquivar autos de inquérito policial",
    termo: "indisponibilidade do inquérito",
    semantica:
      "Princípio da indisponibilidade processual atribuído à autoridade policial no art. 17 do CPP.",
    virada: {
      titulo: "Art. 17 do CPP",
      raciocinio:
        "A autoridade policial não tem competência para determinar o arquivamento de inquérito, ainda que convença-se da atipicidade manifesta do fato.",
      exemplo:
        "Delegado encerra inquérito e despacha determinando seu arquivamento direto na delegacia: ato nulo, os autos devem ser remetidos ao juízo/MP.",
    },
  },
  {
    area: "processual penal",
    linha: "a ampla defesa assegura acesso aos elementos já documentados em inquérito",
    termo: "súmula vinculante 14",
    semantica:
      "Prerrogativa do defensor de consultar autos investigativos perante a autoridade policial.",
    virada: {
      titulo: "Súmula Vinculante 14 do STF",
      raciocinio:
        "É direito do defensor ter acesso amplo aos elementos de prova que já estiverem documentados e juntados aos autos. Diligências em andamento podem permanecer sob sigilo.",
      exemplo:
        "Delegado nega ao advogado acesso ao relatório de interceptações telefônicas já encerradas: viola a SV 14 e autoriza reclamação constitucional no STF.",
    },
  },
  {
    area: "processual penal",
    linha: "a nulidade no processo penal exige demonstração de efetivo prejuízo",
    termo: "pas de nullité sans grief",
    semantica:
      "Princípio do prejuízo processual estipulado no art. 563 do Código de Processo Penal.",
    virada: {
      titulo: "Art. 563 do CPP",
      raciocinio:
        "Nenhum ato será declarado nulo se da nulidade não tiver resultado prejuízo para a acusação ou para a defesa (mesmo em nulidades absolutas o STF exige demonstração de prejuízo).",
      exemplo:
        "Inversão na ordem de inquirição de testemunha sem que haja qualquer prejuízo prático à defesa não anula a instrução processual.",
    },
  },
  {
    area: "trabalho",
    linha: "a prescrição trabalhista impõe limite bienal e marco quinquenal do ajuizamento",
    termo: "prescrição bienal e quinquenal",
    semantica:
      "Regime constitucional da prescrição trabalhista no art. 7º, XXIX da CF e art. 11 da CLT.",
    virada: {
      titulo: "Marco do ajuizamento",
      raciocinio:
        "O empregado tem 2 anos após a rescisão para ajuizar a ação, mas a prescrição quinquenal retroage 5 anos a contar da data da petição inicial, e não da data da demissão.",
      exemplo:
        "Trabalhador espera 1 ano e 11 meses para ajuizar ação: a ação é tempestiva, mas ele perdeu quase 2 anos de créditos anteriores em razão do marco do ajuizamento.",
    },
  },
  {
    area: "trabalho",
    linha: "a mera identidade de sócios não caracteriza grupo econômico trabalhista",
    termo: "grupo econômico",
    semantica:
      "Requisitos de responsabilização solidária empresarial introduzidos no art. 2º, §3º da CLT pela Reforma Trabalhista.",
    virada: {
      titulo: "Art. 2º, §3º da CLT",
      raciocinio:
        "Não caracteriza grupo econômico a mera identidade de sócios: exige-se demonstração de interesse integrado, comunhão de interesses e atuação conjunta das empresas.",
      exemplo:
        "Reclamante pede inclusão de segunda empresa só porque ela tem um sócio em comum com a devedora: pedido indeferido sem prova de coordenação interempresarial.",
    },
  },
  {
    area: "trabalho",
    linha: "o tempo de deslocamento até o local de trabalho não gera horas in itinere",
    termo: "horas in itinere",
    semantica:
      "Alteração da CLT pelo art. 58, §2º que afastou o cômputo do tempo de transporte como jornada.",
    virada: {
      titulo: "Extinção das horas in itinere",
      raciocinio:
        "O tempo despendido pelo empregado até o local de trabalho e para o seu retorno, por qualquer meio de transporte (mesmo fornecido pelo empregador), não é computado na jornada.",
      exemplo:
        "Empregado viaja 2 horas em ônibus fretado da mineradora até mina de difícil acesso: não tem direito a horas extras de deslocamento.",
    },
  },
  {
    area: "trabalho",
    linha: "a terceirização é lícita em qualquer atividade com responsabilidade subsidiária",
    termo: "terceirização ampla",
    semantica: "Tese vinculante fixada pelo STF no Tema 725 da repercussão geral.",
    virada: {
      titulo: "Tema 725 do STF",
      raciocinio:
        "É lícita a terceirização de qualquer atividade da empresa tomadora, seja meio ou fim. A tomadora responde de forma subsidiária pelo inadimplemento trabalhista.",
      exemplo:
        "Banco terceiriza operadores de caixa e gerentes: não gera vínculo direto com o banco, remanescendo apenas responsabilidade subsidiária da instituição financeira.",
    },
  },
  {
    area: "trabalho",
    linha: "o intervalo intrajornada suprimido gera pagamento apenas do período faltante",
    termo: "intervalo intrajornada",
    semantica:
      "Regime indenizatório do descanso para refeição após a Reforma Trabalhista (art. 71, §4º da CLT).",
    virada: {
      titulo: "Natureza indenizatória e proporcional",
      raciocinio:
        "A não concessão ou concessão parcial do intervalo mínimo implica o pagamento, de natureza indenizatória, apenas do período suprimido, com acréscimo de 50%, sem reflexos em outras verbas.",
      exemplo:
        "Empregado usufruiu 40 minutos de 1 hora de intervalo: recebe indenização de apenas 20 minutos com 50%, e não da hora cheia com reflexos.",
    },
  },
  {
    area: "processual do trabalho",
    linha: "o depósito recursal é inexigível de beneficiário da justiça gratuita",
    termo: "isenção de depósito",
    semantica: "Regra de acesso à justiça trabalhista positivada no art. 899, §10 da CLT.",
    virada: {
      titulo: "Art. 899, §10 da CLT",
      raciocinio:
        "São isentos do recolhimento de depósito recursal os beneficiários da justiça gratuita, as entidades filantrópicas e as empresas em recuperação judicial.",
      exemplo:
        "Empregador doméstico pessoa física obtém gratuidade de justiça: seu recurso ordinário não pode ser julgado deserto pela falta de depósito recursal.",
    },
  },
  {
    area: "processual do trabalho",
    linha: "o preposto presente na audiência trabalhista não precisa ser empregado",
    termo: "figura do preposto",
    semantica: "Representação patronal em juízo autorizada pelo art. 844, §1º da CLT.",
    virada: {
      titulo: "Preposto não empregado",
      raciocinio:
        "A Reforma Trabalhista superou a antiga Súmula 377 do TST: o preposto que comparece à audiência em nome da empresa não precisa ser empregado dela, bastando conhecimento dos fatos.",
      exemplo:
        "Juiz decreta revelia porque o preposto da ré é terceiro prestador de serviços e não funcionário com CTPS: decisão nula que viola o art. 844, §1º da CLT.",
    },
  },
  {
    area: "processual do trabalho",
    linha: "o jus postulandi das partes não alcança recurso ao tribunal superior",
    termo: "jus postulandi",
    semantica:
      "Capacidade postulatória direta do empregado e empregador na Justiça do Trabalho (art. 791 da CLT e Súmula 425 do TST).",
    virada: {
      titulo: "Súmula 425 do TST",
      raciocinio:
        "O jus postulandi limita-se às Varas do Trabalho e aos Tribunais Regionais do Trabalho. Não alcança Ação Rescisória, Mandado de Segurança nem recursos para o TST.",
      exemplo:
        "Empregado sem advogado interpõe recurso de revista perante o TST: o recurso não é conhecido por incapacidade postulatória.",
    },
  },
  {
    area: "processual do trabalho",
    linha: "a revelia do empregador não impede a produção de provas pelo advogado presente",
    termo: "revelia com patrono",
    semantica: "Garantia do contraditório prevista no art. 844, §5º da CLT.",
    virada: {
      titulo: "Art. 844, §5º da CLT",
      raciocinio:
        "Ainda que ausente o reclamado, presente o advogado na audiência, serão aceitas a contestação e os documentos eventualmente apresentados, podendo o causídico produzir provas.",
      exemplo:
        "Preposto atrasa no trânsito, mas advogado da ré está na sala de audiência com defesa anexada: o juiz é obrigado a receber a contestação e os documentos.",
    },
  },
  {
    area: "tributário",
    linha: "a entrega da declaração do contribuinte constitui o crédito tributário",
    termo: "súmula 436 stj",
    semantica:
      "Forma de constituição definitiva do crédito nos tributos sujeitos a lançamento por homologação.",
    virada: {
      titulo: "Súmula 436 do STJ",
      raciocinio:
        "A entrega de DCTF ou declaração formal pelo contribuinte confessa o débito e constitui o crédito, dispensando lançamento de ofício: a partir daí corre prescrição, não decadência.",
      exemplo:
        "Contribuinte alega decadência de imposto que ele próprio declarou e não recolheu há 6 anos: tese rejeitada, pois cabia apenas alegar prescrição.",
    },
  },
  {
    area: "tributário",
    linha: "a exceção de pré executividade cabe na execução fiscal sem dilação probatória",
    termo: "exceção de pré executividade",
    semantica: "Meio de defesa incidental sem garantia do juízo previsto na Súmula 393 do STJ.",
    virada: {
      titulo: "Súmula 393 do STJ",
      raciocinio:
        "A exceção de pré-executividade é admissível na execução fiscal relativamente às matérias de ordem pública que possam ser conhecidas de ofício e que não demandem dilação probatória.",
      exemplo:
        "Executado alega prescrição com base nas certidões da própria CDA: o juiz deve analisar o pedido sem exigir penhora de bens ou embargos à execução.",
    },
  },
  {
    area: "tributário",
    linha: "a dissolução irregular da sociedade presume responsabilidade do administrador",
    termo: "súmula 435 stj",
    semantica: "Redirecionamento da execução fiscal com base no art. 135, III do CTN.",
    virada: {
      titulo: "Súmula 435 do STJ",
      raciocinio:
        "Presume-se dissolvida irregularmente a empresa que deixa de funcionar no seu domicílio fiscal sem comunicação aos órgãos competentes, legitimando o redirecionamento ao sócio-gerente.",
      exemplo:
        "Oficial de justiça constata que a empresa fechou as portas e sumiu: a Fazenda tem direito automático de penhorar bens pessoais do administrador da época do fechamento.",
    },
  },
  {
    area: "tributário",
    linha: "o princípio da anterioridade nonagesimal não se aplica ao iof nem ao ii",
    termo: "exceções à anterioridade",
    semantica: "Exceções constitucionais aos prazos de espera tributária (art. 150, §1º da CF).",
    virada: {
      titulo: "Exceções à noventena",
      raciocinio:
        "Imposto de Importação (II), Imposto de Exportação (IE), Imposto sobre Operações Financeiras (IOF) e Imposto Extraordinário de Guerra entram em vigor imediatamente à publicação da lei.",
      exemplo:
        "Decreto aumenta alíquota do IOF em 1º de dezembro: pode ser cobrado no mesmo dia sem aguardar o ano seguinte nem a noventena de 90 dias.",
    },
  },
  {
    area: "administrativo",
    linha: "a lei de improbidade administrativa exige a demonstração inequívoca de dolo",
    termo: "improbidade dolosa",
    semantica:
      "Exigência de dolo específico introduzida pela Lei 14.230/2021 na Lei de Improbidade (art. 1º, §1º).",
    virada: {
      titulo: "Fim da improbidade culposa",
      raciocinio:
        "A Lei 14.230/21 revogou expressamente todos os tipos culposos de improbidade. Mesmo no art. 10 (dano ao erário), exige-se dolo comprovado; mera culpa grave é atípica.",
      exemplo:
        "Prefeito comete erro de gestão por negligência técnica e causa prejuízo ao cofre público: responde administrativamente, mas não por ato de improbidade.",
    },
  },
  {
    area: "administrativo",
    linha: "a autoexecutoriedade do poder de polícia não autoriza cobrança forçada de multa",
    termo: "cobrança de multa",
    semantica: "Limites dos atributos do ato administrativo e do poder de polícia sancionatório.",
    virada: {
      titulo: "Execução de multa administrativa",
      raciocinio:
        "O poder de polícia é autoexecutório para apreender bens e interditar estabelecimentos, mas não para cobrar multas: a cobrança de multa exige execução fiscal perante o Poder Judiciário.",
      exemplo:
        "Fiscal da vigilância interdita restaurante e tenta bloquear a conta do dono por conta própria: o bloqueio é nulo por violar a reserva de jurisdição executiva.",
    },
  },
  {
    area: "administrativo",
    linha:
      "o Estado responde objetivamente e tem direito de regresso condicionado ao dolo ou culpa",
    termo: "responsabilidade do estado",
    semantica: "Teoria do risco administrativo consagrada no art. 37, §6º da Constituição Federal.",
    virada: {
      titulo: "Ação de regresso contra servidor",
      raciocinio:
        "O particular ajuíza a ação diretamente contra a pessoa jurídica de direito público (Tema 940 STF). O Estado responde objetivamente, e só pode reaver do servidor se comprovar dolo ou culpa.",
      exemplo:
        "Vítima de acidente de viatura processa o policial diretamente em juízo: o policial é parte ilegítima, a ação deve ser movida contra o Estado.",
    },
  },
  {
    area: "administrativo",
    linha: "a nova lei de licitações extinguiu as modalidades convite e tomada de preços",
    termo: "modalidades na lei 14.133",
    semantica: "Estruturação das modalidades licitatórias no art. 28 da Lei 14.133/2021.",
    virada: {
      titulo: "Rol do art. 28 da Lei 14.133",
      raciocinio:
        "A Lei 14.133/21 extinguiu o convite e a tomada de preços, prevendo: pregão, concorrência, concurso, leilão e diálogo competitivo.",
      exemplo:
        "Município publica edital na modalidade 'convite' sob a égide da nova lei: a licitação padece de vício insanável de modalidade inexistente.",
    },
  },
  {
    area: "empresarial",
    linha: "o aval é obrigação cambial autônoma e independe da validade da obrigação principal",
    termo: "autonomia do aval",
    semantica:
      "Princípio cambial da autonomia e literalidade das garantias em títulos de crédito (art. 899 do CC).",
    virada: {
      titulo: "Aval x Fiança",
      raciocinio:
        "Diferente da fiança civil (que é acessória e se extingue com a nulidade da dívida), o aval é autônomo: o avalista continua obrigado mesmo se a assinatura do emitente for nula ou falsificada.",
      exemplo:
        "Em nota promissória com assinatura do devedor falsificada, o avalista idôneo que assinou o título continua obrigado a pagar o valor ao portador de boa-fé.",
    },
  },
  {
    area: "empresarial",
    linha: "a cessão fiduciária de recebíveis não se submete à recuperação judicial",
    termo: "trava bancária",
    semantica:
      "Exclusão concursal de créditos com garantia fiduciária (art. 49, §3º da Lei 11.101/2005).",
    virada: {
      titulo: "Trava bancária (art. 49, §3º)",
      raciocinio:
        "O credor titular de garantia fiduciária sobre recebíveis mercantis ou veículos não se sujeita aos efeitos da recuperação judicial, podendo reter os recursos diretamente.",
      exemplo:
        "Empresa em recuperação pede devolução de valores retidos pelo banco por trava bancária de duplicatas: o juízo da recuperação não pode liberar as travas fiduciárias.",
    },
  },
  {
    area: "empresarial",
    linha: "o endosso transmite o título e garante o pagamento e a cessão não garante solvência",
    termo: "endosso x cessão",
    semantica:
      "Mecanismos de circulação de crédito cambial e civil (arts. 914 do CC e Lei Uniforme de Genebra).",
    virada: {
      titulo: "Responsabilidade do endossante",
      raciocinio:
        "O endossante garante a existência do crédito e o pagamento pelo devedor (salvo cláusula sem garantia). O cedente civil responde apenas pela existência do crédito, mas não pela solvência do devedor.",
      exemplo:
        "Credor endossa cheque: se o emitente não pagar por falta de fundos, o portador pode executar diretamente o endossante.",
    },
  },
  {
    area: "consumidor",
    linha: "o prazo para reclamar de vício aparente é decadencial de trinta ou noventa dias",
    termo: "vício x fato do produto",
    semantica: "Dicotomia central do CDC entre defeitos de funcionamento e acidentes de consumo.",
    virada: {
      titulo: "Art. 26 x Art. 27 do CDC",
      raciocinio:
        "Vício intrínseco (o produto não funciona) gera decadência de 30 dias (não durável) ou 90 dias (durável). Acidente de consumo com dano à saúde gera prescrição quinquenal de 5 anos.",
      exemplo:
        "Micro-ondas não esquenta: vício aparente, prazo de 90 dias. Micro-ondas explode e queima o braço do consumidor: fato do produto, prazo de 5 anos.",
    },
  },
  {
    area: "consumidor",
    linha:
      "o comerciante responde subsidiariamente pelo fato do produto se o fabricante for identificado",
    termo: "responsabilidade do comerciante",
    semantica: "Regra do art. 13 do CDC sobre a cadeia de fornecedores no acidente de consumo.",
    virada: {
      titulo: "Art. 13 do CDC",
      raciocinio:
        "No fato do produto, a responsabilidade primária é do fabricante, produtor ou importador. O comerciante só responde solidariamente se o fabricante for anônimo ou se não conservar produtos perecíveis.",
      exemplo:
        "Celular com marca mundial famosa explode na mão do usuário: a ação indenizatória deve ser proposta contra o fabricante; a loja vendedora não é responsável primária.",
    },
  },
  {
    area: "consumidor",
    linha: "a repetição do indébito por cobrança indevida independe de prova de dolo ou culpa",
    termo: "devolução em dobro",
    semantica: "Tese fixada pelo STJ no EAREsp 600.666 sobre o art. 42, parágrafo único do CDC.",
    virada: {
      titulo: "Engano justificável no STJ",
      raciocinio:
        "A restituição em dobro do indébito no CDC independe da comprovação de má-fé ou dolo do fornecedor, bastando a conduta contrária à boa-fé objetiva; só se afasta com engano justificável.",
      exemplo:
        "Operadora de telefonia cobra taxa indevida por 2 anos: deve devolver em dobro todo o valor cobrado, salvo prova de erro escusável imprevisível.",
    },
  },
  {
    area: "criança",
    linha: "a internação de adolescente é restrita a hipóteses taxativas com limite de três anos",
    termo: "internação socioeducativa",
    semantica:
      "Medida privativa de liberdade reservada aos atos infracionais mais graves (arts. 121 e 122 do ECA).",
    virada: {
      titulo: "Rol taxativo do art. 122",
      raciocinio:
        "A internação só cabe em: infração cometida com violência ou grave ameaça; reiteração de infrações graves; ou descumprimento reiterado de medida anterior. Não cabe por tráfico simples.",
      exemplo:
        "Adolescente primário apreendido com drogas sem arma nem violência: o juiz não pode decretar internação (Súmula 492 do STJ).",
    },
  },
  {
    area: "criança",
    linha: "a remissão ministerial concedida antes do processo não implica confissão de culpa",
    termo: "remissão ministerial",
    semantica:
      "Forma de exclusão do processo socioeducativo concedida pelo Ministério Público (arts. 126 a 128 do ECA).",
    virada: {
      titulo: "Ausência de antecedentes na remissão",
      raciocinio:
        "A remissão concedida pelo MP como forma de exclusão do procedimento não prevalece para efeito de reincidência nem gera antecedentes infracionais ao adolescente.",
      exemplo:
        "Adolescente que recebeu remissão ministerial pratica novo ato: deve ser considerado primário para todos os efeitos legais.",
    },
  },
  {
    area: "ambiental",
    linha: "a responsabilidade civil por dano ambiental adota o risco integral e é imprescritível",
    termo: "risco integral ambiental",
    semantica:
      "Regime de imputação objetiva irrestrita nos termos do art. 14, §1º da Lei 6.938/81 e Tema 999 do STF.",
    virada: {
      titulo: "Tema 999 do STF",
      raciocinio:
        "A reparação civil de danos ambientais é imprescritível e adota a teoria do risco integral, não admitindo excludentes de caso fortuito, força maior ou fato de terceiro.",
      exemplo:
        "Rompimento de barragem em decorrência de chuva histórica imprevisível: a mineradora responde integralmente pelo dano ecológico sem poder alegar força maior.",
    },
  },
  {
    area: "ambiental",
    linha: "o princípio da precaução inverte o ônus da prova contra a atividade degradadora",
    termo: "precaução x prevenção",
    semantica: "Diretrizes basilares do direito ecológico internacional (Súmula 618 do STJ).",
    virada: {
      titulo: "Súmula 618 do STJ",
      raciocinio:
        "A inversão do ônus da prova aplica-se às ações de degradação ambiental. Na dúvida científica sobre perigo de dano grave ou irreversível, adota-se a precaução.",
      exemplo:
        "Empreendedor que pretende instalar usina química deve provar tecnicamente a inofensividade da atividade sob pena de embargo judicial.",
    },
  },
  {
    area: "previdenciário",
    linha: "o período de graça mantém a qualidade de segurado mesmo sem recolhimento",
    termo: "período de graça",
    semantica:
      "Manutenção extraordinária dos direitos previdenciários prevista no art. 15 da Lei 8.213/91.",
    virada: {
      titulo: "Prorrogação até 36 meses",
      raciocinio:
        "O período de graça básico é de 12 meses, podendo ser estendido para 24 meses se o segurado pagou mais de 120 contribuições, e para 36 meses se comprovado desemprego involuntário.",
      exemplo:
        "Trabalhador desempregado falece 30 meses após ser demitido: os dependentes têm direito à pensão por morte porque a qualidade de segurado foi preservada.",
    },
  },
  {
    area: "previdenciário",
    linha: "o benefício de pensão por morte independe de período de carência",
    termo: "isenção de carência",
    semantica:
      "Disposições do art. 26 da Lei 8.213/91 sobre benefícios sem exigência de número mínimo de contribuições.",
    virada: {
      titulo: "Art. 26 da Lei 8.213",
      raciocinio:
        "Pensão por morte, salário-família e auxílio-acidente independem de carência: basta que o falecido detivesse a qualidade de segurado na data do óbito, ainda que com 1 contribuição.",
      exemplo:
        "Trabalhador contratado há 5 dias morre em acidente: a viúva tem direito à pensão por morte mesmo sem 12 ou 180 meses de contribuição prévia.",
    },
  },
  {
    area: "eleitoral",
    linha: "a inelegibilidade reflexa alcança parentes até o segundo grau do chefe do executivo",
    termo: "inelegibilidade reflexa",
    semantica:
      "Restrição eleitoral familiar consagrada no art. 14, §7º da Constituição e Súmula Vinculante 18.",
    virada: {
      titulo: "Súmula Vinculante 18",
      raciocinio:
        "A dissolução do casamento ou da união estável no curso do mandato não afasta a inelegibilidade reflexa para o mesmo território de jurisdição do titular.",
      exemplo:
        "Esposa de prefeito se divorcia amigavelmente 6 meses antes da eleição para concorrer a prefeita no mesmo município: candidatura indeferida pela SV 18.",
    },
  },
  {
    area: "eleitoral",
    linha: "as condições de elegibilidade são aferidas na formalização do registro",
    termo: "momento do registro",
    semantica: "Marco temporal estipulado no art. 11, §10 da Lei 9.504/1997.",
    virada: {
      titulo: "Art. 11, §10 da Lei 9.504",
      raciocinio:
        "As condições de elegibilidade e causas de inelegibilidade são aferidas no registro, ressalvadas alterações fáticas ou jurídicas supervenientes que afastem a inelegibilidade.",
      exemplo:
        "Candidato obtém liminar anulando condenação de contas após o pedido de registro mas antes do julgamento: a liminar superveniente é acolhida para deferir o registro.",
    },
  },
  {
    area: "internacional",
    linha:
      "a homologação de sentença estrangeira é competência privativa do superior tribunal de justiça",
    termo: "homologação pelo stj",
    semantica:
      "Competência outorgada ao STJ pela Emenda Constitucional 45/2004 (art. 105, I, i da CF).",
    virada: {
      titulo: "Competência do STJ",
      raciocinio:
        "Sentença proferida por tribunal estrangeiro só produz efeitos e executoriedade no Brasil após homologação formal pelo STJ, não cabendo ao juiz de primeiro grau executá-la diretamente.",
      exemplo:
        "Pai tenta executar sentença de pensão alimentícia da justiça alemã diretamente na vara de família brasileira: petição indeferida por falta de homologação prévia no STJ.",
    },
  },
  {
    area: "internacional",
    linha: "o brasileiro naturalizado pode ser extraditado em caso de crime comum praticado antes",
    termo: "extradição de brasileiro",
    semantica: "Regime constitucional da extradição passiva de cidadãos (art. 5º, LI da CF).",
    virada: {
      titulo: "Art. 5º, LI da CF",
      raciocinio:
        "Nenhum brasileiro nato é extraditado. O naturalizado só pode ser extraditado em duas hipóteses: crime comum praticado antes da naturalização, ou envolvimento com tráfico de drogas a qualquer tempo.",
      exemplo:
        "Cidadão naturalizado comete homicídio nos EUA após a naturalização: não pode ser extraditado para julgamento no exterior.",
    },
  },
  {
    area: "direitos humanos",
    linha: "a prisão civil do depositário infiel é ilícita em qualquer modalidade no brasil",
    termo: "súmula vinculante 25",
    semantica:
      "Aplicação do Pacto de San José da Costa Rica com status supralegal na jurisprudência do STF.",
    virada: {
      titulo: "Súmula Vinculante 25 do STF",
      raciocinio:
        "É ilícita a prisão civil de depositário infiel, qualquer que seja a modalidade do depósito. No ordenamento brasileiro, a única prisão civil admitida é a do devedor de alimentos.",
      exemplo:
        "Juiz cível decreta prisão de devedor fiduciário que vendeu o carro financiado: ato flagrantemente nulo e ilegal por violação à SV 25.",
    },
  },
  {
    area: "direitos humanos",
    linha: "o controle de convencionalidade afasta leis internas incompatíveis com tratados",
    termo: "controle de convencionalidade",
    semantica:
      "Dever de magistrados e tribunais nacionais de adequar a legislação local aos tratados de direitos humanos ratificados.",
    virada: {
      titulo: "Efeito paralisante de leis",
      raciocinio:
        "Leis internas que conflitam com tratados de direitos humanos de status supralegal têm sua eficácia suspensa, não podendo ser aplicadas pelos juízes e tribunais brasileiros.",
      exemplo:
        "Norma do CPC que previa prisão de depositário foi paralisada pela Convenção Americana sobre Direitos Humanos (Pacto de San José).",
    },
  },
  {
    area: "filosofia",
    linha: "na teoria do direito de dworkin as regras operam no tudo ou nada e princípios têm peso",
    termo: "regras x princípios",
    semantica: "Distinção estrutural de normas jurídicas formulada por Ronald Dworkin.",
    virada: {
      titulo: "Dimensão de peso em Dworkin",
      raciocinio:
        "Quando duas regras colidem, uma é válida e a outra é inválida. Quando dois princípios colidem, ambos continuam válidos no ordenamento e o juiz sopesa qual tem maior peso no caso concreto.",
      exemplo:
        "Liberdade de imprensa vs Privacidade: o conflito não invalida nenhuma das normas, exigindo ponderação de peso conforme as circunstâncias do fato.",
    },
  },
  {
    area: "filosofia",
    linha: "a teoria pura do direito de kelsen separa estritamente o ser do dever ser",
    termo: "teoria pura do direito",
    semantica:
      "Concepção positivista de Hans Kelsen que expurga elementos morais e sociológicos da ciência jurídica.",
    virada: {
      titulo: "Norma fundamental hipotética",
      raciocinio:
        "A validade de uma norma decorre unicamente de sua conformidade formal com a norma hierarquicamente superior, culminando na norma fundamental hipotética, independente de juízos de justiça moral.",
      exemplo:
        "Lei formalmente aprovada pelo processo legislativo é válida e eficaz perante a teoria kelseniana, mesmo que moralmente injusta perante a opinião pública.",
    },
  },
  {
    area: "financeiro",
    linha: "as leis orçamentárias são de iniciativa privativa do chefe do poder executivo",
    termo: "iniciativa orçamentária",
    semantica: "Competência legislativa privativa para propor PPA, LDO e LOA (art. 165 da CF).",
    virada: {
      titulo: "Art. 165 da CF",
      raciocinio:
        "Plano Plurianual (PPA), Lei de Diretrizes Orçamentárias (LDO) e Lei Orçamentária Anual (LOA) são de iniciativa exclusiva do Chefe do Executivo; projeto apresentado por parlamentar padece de vício de iniciativa insanável.",
      exemplo:
        "Deputado estadual protocola projeto de lei da LDO na Assembleia Legislativa: a lei aprovada é formalmente inconstitucional.",
    },
  },
  {
    area: "financeiro",
    linha: "é vedada a vinculação de receita de impostos a órgão ou fundo específico",
    termo: "não vinculação de impostos",
    semantica:
      "Princípio da não afetação das receitas tributárias derivado do art. 167, IV da Constituição Federal.",
    virada: {
      titulo: "Art. 167, IV da CF",
      raciocinio:
        "A receita de impostos não pode ser previamente vinculada a órgãos, fundos ou despesas específicas, ressalvadas exclusivamente saúde, educação, administração tributária e garantias à União.",
      exemplo:
        "Lei estadual vincula 10% da arrecadação de IPVA para asfaltamento de rodovias: inconstitucional por violar o art. 167, IV da CF.",
    },
  },
];

export function offlineStudy(area: string, count: number, seen: string[]): StudyItem[] {
  const a = area.toLowerCase();
  const matches = BANK.filter(
    (b) => a.includes(b.area) || b.area.split(" ").every((w) => a.includes(w)),
  );
  const pool = (
    matches.length
      ? [...matches, ...BANK.filter((b) => !matches.includes(b))]
      : [...BANK].sort(() => Math.random() - 0.5)
  ).map((b) => b.item);
  const fresh = pool.filter((i) => !seen.includes(i.termo));
  const list = fresh.length >= count ? fresh : [...fresh, ...pool];
  return list.slice(0, count);
}
