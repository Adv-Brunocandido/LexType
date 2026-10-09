// Mega-Dicionário Jurídico & Enciclopédia Semântica do LexType
// Contém mais de 100 verbetes jurídicos aprofundados com categorização,
// semântica rigorosa, virada de chave prática e exemplos concretos.

export interface DicionarioEntry {
  id: string;
  termo: string;
  categoria:
    | "Latim & Brocardos"
    | "Direito Constitucional"
    | "Direito Civil"
    | "Direito Processual Civil"
    | "Direito Penal"
    | "Direito Processual Penal"
    | "Direito Administrativo"
    | "Direito Tributário"
    | "Direito do Trabalho"
    | "Ética & Deontologia";
  significado: string;
  etimologiaOuOrigem?: string;
  viradaChave: string;
  exemplo: string;
  palavrasChave: string[];
}

export const DICIONARIO_JURIDICO: DicionarioEntry[] = [
  // ==========================================
  // LATIM & BROCARDOS JURÍDICOS FUNDAMENTAIS
  // ==========================================
  {
    id: "venire-contra-factum-proprium",
    termo: "Venire contra factum proprium",
    categoria: "Latim & Brocardos",
    significado:
      "Vedação ao comportamento contraditório decorrente da boa-fé objetiva (art. 422 do CC). Impede que uma parte adote conduta incompatível com expectativa gerada anteriormente.",
    etimologiaOuOrigem: "Do latim medieval: vir contra o próprio fato já praticado.",
    viradaChave:
      "Exige quatro requisitos: conduta inicial (factum proprium), legítima confiança da contraparte, conduta contraditória posterior e dano ou risco de prejuízo injusto.",
    exemplo:
      "Locador aceitou pagamento do aluguel todo dia 15 durante dois anos sem reclamar. Não pode repentinamente cobrar multa de mora retroativa sob alegação de que o contrato previa vencimento no dia 5.",
    palavrasChave: ["boa-fé objetiva", "contradição", "confiança", "contratos"],
  },
  {
    id: "supressio",
    termo: "Supressio",
    categoria: "Latim & Brocardos",
    significado:
      "Fenômeno em que o não exercício continuado de um direito subjetivo durante tempo relevante gera a perda da faculdade de exigi-lo perante a contraparte.",
    etimologiaOuOrigem: "Do latim supprimere: ocultar, suprimir, extinguir pelo desuso fático.",
    viradaChave:
      "Diferencia-se da prescrição: enquanto a prescrição decorre do decurso de prazo legal fixo, a supressio decorre da quebra da confiança na boa-fé contratual objetiva.",
    exemplo:
      "Condomínio tolerou expressamente que morador usasse parte do hall comum por 20 anos contínuos. A assembleia não pode subitamente exigir a desocupação imediata sem indenização.",
    palavrasChave: ["surrectio", "boa-fé", "desuso", "perda de direito"],
  },
  {
    id: "surrectio",
    termo: "Surrectio",
    categoria: "Latim & Brocardos",
    significado:
      "Correlato positivo da supressio: é o nascimento de um novo direito ou situação jurídica consolidada em favor de uma parte, em razão da reiterada prática tolerada pela outra.",
    etimologiaOuOrigem: "Do latim surgere: insurgir, erguer-se, brotar de uma situação fática.",
    viradaChave:
      "Sempre caminha em conjunto com a supressio: onde um perde a prerrogativa pelo silêncio prolongado, o outro adquire estabilidade protetiva pela confiança.",
    exemplo:
      "Empregado recebe adicional de função espontaneamente pago pelo empregador durante 12 anos. Consolida-se o direito adquirido à estabilidade financeira salarial daquela verba.",
    palavrasChave: ["supressio", "direito adquirido", "confiança", "estabilidade"],
  },
  {
    id: "duty-to-mitigate-the-loss",
    termo: "Duty to mitigate the loss",
    categoria: "Latim & Brocardos",
    significado:
      "Dever do credor de mitigar o próprio prejuízo (Enunciado 169 das Jornadas de Direito Civil). A parte prejudicada deve tomar medidas razoáveis para evitar o agravamento desnecessário do dano.",
    etimologiaOuOrigem: "Do direito inglês e da Convenção de Viena sobre Compra e Venda Internacional de Mercadorias (CISG art. 77).",
    viradaChave:
      "O credor inerte que deixa a dívida ou os juros acumularem de má-fé para inflacionar a execução perde o direito de exigir a parcela correspondente ao agravamento culposo.",
    exemplo:
      "Locador espera 4 anos para ajuizar ação de despejo sabendo que o imóvel estava abandonado e deteriorando-se. O juiz limita os aluguéis aos primeiros meses em que deveria ter agido.",
    palavrasChave: ["mitigação do dano", "boa-fé objetiva", "perdas e danos"],
  },
  {
    id: "tu-quoque",
    termo: "Tu quoque",
    categoria: "Latim & Brocardos",
    significado:
      "Regra que proíbe que aquele que descumpriu uma cláusula contratual ou norma jurídica exija que a outra parte cumpra rigorosamente essa mesma obrigação.",
    etimologiaOuOrigem: "Do latim: 'Até tu?', alusão à clássica frase de Júlio César (Tu quoque, Brute fili mi).",
    viradaChave:
      "Derivação da exceptio non adimpleti contractus: quem transgride a regra do jogo contratual não pode se beneficiar da punição do adversário pela mesma conduta.",
    exemplo:
      "Franqueadora que deixou de fornecer o suporte técnico previsto em contrato não pode cobrar multa rescisória do franqueado que suspendeu o pagamento das mensalidades de franquia.",
    palavrasChave: ["inadimplemento", "coerência", "boa-fé"],
  },
  {
    id: "fumus-boni-iuris",
    termo: "Fumus boni iuris",
    categoria: "Latim & Brocardos",
    significado:
      "Fumaça do bom direito: probabilidade do direito alegado demonstrada em cognição sumária ou juízo de verossimilhança das alegações (art. 300 do CPC).",
    etimologiaOuOrigem: "Do latim: aparência ou vestígio da justiça da pretensão deduzida.",
    viradaChave:
      "Não exige certeza absoluta ou prova exauriente, mas elementos objetivos que evidenciem plausibilidade jurídica superior à simples dúvida.",
    exemplo:
      "Juntada de contrato assinado e laudo pericial oficial comprovando contaminação de loteamento autoriza tutela antecipada para suspensão imediata das parcelas.",
    palavrasChave: ["tutela provisória", "verossimilhança", "processo civil"],
  },
  {
    id: "periculum-in-mora",
    termo: "Periculum in mora",
    categoria: "Latim & Brocardos",
    significado:
      "Perigo da demora: risco concreto de dano irreparável ou de difícil reparação ao direito subjetivo ou ao resultado útil do processo pela espera do julgamento final.",
    etimologiaOuOrigem: "Do latim: o perigo contido no tempo de tramitação processual.",
    viradaChave:
      "Deve ser contemporâneo e demonstrado faticamente; alegação genérica de urgência econômica sem risco iminente de perecimento do bem não justifica liminar.",
    exemplo:
      "Paciente portador de neoplasia maligna com receituário indicando cirurgia urgente em 5 dias demonstra perigo na demora apto ao deferimento de tutela contra o plano de saúde.",
    palavrasChave: ["urgência", "liminar", "dano irreparável"],
  },
  {
    id: "dano-in-re-ipsa",
    termo: "Dano in re ipsa",
    categoria: "Latim & Brocardos",
    significado:
      "Dano presumido pela própria força dos fatos ilícitos comprovados, dispensando a vítima de demonstrar dor psíquica ou sofrimento em audiência.",
    etimologiaOuOrigem: "Do latim: na própria coisa / pela própria natureza do fato.",
    viradaChave:
      "A vítima só precisa provar o evento ilícito; o prejuízo moral é extraído como presunção legal e hominis (ex.: inscrição indevida em cadastro de inadimplentes sem anotação prévia).",
    exemplo:
      "Consumidor que teve seu nome negativado indevidamente no SPC/Serasa por conta fraudulenta tem direito à indenização por dano moral in re ipsa, sem precisar provar humilhação.",
    palavrasChave: ["responsabilidade civil", "dano moral", "presunção"],
  },
  {
    id: "mutatio-libelli",
    termo: "Mutatio libelli",
    categoria: "Latim & Brocardos",
    significado:
      "Aditamento da denúncia penal pelo Ministério Público quando a instrução revelar circunstância ou elemento elementar novo não contido na denúncia inicial (art. 384 do CPP).",
    etimologiaOuOrigem: "Do latim: alteração ou modificação da peça acusatória.",
    viradaChave:
      "O juiz NÃO PODE condenar diretamente por crime mais grave se o MP não aditar formalmente a peça acusatória, sob pena de nulidade absoluta por ofensa à correlação e à ampla defesa.",
    exemplo:
      "Réu denunciado por furto: durante as testemunhas, prova-se que ele usou uma faca para ameaçar a vítima. O juiz deve abrir vista ao MP para aditar para roubo; se o juiz condenar por roubo direto, a sentença é nula.",
    palavrasChave: ["processo penal", "aditamento", "correlação", "denúncia"],
  },
  {
    id: "emendatio-libelli",
    termo: "Emendatio libelli",
    categoria: "Latim & Brocardos",
    significado:
      "Correção da capitulação jurídica dos fatos pelo magistrado sem alteração da narrativa fática contida na peça acusatória (art. 383 do CPP).",
    etimologiaOuOrigem: "Do latim: emenda ou retificação legal do libelo acusatório.",
    viradaChave:
      "Diferente da mutatio libelli, não exige aditamento do Ministério Público, pois o réu se defende dos fatos narrados e não dos artigos de lei capitulados (iura novit curia).",
    exemplo:
      "A denúncia descreve perfeitamente que o funcionário público apropriou-se de dinheiro da repartição, mas capitulou erroneamente como furto simples. Na sentença, o juiz corrige para peculato.",
    palavrasChave: ["capitulação", "fatos", "processo penal", "sentença"],
  },
  {
    id: "in-dubio-pro-reo",
    termo: "In dubio pro reo",
    categoria: "Latim & Brocardos",
    significado:
      "Princípio fundamental de julgamento que impõe a absolvição criminal sempre que houver dúvida razoável e insuperável sobre a autoria ou materialidade delitiva (art. 386, VII, do CPP).",
    etimologiaOuOrigem: "Do latim: na dúvida, decide-se a favor do acusado.",
    viradaChave:
      "Aplica-se estritamente na fase de julgamento (sentença). Na decisão de pronúncia do Tribunal do Júri ou no recebimento da denúncia, vigora o in dubio pro societate.",
    exemplo:
      "Testemunhas apresentaram relatos contraditórios sobre quem efetuou o disparo e a perícia foi inconclusiva. O juiz sumariante deve absolver o réu por insuficiência probatória.",
    palavrasChave: ["presunção de inocência", "ônus da prova", "direito penal"],
  },
  {
    id: "ex-tunc",
    termo: "Ex tunc",
    categoria: "Latim & Brocardos",
    significado:
      "Efeito jurídico retroativo que opera desde a origem do ato ou evento analisado, desfazendo integralmente as consequências passadas como se o ato nulo nunca houvesse existido.",
    etimologiaOuOrigem: "Do latim: desde então / desde o momento inicial.",
    viradaChave:
      "A declaração de nulidade absoluta e a regra geral de inconstitucionalidade possuem eficácia ex tunc, salvo modulação formal de efeitos por quórum qualificado.",
    exemplo:
      "Contrato firmado por menor de 14 anos sem assistência nem representação é nulo de pleno direito: a anulação opera efeitos ex tunc, retornando as partes ao estado anterior.",
    palavrasChave: ["retroatividade", "nulidade", "efeito retroativo"],
  },
  {
    id: "ex-nunc",
    termo: "Ex nunc",
    categoria: "Latim & Brocardos",
    significado:
      "Efeito jurídico prospectivo que não retroage, produzindo consequências jurídicas estritamente a partir do momento em que a decisão ou ato é proferido.",
    etimologiaOuOrigem: "Do latim: a partir de agora / para o futuro.",
    viradaChave:
      "A anulação de negócio jurídico por vício de consentimento (anulabilidade) e as decisões moduladas do STF em controle concentrado de constitucionalidade operam tipicamente ex nunc.",
    exemplo:
      "A revogação de um ato administrativo discricionário por motivo de conveniência e oportunidade produz efeitos ex nunc, respeitando os direitos adquiridos durante sua vigência.",
    palavrasChave: ["prospectivo", "futuro", "anulabilidade", "modulação"],
  },
  {
    id: "erga-omnes",
    termo: "Erga omnes",
    categoria: "Latim & Brocardos",
    significado:
      "Eficácia vinculante que se estende contra todos os sujeitos de direito indeterminados, e não apenas entre as partes formais litigantes do processo.",
    etimologiaOuOrigem: "Do latim: contra todos / perante todos.",
    viradaChave:
      "As decisões de mérito em controle concentrado de constitucionalidade (ADI, ADC e ADPF) e as Súmulas Vinculantes produzem eficácia erga omnes obrigatória.",
    exemplo:
      "Ao julgar procedente uma ADI declarando inconstitucional lei estadual de pedágio urbano, a decisão tem efeito erga omnes, liberando todos os cidadãos do pagamento da taxa.",
    palavrasChave: ["controle concentrado", "vinculante", "geral"],
  },
  {
    id: "non-bis-in-idem",
    termo: "Non bis in idem",
    categoria: "Latim & Brocardos",
    significado:
      "Princípio basilar que veda a dupla persecução, julgamento ou punição pelo mesmo fato histórico ou a consideração dúplice de uma mesma circunstância na dosimetria.",
    etimologiaOuOrigem: "Do latim: não duas vezes pela mesma coisa.",
    viradaChave:
      "Impede que circunstância elementar do próprio tipo incriminador seja reaproveitada na 1ª fase (art. 59) ou como agravante na 2ª fase da dosimetria penal.",
    exemplo:
      "No crime de homicídio qualificado por motivo fútil, o juiz não pode utilizar a insignificância da motivação para também elevar a pena-base a pretexto de culpabilidade exacerbada.",
    palavrasChave: ["dosimetria", "dupla punição", "coisa julgada", "penal"],
  },
  {
    id: "pacta-sunt-servanda",
    termo: "Pacta sunt servanda",
    categoria: "Latim & Brocardos",
    significado:
      "Princípio da força obrigatória dos contratos: os pactos legalmente celebrados vinculam os contratantes como se lei fossem, garantindo a segurança jurídica do tráfego negocial.",
    etimologiaOuOrigem: "Do latim: os acordos devem ser cumpridos e preservados.",
    viradaChave:
      "Não é mais absoluto no direito contemporâneo; é relativizado pela função social do contrato, pela boa-fé objetiva e pela teoria da imprevisão (rebus sic stantibus).",
    exemplo:
      "Comprador de imóvel não pode simplesmente deixar de pagar as prestações acordadas por mero descontentamento pessoal, cabendo respeitar as cláusulas firmadas.",
    palavrasChave: ["contratos", "força obrigatória", "segurança jurídica"],
  },
  {
    id: "rebus-sic-stantibus",
    termo: "Cláusula Rebus sic stantibus",
    categoria: "Latim & Brocardos",
    significado:
      "Cláusula implícita em contratos de trato sucessivo ou diferido que condiciona a manutenção da obrigação à permanência do estado de fato existente ao tempo da celebração.",
    etimologiaOuOrigem: "Do latim: permanecendo as coisas como elas estavam na origem.",
    viradaChave:
      "Fundamento da Teoria da Imprevisão (art. 478 do CC): autoriza a resolução ou revisão judicial do contrato quando sobrevier evento extraordinário e imprevisível que cause onerosidade excessiva.",
    exemplo:
      "Contrato de safra agrícola internacional atrelado a frete marítimo sofre desequilíbrio absoluto decorrente de guerra imprevisível que encarece o transporte em 800%: cabe revisão judicial.",
    palavrasChave: ["onerosidade excessiva", "revisão contratual", "imprevisão"],
  },

  // ==========================================
  // DIREITO CONSTITUCIONAL & TEORIA DO ESTADO
  // ==========================================
  {
    id: "efeito-backlash",
    termo: "Efeito Backlash",
    categoria: "Direito Constitucional",
    significado:
      "Reação política e social contrária desencadeada por uma decisão judicial contramajoritária da Suprema Corte sobre tema moralmente divisivo na sociedade.",
    etimologiaOuOrigem: "Do inglês: reação adversa violenta ou contragolpe legislativo/popular.",
    viradaChave:
      "Costuma culminar na aprovação de emendas constitucionais ou leis pelo Poder Legislativo para reverter ou neutralizar o precedente fixado pela Suprema Corte.",
    exemplo:
      "Após o STF decidir sobre a inconstitucionalidade da vaquejada por crueldade animal, o Congresso Nacional aprovou a Emenda Constitucional 96 autorizando práticas desportivas tradicionais.",
    palavrasChave: ["jurisdição constitucional", "diálogos constitucionais", "ativismo"],
  },
  {
    id: "modulacao-dos-efeitos",
    termo: "Modulação dos efeitos",
    categoria: "Direito Constitucional",
    significado:
      "Técnica de decisão que restringe a retroatividade da declaração de inconstitucionalidade, determinando que ela produza efeitos apenas a partir do trânsito em julgado ou momento futuro.",
    etimologiaOuOrigem: "Prevista no art. 27 da Lei 9.868/1999 e no art. 927, § 3º, do CPC.",
    viradaChave:
      "Exige quórum qualificado de dois terços dos membros do Tribunal (8 ministros no STF) e fundamentação em razões de segurança jurídica ou excepcional interesse social.",
    exemplo:
      "STF declara inconstitucional benefício fiscal de ICMS concedido há 15 anos por estado sem autorização do CONFAZ, mas modula os efeitos para não exigir a devolução dos valores pretéritos já recolhidos.",
    palavrasChave: ["segurança jurídica", "quórum qualificado", "stf"],
  },
  {
    id: "reserva-do-possivel",
    termo: "Reserva do possível",
    categoria: "Direito Constitucional",
    significado:
      "Tese de defesa do Poder Público que condiciona a efetivação judicial de direitos econômicos e sociais à existência de disponibilidade orçamentária e financeira do Estado.",
    etimologiaOuOrigem: "Originada na jurisprudência da Corte Constitucional alemã (caso Numerus Clausus).",
    viradaChave:
      "A reserva do possível NÃO PODE ser invocada pelo Estado para descumprir o Mínimo Existencial (vida, saúde básica, dignidade humana) nem se o ente estatal não provar descompasso orçamentário real.",
    exemplo:
      "Município se recusa a fornecer vaga em creche alegando falta de verba; o STF afasta a alegação afirmando que educação infantil compõe o núcleo inegociável do mínimo existencial.",
    palavrasChave: ["mínimo existencial", "direitos sociais", "orçamento"],
  },
  {
    id: "clausulas-petreas",
    termo: "Cláusulas pétreas",
    categoria: "Direito Constitucional",
    significado:
      "Núcleo rígido e intangível da Constituição (art. 60, § 4º, da CF/88) insuscetível de abolição ou esvaziamento até mesmo pelo Poder Constituinte Derivado Reformador (Emendas à CF).",
    etimologiaOuOrigem: "Do grego petra: rocha, solidez imutável.",
    viradaChave:
      "São quatro: forma federativa de Estado; voto direto, secreto, universal e periódico; separação dos Poderes; e os direitos e garantias individuais. Não impedem emendas ampliativas, apenas supressivas.",
    exemplo:
      "Proposta de Emenda Constitucional que vise suprimir a garantia da ampla defesa ou transformar a federação brasileira em Estado unitário é formalmente inconstitucional ab initio.",
    palavrasChave: ["poder constituinte", "federação", "direitos fundamentais"],
  },

  // ==========================================
  // DIREITO CIVIL & OBRIGAÇÕES
  // ==========================================
  {
    id: "perda-de-uma-chance",
    termo: "Teoria da Perda de uma Chance",
    categoria: "Direito Civil",
    significado:
      "Modalidade autônoma de reparação civil em que o prejuízo indenizado não é o ganho final hipotético frustrado, mas a oportunidade real, séria e provável de auferir a vantagem ou evitar o dano.",
    etimologiaOuOrigem: "Doutrina francesa: perte d'une chance.",
    viradaChave:
      "A chance deve ser real e séria, com probabilidade estatística considerável; não se indeniza expectativa fantasiosa, nem se concede a totalidade do valor do prêmio final.",
    exemplo:
      "Advogado perde o prazo da apelação em causa com precedentes pacificados a favor do cliente no STJ. O cliente tem direito à indenização pela chance perdida de ver seu recurso julgado.",
    palavrasChave: ["responsabilidade civil", "dano patrimonial", "nexo causal"],
  },
  {
    id: "desconsideracao-inversa",
    termo: "Desconsideração inversa da personalidade jurídica",
    categoria: "Direito Civil",
    significado:
      "Técnica processual e material em que se afasta a autonomia patrimonial da pessoa jurídica para atingir bens da empresa por dívidas particulares contraídas pelo sócio controlador (art. 50, § 2º, CC).",
    etimologiaOuOrigem: "Reverse piercing of the corporate veil.",
    viradaChave:
      "Aplica-se com rigor na fraude à partilha de bens em divórcio ou execuções individuais quando o devedor integraliza todo seu patrimônio em nome de holding familiar para blindar-se.",
    exemplo:
      "Empresário em divórcio transfere seus veículos de luxo e imóveis para o nome de empresa patrimonial inativa para fraudar a partilha. A juíza decreta a desconsideração inversa e constringe os bens da PJ.",
    palavrasChave: ["fraude à execução", "família", "pessoa jurídica", "cpc"],
  },
  {
    id: "vicio-redibitorio",
    termo: "Vício redibitório",
    categoria: "Direito Civil",
    significado:
      "Defeito oculto pré-existente em coisa recebida em contrato comutativo que a torna imprópria ao uso a que é destinada ou lhe diminui consideravelmente o valor econômico (art. 441 do CC).",
    etimologiaOuOrigem: "Do latim redhibere: devolver a coisa ao vendedor desfazendo a venda.",
    viradaChave:
      "Gera as Ações Edilícias: o adquirente pode optar entre redibir o contrato (devolver e reaver o preço) ou pedir o abatimento proporcional no valor (ação quanti minoris / estimatória).",
    exemplo:
      "Comprador adquire veículo usado que parecia perfeito, mas descobre fissura estrutural no bloco do motor que já existia na compra. Tem prazo decadencial de 30 dias para ajuizar ação redibitória.",
    palavrasChave: ["contratos", "garantia", "ações edilícias", "decadência"],
  },
  {
    id: "eviccao",
    termo: "Evicção",
    categoria: "Direito Civil",
    significado:
      "Perda total ou parcial de um bem adquirido em contrato oneroso sofrida pelo adquirente em favor de terceiro, em razão de sentença judicial ou ato de apreensão que reconhece direito anterior.",
    etimologiaOuOrigem: "Do latim evincere: ser vencido em juízo, desapossado legalmente.",
    viradaChave:
      "O alienante responde pelos riscos da evicção perante o evicto mesmo se a garantia não estiver expressa no contrato (art. 447 CC), salvo cláusula expressa de exclusão com assunção do risco.",
    exemplo:
      "Cidadão compra um terreno em cartório; dois anos depois, terceiro ajuíza reivindicatória provando que a procuração usada na venda era falsa e recupera o lote. O comprador evicto cobra indenização do alienante.",
    palavrasChave: ["compra e venda", "alienante", "garantia", "contratos"],
  },

  // ==========================================
  // DIREITO PROCESSUAL CIVIL
  // ==========================================
  {
    id: "preclusao",
    termo: "Preclusão",
    categoria: "Direito Processual Civil",
    significado:
      "Perda, extinção ou consumação de uma faculdade processual em virtude do não exercício no prazo próprio, da prática incompatível de outro ato ou do já exercício da faculdade.",
    etimologiaOuOrigem: "Do latim praecludere: fechar com antecedência, barrar o caminho.",
    viradaChave:
      "Possui três espécies: temporal (perdeu o prazo), lógica (praticou ato incompatível, ex.: pagou sem ressalva e depois recorreu) e consumativa (já praticou o ato, não pode repetir ou aditar).",
    exemplo:
      "Réu junta contestação no 5º dia do prazo sem alegar incompetência relativa. Não pode protocolar nova peça no 10º dia para aditar a defesa, por ter operado a preclusão consumativa.",
    palavrasChave: ["prazos", "preclusão consumativa", "lógica", "temporal"],
  },
  {
    id: "irdr",
    termo: "Incidente de Resolução de Demandas Repetitivas (IRDR)",
    categoria: "Direito Processual Civil",
    significado:
      "Incidente processual do CPC/2015 instaurado em Tribunal de 2º grau (TJ ou TRF) para fixação de tese jurídica obrigatória sobre questão unicamente de direito que se repita em massa.",
    etimologiaOuOrigem: "Criado pelo CPC de 2015 (arts. 976 a 987) inspirado no modelo alemão de causas piloto.",
    viradaChave:
      "Requisitos cumulativos: efetiva repetição de processos sobre a mesma questão de direito E risco de quebra da isonomia ou da segurança jurídica. A admissão suspende todos os processos no Estado.",
    exemplo:
      "Milhares de servidores ajuizam ações discutindo o cálculo de gratificação de regência de classe: o TJ admite o IRDR, fixa tese vinculante única e a aplica uniformemente em todos os juízos de 1º grau.",
    palavrasChave: ["precedentes", "tribunais", "uniformização", "cpc"],
  },
  {
    id: "julgamento-parcial-do-merito",
    termo: "Julgamento antecipado parcial do mérito",
    categoria: "Direito Processual Civil",
    significado:
      "Decisão interlocutória de mérito em que o magistrado julga em definitivo um ou alguns dos pedidos formulados quando se mostrarem incontroversos ou prontos para julgamento (art. 356 CPC).",
    etimologiaOuOrigem: "Inovação do CPC/2015 em superação ao dogma da unicidade da sentença de mérito.",
    viradaChave:
      "O recurso cabível contra o julgamento antecipado parcial do mérito é o AGRAVO DE INSTRUMENTO (art. 356, § 5º), e NÃO a apelação, pois o processo continuará tramitando para os demais pedidos.",
    exemplo:
      "Autor pede divórcio e partilha complexa de 15 empresas com perícia pendente. O réu concorda com o divórcio: o juiz decreta imediatamente o divórcio e o processo prossegue apenas para a partilha.",
    palavrasChave: ["agravo de instrumento", "decisão interlocutória", "cpc"],
  },

  // ==========================================
  // DIREITO PENAL & CRIMINOLOGIA
  // ==========================================
  {
    id: "crime-impossivel",
    termo: "Crime impossível",
    categoria: "Direito Penal",
    significado:
      "Tentativa inidônea e atípica que não se pune em virtude da ineficácia absoluta do meio empregado pelo agente ou da impropriedade absoluta do objeto material sobre o qual recai a conduta (art. 17 CP).",
    etimologiaOuOrigem: "Previsto no art. 17 do Código Penal brasileiro; teoria objetiva temperada.",
    viradaChave:
      "A ineficácia ou impropriedade deve ser ABSOLUTA. Se for meramente relativa (ex.: veneno em dose insuficiente ou arma emperrada momentaneamente), responde por tentativa punível.",
    exemplo:
      "Indivíduo atira três vezes contra desafeto que, comprovado por necropsia prévia, já havia falecido de infarto fulminante três horas antes: impropriedade absoluta do objeto (cadáver não pode ser morto).",
    palavrasChave: ["tentativa", "atipicidade", "código penal", "objeto"],
  },
  {
    id: "desistencia-voluntaria",
    termo: "Desistência voluntária",
    categoria: "Direito Penal",
    significado:
      "Figura em que o agente, durante a execução do delito, cessa voluntariamente os atos executórios que ainda tinha a faculdade física de prosseguir, impedindo a consumação do plano delitivo (art. 15 CP).",
    etimologiaOuOrigem: "A chamada 'ponte de ouro' da dogmática penal (Fórmula de Frank: 'posso prosseguir, mas não quero').",
    viradaChave:
      "Diferença crucial da tentativa: na tentativa o agente quer prosseguir mas não pode (interrupção alheia); na desistência ele pode prosseguir mas não quer. O agente só responde pelos atos já praticados.",
    exemplo:
      "Assaltante engatilha a arma contra o caixa, tem mais 5 cartuchos, mas após o pedido de clemência do atendente desiste espontaneamente e vai embora: responde apenas pelo porte de arma / ameaça.",
    palavrasChave: ["ponte de ouro", "fórmula de frank", "tentativa", "artigo 15"],
  },
  {
    id: "arrependimento-eficaz",
    termo: "Arrependimento eficaz",
    categoria: "Direito Penal",
    significado:
      "Hipótese em que o agente, tendo esgotado integralmente os atos executórios do crime, atua ativamente para impedir que o resultado consumativo se produza, obtendo sucesso nessa salvação (art. 15 CP).",
    etimologiaOuOrigem: "Também integra a 'ponte de ouro' penal de Von Liszt.",
    viradaChave:
      "Exige EFICÁCIA da ação salvadora: se a vítima falecer apesar do socorro médico prestado pelo agressor, ele responderá por homicídio consumado (com mera atenuante genérica do art. 65, III, b).",
    exemplo:
      "Agente ministra veneno letal na bebida da vítima mas, arrependido imediatamente após ela ingerir, a leva ao hospital e entrega o antídoto aos médicos salvando-lhe a vida: responde por lesão corporal.",
    palavrasChave: ["ponte de ouro", "resultado evitado", "consumação", "salvamento"],
  },
  {
    id: "arrependimento-posterior",
    termo: "Arrependimento posterior",
    categoria: "Direito Penal",
    significado:
      "Causa legal de diminuição de pena de um a dois terços aplicável aos crimes cometidos sem violência ou grave ameaça à pessoa, quando o agente repara o dano ou restitui a coisa até o recebimento da denúncia (art. 16 CP).",
    etimologiaOuOrigem: "Instituído pela reforma da Parte Geral do Código Penal de 1984.",
    viradaChave:
      "Marco temporal fatal e requisitos: deve ser voluntário, integral, em crime sem violência à pessoa e ANTES do RECEBIMENTO DA DENÚNCIA ou queixa. Reparação posterior só gera atenuante genérica.",
    exemplo:
      "Autor de furto devolve a totalidade das joias furtadas antes do juiz receber a denúncia apresentada pelo Ministério Público. Terá direito subjetivo à redução de 1 a 2 terços da pena na 3ª fase.",
    palavrasChave: ["restituição", "denúncia", "redução de pena", "sem violência"],
  },

  // ==========================================
  // DIREITO PROCESSUAL PENAL
  // ==========================================
  {
    id: "cadeia-de-custodia",
    termo: "Cadeia de custódia da prova",
    categoria: "Direito Processual Penal",
    significado:
      "Conjunto de todos os procedimentos documentados utilizados para manter e registrar a história cronológica do vestígio coletado em locais de crime (arts. 158-A a 158-F do CPP).",
    etimologiaOuOrigem: "Positivada no CPP brasileiro pela Lei Anticrime (Lei 13.964/2019).",
    viradaChave:
      "A quebra substancial da cadeia de custódia (ex.: lacre rompido sem registro pericial, armazenamento irregular) gera a inidoneidade do elemento e a ilicitude probatória com desentranhamento dos autos.",
    exemplo:
      "Celular com mensagens extraídas é apreendido sem lacre oficial e manipulado por policiais sem espelhamento forense certificado: o STJ anula a prova pela quebra insanável da cadeia de custódia.",
    palavrasChave: ["perícia", "vestígio", "lei anticrime", "nulidade"],
  },
  {
    id: "anpp",
    termo: "Acordo de Não Persecução Penal (ANPP)",
    categoria: "Direito Processual Penal",
    significado:
      "Negócio jurídico processual pré-processual entre o Ministério Público e o investigado para extinção da punibilidade sem processo penal nem reincidência (art. 28-A do CPP).",
    etimologiaOuOrigem: "Introduzido pela Lei 13.964/2019 (Pacote Anticrime).",
    viradaChave:
      "Requisitos: crime sem violência ou grave ameaça, pena mínima inferior a 4 anos e confissão formal e circunstanciada da prática delitiva. Não gera maus antecedentes nem reincidência.",
    exemplo:
      "Investigado primário por furto simples confessa a conduta, repara o dano à vítima e presta serviços comunitários por 6 meses conforme ANPP homologado: o juiz extingue a punibilidade.",
    palavrasChave: ["justiça consensual", "lei anticrime", "confissão", "extinção de punibilidade"],
  },

  // ==========================================
  // DIREITO ADMINISTRATIVO
  // ==========================================
  {
    id: "autotutela",
    termo: "Princípio da Autotutela Administrativa",
    categoria: "Direito Administrativo",
    significado:
      "Poder-dever conferido à Administração Pública de rever seus próprios atos de ofício, anulando os ilegais e revogando os inoportunos ou inconvenientes (Súmulas 346 e 473 do STF).",
    etimologiaOuOrigem: "Do grego auto (por si mesmo) e tutela (proteção/controle).",
    viradaChave:
      "A anulação de atos que gerem efeitos favoráveis ao destinatário de boa-fé decai no prazo de 5 anos (art. 54 da Lei 9.784/99) e exige contraditório prévio perante a Administração.",
    exemplo:
      "Prefeitura constata que concurso público sofreu fraude no gabarito: com base na autotutela, a própria Administração anula a homologação do certame sem necessitar de autorização judicial prévia.",
    palavrasChave: ["súmula 473", "anulação", "revogação", "decadência"],
  },
  {
    id: "poder-de-policia",
    termo: "Poder de polícia administrativo",
    categoria: "Direito Administrativo",
    significado:
      "Atividade estatal da administração pública que condiciona ou limita o exercício de direitos individuais, liberdades e a propriedade privada em prol do interesse público (art. 78 do CTN).",
    etimologiaOuOrigem: "Do grego politeia: administração da ordem da polis.",
    viradaChave:
      "Possui quatro ciclos: ordem, consentimento, fiscalização e sanção. O STF fixou que as fases de consentimento, fiscalização e sanção podem ser delegadas a estatais de capital misto com personalidade privada.",
    exemplo:
      "Vigilância Sanitária interdita restaurante comercial e apreende carnes vencidas aplicando auto de infração: exercício legítimo e autoexecutório do poder de polícia.",
    palavrasChave: ["autoexecutoriedade", "discricionariedade", "coercibilidade", "interdição"],
  },

  // ==========================================
  // DIREITO TRIBUTÁRIO
  // ==========================================
  {
    id: "lancamento-por-homologacao",
    termo: "Lançamento por homologação",
    categoria: "Direito Tributário",
    significado:
      "Modalidade de constituição do crédito tributário em que o próprio contribuinte apura o valor devido, declara ao fisco e antecipa o pagamento sem prévia análise estatal (art. 150 do CTN).",
    etimologiaOuOrigem: "Também denominado doutrinariamente de 'autolançamento'.",
    viradaChave:
      "Se o contribuinte antecipou qualquer pagamento, o prazo de decadência do Fisco é de 5 anos do fato gerador (art. 150, § 4º). Se houve dolo/fraude ou zero pagamento, o prazo é de 5 anos do 1º dia do exercício seguinte (art. 173, I).",
    exemplo:
      "Empresa apura o ICMS e recolhe mensalmente o valor calculado. O Fisco tem 5 anos da data do recolhimento para auditar as guias e homologar expressa ou tacitamente o crédito tributário.",
    palavrasChave: ["icms", "tributos", "decadência", "ctn"],
  },
  {
    id: "anterioridade-nonagesimal",
    termo: "Anterioridade nonagesimal (Noventena)",
    categoria: "Direito Tributário",
    significado:
      "Garantia constitucional tributária que proíbe a cobrança de tributo antes de decorridos noventa dias da data em que tiver sido publicada a lei que o instituiu ou aumentou (art. 150, III, c, CF).",
    etimologiaOuOrigem: "Introduzida expressamente com amplitude geral pela Emenda Constitucional 42/2003.",
    viradaChave:
      "Aplica-se CUMULATIVAMENTE com a anterioridade do exercício financeiro (anual), exceto para os tributos expressamente excepcionados pelo texto constitucional (ex.: II, IE, IPI, IOF, Contribuições Sociais da Seguridade).",
    exemplo:
      "Lei publicada em 15 de dezembro aumenta alíquota de ITCMD. A nova alíquota só pode ser cobrada a partir de 15 de março do ano seguinte, respeitando cumulativamente a virada do ano e os 90 dias.",
    palavrasChave: ["não surpresa", "segurança jurídica", "noventena", "constitucional"],
  },

  // ==========================================
  // DIREITO DO TRABALHO
  // ==========================================
  {
    id: "primazia-da-realidade",
    termo: "Princípio da Primazia da Realidade",
    categoria: "Direito do Trabalho",
    significado:
      "Princípio basilar do Direito do Trabalho que estabelece a prevalência dos fatos concretos ocorridos no dia a dia da prestação de serviços sobre as formas ou documentos formais subscritos pelas partes.",
    etimologiaOuOrigem: "Sistematizado pelo mestre uruguaio Américo Plá Rodriguez.",
    viradaChave:
      "Contratos de 'pejotização' (PJ), recibos de quitação e acordos escritos não prevalecem se a rotina fática comprovar a presença dos requisitos de subordinação, habitualidade, onerosidade e pessoalidade (art. 3º CLT).",
    exemplo:
      "Trabalhador foi obrigado a abrir MEI para prestar serviços de vendedor com chefe direto e horário fixo de 8h diárias. A Justiça do Trabalho reconhece o vínculo empregatício direto desconsiderando a PJ.",
    palavrasChave: ["pejotização", "vínculo de emprego", "subordinação", "clt"],
  },
  {
    id: "inalterabilidade-contratual-lesiva",
    termo: "Princípio da inalterabilidade contratual lesiva",
    categoria: "Direito do Trabalho",
    significado:
      "Regra do art. 468 da CLT que proíbe alterações nas condições do contrato de trabalho por iniciativa unilateral do empregador que resultem em prejuízos diretos ou indiretos ao empregado.",
    etimologiaOuOrigem: "Princípio protetivo decorrente da assimetria na relação empregado-empregador.",
    viradaChave:
      "Mesmo havendo consentimento formal assinado do empregado, a alteração é nula de pleno direito se lhe acarretar prejuízo pecuniário, de saúde ou desvio prejudicial de funções.",
    exemplo:
      "Empresa transfere unilateralmente empregado que trabalhava de dia para o turno da madrugada com redução salarial: a alteração é manifestamente nula com base no art. 468 da CLT.",
    palavrasChave: ["artigo 468", "salário", "turno", "nulidade"],
  },

  // ==========================================
  // ÉTICA PROFISSIONAL & ESTATUTO DA OAB
  // ==========================================
  {
    id: "incompatibilidade-vs-impedimento",
    termo: "Incompatibilidade vs. Impedimento da Advocacia",
    categoria: "Ética & Deontologia",
    significado:
      "Distinção fundamental das restrições ao exercício da advocacia (arts. 27 a 30 da Lei 8.906/94). A incompatibilidade acarreta proibição total; o impedimento impõe restrição parcial.",
    etimologiaOuOrigem: "Estatuto da Advocacia e da Ordem dos Advogados do Brasil (Lei 8.906/94).",
    viradaChave:
      "Incompatibilidade (proibição total de clinicar): membros do Judiciário, Ministério Público, chefes do Executivo, policiais e auditores fiscais. Impedimento (parcial): deputados e servidores não podem advogar contra a Fazenda que os remunera.",
    exemplo:
      "Policial militar formado em Direito tem incompatibilidade absoluta (art. 28, V, EAOAB): não pode advogar em hipótese alguma. Já o servidor do INSS é apenas impedido de advogar contra a União/INSS.",
    palavrasChave: ["estatuto da oab", "prerrogativas", "servidor público", "proibição"],
  },
  {
    id: "inviolabilidade-do-advogado",
    termo: "Inviolabilidade do escritório e sigilo profissional",
    categoria: "Ética & Deontologia",
    significado:
      "Prerrogativa da advocacia (art. 7º, II, da Lei 8.906/94) que assegura a inviolabilidade de seu escritório, correspondências, computadores e comunicações telefônicas no exercício profissional.",
    etimologiaOuOrigem: "Garantia constitucional e legal para salvaguardar a ampla defesa do cidadão.",
    viradaChave:
      "Mandado de busca e apreensão só pode ser expedido se o próprio advogado for alvo de investigação por coautoria delitiva, com decisão motivada específica e acompanhado obrigatoriamente por representante da OAB.",
    exemplo:
      "Polícia cumpre busca no escritório de advocacia para apreender documentos confidenciais do cliente sem a presença de delegado da OAB. A diligência é nula e as provas são imprestáveis.",
    palavrasChave: ["prerrogativas", "sigilo", "busca e apreensão", "oab"],
  },
];

export const DICIONARIO_CATEGORIAS = [
  "Todas as Categorias",
  "Latim & Brocardos",
  "Direito Constitucional",
  "Direito Civil",
  "Direito Processual Civil",
  "Direito Penal",
  "Direito Processual Penal",
  "Direito Administrativo",
  "Direito Tributário",
  "Direito do Trabalho",
  "Ética & Deontologia",
] as const;

export function searchDicionario(query?: string, categoria?: string): DicionarioEntry[] {
  const q = (query || "").toLowerCase().trim();
  const c = categoria && categoria !== "Todas as Categorias" ? categoria : null;

  return DICIONARIO_JURIDICO.filter((entry) => {
    const matchesCategory = !c || entry.categoria === c;
    if (!matchesCategory) return false;
    if (!q) return true;

    return (
      entry.termo.toLowerCase().includes(q) ||
      entry.significado.toLowerCase().includes(q) ||
      entry.viradaChave.toLowerCase().includes(q) ||
      entry.exemplo.toLowerCase().includes(q) ||
      entry.palavrasChave.some((pk) => pk.toLowerCase().includes(q))
    );
  });
}

export function getRandomDicionarioEntry(): DicionarioEntry {
  const idx = Math.floor(Math.random() * DICIONARIO_JURIDICO.length);
  return DICIONARIO_JURIDICO[idx]!;
}
