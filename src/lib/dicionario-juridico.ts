// Mega-Dicionário Jurídico & Enciclopédia Semântica do LexType
// Contém mais de 109 verbetes jurídicos aprofundados com categorização,
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
  {
    "id": "venire-contra-factum-proprium",
    "termo": "Venire contra factum proprium",
    "categoria": "Latim & Brocardos",
    "significado": "Vedação ao comportamento contraditório decorrente da boa-fé objetiva (art. 422 do CC). Impede que uma parte adote conduta incompatível com expectativa gerada anteriormente.",
    "etimologiaOuOrigem": "Do latim medieval: vir contra o próprio fato já praticado.",
    "viradaChave": "Exige quatro requisitos: conduta inicial (factum proprium), legítima confiança da contraparte, conduta contraditória posterior e dano ou risco de prejuízo injusto.",
    "exemplo": "Locador aceitou pagamento do aluguel todo dia 15 durante dois anos sem reclamar. Não pode repentinamente cobrar multa de mora retroativa sob alegação de que o contrato previa vencimento no dia 5.",
    "palavrasChave": [
      "boa-fé objetiva",
      "contradição",
      "confiança",
      "contratos"
    ]
  },
  {
    "id": "supressio",
    "termo": "Supressio",
    "categoria": "Latim & Brocardos",
    "significado": "Fenômeno em que o não exercício continuado de um direito subjetivo durante tempo relevante gera a perda da faculdade de exigi-lo perante a contraparte.",
    "etimologiaOuOrigem": "Do latim supprimere: ocultar, suprimir, extinguir pelo desuso fático.",
    "viradaChave": "Diferencia-se da prescrição: enquanto a prescrição decorre do decurso de prazo legal fixo, a supressio decorre da quebra da confiança na boa-fé contratual objetiva.",
    "exemplo": "Condomínio tolerou expressamente que morador usasse parte do hall comum por 20 anos contínuos. A assembleia não pode subitamente exigir a desocupação imediata sem indenização.",
    "palavrasChave": [
      "surrectio",
      "boa-fé",
      "desuso",
      "perda de direito"
    ]
  },
  {
    "id": "surrectio",
    "termo": "Surrectio",
    "categoria": "Latim & Brocardos",
    "significado": "Correlato positivo da supressio: é o nascimento de um novo direito ou situação jurídica consolidada em favor de uma parte, em razão da reiterada prática tolerada pela outra.",
    "etimologiaOuOrigem": "Do latim surgere: insurgir, erguer-se, brotar de uma situação fática.",
    "viradaChave": "Sempre caminha em conjunto com a supressio: onde um perde a prerrogativa pelo silêncio prolongado, o outro adquire estabilidade protetiva pela confiança.",
    "exemplo": "Empregado recebe adicional de função espontaneamente pago pelo empregador durante 12 anos. Consolida-se o direito adquirido à estabilidade financeira salarial daquela verba.",
    "palavrasChave": [
      "supressio",
      "direito adquirido",
      "confiança",
      "estabilidade"
    ]
  },
  {
    "id": "duty-to-mitigate-the-loss",
    "termo": "Duty to mitigate the loss",
    "categoria": "Latim & Brocardos",
    "significado": "Dever do credor de mitigar o próprio prejuízo (Enunciado 169 das Jornadas de Direito Civil). A parte prejudicada deve tomar medidas razoáveis para evitar o agravamento desnecessário do dano.",
    "etimologiaOuOrigem": "Do direito inglês e da Convenção de Viena sobre Compra e Venda Internacional de Mercadorias (CISG art. 77).",
    "viradaChave": "O credor inerte que deixa a dívida ou os juros acumularem de má-fé para inflacionar a execução perde o direito de exigir a parcela correspondente ao agravamento culposo.",
    "exemplo": "Locador espera 4 anos para ajuizar ação de despejo sabendo que o imóvel estava abandonado e deteriorando-se. O juiz limita os aluguéis aos primeiros meses em que deveria ter agido.",
    "palavrasChave": [
      "mitigação do dano",
      "boa-fé objetiva",
      "perdas e danos"
    ]
  },
  {
    "id": "tu-quoque",
    "termo": "Tu quoque",
    "categoria": "Latim & Brocardos",
    "significado": "Regra que proíbe que aquele que descumpriu uma cláusula contratual ou norma jurídica exija que a outra parte cumpra rigorosamente essa mesma obrigação.",
    "etimologiaOuOrigem": "Do latim: 'Até tu?', alusão à clássica frase de Júlio César (Tu quoque, Brute fili mi).",
    "viradaChave": "Derivação da exceptio non adimpleti contractus: quem transgride a regra do jogo contratual não pode se beneficiar da punição do adversário pela mesma conduta.",
    "exemplo": "Franqueadora que deixou de fornecer o suporte técnico previsto em contrato não pode cobrar multa rescisória do franqueado que suspendeu o pagamento das mensalidades de franquia.",
    "palavrasChave": [
      "inadimplemento",
      "coerência",
      "boa-fé"
    ]
  },
  {
    "id": "fumus-boni-iuris",
    "termo": "Fumus boni iuris",
    "categoria": "Latim & Brocardos",
    "significado": "Fumaça do bom direito: probabilidade do direito alegado demonstrada em cognição sumária ou juízo de verossimilhança das alegações (art. 300 do CPC).",
    "etimologiaOuOrigem": "Do latim: aparência ou vestígio da justiça da pretensão deduzida.",
    "viradaChave": "Não exige certeza absoluta ou prova exauriente, mas elementos objetivos que evidenciem plausibilidade jurídica superior à simples dúvida.",
    "exemplo": "Juntada de contrato assinado e laudo pericial oficial comprovando contaminação de loteamento autoriza tutela antecipada para suspensão imediata das parcelas.",
    "palavrasChave": [
      "tutela provisória",
      "verossimilhança",
      "processo civil"
    ]
  },
  {
    "id": "periculum-in-mora",
    "termo": "Periculum in mora",
    "categoria": "Latim & Brocardos",
    "significado": "Perigo da demora: risco concreto de dano irreparável ou de difícil reparação ao direito subjetivo ou ao resultado útil do processo pela espera do julgamento final.",
    "etimologiaOuOrigem": "Do latim: o perigo contido no tempo de tramitação processual.",
    "viradaChave": "Deve ser contemporâneo e demonstrado faticamente; alegação genérica de urgência econômica sem risco iminente de perecimento do bem não justifica liminar.",
    "exemplo": "Paciente portador de neoplasia maligna com receituário indicando cirurgia urgente em 5 dias demonstra perigo na demora apto ao deferimento de tutela contra o plano de saúde.",
    "palavrasChave": [
      "urgência",
      "liminar",
      "dano irreparável"
    ]
  },
  {
    "id": "dano-in-re-ipsa",
    "termo": "Dano in re ipsa",
    "categoria": "Latim & Brocardos",
    "significado": "Dano presumido pela própria força dos fatos ilícitos comprovados, dispensando a vítima de demonstrar dor psíquica ou sofrimento em audiência.",
    "etimologiaOuOrigem": "Do latim: na própria coisa / pela própria natureza do fato.",
    "viradaChave": "A vítima só precisa provar o evento ilícito; o prejuízo moral é extraído como presunção legal e hominis (ex.: inscrição indevida em cadastro de inadimplentes sem anotação prévia).",
    "exemplo": "Consumidor que teve seu nome negativado indevidamente no SPC/Serasa por conta fraudulenta tem direito à indenização por dano moral in re ipsa, sem precisar provar humilhação.",
    "palavrasChave": [
      "responsabilidade civil",
      "dano moral",
      "presunção"
    ]
  },
  {
    "id": "mutatio-libelli",
    "termo": "Mutatio libelli",
    "categoria": "Latim & Brocardos",
    "significado": "Aditamento da denúncia penal pelo Ministério Público quando a instrução revelar circunstância ou elemento elementar novo não contido na denúncia inicial (art. 384 do CPP).",
    "etimologiaOuOrigem": "Do latim: alteração ou modificação da peça acusatória.",
    "viradaChave": "O juiz NÃO PODE condenar diretamente por crime mais grave se o MP não aditar formalmente a peça acusatória, sob pena de nulidade absoluta por ofensa à correlação e à ampla defesa.",
    "exemplo": "Réu denunciado por furto: durante as testemunhas, prova-se que ele usou uma faca para ameaçar a vítima. O juiz deve abrir vista ao MP para aditar para roubo; se o juiz condenar por roubo direto, a sentença é nula.",
    "palavrasChave": [
      "processo penal",
      "aditamento",
      "correlação",
      "denúncia"
    ]
  },
  {
    "id": "emendatio-libelli",
    "termo": "Emendatio libelli",
    "categoria": "Latim & Brocardos",
    "significado": "Correção da capitulação jurídica dos fatos pelo magistrado sem alteração da narrativa fática contida na peça acusatória (art. 383 do CPP).",
    "etimologiaOuOrigem": "Do latim: emenda ou retificação legal do libelo acusatório.",
    "viradaChave": "Diferente da mutatio libelli, não exige aditamento do Ministério Público, pois o réu se defende dos fatos narrados e não dos artigos de lei capitulados (iura novit curia).",
    "exemplo": "A denúncia descreve perfeitamente que o funcionário público apropriou-se de dinheiro da repartição, mas capitulou erroneamente como furto simples. Na sentença, o juiz corrige para peculato.",
    "palavrasChave": [
      "capitulação",
      "fatos",
      "processo penal",
      "sentença"
    ]
  },
  {
    "id": "in-dubio-pro-reo",
    "termo": "In dubio pro reo",
    "categoria": "Latim & Brocardos",
    "significado": "Princípio fundamental de julgamento que impõe a absolvição criminal sempre que houver dúvida razoável e insuperável sobre a autoria ou materialidade delitiva (art. 386, VII, do CPP).",
    "etimologiaOuOrigem": "Do latim: na dúvida, decide-se a favor do acusado.",
    "viradaChave": "Aplica-se estritamente na fase de julgamento (sentença). Na decisão de pronúncia do Tribunal do Júri ou no recebimento da denúncia, vigora o in dubio pro societate.",
    "exemplo": "Testemunhas apresentaram relatos contraditórios sobre quem efetuou o disparo e a perícia foi inconclusiva. O juiz sumariante deve absolver o réu por insuficiência probatória.",
    "palavrasChave": [
      "presunção de inocência",
      "ônus da prova",
      "direito penal"
    ]
  },
  {
    "id": "ex-tunc",
    "termo": "Ex tunc",
    "categoria": "Latim & Brocardos",
    "significado": "Efeito jurídico retroativo que opera desde a origem do ato ou evento analisado, desfazendo integralmente as consequências passadas como se o ato nulo nunca houvesse existido.",
    "etimologiaOuOrigem": "Do latim: desde então / desde o momento inicial.",
    "viradaChave": "A declaração de nulidade absoluta e a regra geral de inconstitucionalidade possuem eficácia ex tunc, salvo modulação formal de efeitos por quórum qualificado.",
    "exemplo": "Contrato firmado por menor de 14 anos sem assistência nem representação é nulo de pleno direito: a anulação opera efeitos ex tunc, retornando as partes ao estado anterior.",
    "palavrasChave": [
      "retroatividade",
      "nulidade",
      "efeito retroativo"
    ]
  },
  {
    "id": "ex-nunc",
    "termo": "Ex nunc",
    "categoria": "Latim & Brocardos",
    "significado": "Efeito jurídico prospectivo que não retroage, produzindo consequências jurídicas estritamente a partir do momento em que a decisão ou ato é proferido.",
    "etimologiaOuOrigem": "Do latim: a partir de agora / para o futuro.",
    "viradaChave": "A anulação de negócio jurídico por vício de consentimento (anulabilidade) e as decisões moduladas do STF em controle concentrado de constitucionalidade operam tipicamente ex nunc.",
    "exemplo": "A revogação de um ato administrativo discricionário por motivo de conveniência e oportunidade produz efeitos ex nunc, respeitando os direitos adquiridos durante sua vigência.",
    "palavrasChave": [
      "prospectivo",
      "futuro",
      "anulabilidade",
      "modulação"
    ]
  },
  {
    "id": "erga-omnes",
    "termo": "Erga omnes",
    "categoria": "Latim & Brocardos",
    "significado": "Eficácia vinculante que se estende contra todos os sujeitos de direito indeterminados, e não apenas entre as partes formais litigantes do processo.",
    "etimologiaOuOrigem": "Do latim: contra todos / perante todos.",
    "viradaChave": "As decisões de mérito em controle concentrado de constitucionalidade (ADI, ADC e ADPF) e as Súmulas Vinculantes produzem eficácia erga omnes obrigatória.",
    "exemplo": "Ao julgar procedente uma ADI declarando inconstitucional lei estadual de pedágio urbano, a decisão tem efeito erga omnes, liberando todos os cidadãos do pagamento da taxa.",
    "palavrasChave": [
      "controle concentrado",
      "vinculante",
      "geral"
    ]
  },
  {
    "id": "non-bis-in-idem",
    "termo": "Non bis in idem",
    "categoria": "Latim & Brocardos",
    "significado": "Princípio basilar que veda a dupla persecução, julgamento ou punição pelo mesmo fato histórico ou a consideração dúplice de uma mesma circunstância na dosimetria.",
    "etimologiaOuOrigem": "Do latim: não duas vezes pela mesma coisa.",
    "viradaChave": "Impede que circunstância elementar do próprio tipo incriminador seja reaproveitada na 1ª fase (art. 59) ou como agravante na 2ª fase da dosimetria penal.",
    "exemplo": "No crime de homicídio qualificado por motivo fútil, o juiz não pode utilizar a insignificância da motivação para também elevar a pena-base a pretexto de culpabilidade exacerbada.",
    "palavrasChave": [
      "dosimetria",
      "dupla punição",
      "coisa julgada",
      "penal"
    ]
  },
  {
    "id": "pacta-sunt-servanda",
    "termo": "Pacta sunt servanda",
    "categoria": "Latim & Brocardos",
    "significado": "Princípio da força obrigatória dos contratos: os pactos legalmente celebrados vinculam os contratantes como se lei fossem, garantindo a segurança jurídica do tráfego negocial.",
    "etimologiaOuOrigem": "Do latim: os acordos devem ser cumpridos e preservados.",
    "viradaChave": "Não é mais absoluto no direito contemporâneo; é relativizado pela função social do contrato, pela boa-fé objetiva e pela teoria da imprevisão (rebus sic stantibus).",
    "exemplo": "Comprador de imóvel não pode simplesmente deixar de pagar as prestações acordadas por mero descontentamento pessoal, cabendo respeitar as cláusulas firmadas.",
    "palavrasChave": [
      "contratos",
      "força obrigatória",
      "segurança jurídica"
    ]
  },
  {
    "id": "rebus-sic-stantibus",
    "termo": "Cláusula Rebus sic stantibus",
    "categoria": "Latim & Brocardos",
    "significado": "Cláusula implícita em contratos de trato sucessivo ou diferido que condiciona a manutenção da obrigação à permanência do estado de fato existente ao tempo da celebração.",
    "etimologiaOuOrigem": "Do latim: permanecendo as coisas como elas estavam na origem.",
    "viradaChave": "Fundamento da Teoria da Imprevisão (art. 478 do CC): autoriza a resolução ou revisão judicial do contrato quando sobrevier evento extraordinário e imprevisível que cause onerosidade excessiva.",
    "exemplo": "Contrato de safra agrícola internacional atrelado a frete marítimo sofre desequilíbrio absoluto decorrente de guerra imprevisível que encarece o transporte em 800%: cabe revisão judicial.",
    "palavrasChave": [
      "onerosidade excessiva",
      "revisão contratual",
      "imprevisão"
    ]
  },
  {
    "id": "efeito-backlash",
    "termo": "Efeito Backlash",
    "categoria": "Direito Constitucional",
    "significado": "Reação política e social contrária desencadeada por uma decisão judicial contramajoritária da Suprema Corte sobre tema moralmente divisivo na sociedade.",
    "etimologiaOuOrigem": "Do inglês: reação adversa violenta ou contragolpe legislativo/popular.",
    "viradaChave": "Costuma culminar na aprovação de emendas constitucionais ou leis pelo Poder Legislativo para reverter ou neutralizar o precedente fixado pela Suprema Corte.",
    "exemplo": "Após o STF decidir sobre a inconstitucionalidade da vaquejada por crueldade animal, o Congresso Nacional aprovou a Emenda Constitucional 96 autorizando práticas desportivas tradicionais.",
    "palavrasChave": [
      "jurisdição constitucional",
      "diálogos constitucionais",
      "ativismo"
    ]
  },
  {
    "id": "modulacao-dos-efeitos",
    "termo": "Modulação dos efeitos",
    "categoria": "Direito Constitucional",
    "significado": "Técnica de decisão que restringe a retroatividade da declaração de inconstitucionalidade, determinando que ela produza efeitos apenas a partir do trânsito em julgado ou momento futuro.",
    "etimologiaOuOrigem": "Prevista no art. 27 da Lei 9.868/1999 e no art. 927, § 3º, do CPC.",
    "viradaChave": "Exige quórum qualificado de dois terços dos membros do Tribunal (8 ministros no STF) e fundamentação em razões de segurança jurídica ou excepcional interesse social.",
    "exemplo": "STF declara inconstitucional benefício fiscal de ICMS concedido há 15 anos por estado sem autorização do CONFAZ, mas modula os efeitos para não exigir a devolução dos valores pretéritos já recolhidos.",
    "palavrasChave": [
      "segurança jurídica",
      "quórum qualificado",
      "stf"
    ]
  },
  {
    "id": "reserva-do-possivel",
    "termo": "Reserva do possível",
    "categoria": "Direito Constitucional",
    "significado": "Tese de defesa do Poder Público que condiciona a efetivação judicial de direitos econômicos e sociais à existência de disponibilidade orçamentária e financeira do Estado.",
    "etimologiaOuOrigem": "Originada na jurisprudência da Corte Constitucional alemã (caso Numerus Clausus).",
    "viradaChave": "A reserva do possível NÃO PODE ser invocada pelo Estado para descumprir o Mínimo Existencial (vida, saúde básica, dignidade humana) nem se o ente estatal não provar descompasso orçamentário real.",
    "exemplo": "Município se recusa a fornecer vaga em creche alegando falta de verba; o STF afasta a alegação afirmando que educação infantil compõe o núcleo inegociável do mínimo existencial.",
    "palavrasChave": [
      "mínimo existencial",
      "direitos sociais",
      "orçamento"
    ]
  },
  {
    "id": "clausulas-petreas",
    "termo": "Cláusulas pétreas",
    "categoria": "Direito Constitucional",
    "significado": "Núcleo rígido e intangível da Constituição (art. 60, § 4º, da CF/88) insuscetível de abolição ou esvaziamento até mesmo pelo Poder Constituinte Derivado Reformador (Emendas à CF).",
    "etimologiaOuOrigem": "Do grego petra: rocha, solidez imutável.",
    "viradaChave": "São quatro: forma federativa de Estado; voto direto, secreto, universal e periódico; separação dos Poderes; e os direitos e garantias individuais. Não impedem emendas ampliativas, apenas supressivas.",
    "exemplo": "Proposta de Emenda Constitucional que vise suprimir a garantia da ampla defesa ou transformar a federação brasileira em Estado unitário é formalmente inconstitucional ab initio.",
    "palavrasChave": [
      "poder constituinte",
      "federação",
      "direitos fundamentais"
    ]
  },
  {
    "id": "perda-de-uma-chance",
    "termo": "Teoria da Perda de uma Chance",
    "categoria": "Direito Civil",
    "significado": "Modalidade autônoma de reparação civil em que o prejuízo indenizado não é o ganho final hipotético frustrado, mas a oportunidade real, séria e provável de auferir a vantagem ou evitar o dano.",
    "etimologiaOuOrigem": "Doutrina francesa: perte d'une chance.",
    "viradaChave": "A chance deve ser real e séria, com probabilidade estatística considerável; não se indeniza expectativa fantasiosa, nem se concede a totalidade do valor do prêmio final.",
    "exemplo": "Advogado perde o prazo da apelação em causa com precedentes pacificados a favor do cliente no STJ. O cliente tem direito à indenização pela chance perdida de ver seu recurso julgado.",
    "palavrasChave": [
      "responsabilidade civil",
      "dano patrimonial",
      "nexo causal"
    ]
  },
  {
    "id": "desconsideracao-inversa",
    "termo": "Desconsideração inversa da personalidade jurídica",
    "categoria": "Direito Civil",
    "significado": "Técnica processual e material em que se afasta a autonomia patrimonial da pessoa jurídica para atingir bens da empresa por dívidas particulares contraídas pelo sócio controlador (art. 50, § 2º, CC).",
    "etimologiaOuOrigem": "Reverse piercing of the corporate veil.",
    "viradaChave": "Aplica-se com rigor na fraude à partilha de bens em divórcio ou execuções individuais quando o devedor integraliza todo seu patrimônio em nome de holding familiar para blindar-se.",
    "exemplo": "Empresário em divórcio transfere seus veículos de luxo e imóveis para o nome de empresa patrimonial inativa para fraudar a partilha. A juíza decreta a desconsideração inversa e constringe os bens da PJ.",
    "palavrasChave": [
      "fraude à execução",
      "família",
      "pessoa jurídica",
      "cpc"
    ]
  },
  {
    "id": "vicio-redibitorio",
    "termo": "Vício redibitório",
    "categoria": "Direito Civil",
    "significado": "Defeito oculto pré-existente em coisa recebida em contrato comutativo que a torna imprópria ao uso a que é destinada ou lhe diminui consideravelmente o valor econômico (art. 441 do CC).",
    "etimologiaOuOrigem": "Do latim redhibere: devolver a coisa ao vendedor desfazendo a venda.",
    "viradaChave": "Gera as Ações Edilícias: o adquirente pode optar entre redibir o contrato (devolver e reaver o preço) ou pedir o abatimento proporcional no valor (ação quanti minoris / estimatória).",
    "exemplo": "Comprador adquire veículo usado que parecia perfeito, mas descobre fissura estrutural no bloco do motor que já existia na compra. Tem prazo decadencial de 30 dias para ajuizar ação redibitória.",
    "palavrasChave": [
      "contratos",
      "garantia",
      "ações edilícias",
      "decadência"
    ]
  },
  {
    "id": "eviccao",
    "termo": "Evicção",
    "categoria": "Direito Civil",
    "significado": "Perda total ou parcial de um bem adquirido em contrato oneroso sofrida pelo adquirente em favor de terceiro, em razão de sentença judicial ou ato de apreensão que reconhece direito anterior.",
    "etimologiaOuOrigem": "Do latim evincere: ser vencido em juízo, desapossado legalmente.",
    "viradaChave": "O alienante responde pelos riscos da evicção perante o evicto mesmo se a garantia não estiver expressa no contrato (art. 447 CC), salvo cláusula expressa de exclusão com assunção do risco.",
    "exemplo": "Cidadão compra um terreno em cartório; dois anos depois, terceiro ajuíza reivindicatória provando que a procuração usada na venda era falsa e recupera o lote. O comprador evicto cobra indenização do alienante.",
    "palavrasChave": [
      "compra e venda",
      "alienante",
      "garantia",
      "contratos"
    ]
  },
  {
    "id": "preclusao",
    "termo": "Preclusão",
    "categoria": "Direito Processual Civil",
    "significado": "Perda, extinção ou consumação de uma faculdade processual em virtude do não exercício no prazo próprio, da prática incompatível de outro ato ou do já exercício da faculdade.",
    "etimologiaOuOrigem": "Do latim praecludere: fechar com antecedência, barrar o caminho.",
    "viradaChave": "Possui três espécies: temporal (perdeu o prazo), lógica (praticou ato incompatível, ex.: pagou sem ressalva e depois recorreu) e consumativa (já praticou o ato, não pode repetir ou aditar).",
    "exemplo": "Réu junta contestação no 5º dia do prazo sem alegar incompetência relativa. Não pode protocolar nova peça no 10º dia para aditar a defesa, por ter operado a preclusão consumativa.",
    "palavrasChave": [
      "prazos",
      "preclusão consumativa",
      "lógica",
      "temporal"
    ]
  },
  {
    "id": "irdr",
    "termo": "Incidente de Resolução de Demandas Repetitivas (IRDR)",
    "categoria": "Direito Processual Civil",
    "significado": "Incidente processual do CPC/2015 instaurado em Tribunal de 2º grau (TJ ou TRF) para fixação de tese jurídica obrigatória sobre questão unicamente de direito que se repita em massa.",
    "etimologiaOuOrigem": "Criado pelo CPC de 2015 (arts. 976 a 987) inspirado no modelo alemão de causas piloto.",
    "viradaChave": "Requisitos cumulativos: efetiva repetição de processos sobre a mesma questão de direito E risco de quebra da isonomia ou da segurança jurídica. A admissão suspende todos os processos no Estado.",
    "exemplo": "Milhares de servidores ajuizam ações discutindo o cálculo de gratificação de regência de classe: o TJ admite o IRDR, fixa tese vinculante única e a aplica uniformemente em todos os juízos de 1º grau.",
    "palavrasChave": [
      "precedentes",
      "tribunais",
      "uniformização",
      "cpc"
    ]
  },
  {
    "id": "julgamento-parcial-do-merito",
    "termo": "Julgamento antecipado parcial do mérito",
    "categoria": "Direito Processual Civil",
    "significado": "Decisão interlocutória de mérito em que o magistrado julga em definitivo um ou alguns dos pedidos formulados quando se mostrarem incontroversos ou prontos para julgamento (art. 356 CPC).",
    "etimologiaOuOrigem": "Inovação do CPC/2015 em superação ao dogma da unicidade da sentença de mérito.",
    "viradaChave": "O recurso cabível contra o julgamento antecipado parcial do mérito é o AGRAVO DE INSTRUMENTO (art. 356, § 5º), e NÃO a apelação, pois o processo continuará tramitando para os demais pedidos.",
    "exemplo": "Autor pede divórcio e partilha complexa de 15 empresas com perícia pendente. O réu concorda com o divórcio: o juiz decreta imediatamente o divórcio e o processo prossegue apenas para a partilha.",
    "palavrasChave": [
      "agravo de instrumento",
      "decisão interlocutória",
      "cpc"
    ]
  },
  {
    "id": "crime-impossivel",
    "termo": "Crime impossível",
    "categoria": "Direito Penal",
    "significado": "Tentativa inidônea e atípica que não se pune em virtude da ineficácia absoluta do meio empregado pelo agente ou da impropriedade absoluta do objeto material sobre o qual recai a conduta (art. 17 CP).",
    "etimologiaOuOrigem": "Previsto no art. 17 do Código Penal brasileiro; teoria objetiva temperada.",
    "viradaChave": "A ineficácia ou impropriedade deve ser ABSOLUTA. Se for meramente relativa (ex.: veneno em dose insuficiente ou arma emperrada momentaneamente), responde por tentativa punível.",
    "exemplo": "Indivíduo atira três vezes contra desafeto que, comprovado por necropsia prévia, já havia falecido de infarto fulminante três horas antes: impropriedade absoluta do objeto (cadáver não pode ser morto).",
    "palavrasChave": [
      "tentativa",
      "atipicidade",
      "código penal",
      "objeto"
    ]
  },
  {
    "id": "desistencia-voluntaria",
    "termo": "Desistência voluntária",
    "categoria": "Direito Penal",
    "significado": "Figura em que o agente, durante a execução do delito, cessa voluntariamente os atos executórios que ainda tinha a faculdade física de prosseguir, impedindo a consumação do plano delitivo (art. 15 CP).",
    "etimologiaOuOrigem": "A chamada 'ponte de ouro' da dogmática penal (Fórmula de Frank: 'posso prosseguir, mas não quero').",
    "viradaChave": "Diferença crucial da tentativa: na tentativa o agente quer prosseguir mas não pode (interrupção alheia); na desistência ele pode prosseguir mas não quer. O agente só responde pelos atos já praticados.",
    "exemplo": "Assaltante engatilha a arma contra o caixa, tem mais 5 cartuchos, mas após o pedido de clemência do atendente desiste espontaneamente e vai embora: responde apenas pelo porte de arma / ameaça.",
    "palavrasChave": [
      "ponte de ouro",
      "fórmula de frank",
      "tentativa",
      "artigo 15"
    ]
  },
  {
    "id": "arrependimento-eficaz",
    "termo": "Arrependimento eficaz",
    "categoria": "Direito Penal",
    "significado": "Hipótese em que o agente, tendo esgotado integralmente os atos executórios do crime, atua ativamente para impedir que o resultado consumativo se produza, obtendo sucesso nessa salvação (art. 15 CP).",
    "etimologiaOuOrigem": "Também integra a 'ponte de ouro' penal de Von Liszt.",
    "viradaChave": "Exige EFICÁCIA da ação salvadora: se a vítima falecer apesar do socorro médico prestado pelo agressor, ele responderá por homicídio consumado (com mera atenuante genérica do art. 65, III, b).",
    "exemplo": "Agente ministra veneno letal na bebida da vítima mas, arrependido imediatamente após ela ingerir, a leva ao hospital e entrega o antídoto aos médicos salvando-lhe a vida: responde por lesão corporal.",
    "palavrasChave": [
      "ponte de ouro",
      "resultado evitado",
      "consumação",
      "salvamento"
    ]
  },
  {
    "id": "arrependimento-posterior",
    "termo": "Arrependimento posterior",
    "categoria": "Direito Penal",
    "significado": "Causa legal de diminuição de pena de um a dois terços aplicável aos crimes cometidos sem violência ou grave ameaça à pessoa, quando o agente repara o dano ou restitui a coisa até o recebimento da denúncia (art. 16 CP).",
    "etimologiaOuOrigem": "Instituído pela reforma da Parte Geral do Código Penal de 1984.",
    "viradaChave": "Marco temporal fatal e requisitos: deve ser voluntário, integral, em crime sem violência à pessoa e ANTES do RECEBIMENTO DA DENÚNCIA ou queixa. Reparação posterior só gera atenuante genérica.",
    "exemplo": "Autor de furto devolve a totalidade das joias furtadas antes do juiz receber a denúncia apresentada pelo Ministério Público. Terá direito subjetivo à redução de 1 a 2 terços da pena na 3ª fase.",
    "palavrasChave": [
      "restituição",
      "denúncia",
      "redução de pena",
      "sem violência"
    ]
  },
  {
    "id": "cadeia-de-custodia",
    "termo": "Cadeia de custódia da prova",
    "categoria": "Direito Processual Penal",
    "significado": "Conjunto de todos os procedimentos documentados utilizados para manter e registrar a história cronológica do vestígio coletado em locais de crime (arts. 158-A a 158-F do CPP).",
    "etimologiaOuOrigem": "Positivada no CPP brasileiro pela Lei Anticrime (Lei 13.964/2019).",
    "viradaChave": "A quebra substancial da cadeia de custódia (ex.: lacre rompido sem registro pericial, armazenamento irregular) gera a inidoneidade do elemento e a ilicitude probatória com desentranhamento dos autos.",
    "exemplo": "Celular com mensagens extraídas é apreendido sem lacre oficial e manipulado por policiais sem espelhamento forense certificado: o STJ anula a prova pela quebra insanável da cadeia de custódia.",
    "palavrasChave": [
      "perícia",
      "vestígio",
      "lei anticrime",
      "nulidade"
    ]
  },
  {
    "id": "anpp",
    "termo": "Acordo de Não Persecução Penal (ANPP)",
    "categoria": "Direito Processual Penal",
    "significado": "Negócio jurídico processual pré-processual entre o Ministério Público e o investigado para extinção da punibilidade sem processo penal nem reincidência (art. 28-A do CPP).",
    "etimologiaOuOrigem": "Introduzido pela Lei 13.964/2019 (Pacote Anticrime).",
    "viradaChave": "Requisitos: crime sem violência ou grave ameaça, pena mínima inferior a 4 anos e confissão formal e circunstanciada da prática delitiva. Não gera maus antecedentes nem reincidência.",
    "exemplo": "Investigado primário por furto simples confessa a conduta, repara o dano à vítima e presta serviços comunitários por 6 meses conforme ANPP homologado: o juiz extingue a punibilidade.",
    "palavrasChave": [
      "justiça consensual",
      "lei anticrime",
      "confissão",
      "extinção de punibilidade"
    ]
  },
  {
    "id": "autotutela",
    "termo": "Princípio da Autotutela Administrativa",
    "categoria": "Direito Administrativo",
    "significado": "Poder-dever conferido à Administração Pública de rever seus próprios atos de ofício, anulando os ilegais e revogando os inoportunos ou inconvenientes (Súmulas 346 e 473 do STF).",
    "etimologiaOuOrigem": "Do grego auto (por si mesmo) e tutela (proteção/controle).",
    "viradaChave": "A anulação de atos que gerem efeitos favoráveis ao destinatário de boa-fé decai no prazo de 5 anos (art. 54 da Lei 9.784/99) e exige contraditório prévio perante a Administração.",
    "exemplo": "Prefeitura constata que concurso público sofreu fraude no gabarito: com base na autotutela, a própria Administração anula a homologação do certame sem necessitar de autorização judicial prévia.",
    "palavrasChave": [
      "súmula 473",
      "anulação",
      "revogação",
      "decadência"
    ]
  },
  {
    "id": "poder-de-policia",
    "termo": "Poder de polícia administrativo",
    "categoria": "Direito Administrativo",
    "significado": "Atividade estatal da administração pública que condiciona ou limita o exercício de direitos individuais, liberdades e a propriedade privada em prol do interesse público (art. 78 do CTN).",
    "etimologiaOuOrigem": "Do grego politeia: administração da ordem da polis.",
    "viradaChave": "Possui quatro ciclos: ordem, consentimento, fiscalização e sanção. O STF fixou que as fases de consentimento, fiscalização e sanção podem ser delegadas a estatais de capital misto com personalidade privada.",
    "exemplo": "Vigilância Sanitária interdita restaurante comercial e apreende carnes vencidas aplicando auto de infração: exercício legítimo e autoexecutório do poder de polícia.",
    "palavrasChave": [
      "autoexecutoriedade",
      "discricionariedade",
      "coercibilidade",
      "interdição"
    ]
  },
  {
    "id": "lancamento-por-homologacao",
    "termo": "Lançamento por homologação",
    "categoria": "Direito Tributário",
    "significado": "Modalidade de constituição do crédito tributário em que o próprio contribuinte apura o valor devido, declara ao fisco e antecipa o pagamento sem prévia análise estatal (art. 150 do CTN).",
    "etimologiaOuOrigem": "Também denominado doutrinariamente de 'autolançamento'.",
    "viradaChave": "Se o contribuinte antecipou qualquer pagamento, o prazo de decadência do Fisco é de 5 anos do fato gerador (art. 150, § 4º). Se houve dolo/fraude ou zero pagamento, o prazo é de 5 anos do 1º dia do exercício seguinte (art. 173, I).",
    "exemplo": "Empresa apura o ICMS e recolhe mensalmente o valor calculado. O Fisco tem 5 anos da data do recolhimento para auditar as guias e homologar expressa ou tacitamente o crédito tributário.",
    "palavrasChave": [
      "icms",
      "tributos",
      "decadência",
      "ctn"
    ]
  },
  {
    "id": "anterioridade-nonagesimal",
    "termo": "Anterioridade nonagesimal (Noventena)",
    "categoria": "Direito Tributário",
    "significado": "Garantia constitucional tributária que proíbe a cobrança de tributo antes de decorridos noventa dias da data em que tiver sido publicada a lei que o instituiu ou aumentou (art. 150, III, c, CF).",
    "etimologiaOuOrigem": "Introduzida expressamente com amplitude geral pela Emenda Constitucional 42/2003.",
    "viradaChave": "Aplica-se CUMULATIVAMENTE com a anterioridade do exercício financeiro (anual), exceto para os tributos expressamente excepcionados pelo texto constitucional (ex.: II, IE, IPI, IOF, Contribuições Sociais da Seguridade).",
    "exemplo": "Lei publicada em 15 de dezembro aumenta alíquota de ITCMD. A nova alíquota só pode ser cobrada a partir de 15 de março do ano seguinte, respeitando cumulativamente a virada do ano e os 90 dias.",
    "palavrasChave": [
      "não surpresa",
      "segurança jurídica",
      "noventena",
      "constitucional"
    ]
  },
  {
    "id": "primazia-da-realidade",
    "termo": "Princípio da Primazia da Realidade",
    "categoria": "Direito do Trabalho",
    "significado": "Princípio basilar do Direito do Trabalho que estabelece a prevalência dos fatos concretos ocorridos no dia a dia da prestação de serviços sobre as formas ou documentos formais subscritos pelas partes.",
    "etimologiaOuOrigem": "Sistematizado pelo mestre uruguaio Américo Plá Rodriguez.",
    "viradaChave": "Contratos de 'pejotização' (PJ), recibos de quitação e acordos escritos não prevalecem se a rotina fática comprovar a presença dos requisitos de subordinação, habitualidade, onerosidade e pessoalidade (art. 3º CLT).",
    "exemplo": "Trabalhador foi obrigado a abrir MEI para prestar serviços de vendedor com chefe direto e horário fixo de 8h diárias. A Justiça do Trabalho reconhece o vínculo empregatício direto desconsiderando a PJ.",
    "palavrasChave": [
      "pejotização",
      "vínculo de emprego",
      "subordinação",
      "clt"
    ]
  },
  {
    "id": "inalterabilidade-contratual-lesiva",
    "termo": "Princípio da inalterabilidade contratual lesiva",
    "categoria": "Direito do Trabalho",
    "significado": "Regra do art. 468 da CLT que proíbe alterações nas condições do contrato de trabalho por iniciativa unilateral do empregador que resultem em prejuízos diretos ou indiretos ao empregado.",
    "etimologiaOuOrigem": "Princípio protetivo decorrente da assimetria na relação empregado-empregador.",
    "viradaChave": "Mesmo havendo consentimento formal assinado do empregado, a alteração é nula de pleno direito se lhe acarretar prejuízo pecuniário, de saúde ou desvio prejudicial de funções.",
    "exemplo": "Empresa transfere unilateralmente empregado que trabalhava de dia para o turno da madrugada com redução salarial: a alteração é manifestamente nula com base no art. 468 da CLT.",
    "palavrasChave": [
      "artigo 468",
      "salário",
      "turno",
      "nulidade"
    ]
  },
  {
    "id": "incompatibilidade-vs-impedimento",
    "termo": "Incompatibilidade vs. Impedimento da Advocacia",
    "categoria": "Ética & Deontologia",
    "significado": "Distinção fundamental das restrições ao exercício da advocacia (arts. 27 a 30 da Lei 8.906/94). A incompatibilidade acarreta proibição total; o impedimento impõe restrição parcial.",
    "etimologiaOuOrigem": "Estatuto da Advocacia e da Ordem dos Advogados do Brasil (Lei 8.906/94).",
    "viradaChave": "Incompatibilidade (proibição total de clinicar): membros do Judiciário, Ministério Público, chefes do Executivo, policiais e auditores fiscais. Impedimento (parcial): deputados e servidores não podem advogar contra a Fazenda que os remunera.",
    "exemplo": "Policial militar formado em Direito tem incompatibilidade absoluta (art. 28, V, EAOAB): não pode advogar em hipótese alguma. Já o servidor do INSS é apenas impedido de advogar contra a União/INSS.",
    "palavrasChave": [
      "estatuto da oab",
      "prerrogativas",
      "servidor público",
      "proibição"
    ]
  },
  {
    "id": "inviolabilidade-do-advogado",
    "termo": "Inviolabilidade do escritório e sigilo profissional",
    "categoria": "Ética & Deontologia",
    "significado": "Prerrogativa da advocacia (art. 7º, II, da Lei 8.906/94) que assegura a inviolabilidade de seu escritório, correspondências, computadores e comunicações telefônicas no exercício profissional.",
    "etimologiaOuOrigem": "Garantia constitucional e legal para salvaguardar a ampla defesa do cidadão.",
    "viradaChave": "Mandado de busca e apreensão só pode ser expedido se o próprio advogado for alvo de investigação por coautoria delitiva, com decisão motivada específica e acompanhado obrigatoriamente por representante da OAB.",
    "exemplo": "Polícia cumpre busca no escritório de advocacia para apreender documentos confidenciais do cliente sem a presença de delegado da OAB. A diligência é nula e as provas são imprestáveis.",
    "palavrasChave": [
      "prerrogativas",
      "sigilo",
      "busca e apreensão",
      "oab"
    ]
  },
  {
    "id": "nemo-tenetur-se-detegere",
    "termo": "Nemo tenetur se detegere",
    "categoria": "Latim & Brocardos",
    "significado": "Ninguém é obrigado a produzir prova contra si mesmo. Princípio da não autoincriminação e direito ao silêncio.",
    "etimologiaOuOrigem": "Princípio do direito processual penal e da Convenção Americana de Direitos Humanos.",
    "viradaChave": "O investigado não pode ser forçado a fornecer padrões vocais, teste de bafômetro ou reconstituição simulada, mas deve tolerar intervenções meramente passivas previstas em lei.",
    "exemplo": "Motorista recusa soprar bafômetro: não comete crime de desobediência, podendo sofrer apenas infração administrativa de trânsito.",
    "palavrasChave": [
      "direito ao silêncio",
      "autoincriminação",
      "provas",
      "persecução penal"
    ]
  },
  {
    "id": "exceptio-non-adimpleti-contractus",
    "termo": "Exceptio non adimpleti contractus",
    "categoria": "Latim & Brocardos",
    "significado": "Exceção do contrato não cumprido (art. 476 CC). Nos contratos bilaterais, nenhum dos contratantes pode exigir o implemento da obrigação do outro antes de cumprir a sua.",
    "etimologiaOuOrigem": "Do direito romano medieval da actio e exceptio contratual.",
    "viradaChave": "A recusa de cumprimento deve ser proporcional (exceptio non rite adimpleti contractus para cumprimento defeituoso).",
    "exemplo": "Comprador de imóvel atrasa as parcelas finais porque a construtora abandonou as obras da área de lazer essencial.",
    "palavrasChave": [
      "contrato bilateral",
      "inadimplemento",
      "defesa contratual"
    ]
  },
  {
    "id": "inter-partes",
    "termo": "Inter partes",
    "categoria": "Latim & Brocardos",
    "significado": "Eficácia restrita apenas às partes que integraram a relação jurídica ou a demanda processual.",
    "etimologiaOuOrigem": "Do latim: entre as partes.",
    "viradaChave": "No controle difuso incidental de constitucionalidade, a regra clássica é a eficácia inter partes, salvo repercussão geral ou resolução do Senado.",
    "exemplo": "Sentença que rescinde contrato entre consumidor e seguradora produz efeitos unicamente entre aquele segurado e aquela companhia.",
    "palavrasChave": [
      "coisa julgada",
      "processo civil",
      "limites subjetivos"
    ]
  },
  {
    "id": "eficacia-horizontal-direitos-fundamentais",
    "termo": "Eficácia horizontal dos direitos fundamentais",
    "categoria": "Direito Constitucional",
    "significado": "Aplicação direta e imediata das normas constitucionais de direitos fundamentais nas relações privadas entre particulares (Drittwirkung).",
    "etimologiaOuOrigem": "Teoria alemã da Drittwirkung der Grundrechte (Günter Dürig e Lüth-Urteil).",
    "viradaChave": "Clubes, associações e empregadores privados não podem expulsar sócios ou demitir sumariamente sem observar o contraditório e a ampla defesa substantiva.",
    "exemplo": "STF anulou exclusão sumária de cooperado pela UBC (União Brasileira de Compositores) por ausência de contraditório interno (RE 201.819).",
    "palavrasChave": [
      "drittwirkung",
      "relações privadas",
      "ampla defesa",
      "contraditório"
    ]
  },
  {
    "id": "minimo-existencial",
    "termo": "Mínimo existencial",
    "categoria": "Direito Constitucional",
    "significado": "Conjunto indeclinável de prestações estatais materiais indispensáveis para assegurar a dignidade humana básica e a subsistência do indivíduo.",
    "etimologiaOuOrigem": "Doutrina de Otto Bachof e jurisprudência constitucional contemporânea.",
    "viradaChave": "Constitui barreira intransponível à discricionariedade política e à alegação estatal de reserva do possível.",
    "exemplo": "Fornecimento de água potável, tratamento para doença grave e vaga em creche pública para primeira infância integram o núcleo duro do mínimo existencial.",
    "palavrasChave": [
      "dignidade humana",
      "direitos fundamentais",
      "reserva do possível"
    ]
  },
  {
    "id": "controle-concentrado",
    "termo": "Controle concentrado de constitucionalidade",
    "categoria": "Direito Constitucional",
    "significado": "Fiscalização abstrata e direta da conformidade de leis e atos normativos perante a Constituição, de competência originária do STF (art. 102, I, a, CF).",
    "etimologiaOuOrigem": "Modelo kelseniano ou austríaco de jurisdição constitucional.",
    "viradaChave": "Não há partes em litígio concreto nem lide subjetiva: o processo é objetivo de defesa pura da higidez da ordem constitucional.",
    "exemplo": "ADI ajuizada pelo Conselho Federal da OAB para declarar inconstitucional lei estadual que cobrava taxa judiciária desproporcional.",
    "palavrasChave": [
      "adi",
      "adc",
      "adpf",
      "stf",
      "processo objetivo"
    ]
  },
  {
    "id": "controle-difuso",
    "termo": "Controle difuso de constitucionalidade",
    "categoria": "Direito Constitucional",
    "significado": "Fiscalização incidental realizada por qualquer juiz ou tribunal no bojo de um caso concreto subjetivo levado à apreciação judicial.",
    "etimologiaOuOrigem": "Modelo norte-americano originário do célebre precedente Marbury v. Madison (1803).",
    "viradaChave": "A declaração de inconstitucionalidade opera como questão prejudicial no julgamento da causa, produzindo efeitos ex tunc e inter partes.",
    "exemplo": "Juiz de 1º grau afasta aplicação de taxa municipal e julga procedente a ação de restituição de indébito tributário.",
    "palavrasChave": [
      "incidental",
      "marbury v madison",
      "cláusula de reserva de plenário"
    ]
  },
  {
    "id": "clausula-de-reserva-de-plenario",
    "termo": "Cláusula de reserva de plenário (Full Bench)",
    "categoria": "Direito Constitucional",
    "significado": "Exigência (art. 97 CF) de voto da maioria absoluta dos membros do tribunal ou do órgão especial para declarar a inconstitucionalidade de lei no controle difuso.",
    "etimologiaOuOrigem": "Norma constitucional brasileira com reflexo na Súmula Vinculante 10 do STF.",
    "viradaChave": "Órgão fracionário (câmara ou turma) que afasta lei sem declarar expressamente a inconstitucionalidade viola frontalmente a Súmula Vinculante 10.",
    "exemplo": "Câmara Cível que nega vigência a artigo do CPC sem remeter ao Órgão Especial tem seu acórdão cassado em Reclamação ao STF.",
    "palavrasChave": [
      "súmula vinculante 10",
      "tribunais",
      "art 97 cf",
      "órgão especial"
    ]
  },
  {
    "id": "adimplemento-substancial",
    "termo": "Adimplemento substancial",
    "categoria": "Direito Civil",
    "significado": "Teoria segundo a qual não se admite a resolução contratual se a prestação devida foi quase integralmente cumprida, restando apenas parcela ínfima pendente.",
    "etimologiaOuOrigem": "Substantial performance do direito contratual inglês e italiano.",
    "viradaChave": "O credor não pode resolver o contrato nem retomar o bem, mas mantém integralmente o direito de cobrar o saldo devedor pelas vias executivas comuns.",
    "exemplo": "Comprador de veículo financiado pagou 46 de 48 parcelas: o banco não pode ajuizar busca e apreensão para rescindir o contrato, devendo promover execução.",
    "palavrasChave": [
      "boa-fé",
      "resolução contratual",
      "proporcionalidade",
      "stj"
    ]
  },
  {
    "id": "prescricao-e-decadencia",
    "termo": "Prescrição e Decadência",
    "categoria": "Direito Civil",
    "significado": "Prescrição é a perda da pretensão exigível pelo decurso do tempo (art. 189 CC). Decadência é a extinção do próprio direito potestativo pelo não exercício no prazo.",
    "etimologiaOuOrigem": "Doutrina de Agnelo Amorim Filho sobre a correlação entre direitos e ações.",
    "viradaChave": "A prescrição sujeita-se a causas de interrupção e suspensão (arts. 197 a 202 CC); a decadência legal, em regra, não se interrompe nem suspende.",
    "exemplo": "Cobrança de dívida prescreve em 5 anos (pretensão condenatória). Anulação de negócio jurídico por erro decai em 4 anos (direito potestativo).",
    "palavrasChave": [
      "prazo",
      "pretensão",
      "direito potestativo",
      "agnelo amorim"
    ]
  },
  {
    "id": "desconsideracao-da-personalidade-juridica",
    "termo": "Desconsideração da personalidade jurídica",
    "categoria": "Direito Civil",
    "significado": "Afastamento temporário do véu da autonomia patrimonial da pessoa jurídica para atingir bens particulares dos sócios (Disregard Doctrine).",
    "etimologiaOuOrigem": "Salomon v. Salomon (Inglaterra) e Teoria de Rolf Serick.",
    "viradaChave": "No Código Civil (art. 50), vigora a Teoria Maior (exige fraude, abuso ou confusão patrimonial). No CDC e Direito Ambiental, vigora a Teoria Menor (basta o mero inadimplemento).",
    "exemplo": "Empresa encerra atividades transferindo todo o caixa para conta pessoal dos sócios: juiz aplica desconsideração do art. 50 do CC por confusão patrimonial.",
    "palavrasChave": [
      "teoria maior",
      "teoria menor",
      "confusão patrimonial",
      "cdc"
    ]
  },
  {
    "id": "responsabilidade-civil-objetiva",
    "termo": "Responsabilidade civil objetiva",
    "categoria": "Direito Civil",
    "significado": "Dever de indenizar que independe da prova de culpa ou dolo do agente, fundamentado no risco da atividade ou em expressa previsão legal (art. 927, p. único, CC).",
    "etimologiaOuOrigem": "Teoria do risco criado e risco integral na dogmática jurídica moderna.",
    "viradaChave": "Exige apenas conduta, dano e nexo causal. Rompe-se apenas por caso fortuito/força maior estranho à atividade ou culpa exclusiva da vítima.",
    "exemplo": "Empresa que transporta combustíveis inflamáveis responde objetivamente por explosão na rodovia que atingiu propriedades vizinhas.",
    "palavrasChave": [
      "teoria do risco",
      "nexo causal",
      "dano",
      "indenização"
    ]
  },
  {
    "id": "tutela-de-urgencia-e-evidencia",
    "termo": "Tutela de urgência e Tutela de evidência",
    "categoria": "Direito Processual Civil",
    "significado": "Provimentos jurisdicionais sumários provisórios: urgência exige perigo de dano e fumaça do bom direito (art. 300); evidência independe de demonstração de perigo (art. 311 CPC).",
    "etimologiaOuOrigem": "Microssistema de tutelas provisórias do Código de Processo Civil de 2015.",
    "viradaChave": "Tutela de evidência pode ser concedida liminarmente com base em súmula vinculante, recurso repetitivo ou prova documental de contrato com abuso de direito de defesa.",
    "exemplo": "Pedido de pensão de filho menor com certidão de nascimento: deferimento de tutela de evidência liminar independe de prova de urgência excepcional.",
    "palavrasChave": [
      "tutela provisória",
      "art 300 cpc",
      "art 311 cpc",
      "liminar"
    ]
  },
  {
    "id": "coisa-julgada-material",
    "termo": "Coisa julgada material",
    "categoria": "Direito Processual Civil",
    "significado": "Autoridade que torna imutável e indiscutível a decisão de mérito não mais sujeita a recurso (art. 502 CPC e art. 5º, XXXVI, CF).",
    "etimologiaOuOrigem": "Res judicata do direito romano e princípio da segurança jurídica.",
    "viradaChave": "Diferencia-se da formal: a coisa julgada formal extingue o processo sem impedir repropositura; a material impede qualquer novo julgamento sobre a lide.",
    "exemplo": "Ação de cobrança julgada improcedente com trânsito em julgado impede que o mesmo autor cobre o mesmo título executivo em outra vara.",
    "palavrasChave": [
      "segurança jurídica",
      "art 502 cpc",
      "imutabilidade",
      "ação rescisória"
    ]
  },
  {
    "id": "principio-da-nao-surpresa",
    "termo": "Princípio da não surpresa",
    "categoria": "Direito Processual Civil",
    "significado": "Vedação imposta ao juiz de decidir, em qualquer grau de jurisdição, com base em fundamento a respeito do qual não se tenha dado às partes oportunidade de manifestar-se (art. 9º e 10 CPC).",
    "etimologiaOuOrigem": "Garantia do contraditório substancial e democrático do CPC/2015.",
    "viradaChave": "Aplica-se mesmo quanto a matérias de ordem pública sobre as quais o magistrado deva decidir de ofício (ex.: prescrição ou ilegitimidade passiva).",
    "exemplo": "Juiz não pode extinguir processo de ofício por prescrição sem antes intimar o autor para se manifestar sobre eventual causa suspensiva.",
    "palavrasChave": [
      "contraditório",
      "art 10 cpc",
      "ordem pública",
      "nulidade"
    ]
  },
  {
    "id": "astreintes",
    "termo": "Astreintes (Multa cominatória)",
    "categoria": "Direito Processual Civil",
    "significado": "Multa pecuniária periódica imposta pelo juiz para compelir o réu ao cumprimento de obrigação de fazer ou não fazer específica (art. 537 CPC).",
    "etimologiaOuOrigem": "Instituto de origem francesa (astreindre: forçar, coagir ao cumprimento).",
    "viradaChave": "Possui natureza coercitiva e não indenizatória; não vincula o valor da causa nem sofre limitação a perdas e danos, podendo ser revista se excessiva.",
    "exemplo": "Fixação de multa de R$ 1.000 por dia de atraso até o limite de R$ 50.000 para obrigar plano de saúde a autorizar cirurgia ortopédica.",
    "palavrasChave": [
      "multa diária",
      "art 537 cpc",
      "obrigação de fazer",
      "coerção"
    ]
  },
  {
    "id": "dolo-eventual-vs-culpa-consciente",
    "termo": "Dolo eventual versus Culpa consciente",
    "categoria": "Direito Penal",
    "significado": "Dolo eventual: agente assume o risco de produzir o resultado ('tanto faz'). Culpa consciente: agente prevê o resultado mas acredita piamente que suas habilidades o evitarão.",
    "etimologiaOuOrigem": "Teoria do assentimento (dolo eventual) versus representação da culpa estrita.",
    "viradaChave": "No dolo eventual, o infrator conforma-se com o evento lesivo; na culpa consciente, ele rejeita intimamente o resultado acreditando que não ocorrerá.",
    "exemplo": "Racha em alta velocidade: motorista que avista pedestre e não freia assumindo o risco age com dolo eventual e vai a júri popular.",
    "palavrasChave": [
      "teoria do crime",
      "art 18 cp",
      "tribunal do júri",
      "culpa"
    ]
  },
  {
    "id": "principio-da-insignificancia",
    "termo": "Princípio da insignificância (Crime de bagatela)",
    "categoria": "Direito Penal",
    "significado": "Causa excludente da tipicidade material quando a conduta gera lesão jurídica ínfima, irrelevante e inofensiva ao bem tutelado pelo Estado.",
    "etimologiaOuOrigem": "Claus Roxin e dogmática penal teleológico-funcional.",
    "viradaChave": "O STF fixou 4 vetores cumulativos: mínima ofensividade, nenhuma periculosidade social, reduzidíssimo grau de reprovabilidade e inexpressividade da lesão.",
    "exemplo": "Furto de duas barras de chocolate de R$ 10 de supermercado por réu primário afasta a tipicidade material pelo crime de bagatela.",
    "palavrasChave": [
      "tipicidade material",
      "bagatela",
      "claus roxin",
      "stf"
    ]
  },
  {
    "id": "iter-criminis",
    "termo": "Iter criminis",
    "categoria": "Direito Penal",
    "significado": "Caminho do crime: percurso temporal e fático dividido em cogitação, preparação, execução e consumação delitiva.",
    "etimologiaOuOrigem": "Do latim: a jornada ou marcha do fato criminoso.",
    "viradaChave": "Cogitação e atos meramente preparatórios são impuníveis, salvo quando a lei tipifica o ato preparatório como crime autônomo (ex.: associação criminosa).",
    "exemplo": "Comprar veneno e guardá-lo em casa pensando em matar o desafeto é ato preparatório impunível; colocar o veneno na sopa já é ato de execução.",
    "palavrasChave": [
      "tentativa",
      "atos preparatórios",
      "execução",
      "consumação"
    ]
  },
  {
    "id": "arrependimento-eficaz-e-desistencia",
    "termo": "Desistência voluntária e Arrependimento eficaz",
    "categoria": "Direito Penal",
    "significado": "Ponte de ouro do direito penal (art. 15 CP). O agente voluntariamente desiste de prosseguir na execução ou impede que o resultado se produza.",
    "etimologiaOuOrigem": "Goldene Brücke da dogmática jurídica de Franz von Liszt.",
    "viradaChave": "O agente só responde pelos atos já praticados (tentativa é excluída). 'Posso prosseguir, mas não quero' (desistência); 'não posso prosseguir' (tentativa).",
    "exemplo": "Atirador dispara um tiro no braço da vítima com munição sobrando, cessa os disparos e a leva ao hospital: responde por lesão corporal, não por tentativa de homicídio.",
    "palavrasChave": [
      "ponte de ouro",
      "art 15 cp",
      "tentativa",
      "voluntariedade"
    ]
  },
  {
    "id": "cadeia-de-custodia-da-prova",
    "termo": "Cadeia de custódia da prova",
    "categoria": "Direito Processual Penal",
    "significado": "Conjunto de procedimentos documentados que registram a história cronológica do vestígio desde seu reconhecimento até o descarte (arts. 158-A a 158-F do CPP).",
    "etimologiaOuOrigem": "Introduzida pelo Pacote Anticrime (Lei 13.964/2019).",
    "viradaChave": "A quebra substancial da cadeia de custódia contamina a higidez probatória e acarreta a inadmissibilidade da prova pela perda de confiabilidade.",
    "exemplo": "Apreensão de celular onde policiais manuseiam mensagens sem lacre oficial e sem registrar hash digital gera nulidade da perícia por quebra de custódia.",
    "palavrasChave": [
      "pacote anticrime",
      "perícia",
      "vestígio",
      "inadmissibilidade"
    ]
  },
  {
    "id": "juiz-das-garantias",
    "termo": "Juiz das garantias",
    "categoria": "Direito Processual Penal",
    "significado": "Magistrado responsável pelo controle da legalidade da investigação criminal e pela salvaguarda dos direitos fundamentais do investigado até o recebimento da denúncia (art. 3º-B CPP).",
    "etimologiaOuOrigem": "Modelo acusatório consagrado pelo STF nas ADIs 6.298, 6.299, 6.300 e 6.305.",
    "viradaChave": "O juiz que atua na fase de inquérito e decide sobre prisões cautelares fica impedido de julgar a ação penal de mérito, preservando a imparcialidade do julgador.",
    "exemplo": "Juiz que decretou a quebra de sigilo bancário e interceptação telefônica na fase pré-processual não pode sentenciar o processo de mérito.",
    "palavrasChave": [
      "imparcialidade",
      "sistema acusatório",
      "stf",
      "inquérito"
    ]
  },
  {
    "id": "acordo-de-nao-persecucao-penal",
    "termo": "Acordo de não persecução penal (ANPP)",
    "categoria": "Direito Processual Penal",
    "significado": "Negócio jurídico processual celebrado entre o Ministério Público e o investigado, com confissão formal e condições despenalizadoras (art. 28-A do CPP).",
    "etimologiaOuOrigem": "Justiça penal consensual e negociada fortalecida pela Lei 13.964/2019.",
    "viradaChave": "Requisitos: crime sem violência ou grave ameaça, pena mínima inferior a 4 anos e confissão circunstanciada. Cumprido o acordo, o juiz extingue a punibilidade sem gerar reincidência.",
    "exemplo": "Autor de estelionato primário confessa formalmente o fato, ressarce integralmente o dano e presta serviços comunitários, extinguindo a punibilidade.",
    "palavrasChave": [
      "anpp",
      "justiça consensual",
      "art 28-a cpp",
      "extinção da punibilidade"
    ]
  },
  {
    "id": "improbidade-com-dolo-especifico",
    "termo": "Improbidade administrativa com dolo específico",
    "categoria": "Direito Administrativo",
    "significado": "Regime sancionador da Lei 8.429/92 (após a Lei 14.230/21) que exige comprovada vontade livre e consciente de alcançar o resultado ilícito lesivo ao patrimônio público.",
    "etimologiaOuOrigem": "Reforma substancial da Lei de Improbidade Administrativa pela Lei 14.230/2021.",
    "viradaChave": "A modalidade culposa de improbidade foi inteiramente extirpada do ordenamento jurídico brasileiro. Mero erro administrativo ou inabilidade técnica não configuram improbidade.",
    "exemplo": "Prefeito comete erro formal de contabilidade em licitação sem comprovação de intenção de desviar recursos: a ação de improbidade é julgada improcedente.",
    "palavrasChave": [
      "lei 14230/21",
      "dolo específico",
      "erro inescusável",
      "patrimônio público"
    ]
  },
  {
    "id": "responsabilidade-civil-do-estado",
    "termo": "Responsabilidade civil objetiva do Estado",
    "categoria": "Direito Administrativo",
    "significado": "Dever das pessoas jurídicas de direito público e de direito privado prestadoras de serviços públicos de reparar danos causados por seus agentes (art. 37, § 6º, CF).",
    "etimologiaOuOrigem": "Teoria do risco administrativo consagrada na Constituição de 1988.",
    "viradaChave": "A vítima é dispensada de demonstrar culpa do agente estatal. Assegura-se ao ente público ação regressiva contra o servidor responsável apenas em caso de dolo ou culpa.",
    "exemplo": "Viatura da polícia fura o sinal em perseguição e atinge carro de particular: o Estado indeniza o proprietário independentemente da prova de imprudência do policial.",
    "palavrasChave": [
      "art 37 § 6º",
      "risco administrativo",
      "ação regressiva",
      "serviço público"
    ]
  },
  {
    "id": "principio-da-anterioridade",
    "termo": "Princípio da anterioridade tributária",
    "categoria": "Direito Tributário",
    "significado": "Garantia constitucional (art. 150, III, b e c, CF) que veda a cobrança de tributo no mesmo exercício financeiro de sua publicação (anual) e antes de 90 dias (nonagesimal).",
    "etimologiaOuOrigem": "Princípio da não surpresa fiscal e segurança jurídica dos contribuintes.",
    "viradaChave": "A anterioridade nonagesimal e a anual incidem cumulativamente, salvo exceções constitucionais expressas (ex.: II, IE, IPI, IOF e impostos extraordinários).",
    "exemplo": "Lei que majora o IPTU publicada em 28 de dezembro só poderá ser exigida a partir de 28 de março do ano seguinte para respeitar a noventena.",
    "palavrasChave": [
      "anterioridade anual",
      "noventena",
      "não surpresa",
      "segurança jurídica"
    ]
  },
  {
    "id": "imunidade-vs-isencao",
    "termo": "Imunidade tributária versus Isenção",
    "categoria": "Direito Tributário",
    "significado": "Imunidade é limitação constitucional ao poder de tributar (norma de incompetência fixada na CF). Isenção é dispensa legal do pagamento do tributo veiculada por lei infraconstitucional.",
    "etimologiaOuOrigem": "Classificação dogmática de Geraldo Ataliba e Rubens Gomes de Sousa.",
    "viradaChave": "Imunidades decorrem diretamente da Carta Magna e são cláusulas pétreas (ex.: templos, livros, entidades beneficentes); isenções podem ser revogadas por lei comum a qualquer tempo.",
    "exemplo": "Imunidade de ITBI sobre integralização de capital social decorre da CF; isenção de IPVA para carros elétricos decorre de lei ordinária estadual.",
    "palavrasChave": [
      "imunidade constitucional",
      "isenção legal",
      "competência tributária"
    ]
  },
  {
    "id": "inviolabilidade-sigilo-profissional",
    "termo": "Inviolabilidade do sigilo profissional",
    "categoria": "Ética & Deontologia",
    "significado": "Dever e direito do advogado de guardar segredo sobre fatos de que tomou conhecimento no exercício da profissão (art. 7º, XIX, Lei 8.906/94 e Código de Ética).",
    "etimologiaOuOrigem": "Garantia secular da advocacia e pilar da ampla defesa constitucional.",
    "viradaChave": "O sigilo é de ordem pública e independe de solicitação de reserva pelo cliente; só pode ser quebrado em caso de legítima defesa própria ou grave ameaça à vida.",
    "exemplo": "Advogado intimado como testemunha em inquérito sobre seu cliente deve recusar depor sob a garantia do sigilo profissional.",
    "palavrasChave": [
      "sigilo",
      "prerrogativas da advocacia",
      "código de ética",
      "oab"
    ]
  },
  {
    "id": "quota-litis",
    "termo": "Cláusula quota litis",
    "categoria": "Ética & Deontologia",
    "significado": "Pacto de honorários advocatícios pelo qual a remuneração do causídico é estipulada em percentual sobre o proveito econômico obtido pelo cliente na causa (art. 50 CED/OAB).",
    "etimologiaOuOrigem": "Do latim: quinhão ou quota da lide.",
    "viradaChave": "Os honorários contratuais e sucumbenciais somados não podem ultrapassar as vantagens econômicas auferidas pelo constituinte no processo.",
    "exemplo": "Contrato prevê honorários de 30% sobre os valores recuperados em reclamação trabalhista: é válido porque não supera o benefício líquido auferido pelo autor.",
    "palavrasChave": [
      "honorários advocatícios",
      "êxito",
      "código de ética oab"
    ]
  },
  {
    "id": "jura-novit-curia",
    "termo": "Jura novit curia",
    "categoria": "Latim & Brocardos",
    "significado": "O juiz conhece o direito. Princípio que dispensa a parte de provar o direito nacional aplicável à causa e autoriza o juiz a aplicar a norma correta aos fatos narrados.",
    "etimologiaOuOrigem": "Do latim: a corte tem ciência do ordenamento jurídico vigente.",
    "viradaChave": "A parte é obrigada a provar o direito apenas se alegar direito municipal, estadual, estrangeiro ou consuetudinário, quando determinado pelo juiz (art. 376 CPC).",
    "exemplo": "Autor fundamenta ação de indenização no artigo errado da lei; o magistrado aplica o preceito correto do Código Civil e julga procedente o pedido.",
    "palavrasChave": [
      "direito",
      "iura novit curia",
      "da mihi factum",
      "juiz"
    ]
  },
  {
    "id": "da-mihi-factum-dabo-tibi-jus",
    "termo": "Da mihi factum, dabo tibi jus",
    "categoria": "Latim & Brocardos",
    "significado": "Dá-me o fato e te darei o direito. Corolário da distinção entre a causa de pedir fática (substanciação) e a qualificação jurídica conferida pela petição inicial.",
    "etimologiaOuOrigem": "Axioma romano da atividade jurisdicional de subsunção do fato à norma.",
    "viradaChave": "O autor vincula o juiz à causa de pedir fática e aos pedidos, mas o enquadramento dogmático incumbe ao magistrado.",
    "exemplo": "Autor narra detalhadamente esbulho possessório; o juiz concede reintegração de posse ainda que a petição tenha sido nominada genericamente como ação de manutenção.",
    "palavrasChave": [
      "causa de pedir",
      "substanciação",
      "petição inicial"
    ]
  },
  {
    "id": "ne-procedat-judex-ex-officio",
    "termo": "Ne procedat judex ex officio",
    "categoria": "Latim & Brocardos",
    "significado": "O juiz não deve agir de ofício. Princípio da inércia da jurisdição (art. 2º do CPC) e do sistema acusatório (art. 3º-A do CPP).",
    "etimologiaOuOrigem": "Do latim: a jurisdição é inerte e só age quando regularmente provocada pela parte interessada.",
    "viradaChave": "No processo penal acusatório, o juiz é impedido de iniciar ação penal de ofício ou decretar medidas cautelares sem prévio requerimento da acusação ou autoridade policial.",
    "exemplo": "Juiz que decreta prisão preventiva durante o inquérito policial sem requerimento do MP ou representação da polícia pratica ato nulo por quebra da inércia.",
    "palavrasChave": [
      "inércia",
      "sistema acusatório",
      "art 2 cpc",
      "art 3-a cpp"
    ]
  },
  {
    "id": "poderes-implicitos",
    "termo": "Teoria dos poderes implícitos",
    "categoria": "Direito Constitucional",
    "significado": "Doutrina segundo a qual a atribuição expressa de um fim constitucional a determinado órgão outorga implicitamente todos os meios necessários à sua consecução (Implied Powers).",
    "etimologiaOuOrigem": "Precedente McCulloch v. Maryland (1819) da Suprema Corte dos EUA (Chief Justice John Marshall).",
    "viradaChave": "Fundamentou a tese de repercussão geral (Tema 184 do STF) que reconhece o poder investigatório criminal direto do Ministério Público.",
    "exemplo": "Como a Constituição confere expressamente ao Ministério Público a promoção privativa da ação penal pública, confere implicitamente o poder de colher elementos investigatórios.",
    "palavrasChave": [
      "implied powers",
      "ministério público",
      "investigação",
      "stf"
    ]
  },
  {
    "id": "estado-de-coisas-inconstitucional",
    "termo": "Estado de coisas inconstitucional",
    "categoria": "Direito Constitucional",
    "significado": "Quadro de violação massiva, sistemática e generalizada de direitos fundamentais decorrente de falha estrutural reiterada dos Poderes Públicos.",
    "etimologiaOuOrigem": "Corte Constitucional da Colômbia (Sentença T-025/2004) e recepcionado pelo STF na ADPF 347.",
    "viradaChave": "Autoriza o STF a intervir estruturalmente, ordenando planos integrados e liberação de verbas contingenciadas do Fundo Penitenciário Nacional (Funpen).",
    "exemplo": "Reconhecimento pelo STF do estado de coisas inconstitucional do sistema carcerário brasileiro na ADPF 347, determinando audiências de custódia e descongestionamento.",
    "palavrasChave": [
      "adpf 347",
      "sistema prisional",
      "processo estrutural",
      "stf"
    ]
  },
  {
    "id": "dano-moral-em-ricochete",
    "termo": "Dano moral por ricochete (Reflexo)",
    "categoria": "Direito Civil",
    "significado": "Prejuízo moral suportado por pessoas reflexamente atingidas pelo ato ilícito perpetrado diretamente contra outrem com quem mantêm vínculo afetivo íntimo.",
    "etimologiaOuOrigem": "Doutrina da responsabilidade civil francesa (Dommage par ricochet).",
    "viradaChave": "Pais, cônjuges, filhos e irmãos têm legitimidade ativa própria para pleitear indenização autônoma decorrente da morte ou sequela grave da vítima primária.",
    "exemplo": "Filhos menores e esposa de trabalhador falecido em acidente de trabalho decorrente de culpa patronal têm direito à indenização por dano em ricochete.",
    "palavrasChave": [
      "ricochete",
      "dano reflexo",
      "responsabilidade civil",
      "legitimidade"
    ]
  },
  {
    "id": "posse-ad-usucapionem",
    "termo": "Posse ad usucapionem",
    "categoria": "Direito Civil",
    "significado": "Posse exercida com animus domini (intenção de dono), contínua, pacífica e incontestada durante o lapso temporal exigido em lei para aquisição originária da propriedade.",
    "etimologiaOuOrigem": "Do direito das coisas e usucapião dos arts. 1.238 a 1.242 do Código Civil.",
    "viradaChave": "Mera detenção fática (fâmulo da posse - art. 1.198 CC) ou atos de mera tolerância e permissão nunca induzem posse ad usucapionem.",
    "exemplo": "Caseiro que cuida de chácara mediante remuneração não tem posse ad usucapionem, pois é mero detentor sob ordens do proprietário.",
    "palavrasChave": [
      "usucapião",
      "animus domini",
      "fâmulo da posse",
      "propriedade"
    ]
  },
  {
    "id": "principio-da-dialeticidade",
    "termo": "Princípio da dialeticidade recursal",
    "categoria": "Direito Processual Civil",
    "significado": "Ônus imposto ao recorrente de impugnar específica e fundamentadamente todos os motivos e fundamentos determinantes da decisão recorrida (art. 932, III, e 1.010 CPC).",
    "etimologiaOuOrigem": "Dialética aristotélica e contraditório recursal no processo civil.",
    "viradaChave": "A mera repetição cópia literal da petição inicial ou contestação sem combater a motivação da sentença enseja o não conhecimento do recurso por inépcia formal.",
    "exemplo": "Apelação que reproduz as razões da inicial sem rebater a perícia acolhida pela sentença é rejeitada liminarmente por ausência de dialeticidade.",
    "palavrasChave": [
      "recursos",
      "art 932 cpc",
      "impugnação específica",
      "inépcia"
    ]
  },
  {
    "id": "tutela-inibitoria",
    "termo": "Tutela inibitória",
    "categoria": "Direito Processual Civil",
    "significado": "Provimento jurisdicional preventivo destinado a impedir a prática, a continuação ou a reiteração de um ato ilícito futuro (art. 497, p. único, CPC).",
    "etimologiaOuOrigem": "Doutrina de Luiz Guilherme Marinoni sobre a tutela dos direitos contra o ilícito.",
    "viradaChave": "Independe da ocorrência de dano, culpa ou dolo; seu objeto é a vedação do ato ilícito em si, diferenciando-se da tutela ressarcitória posterior.",
    "exemplo": "Empresa obtém ordem judicial com cominação de multa diária proibindo concorrente de violar sua marca registrada antes do lançamento de produto contrafeito.",
    "palavrasChave": [
      "prevenção",
      "art 497 cpc",
      "astreintes",
      "ilícito"
    ]
  },
  {
    "id": "erro-de-tipo-vs-proibicao",
    "termo": "Erro de tipo versus Erro de proibição",
    "categoria": "Direito Penal",
    "significado": "Erro de tipo: incide sobre os elementos fáticos da realidade (não sabe o que faz - art. 20 CP). Erro de proibição: incide sobre a ilicitude da conduta (sabe o que faz mas crê ser permitido - art. 21 CP).",
    "etimologiaOuOrigem": "Finalismo penal de Hans Welzel.",
    "viradaChave": "O erro de tipo essencial inevitável exclui o dolo e a culpa; o erro de proibição inevitável exclui a culpabilidade (isenção de pena).",
    "exemplo": "Caçador atira em arbusto acreditando ser javali e atinge companheiro: erro de tipo. Turista holandês traz maconha acreditando ser lícito no Brasil: erro de proibição.",
    "palavrasChave": [
      "teoria do crime",
      "hans welzel",
      "dolo",
      "culpabilidade"
    ]
  },
  {
    "id": "fundadas-razoes-busca-domiciliar",
    "termo": "Fundadas razões na busca domiciliar",
    "categoria": "Direito Processual Penal",
    "significado": "Exigência de justa causa prévia e elementos objetivos concretos para o ingresso policial em domicílio sem mandado judicial em flagrante delito (Tema 280 STF).",
    "etimologiaOuOrigem": "Precedente do STF no RE 603.616 e jurisprudência vinculante do STJ (HC 598.051).",
    "viradaChave": "A mera fuga ao avistar a viatura ou denúncia anônima não autorizam a invasão de domicílio. Se a diligência for ilícita, as drogas apreendidas são nulas e o réu é absolvido.",
    "exemplo": "Policiais entram na casa do suspeito apenas porque ele correu para dentro do portão: o STJ anula a apreensão de drogas e tranca a ação penal por ilicitude probatória.",
    "palavrasChave": [
      "inviolabilidade de domicílio",
      "tema 280 stf",
      "hc 598051 stj",
      "prova ilícita"
    ]
  },
  {
    "id": "desvio-de-finalidade",
    "termo": "Desvio de finalidade (Desvio de poder)",
    "categoria": "Direito Administrativo",
    "significado": "Vício insanável do ato administrativo quando o agente público utiliza sua competência legal para alcançar finalidade alheia ao interesse público (art. 2º da Lei 4.717/65).",
    "etimologiaOuOrigem": "Doutrina francesa do détournement de pouvoir do Conselho de Estado.",
    "viradaChave": "Mesmo que o ato seja formalmente perfeito e emitido pela autoridade competente, o objetivo oculto persecutório ou particular contamina o ato de nulidade absoluta.",
    "exemplo": "Prefeito remove servidor estável para cidade distante como retaliação por divergência política: ato nulo por desvio de finalidade.",
    "palavrasChave": [
      "nulidade",
      "ato administrativo",
      "lei da ação popular",
      "abuso de poder"
    ]
  },
  {
    "id": "nao-cumulatividade",
    "termo": "Princípio da não cumulatividade",
    "categoria": "Direito Tributário",
    "significado": "Regra tributária constitucional pela qual o imposto devido em cada operação é compensado com o montante cobrado nas etapas anteriores da cadeia econômica (art. 155, § 2º, I, CF).",
    "etimologiaOuOrigem": "Tributação sobre o valor agregado (IVA) adotada no ICMS, IPI e na Reforma Tributária (IBS e CBS).",
    "viradaChave": "Evita o efeito cascata da tributação incidente sobre insumos e matérias-primas na cadeia produtiva.",
    "exemplo": "Indústria de calçados credita o ICMS pago na compra de couro e solventes para abater do imposto devido na venda dos sapatos aos lojistas.",
    "palavrasChave": [
      "icms",
      "efeito cascata",
      "compensação de créditos",
      "iva"
    ]
  },
  {
    "id": "grupo-economico-trabalhista",
    "termo": "Grupo econômico trabalhista",
    "categoria": "Direito do Trabalho",
    "significado": "Solidariedade passiva de empresas que mantêm controle societário ou comunhão de interesses e atuação conjunta integrada (art. 2º, §§ 2º e 3º da CLT).",
    "etimologiaOuOrigem": "Solidariedade do empregador único formulada pela CLT e modificada pela Lei 13.467/2017.",
    "viradaChave": "Após a Reforma Trabalhista, a mera identidade de sócios não basta: exige-se demonstração de interesse integrado e comunhão efetiva de operações.",
    "exemplo": "Holding e controladas respondem solidariamente pelas verbas rescisórias devidas a empregado de uma das filiais insolventes.",
    "palavrasChave": [
      "solidariedade",
      "art 2 clt",
      "reforma trabalhista",
      "execução trabalhista"
    ]
  },
  {
    "id": "conflito-de-interesses-advocacia",
    "termo": "Conflito de interesses na advocacia",
    "categoria": "Ética & Deontologia",
    "significado": "Proibição imposta ao advogado de patrocinar clientes com interesses colidentes ou representar a parte contrária sem prévia renúncia ética (art. 19 do Código de Ética e Disciplina).",
    "etimologiaOuOrigem": "Dever basilar de lealdade e fidelidade profissional ao cliente.",
    "viradaChave": "Havendo conflito superveniente entre mandantes conjuntos, o advogado deve optar por um deles com prudência, renunciando formalmente ao patrocínio do outro.",
    "exemplo": "Advogado que atuou em divórcio consensual não pode representar apenas o marido em posterior execução litigiosa de partilha contra a ex-esposa.",
    "palavrasChave": [
      "lealdade",
      "conflito",
      "código de ética",
      "oab"
    ]
  },
  {
    "id": "ab-initio",
    "termo": "Ab initio",
    "categoria": "Latim & Brocardos",
    "significado": "Desde o início. Expressão utilizada para indicar que determinado efeito jurídico ou nulidade absoluta retroage à origem do ato ou negócio jurídico.",
    "etimologiaOuOrigem": "Do latim clássico: desde o princípio.",
    "viradaChave": "Atos nulos de pleno direito operam ab initio (ex tunc), não gerando efeitos jurídicos válidos perante a ordem jurídica.",
    "exemplo": "Casamento contraído por pessoa já casada é nulo ab initio, não produzindo efeitos sucessórios.",
    "palavrasChave": [
      "nulidade absoluta",
      "ex tunc",
      "origem",
      "civil"
    ]
  },
  {
    "id": "de-cujus",
    "termo": "De cujus",
    "categoria": "Latim & Brocardos",
    "significado": "Aquele de cuja sucessão se trata. Expressão tradicional utilizada no direito das sucessões para designar a pessoa falecida autora da herança.",
    "etimologiaOuOrigem": "Abreviação da fórmula latina 'de cujus successione agitur'.",
    "viradaChave": "Com a abertura da sucessão pela morte do de cujus, a herança transmite-se desde logo aos herdeiros legítimos e testamentários (droit de saisine - art. 1.784 CC).",
    "exemplo": "Os herdeiros tornam-se coproprietários imediatos do acervo patrimonial deixado pelo de cujus no instante exato do óbito.",
    "palavrasChave": [
      "sucessões",
      "herança",
      "saisine",
      "inventário"
    ]
  },
  {
    "id": "mutatis-mutandis",
    "termo": "Mutatis mutandis",
    "categoria": "Latim & Brocardos",
    "significado": "Mudando o que deve ser mudado. Expressão empregada para indicar aplicação analógica ou adaptação de um raciocínio a situação semelhante com as devidas alterações.",
    "etimologiaOuOrigem": "Do latim: feitas as necessárias alterações correspondentes.",
    "viradaChave": "Muito utilizada em decisões judiciais para estender precedentes de um ramo do direito a outro com as necessárias adaptações estruturais.",
    "exemplo": "As regras sobre citação nula no processo civil aplicam-se, mutatis mutandis, ao rito do processo penal.",
    "palavrasChave": [
      "analogia",
      "precedentes",
      "jurisprudência"
    ]
  },
  {
    "id": "pro-rata-die",
    "termo": "Pro rata die",
    "categoria": "Latim & Brocardos",
    "significado": "Na proporção do dia. Cálculo ou pagamento de obrigação financeira calculado dia a dia proporcionalmente ao tempo decorrido.",
    "etimologiaOuOrigem": "Do latim: proporcionalmente a cada dia.",
    "viradaChave": "Comum na cobrança de juros de mora contratuais ou no cálculo proporcional de benefícios previdenciários e salariais no mês da rescisão.",
    "exemplo": "Ao desocupar o imóvel alugado no dia 12 do mês, o inquilino paga o aluguel pro rata die correspondente a apenas 12 dias.",
    "palavrasChave": [
      "proporcionalidade",
      "juros",
      "cálculo",
      "obrigações"
    ]
  },
  {
    "id": "habeas-data",
    "termo": "Habeas Data",
    "categoria": "Direito Constitucional",
    "significado": "Ação constitucional de tutela das liberdades (art. 5º, LXXII, CF) destinada a assegurar o conhecimento de registros e informações pessoais ou a sua retificação.",
    "etimologiaOuOrigem": "Garantia criada pela Constituição de 1988 contra abusos do regime autoritário.",
    "viradaChave": "Exige prévia recusa da autoridade administrativa ou decurso de prazo legal sem resposta (Súmula 2 do STJ).",
    "exemplo": "Cidadão que tem acesso negado aos seus próprios registros arquivados no banco de dados da Receita Federal impetra Habeas Data.",
    "palavrasChave": [
      "remédio constitucional",
      "informação",
      "súmula 2 stj"
    ]
  },
  {
    "id": "mandado-de-seguranca",
    "termo": "Mandado de Segurança",
    "categoria": "Direito Constitucional",
    "significado": "Ação constitucional mandamental (art. 5º, LXIX, CF e Lei 12.016/09) para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, contra ilegalidade de autoridade.",
    "etimologiaOuOrigem": "Criação autóctone do direito constitucional brasileiro (Constituição de 1934).",
    "viradaChave": "Exige prova documental pré-constituída no momento da inicial: não admite dilação probatória ou oitiva de testemunhas.",
    "exemplo": "Candidato aprovado dentro das vagas de concurso público cujo prazo expirou impetra Mandado de Segurança com a publicação oficial para nomeação imediata.",
    "palavrasChave": [
      "direito líquido e certo",
      "lei 12016",
      "prova pré-constituída"
    ]
  },
  {
    "id": "acao-popular",
    "termo": "Ação Popular",
    "categoria": "Direito Constitucional",
    "significado": "Ação constitucional ajuizável privativamente por qualquer cidadão no gozo dos direitos políticos para anular ato lesivo ao patrimônio público, moralidade ou meio ambiente (art. 5º, LXXIII, CF).",
    "etimologiaOuOrigem": "Instrumento democrático regulamentado pela Lei 4.717/1965.",
    "viradaChave": "Pessoa jurídica não tem legitimidade ativa (Súmula 365 do STF); o autor cidadão é isento de custas salvo comprovada má-fé.",
    "exemplo": "Eleitor ajuíza Ação Popular para anular contrato de publicidade superfaturado assinado pelo prefeito sem licitação.",
    "palavrasChave": [
      "cidadão",
      "patrimônio público",
      "súmula 365 stf",
      "moralidade"
    ]
  },
  {
    "id": "clausula-penal",
    "termo": "Cláusula penal (Multa rescisória)",
    "categoria": "Direito Civil",
    "significado": "Pacto acessório pelo qual as partes estipulam previamente a indenização devida em caso de inadimplemento absoluto ou mora (arts. 408 a 416 do CC).",
    "etimologiaOuOrigem": "Stipulatio poenae do direito romano clássico.",
    "viradaChave": "O juiz DEVE reduzir equitativamente a penalidade se a obrigação principal tiver sido cumprida em parte ou se o montante for manifestamente excessivo (art. 413 CC).",
    "exemplo": "Contrato de prestação de serviços com 90% executado: juiz reduz a multa rescisória de 50% para 5% do valor total.",
    "palavrasChave": [
      "multa contratual",
      "art 413 cc",
      "redução equitativa"
    ]
  },
  {
    "id": "coisa-julgada-formal",
    "termo": "Coisa julgada formal",
    "categoria": "Direito Processual Civil",
    "significado": "Imutabilidade da decisão dentro do mesmo processo em que foi proferida, decorrente da preclusão de todos os recursos cabíveis, sem impedir que a lide seja reproposta em nova ação.",
    "etimologiaOuOrigem": "Distinção dogmática entre eficácia endoprocessual e panprocessual da sentença.",
    "viradaChave": "Ocorre nas sentenças que extinguem o processo sem resolução de mérito (art. 485 CPC), permitindo nova ação se corrigido o vício.",
    "exemplo": "Processo extinto por falta de documento essencial ou abandono: a parte pode recolher as custas e ajuizar nova petição inicial com a documentação em ordem.",
    "palavrasChave": [
      "preclusão",
      "art 485 cpc",
      "sem resolução de mérito"
    ]
  },
  {
    "id": "efeito-translativo",
    "termo": "Efeito translativo dos recursos",
    "categoria": "Direito Processual Civil",
    "significado": "Aptidão do recurso de devolver ao tribunal o exame de matérias de ordem pública cognoscíveis de ofício, mesmo que não tenham sido expressamente suscitadas nas razões recursais.",
    "etimologiaOuOrigem": "Doutrina processualista moderna sobre a profundidade do efeito devolutivo.",
    "viradaChave": "Permite ao tribunal extinguir o processo por ilegitimidade passiva ou reconhecer decadência de ofício mesmo sem alegação na apelação.",
    "exemplo": "Ao julgar apelação do réu sobre o valor de danos morais, o tribunal reconhece de ofício a decadência e extingue a ação com julgamento de mérito.",
    "palavrasChave": [
      "ordem pública",
      "efeito devolutivo",
      "cognição de ofício"
    ]
  },
  {
    "id": "litispendencia",
    "termo": "Litispendência",
    "categoria": "Direito Processual Civil",
    "significado": "Pressuposto processual negativo configurado quando se reproduz ação judicial idêntica a outra que já está em curso (mesmas partes, mesma causa de pedir e mesmo pedido - art. 337, §§ 1º a 3º CPC).",
    "etimologiaOuOrigem": "Do latim: lide pendente de julgamento perante o juízo.",
    "viradaChave": "A segunda ação ajuizada deve ser extinta sem resolução de mérito (art. 485, V, CPC), evitando decisões conflitantes sobre o mesmo litígio.",
    "exemplo": "Autor distribui a mesma ação de cobrança em duas comarcas diferentes na tentativa de obter liminar favorável: a segunda é extinta por litispendência.",
    "palavrasChave": [
      "tríplice identidade",
      "pressuposto negativo",
      "art 337 cpc"
    ]
  },
  {
    "id": "conexao-e-continencia",
    "termo": "Conexão e Continência",
    "categoria": "Direito Processual Civil",
    "significado": "Modificadores de competência: conexão ocorre quando há identidade de pedido ou causa de pedir (art. 55); continência ocorre quando as partes e causa de pedir são iguais, mas o pedido de uma abrange o da outra (art. 56 CPC).",
    "etimologiaOuOrigem": "Mecanismos de economia processual e prevenção de decisões contraditórias.",
    "viradaChave": "Determinam a reunião das ações perante o juízo prevento para julgamento conjunto simultâneo.",
    "exemplo": "Ação de despejo e ação revisional do mesmo contrato de aluguel correm conectadas para evitar sentenças incompatíveis.",
    "palavrasChave": [
      "modificação de competência",
      "art 55 cpc",
      "prevenção",
      "julgamento conjunto"
    ]
  },
  {
    "id": "nexo-de-causalidade",
    "termo": "Nexo de causalidade",
    "categoria": "Direito Penal",
    "significado": "Vínculo de causa e efeito entre a conduta do agente e o resultado naturalístico produzido no mundo real (art. 13 do CP).",
    "etimologiaOuOrigem": "Teoria da conditio sine qua non (equivalência dos antecedentes causais) e juízo de eliminação hipotética de Thyrén.",
    "viradaChave": "Superveniência de causa relativamente independente que por si só produziu o resultado exclui a imputação do resultado final (art. 13, § 1º, CP).",
    "exemplo": "Vítima baleada de raspão morre em virtude de capotamento da ambulância a caminho do pronto-socorro: atirador responde apenas por tentativa de homicídio.",
    "palavrasChave": [
      "conditio sine qua non",
      "art 13 cp",
      "causa superveniente",
      "imputação"
    ]
  },
  {
    "id": "excludentes-de-ilicitude",
    "termo": "Excludentes de ilicitude (Causas de justificação)",
    "categoria": "Direito Penal",
    "significado": "Circunstâncias legais que afastam a antijuridicidade do fato típico: estado de necessidade, legítima defesa, estrito cumprimento de dever legal e exercício regular de direito (art. 23 CP).",
    "etimologiaOuOrigem": "Estrutura tripartite do crime (fato típico, ilícito e culpável).",
    "viradaChave": "A conduta continua sendo formal e materialmente típica, mas deixa de ser crime porque o ordenamento autoriza excepcionalmente a lesão ao bem jurídico.",
    "exemplo": "Policial atira em sequestrador armado que apontava pistola contra a cabeça do refém: age em legítima defesa de terceiro, excluindo o crime.",
    "palavrasChave": [
      "art 23 cp",
      "legítima defesa",
      "estado de necessidade",
      "antijuridicidade"
    ]
  },
  {
    "id": "culpabilidade-elementos",
    "termo": "Culpabilidade e seus elementos normativos",
    "categoria": "Direito Penal",
    "significado": "Juízo de reprovação social que recai sobre o autor de um fato típico e ilícito, composto por: imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa.",
    "etimologiaOuOrigem": "Teoria normativa pura da culpabilidade (Hans Welzel).",
    "viradaChave": "A coação moral irresistível e a obediência hierárquica à ordem não manifestamente ilegal excluem a exigibilidade de conduta diversa (art. 22 CP).",
    "exemplo": "Gerente de banco que entrega dinheiro aos assaltantes sob ameaça de morte iminente de sua família age sob coação moral irresistível e fica isento de pena.",
    "palavrasChave": [
      "imputabilidade",
      "exigibilidade",
      "art 22 cp",
      "teoria do crime"
    ]
  },
  {
    "id": "padrao-probatorio-in-dubio",
    "termo": "Standard probatório (Beyond a Reasonable Doubt)",
    "categoria": "Direito Processual Penal",
    "significado": "Grau de certeza e confirmação empírica exigido para que uma hipótese fática acusatória seja considerada provada e autorize condenação criminal (além de qualquer dúvida razoável).",
    "etimologiaOuOrigem": "Teoria epistemológica da prova e standard do common law.",
    "viradaChave": "Mera probabilidade ou convicção íntima do juiz não bastam; exige-se corroboração objetiva de todas as premissas e refutação das hipóteses defensivas plausíveis.",
    "exemplo": "Reconhecimento fotográfico realizado fora das formalidades do art. 226 do CPP não atinge o standard probatório para condenação isolada.",
    "palavrasChave": [
      "standard",
      "dúvida razoável",
      "epistemologia",
      "art 226 cpp"
    ]
  },
  {
    "id": "autoexecutoriedade-administrativa",
    "termo": "Autoexecutoriedade do ato administrativo",
    "categoria": "Direito Administrativo",
    "significado": "Atributo pelo qual a Administração Pública pode executar direta e materialmente suas próprias decisões e impor medidas coercitivas sem necessidade de prévia autorização judicial.",
    "etimologiaOuOrigem": "Doutrina clássica dos atributos do ato administrativo.",
    "viradaChave": "Existe apenas quando expressamente prevista em lei ou em situações urgentes de iminente risco à ordem pública ou saúde coletiva.",
    "exemplo": "Demolição imediata de obra clandestina com risco iminente de desabamento ou apreensão de mercadorias contrabandeadas em porto.",
    "palavrasChave": [
      "atributos",
      "coerção direta",
      "poder de polícia",
      "urgência"
    ]
  },
  {
    "id": "presuncao-de-legitimidade",
    "termo": "Presunção de legitimidade e veracidade",
    "categoria": "Direito Administrativo",
    "significado": "Atributo do ato administrativo segundo o qual presume-se que foi editado em estrita conformidade com a lei e que os fatos alegados pela Administração são verdadeiros (iuris tantum).",
    "etimologiaOuOrigem": "Princípio da continuidade do serviço público e fé pública estatal.",
    "viradaChave": "Trata-se de presunção relativa que admite prova em contrário, transferindo o ônus da prova da ilegalidade ao administrado que o impugna.",
    "exemplo": "Multa de trânsito lavrada por agente goza de presunção de veracidade até que o condutor comprove documentalmente que o veículo clonado estava em outra cidade.",
    "palavrasChave": [
      "iuris tantum",
      "ônus da prova",
      "fé pública",
      "ato administrativo"
    ]
  },
  {
    "id": "substituicao-tributaria-para-frente",
    "termo": "Substituição tributária progressiva (Para frente)",
    "categoria": "Direito Tributário",
    "significado": "Mecanismo pelo qual a lei atribui a determinado contribuinte o dever de recolher o tributo devido pelas operações mercantis futuras que serão praticadas por outrem (art. 150, § 7º, CF).",
    "etimologiaOuOrigem": "Praticidade e fiscalização fiscal no ICMS.",
    "viradaChave": "Se a base de cálculo real da venda final ao consumidor for inferior à presumida, o contribuinte tem direito à restituição imediata da diferença (Tema 201 STF).",
    "exemplo": "Montadora de automóveis recolhe o ICMS de toda a cadeia na saída da fábrica com base no preço sugerido de venda ao consumidor na concessionária.",
    "palavrasChave": [
      "icms-st",
      "tema 201 stf",
      "fato gerador presumido",
      "restituição"
    ]
  },
  {
    "id": "fato-gerador-tributario",
    "termo": "Fato gerador da obrigação tributária",
    "categoria": "Direito Tributário",
    "significado": "Situação definida em lei como necessária e suficiente para o surgimento da obrigação tributária principal (art. 114 do CTN).",
    "etimologiaOuOrigem": "Teoria da hipótese de incidência tributária de Geraldo Ataliba.",
    "viradaChave": "A hipótese de incidência é a previsão abstrata na lei; o fato imponível é a concretização fática no mundo real que faz nascer o débito fiscal.",
    "exemplo": "Adquirir a propriedade de bem imóvel no registro imobiliário constitui o fato gerador do ITBI; auferir renda líquida constitui o fato gerador do Imposto de Renda.",
    "palavrasChave": [
      "hipótese de incidência",
      "ctn art 114",
      "obrigação tributária",
      "ataliba"
    ]
  },
  {
    "id": "estabilidade-gestante-trabalho",
    "termo": "Estabilidade provisória da empregada gestante",
    "categoria": "Direito do Trabalho",
    "significado": "Garantia contra dispensa arbitrária ou sem justa causa desde a confirmação da gravidez até cinco meses após o parto (art. 10, II, b, do ADCT).",
    "etimologiaOuOrigem": "Proteção constitucional à maternidade e ao nascituro.",
    "viradaChave": "A responsabilidade do empregador é puramente objetiva: independe do conhecimento prévio da gestação pelo empregador ou até mesmo pela própria trabalhadora (Súmula 244 TST).",
    "exemplo": "Empregada demitida descobre gravidez ocorrida antes do aviso-prévio: tem direito à reintegração ou indenização substitutiva integral de todos os salários.",
    "palavrasChave": [
      "adct art 10",
      "súmula 244 tst",
      "maternidade",
      "responsabilidade objetiva"
    ]
  },
  {
    "id": "horas-in-itinere",
    "termo": "Horas in itinere (Tempo de deslocamento)",
    "categoria": "Direito do Trabalho",
    "significado": "Tempo despendido pelo empregado até o local de trabalho e para o seu retorno em condução fornecida pelo empregador.",
    "etimologiaOuOrigem": "Antigo § 2º do art. 58 da CLT, profundamente alterado pela Reforma Trabalhista (Lei 13.467/2017).",
    "viradaChave": "Após a Reforma Trabalhista, o tempo de deslocamento NÃO é considerado tempo à disposição do empregador, ainda que o local seja de difícil acesso ou não servido por transporte público.",
    "exemplo": "Trabalhador rural transportado em ônibus da usina por 2 horas diárias: após 2017, essas horas não são mais computadas na jornada de trabalho para pagamento.",
    "palavrasChave": [
      "deslocamento",
      "reforma trabalhista",
      "art 58 clt",
      "tempo à disposição"
    ]
  },
  {
    "id": "captacao-indevida-de-clientela",
    "termo": "Captação indevida de clientela (Mercantilização)",
    "categoria": "Ética & Deontologia",
    "significado": "Infração disciplinar que veda a utilização de meios mercantis, publicidade ostensiva abusiva, agenciamento ou compra de causas para atração de clientes (art. 34, IV, da Lei 8.906/94).",
    "etimologiaOuOrigem": "Princípio da nobreza e dignidade da advocacia como função essencial à justiça.",
    "viradaChave": "O Provimento 205/2021 da OAB autoriza o marketing jurídico de conteúdo informativo nas redes sociais, mas proíbe terminantemente a mercantilização e a promessa de resultado certo.",
    "exemplo": "Advogado que distribui panfletos promocionais em ponto de ônibus prometendo 'aposentadoria garantida em 30 dias' comete infração disciplinar grave.",
    "palavrasChave": [
      "mercantilização",
      "marketing jurídico",
      "provimento 205",
      "oab art 34"
    ]
  }
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

function normalizeSearchText(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[º°ª\.\,\;\:\-\_()\[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchDicionario(query?: string, categoria?: string): DicionarioEntry[] {
  const rawQ = (query || "").trim();
  const c = categoria && categoria !== "Todas as Categorias" ? categoria : null;

  if (!rawQ && !c) return DICIONARIO_JURIDICO;

  const normQuery = normalizeSearchText(rawQ);
  const queryTokens = normQuery.split(" ").filter(Boolean);

  return DICIONARIO_JURIDICO.filter((entry) => {
    if (c && entry.categoria !== c) return false;
    if (queryTokens.length === 0) return true;

    const searchable = normalizeSearchText(
      `${entry.termo} ${entry.significado} ${entry.viradaChave} ${entry.exemplo} ${entry.palavrasChave.join(" ")}`
    );

    return queryTokens.every((token) => searchable.includes(token));
  });
}

export function getRandomDicionarioEntry(): DicionarioEntry {
  const idx = Math.floor(Math.random() * DICIONARIO_JURIDICO.length);
  return DICIONARIO_JURIDICO[idx]!;
}

export function getDicionarioStats(): {
  total: number;
  porCategoria: Record<string, number>;
} {
  const porCategoria: Record<string, number> = {};
  for (const entry of DICIONARIO_JURIDICO) {
    porCategoria[entry.categoria] = (porCategoria[entry.categoria] ?? 0) + 1;
  }
  return {
    total: DICIONARIO_JURIDICO.length,
    porCategoria,
  };
}

