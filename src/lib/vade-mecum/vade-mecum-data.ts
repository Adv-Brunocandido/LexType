// Banco Integral do Vade Mecum Digital LexType
// Gerado automaticamente pelo compilador mestre de legislação

export interface VadeMecumItem {
  id: string;
  artigoNum: number;
  diploma: string;
  dispositivo: string;
  texto: string;
  explicacao: string;
  eixo: string;
  disciplina: string;
  fonteOficial: string;
  atualidade?: string;
  casoConcreto?: string;
}

export interface DiplomaMeta {
  diploma: string;
  count: number;
  icon: string;
}

export const DIPLOMAS_META: DiplomaMeta[] = [
  {
    "diploma": "Constituição Federal de 1988",
    "count": 77,
    "icon": "🏛️"
  },
  {
    "diploma": "Código Civil (Lei 10.406/02)",
    "count": 27,
    "icon": "📜"
  },
  {
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "count": 19,
    "icon": "⚖️"
  },
  {
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "count": 23,
    "icon": "🛡️"
  },
  {
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "count": 14,
    "icon": "🔍"
  },
  {
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "count": 25,
    "icon": "💼"
  },
  {
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "count": 11,
    "icon": "💰"
  },
  {
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "count": 12,
    "icon": "🛒"
  },
  {
    "diploma": "Estatuto da Advocacia e da OAB (Lei 8.906/94)",
    "count": 6,
    "icon": "⚖️"
  },
  {
    "diploma": "Lei de Improbidade Administrativa (Lei 8.429/92)",
    "count": 2,
    "icon": "🏛️"
  },
  {
    "diploma": "Nova Lei de Licitações (Lei 14.133/21)",
    "count": 2,
    "icon": "📑"
  },
  {
    "diploma": "Lei de Execução Penal (Lei 7.210/84)",
    "count": 1,
    "icon": "⛓️"
  },
  {
    "diploma": "Lei do Mandado de Segurança (Lei 12.016/09)",
    "count": 1,
    "icon": "⚡"
  },
  {
    "diploma": "Lei da Ação Civil Pública (Lei 7.347/85)",
    "count": 1,
    "icon": "👥"
  },
  {
    "diploma": "Lei dos Juizados Especiais Cíveis e Criminais (Lei 9.099/95)",
    "count": 2,
    "icon": "⏱️"
  },
  {
    "diploma": "Lei de Drogas (Lei 11.343/06)",
    "count": 1,
    "icon": "🚫"
  },
  {
    "diploma": "Lei Maria da Penha (Lei 11.340/06)",
    "count": 1,
    "icon": "🌸"
  },
  {
    "diploma": "Súmula Vinculante STF",
    "count": 9,
    "icon": "⭐"
  },
  {
    "diploma": "Súmula STJ",
    "count": 4,
    "icon": "📖"
  },
  {
    "diploma": "Súmula TST",
    "count": 1,
    "icon": "🔨"
  }
];

export const VADE_MECUM_ITEMS: VadeMecumItem[] = [
  {
    "id": "cf88-art1",
    "artigoNum": 1,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 1º",
    "texto": "A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito e tem como fundamentos: I - a soberania; II - a cidadania; III - a dignidade da pessoa humana; IV - os valores sociais do trabalho e da livre iniciativa; V - o pluralismo político.",
    "explicacao": "Fundamentos republicanos da República Federativa do Brasil (mnemônico SOCIDIVAPLU). A dignidade da pessoa humana funciona como ápice axiológico de todo o ordenamento jurídico.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art2",
    "artigoNum": 2,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 2º",
    "texto": "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.",
    "explicacao": "Princípio da Separação dos Poderes e sistema de freios e contrapesos (checks and balances). É cláusula pétrea (art. 60, § 4º, III).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art3",
    "artigoNum": 3,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 3º",
    "texto": "Constituem objetivos fundamentais da República Federativa do Brasil: I - construir uma sociedade livre, justa e solidária; II - garantir o desenvolvimento nacional; III - erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais; IV - promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.",
    "explicacao": "Objetivos fundamentais e diretrizes programáticas do Estado brasileiro. Diferenciam-se dos fundamentos por expressarem metas a serem ativamente implementadas.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art4",
    "artigoNum": 4,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 4º",
    "texto": "A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios: I - independência nacional; II - prevalência dos direitos humanos; III - autodeterminação dos povos; IV - não-intervenção; V - igualdade entre os Estados; VI - defesa da paz; VII - solução pacífica dos conflitos; VIII - repúdio ao terrorismo e ao racismo; IX - cooperação entre os povos para o progresso da humanidade; X - concessão de asilo político.",
    "explicacao": "Princípios orientadores das relações exteriores do Brasil perante a comunidade internacional e tratados multilaterais.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Internacional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-caput",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, caput",
    "texto": "Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade.",
    "explicacao": "Princípio da isonomia material e formal. O STF estende as garantias também a estrangeiros não residentes em trânsito no território nacional.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-i",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, I",
    "texto": "Homens e mulheres são iguais em direitos e obrigações, nos termos desta Constituição.",
    "explicacao": "Isonomia de gênero com admissão de discriminações positivas (ações afirmativas) para compensar desigualdades fáticas históricas.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-ii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, II",
    "texto": "Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei.",
    "explicacao": "Princípio da legalidade ampla para o particular (pode fazer tudo o que a lei não proíbe) vs. estrita legalidade para a administração pública.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-iii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, III",
    "texto": "Ninguém será submetido a tortura nem a tratamento desumano ou degradante.",
    "explicacao": "Vedação absoluta da tortura e tratamentos cruéis. Direito absoluto insuscetível de ponderação ou relativização em qualquer hipótese fática.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direitos Humanos",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-iv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, IV",
    "texto": "É livre a manifestação do pensamento, sendo vedado o anonimato.",
    "explicacao": "Liberdade de expressão com proibição expressa ao anonimato para resguardar o direito de resposta e responsabilização civil/penal.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-v",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, V",
    "texto": "É assegurado o direito de resposta, proporcional ao agravo, além da indenização por dano material, moral ou à imagem.",
    "explicacao": "Direito de resposta regulamentado pela Lei 13.188/15. A concessão do direito de resposta não elide nem reduz o dever de indenizar danos morais.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-vi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, VI",
    "texto": "É inviolável a liberdade de consciência e de crença, sendo assegurado o livre exercício dos cultos religiosos e garantida, na forma da lei, a proteção aos locais de culto e a suas liturgias.",
    "explicacao": "Laicidade do Estado e liberdade de crença, descrença e culto.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-viii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, VIII",
    "texto": "Ninguém será privado de direitos por motivo de crença religiosa ou de convicção filosófica ou política, salvo se as invocar para eximir-se de obrigação legal a todos imposta e recusar-se a cumprir prestação alternativa, fixada em lei.",
    "explicacao": "Escusa de consciência (objeção de consciência). Se recusar tanto a obrigação geral quanto a prestação alternativa, sofre perda/suspensão dos direitos políticos.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-ix",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, IX",
    "texto": "É livre a expressão da atividade intelectual, artística, científica e de comunicação, independentemente de censura ou licença.",
    "explicacao": "Vedação à censura prévia de qualquer natureza no ordenamento jurídico brasileiro.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-x",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, X",
    "texto": "São invioláveis a intimidade, a vida privada, a honra e a imagem das pessoas, assegurado o direito a indenização pelo dano material ou moral decorrente de sua violação.",
    "explicacao": "Tutela constitucional dos direitos da personalidade e responsabilidade civil correlata.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XI",
    "texto": "A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.",
    "explicacao": "Inviolabilidade domiciliar. Determinação judicial somente durante o dia. Flagrante delito, desastre ou socorro podem ocorrer dia ou noite (Tema 280 STF exige justa causa prévia demonstrada).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)",
    "casoConcreto": "Policiais invadem residência à noite sem mandado e sem fundadas razões prévias de flagrante. Toda a apreensão de drogas é anulada e as provas ilícitas desentranhadas."
  },
  {
    "id": "cf88-art5-xii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XII",
    "texto": "É inviolável o sigilo da correspondência e das comunicações telegráficas, de dados e das comunicações telefônicas, salvo, no último caso, por ordem judicial, nas hipóteses e na forma que a lei estabelecer para fins de investigação criminal ou instrução processual penal.",
    "explicacao": "Inviolabilidade de comunicações. Interceptação telefônica exige ordem de juiz penal para crime apenado com reclusão nos termos da Lei 9.296/96.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xiii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XIII",
    "texto": "É livre o exercício de qualquer trabalho, ofício ou profissão, atendidas as qualificações profissionais que a lei estabelecer.",
    "explicacao": "Norma de eficácia contida: liberdade plena até que lei ordinária estabeleça requisitos específicos (ex.: Exame de Ordem da OAB).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xiv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XIV",
    "texto": "É assegurado a todos o acesso à informação e resguardado o sigilo da fonte, quando necessário ao exercício profissional.",
    "explicacao": "Acesso à informação pública e garantia de sigilo de fonte jornalística.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XV",
    "texto": "É livre a locomoção no território nacional em tempo de paz, podendo qualquer pessoa, nos termos da lei, nele entrar, permanecer ou dele sair com seus bens.",
    "explicacao": "Liberdade de locomoção, tutelada pelo remédio do habeas corpus.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xvi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XVI",
    "texto": "Todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de autorização, desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo apenas exigido prévio aviso à autoridade competente.",
    "explicacao": "Direito de reunião. Não exige autorização prévia de autoridade pública. O STF fixou no Tema 855 que o prévio aviso pode ser suprido pela veiculação pública da manifestação nas redes sociais.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xvii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XVII",
    "texto": "É plena a liberdade de associação para fins lícitos, vedada a de caráter paramilitar.",
    "explicacao": "Liberdade associativa.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xviii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XVIII",
    "texto": "A criação de associações e, na forma da lei, a de cooperativas independem de autorização, sendo vedada a interferência estatal em seu funcionamento.",
    "explicacao": "Autonomia privada associativa contra ingerência estatal.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xix",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XIX",
    "texto": "As associações só poderão ser compulsoriamente dissolvidas ou ter suas atividades suspensas por decisão judicial, exigindo-se, no primeiro caso, o trânsito em julgado.",
    "explicacao": "Dissolução compulsória de associação exige decisão judicial com trânsito em julgado; mera suspensão pode ocorrer por liminar judicial.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xx",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XX",
    "texto": "Ninguém poderá ser compelido a associar-se ou a permanecer associado.",
    "explicacao": "Liberdade associativa negativa (ninguém é obrigado a associar-se nem permanecer associado, Tema 492 STF).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXI",
    "texto": "As entidades associativas, quando expressamente autorizadas, têm legitimidade para representar seus filiados judicial ou extrajudicialmente.",
    "explicacao": "Representação processual específica (exige autorização expressa individual ou assemblear). Diferencia-se da substituição processual dos sindicatos e mandados de segurança coletivos.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXII",
    "texto": "É garantido o direito de propriedade.",
    "explicacao": "Direito fundamental de propriedade.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxiii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXIII",
    "texto": "A propriedade atenderá a sua função social.",
    "explicacao": "Função social como elemento conformador e limitador do direito de propriedade.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxiv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXIV",
    "texto": "A lei estabelecerá o procedimento para desapropriação por necessidade ou utilidade pública, ou por interesse social, mediante justa e prévia indenização em dinheiro, ressalvados os casos previstos nesta Constituição.",
    "explicacao": "Desapropriação ordinária: indenização prévia, justa e em dinheiro.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXV",
    "texto": "No caso de iminente perigo público, a autoridade competente poderá usar de propriedade particular, assegurada ao proprietário indenização ulterior, se houver dano.",
    "explicacao": "Requisição administrativa de bens privados.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxvii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXVII",
    "texto": "Aos autores pertence o direito exclusivo de utilização, publicação ou reprodução de suas obras, transmissível aos herdeiros pelo tempo que a lei fixar.",
    "explicacao": "Direitos autorais patrimoniais e morais.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxx",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXX",
    "texto": "É garantido o direito de herança.",
    "explicacao": "Proteção constitucional à sucessão hereditária.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxxii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXXII",
    "texto": "O Estado promoverá, na forma da lei, a defesa do consumidor.",
    "explicacao": "Mandamento constitucional que originou o Código de Defesa do Consumidor (Lei 8.078/90).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxxiii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXXIII",
    "texto": "Todos têm direito a receber dos órgãos públicos informações de seu interesse particular, ou de interesse coletivo ou geral, que serão prestadas no prazo da lei, sob pena de responsabilidade, ressalvadas aquelas cujo sigilo seja imprescindível à segurança da sociedade e do Estado.",
    "explicacao": "Direito à informação pública regulamentado pela Lei de Acesso à Informação (Lei 12.527/11).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxxiv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXXIV",
    "texto": "São a todos assegurados, independentemente do pagamento de taxas: a) o direito de petição aos Poderes Públicos em defesa de direitos ou contra ilegalidade ou abuso de poder; b) a obtenção de certidões em repartições públicas, para defesa de direitos e esclarecimento de situações de interesse pessoal.",
    "explicacao": "Direito de petição e obtenção de certidões gratuitas, imunes à exigência de taxas (Súmula Vinculante 28).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxxv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXXV",
    "texto": "A lei não excluirá da apreciação do Poder Judiciário lesão ou ameaça a direito.",
    "explicacao": "Princípio da inafastabilidade da jurisdição (acesso à justiça). Não se exige exaurimento da via administrativa para acionar o Judiciário, salvo justiça desportiva e habeas data.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxxvi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXXVI",
    "texto": "A lei não prejudicará o direito adquirido, o ato jurídico perfeito e a coisa julgada.",
    "explicacao": "Segurança jurídica e irretroatividade prejudicial das leis.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxxvii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXXVII",
    "texto": "Não haverá juízo ou tribunal de exceção.",
    "explicacao": "Princípio do juiz natural pré-constituído por lei anterior aos fatos.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxxviii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXXVIII",
    "texto": "É reconhecida a instituição do júri, com a organização que lhe der a lei, assegurados: a) a plenitude de defesa; b) o sigilo das votações; c) a soberania dos veredictos; d) a competência para o julgamento dos crimes dolosos contra a vida.",
    "explicacao": "Princípios constitucionais do Tribunal do Júri para crimes dolosos contra a vida consumados ou tentados.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xxxix",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XXXIX",
    "texto": "Não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal.",
    "explicacao": "Legalidade estrita penal (anterioridade, reserva legal e taxatividade).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xl",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XL",
    "texto": "A lei penal não retroagirá, salvo para beneficiar o réu.",
    "explicacao": "Retroatividade benigna (novatio legis in mellius e abolitio criminis retroagem; novatio legis in pejus é irretroativa).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xli",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XLI",
    "texto": "A lei punirá qualquer discriminação atentatória dos direitos e liberdades fundamentais.",
    "explicacao": "Mandado de criminalização contra discriminações e intolerâncias.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direitos Humanos",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xlii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XLII",
    "texto": "A prática do racismo constitui crime inafiançável e imprescritível, sujeito à pena de reclusão, nos termos da lei.",
    "explicacao": "Inafiançabilidade e imprescritibilidade do racismo (e injúria racial equiparada pela Lei 14.532/23).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xliii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XLIII",
    "texto": "A lei considerará crimes inafiançáveis e insuscetíveis de graça ou anistia a prática da tortura, o tráfico ilícito de entorpecentes e drogas afins, o terrorismo e os definidos como crimes hediondos, por eles respondendo os mandantes, os executores e os que, podendo evitá-los, se omitirem.",
    "explicacao": "Crimes equiparados a hediondos (3T: Tortura, Tráfico, Terrorismo + Hediondos). São inafiançáveis e insuscetíveis de graça, anistia ou indulto (STF), mas são prescritíveis.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xliv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XLIV",
    "texto": "Constitui crime inafiançável e imprescritível a ação de grupos armados, civis ou militares, contra a ordem constitucional e o Estado Democrático.",
    "explicacao": "Segundo crime imprescritível e inafiançável expressamente previsto na CF/88 (junto com o racismo).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xlv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XLV",
    "texto": "Nenhuma pena passará da pessoa do condenado, podendo a obrigação de reparar o dano e a decretação do perdimento de bens ser, nos termos da lei, estendidas aos sucessores e contra eles executadas, até o limite do valor do patrimônio transferido.",
    "explicacao": "Princípio da intranscendência da pena penal. As obrigações patrimoniais civis e de perdimento transmitem-se aos herdeiros nos limites da herança.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xlvi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XLVI",
    "texto": "A lei regulará a individualização da pena e adotará, entre outras, as seguintes: a) privação ou restrição da liberdade; b) perda de bens; c) multa; d) prestação social alternativa; e) suspensão ou interdição de direitos.",
    "explicacao": "Princípio da individualização da pena nos planos legislativo, judicial e executório.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xlvii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XLVII",
    "texto": "Não haverá penas: a) de morte, salvo em caso de guerra declarada, nos termos do art. 84, XIX; b) de caráter perpétuo; c) de trabalhos forçados; d) de banimento; e) cruéis.",
    "explicacao": "Penas expressamente vedadas pela Constituição. Exceção da pena de morte: somente em guerra externa formalmente declarada.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-xlix",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, XLIX",
    "texto": "É assegurado aos presos o respeito à integridade física e moral.",
    "explicacao": "Dever de custódia e dignidade do apenado.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direitos Humanos",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-li",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LI",
    "texto": "Nenhum brasileiro será extraditado, salvo o naturalizado, em caso de crime comum, praticado antes da naturalização, ou de comprovado envolvimento em tráfico ilícito de entorpecentes e drogas afins, na forma da lei.",
    "explicacao": "Vedação de extradição de brasileiro nato. Brasileiro naturalizado só pode ser extraditado por crime comum anterior ou tráfico de drogas a qualquer tempo.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LII",
    "texto": "Não será concedida extradição de estrangeiro por crime político ou de opinião.",
    "explicacao": "Vedação à extradição por crimes políticos ou de opinião.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Internacional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-liii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LIII",
    "texto": "Ninguém será processado nem sentenciado senão pela autoridade competente.",
    "explicacao": "Garantia do juiz natural competente.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-liv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LIV",
    "texto": "Ninguém será privado da liberdade ou de seus bens sem o devido processo legal.",
    "explicacao": "Devido processo legal substancial (razoabilidade/proporcionalidade) e formal.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lv",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LV",
    "texto": "Aos litigantes, em processo judicial ou administrativo, e aos acusados em geral são assegurados o contraditório e ampla defesa, com os meios e recursos a ela inerentes.",
    "explicacao": "Contraditório e ampla defesa aplicáveis a processos judiciais e administrativos sancionadores.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lvi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LVI",
    "texto": "São inadmissíveis, no processo, as provas obtidas por meios ilícitos.",
    "explicacao": "Inadmissibilidade das provas ilícitas e teoria dos frutos da árvore envenenada.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lvii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LVII",
    "texto": "Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.",
    "explicacao": "Princípio da presunção de não culpabilidade (presunção de inocência). A execução provisória da pena exige trânsito em julgado das instâncias extraordinárias.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lviii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LVIII",
    "texto": "O civilmente identificado não será submetido a identificação criminal, salvo nas hipóteses previstas em lei.",
    "explicacao": "Garantia contra identificação criminal abusiva (Lei 12.037/09).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXI",
    "texto": "Ninguém será preso senão em flagrante delito ou por ordem escrita e fundamentada de autoridade judiciária competente, salvo nos casos de transgressão militar ou crime propriamente militar, definidos em lei.",
    "explicacao": "Reserva de jurisdição para prisões cautelares.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXII",
    "texto": "A prisão de qualquer pessoa e o local onde se encontre serão comunicados imediatamente ao juiz competente e à família do preso ou à pessoa por ele indicada.",
    "explicacao": "Comunicação imediata da prisão e realização de audiência de custódia em 24h.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxiii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXIII",
    "texto": "O preso será informado de seus direitos, entre os quais o de permanecer calado, sendo-lhe assegurada a assistência da família e de advogado.",
    "explicacao": "Aviso de Miranda e garantia da não autoincriminação (nemo tenetur se detegere).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxvi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXVI",
    "texto": "Ninguém será levado à prisão ou nela mantido, quando a lei admitir a liberdade provisória, com ou sem fiança.",
    "explicacao": "Excepcionalidade da segregação cautelar e liberdade provisória.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxvii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXVII",
    "texto": "Não haverá prisão civil por dívida, salvo a do responsável pelo inadimplemento voluntário e inescusável de obrigação alimentícia e a do depositário infiel.",
    "explicacao": "Prisão civil por dívida: a Súmula Vinculante 25 do STF pacificou ser ilícita a prisão do depositário infiel, restando apenas o devedor de alimentos.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxviii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXVIII",
    "texto": "Conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção, por ilegalidade ou abuso de poder.",
    "explicacao": "Ação constitucional de habeas corpus (preventivo ou repressivo). Gratuita e isenta de custas e procuração.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxix",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXIX",
    "texto": "Conceder-se-á mandado de segurança para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público.",
    "explicacao": "Mandado de segurança individual (natureza residual e exigência de prova documental pré-constituída sem dilação probatória).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxx",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXX",
    "texto": "O mandado de segurança coletivo pode ser impetrado por: a) partido político com representação no Congresso Nacional; b) organização sindical, entidade de classe ou associação legalmente constituída e em funcionamento há pelo menos um ano, em defesa dos interesses de seus membros ou associados.",
    "explicacao": "Mandado de segurança coletivo. Partido político exige ao menos 1 parlamentar no Congresso; associação exige 1 ano de funcionamento prévio.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxxi",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXXI",
    "texto": "Conceder-se-á mandado de injunção sempre que a falta de norma regulamentadora torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania.",
    "explicacao": "Mandado de injunção regulamentado pela Lei 13.300/16 (adota teoria concretista).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxxii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXXII",
    "texto": "Conceder-se-á habeas data: a) para assegurar o conhecimento de informações relativas à pessoa do impetrante, constantes de registros ou bancos de dados de entidades governamentais ou de caráter público; b) para a retificação de dados, quando não se prefira fazê-lo por processo sigiloso, judicial ou administrativo.",
    "explicacao": "Habeas data personalíssimo. A Súmula 2 do STJ exige prévia recusa da via administrativa como condição da ação.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxxiii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXXIII",
    "texto": "Qualquer cidadão é parte legítima para propor ação popular que vise a anular ato lesivo ao patrimônio público ou de entidade de que o Estado participe, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural, ficando o autor, salvo comprovada má-fé, isento de custas judiciais e do ônus da sucumbência.",
    "explicacao": "Ação popular. Legitimidade ativa exclusiva do CIDADÃO (eleitor com título e quitação eleitoral em dia). Isento de custas salvo má-fé.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxxvii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXXVII",
    "texto": "São gratuitas as ações de habeas corpus e habeas data, e, na forma da lei, os atos necessários ao exercício da cidadania.",
    "explicacao": "Gratuidade constitucional direta e expressa para as ações de HC e HD.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxxviii",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXXVIII",
    "texto": "A todos, no âmbito judicial e administrativo, são assegurados a razoável duração do processo e os meios que garantam a celeridade de sua tramitação.",
    "explicacao": "Princípio da celeridade e razoável duração do processo judicial e administrativo.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art5-lxxix",
    "artigoNum": 5,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 5º, LXXIX",
    "texto": "É assegurado, nos termos da lei, o direito à proteção dos dados pessoais, inclusive nos meios digitais.",
    "explicacao": "Direito fundamental autônomo à proteção de dados e autodeterminação informativa (incluído pela EC 115/22).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art37-caput",
    "artigoNum": 37,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 37, caput",
    "texto": "A administração pública direta e indireta de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios obedecerá aos princípios de legalidade, impessoalidade, moralidade, publicidade e eficiência e, também, ao seguinte:",
    "explicacao": "Princípios expressos constitucionais da Administração Pública (mnemônico LIMPE).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art37-ii",
    "artigoNum": 37,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 37, II",
    "texto": "A investidura em cargo ou emprego público depende de aprovação prévia em concurso público de provas ou de provas e títulos, de acordo com a natureza e a complexidade do cargo ou emprego, na forma prevista em lei, ressalvadas as nomeações para cargo em comissão declarado em lei de livre nomeação e exoneração.",
    "explicacao": "Regra do concurso público. A inobservância acarreta a nulidade do ato e punição disciplinar da autoridade (art. 37, § 2º).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art37-par6",
    "artigoNum": 37,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 37, § 6º",
    "texto": "As pessoas jurídicas de direito público e as de direito privado prestadoras de serviços públicos responderão pelos danos que seus agentes, nessa qualidade, causarem a terceiros, assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa.",
    "explicacao": "Responsabilidade civil objetiva do Estado (Teoria do Risco Administrativo). A ação indenizatória direta deve ser proposta contra a pessoa jurídica estatal e não diretamente contra o agente (Tema 940 STF).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (CF/88)",
    "casoConcreto": "Viatura policial colide culposamente com veículo civil. O Estado responde objetivamente pelos danos perante a vítima, cabendo ação regressiva interna contra o policial condutor."
  },
  {
    "id": "cf88-art102-i-a",
    "artigoNum": 102,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 102, I, a",
    "texto": "Compete ao Supremo Tribunal Federal, precipuamente, a guarda da Constituição, cabendo-lhe: I - processar e julgar, originariamente: a) a ação direta de inconstitucionalidade de lei ou ato normativo federal ou estadual e a ação declaratória de constitucionalidade de lei ou ato normativo federal.",
    "explicacao": "Competência originária do STF para ADI (lei federal ou estadual) e ADC (exclusivamente lei federal). Lei municipal não é objeto de ADI perante o STF (mas cabe ADPF).",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art103",
    "artigoNum": 103,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 103",
    "texto": "Podem propor a ação direta de inconstitucionalidade e a ação declaratória de constitucionalidade: I - o Presidente da República; II - a Mesa do Senado Federal; III - a Mesa da Câmara dos Deputados; IV - a Mesa de Assembléia Legislativa ou da Câmara Legislativa do Distrito Federal; V - o Governador de Estado ou do Distrito Federal; VI - o Procurador-Geral da República; VII - o Conselho Federal da Ordem dos Advogados do Brasil; VIII - partido político com representação no Congresso Nacional; IX - confederação sindical ou entidade de classe de âmbito nacional.",
    "explicacao": "Legitimados para controle concentrado de constitucionalidade. Legitimados especiais (exigem pertinência temática): Governadores, Mesas das Assembleias Legislativas e Confederações Sindicais / Entidades de Classe Nacionais.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art103-a",
    "artigoNum": 103,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 103-A",
    "texto": "O Supremo Tribunal Federal poderá, de ofício ou por provocação, mediante decisão de dois terços dos seus membros, após reiteradas decisões sobre matéria constitucional, aprovar súmula que, a partir de sua publicação na imprensa oficial, terá efeito vinculante em relação aos demais órgãos do Poder Judiciário e à administração pública direta e indireta, nas esferas federal, estadual e municipal.",
    "explicacao": "Súmula Vinculante: quórum de 2/3 (8 ministros). Vincula Judiciário e Administração Pública direta e indireta, mas NÃO vincula o Poder Legislativo em sua atividade legiferante típica.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cf88-art133",
    "artigoNum": 133,
    "diploma": "Constituição Federal de 1988",
    "dispositivo": "Art. 133",
    "texto": "O advogado é indispensável à administração da justiça, sendo inviolável por seus atos e manifestações no exercício da profissão, nos limites da lei.",
    "explicacao": "Postulado constitucional da essencialidade da advocacia à Justiça e imunidade profissional no exercício do múnus público.",
    "eixo": "Ética e Prerrogativas (OAB)",
    "disciplina": "Ética Profissional",
    "fonteOficial": "Planalto (CF/88)"
  },
  {
    "id": "cc-art1",
    "artigoNum": 1,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 1º",
    "texto": "Toda pessoa é capaz de direitos e deveres na ordem civil.",
    "explicacao": "Capacidade de direito ou de gozo: universal a todos os seres humanos nascidos com vida.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art2",
    "artigoNum": 2,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 2º",
    "texto": "A personalidade civil da pessoa começa do nascimento com vida; mas a lei põe a salvo, desde a concepção, os direitos do nascituro.",
    "explicacao": "Teoria natalista adotada formalmente pelo Código Civil combinada com a proteção dos direitos do nascituro (alimentos gravídicos, doação e sucessão).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art3",
    "artigoNum": 3,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 3º",
    "texto": "São absolutamente incapazes de exercer pessoalmente os atos da vida civil os menores de 16 (dezesseis) anos.",
    "explicacao": "Após o Estatuto da Pessoa com Deficiência (Lei 13.146/15), os menores de 16 anos são a ÚNICA hipótese de incapacidade civil absoluta no ordenamento brasileiro.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art4",
    "artigoNum": 4,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 4º",
    "texto": "São incapazes, relativamente a certos atos ou à maneira de os exercer: I - os maiores de dezesseis e menores de dezoito anos; II - os ébrios habituais e os viciados em tóxico; III - aqueles que, por causa transitória ou permanente, não puderem exprimir sua vontade; IV - os pródigos.",
    "explicacao": "Incapacidade relativa: os atos praticados sem assistência são anuláveis (e não nulos de pleno direito).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art5",
    "artigoNum": 5,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 5º",
    "texto": "A menoridade cessa aos dezoito anos completos, quando a pessoa fica habilitada à prática de todos os atos da vida civil. Parágrafo único. Cessará, para os menores, a incapacidade: I - pela concessão dos pais, ou de um deles na falta do outro, mediante instrumento público, independentemente de homologação judicial, ou por sentença do juiz, ouvido o tutor, se o menor tiver dezesseis anos completos; II - pelo casamento; III - pelo exercício de emprego público efetivo; IV - pela colação de grau em curso de ensino superior; V - pelo estabelecimento civil ou comercial, ou pela existência de relação de emprego, desde que, em função deles, o menor com dezesseis anos completos tenha economia própria.",
    "explicacao": "Hipóteses de emancipação voluntária, judicial e legal.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art11",
    "artigoNum": 11,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 11",
    "texto": "Com exceção dos casos previstos em lei, os direitos da personalidade são intransmissíveis e irrenunciáveis, não podendo o seu exercício sofrer limitação voluntária.",
    "explicacao": "Características fundamentais dos direitos da personalidade: intransmissibilidade, irrenunciabilidade, indisponibilidade relativa e imprescritibilidade.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art50",
    "artigoNum": 50,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 50",
    "texto": "Em caso de abuso da personalidade jurídica, caracterizado pelo desvio de finalidade ou pela confusão patrimonial, pode o juiz, a requerimento da parte, ou do Ministério Público quando lhe couber intervir no processo, desconsiderá-la para que os efeitos de certas e determinadas relações de obrigações sejam estendidos aos bens particulares de administradores ou de sócios da pessoa jurídica beneficiados direta ou indiretamente pelo abuso.",
    "explicacao": "Teoria Maior da desconsideração da personalidade jurídica (exige prova inequívoca de desvio de finalidade ou confusão patrimonial dolosa, alterado pela Lei da Liberdade Econômica).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)",
    "casoConcreto": "Empresário utiliza conta da pessoa jurídica para pagar despesas pessoais de familiares e esvazia o caixa da empresa para fraudar credores. O juiz decreta a desconsideração com base na confusão patrimonial."
  },
  {
    "id": "cc-art104",
    "artigoNum": 104,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 104",
    "texto": "A validade do negócio jurídico requer: I - agente capaz; II - objeto lícito, possível, determinado ou determinável; III - forma prescrita ou não defesa em lei.",
    "explicacao": "Plano da validade da Escada Ponteana (agente capaz, objeto lícito/possível/determinado e forma prescrita em lei).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art156",
    "artigoNum": 156,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 156",
    "texto": "Configura-se o estado de perigo quando alguém, premido da necessidade de salvar-se, ou a pessoa de sua família, de grave dano conhecido pela outra parte, assume obrigação excessivamente onerosa.",
    "explicacao": "Defeito do negócio jurídico: gera anulabilidade no prazo decadencial de 4 anos. Exige dolo de aproveitamento da contraparte que conhece o perigo.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art157",
    "artigoNum": 157,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 157",
    "texto": "Ocorre a lesão quando uma pessoa, sob premente necessidade, ou por inexperiência, se obriga a prestação manifestamente desproporcional ao valor da prestação oposta.",
    "explicacao": "Lesão contratual: desproporção objetiva contemporânea à celebração aliada à inexperiência ou premente necessidade da vítima. Não exige que a outra parte conhecesse a situação.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art166",
    "artigoNum": 166,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 166",
    "texto": "É nulo o negócio jurídico quando: I - celebrado por pessoa absolutamente incapaz; II - for ilícito, impossível ou indeterminável o seu objeto; III - o motivo determinante, comum a ambas as partes, for ilícito; IV - não revestir a forma prescrita em lei; V - for preterida alguma solenidade que a lei considere essencial para a sua validade; VI - tiver por objetivo fraudar lei imperativa; VII - a lei taxativamente o declarar nulo, ou proibir-lhe a prática, sem cominar sanção.",
    "explicacao": "Hipóteses de nulidade absoluta: matéria de ordem pública insuscetível de confirmação e que não convalesce pelo decurso do tempo (art. 169).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art186",
    "artigoNum": 186,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 186",
    "texto": "Aquele que, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilícito.",
    "explicacao": "Cláusula geral da responsabilidade civil subjetiva aquiliana (conduta culposa, nexo de causalidade e dano material ou moral).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art187",
    "artigoNum": 187,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 187",
    "texto": "Também comete ato ilícito o titular de um direito que, ao exercê-lo, excede manifestamente os limites impostos pelo seu fim econômico ou social, pela boa-fé ou pelos bons costumes.",
    "explicacao": "Abuso de direito: modalidade de ato ilícito objetivo que independe de prova de dolo ou culpa.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art189",
    "artigoNum": 189,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 189",
    "texto": "Violado o direito, nasce para o titular a pretensão, a qual se extingue, pela prescrição, nos prazos a que aludem os arts. 205 e 206.",
    "explicacao": "Princípio da actio nata: a prescrição extingue a pretensão condenatória e começa a correr a partir do momento em que o titular toma conhecimento inequívoco da violação do seu direito.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art205",
    "artigoNum": 205,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 205",
    "texto": "A prescrição ocorre em dez anos, quando a lei não lhe haja fixado prazo menor.",
    "explicacao": "Prazo geral decenal de prescrição (aplicado às pretensões de inadimplemento contratual sem prazo específico, conforme pacificado pela Corte Especial do STJ).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art206-par3",
    "artigoNum": 206,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 206, § 3º, V",
    "texto": "Prescreve em três anos a pretensão de reparação civil.",
    "explicacao": "Prazo trienal aplicável à responsabilidade civil extracontratual aquiliana.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art389",
    "artigoNum": 389,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 389",
    "texto": "Não cumprida a obrigação, responde o devedor por perdas e danos, mais juros e atualização monetária segundo índices oficiais regularmente estabelecidos, e honorários de advogado.",
    "explicacao": "Inadimplemento culposo das obrigações e dever de indenizar as perdas e danos (danos emergentes e lucros cessantes).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art393",
    "artigoNum": 393,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 393",
    "texto": "O devedor não responde pelos prejuízos resultantes de caso fortuito ou força maior, se expressamente não se houver por eles responsabilizado. Parágrafo único. O caso fortuito ou de força maior verifica-se no fato necessário, cujos efeitos não era possível evitar ou impedir.",
    "explicacao": "Excludente de responsabilidade por caso fortuito e força maior nas obrigações civis.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art421",
    "artigoNum": 421,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 421",
    "texto": "A liberdade contratual será exercida nos limites da função social do contrato. Parágrafo único. Nas relações contratuais privadas, prevalecerão o princípio da intervenção mínima e a excepcionalidade da revisão contratual.",
    "explicacao": "Função social do contrato e princípio da intervenção mínima estatal (alterado pela Lei 13.874/19 da Liberdade Econômica).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art422",
    "artigoNum": 422,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 422",
    "texto": "Os contratantes são obrigados a guardar, assim na conclusão do contrato, como em sua execução, os princípios de probidade e a boa-fé.",
    "explicacao": "Boa-fé objetiva: impõe deveres anexos de conduta (lealdade, informação, proteção e sigilo) nas fases pré-contratual, contratual e pós-contratual.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art441",
    "artigoNum": 441,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 441",
    "texto": "A coisa recebida em virtude de contrato comutativo pode ser enjeitada por vícios ou defeitos ocultos, que a tornem imprópria ao uso a que é destinada, ou lhe diminuam o valor.",
    "explicacao": "Vício redibitório: defeito oculto anterior à tradição que enseja as ações edilícias (redibitória ou quanti minoris).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art447",
    "artigoNum": 447,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 447",
    "texto": "Nos contratos onerosos, o alienante responde pela evicção. Subsiste esta garantia ainda que a aquisição se tenha realizado em hasta pública.",
    "explicacao": "Garantia legal implícita contra a perda do bem por decisão judicial ou ato de apreensão que reconhece direito anterior a terceiro.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art476",
    "artigoNum": 476,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 476",
    "texto": "Nos contratos bilaterais, nenhum dos contratantes, antes de cumprida a sua obrigação, pode exigir o implemento da do outro.",
    "explicacao": "Exceptio non adimpleti contractus (exceção do contrato não cumprido): defesa substancial de quem suspende o pagamento diante da inércia prévia da contraparte.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art927-caput",
    "artigoNum": 927,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 927, caput",
    "texto": "Aquele que, por ato ilícito (arts. 186 e 187), causar dano a outrem, fica obrigado a repará-lo.",
    "explicacao": "Dever geral de indenizar na responsabilidade civil.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art927-par",
    "artigoNum": 927,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 927, parágrafo único",
    "texto": "Haverá obrigação de reparar o dano, independentemente de culpa, nos casos especificados em lei, ou quando a atividade normalmente desenvolvida pelo autor do dano implicar, por sua natureza, risco para os direitos de outrem.",
    "explicacao": "Cláusula geral da responsabilidade civil objetiva baseada na Teoria do Risco da Atividade.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art1228",
    "artigoNum": 1228,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 1.228",
    "texto": "O proprietário tem a faculdade de usar, gozar e dispor da coisa, e o direito de reavê-la do poder de quem quer que injustamente a possua ou detenha.",
    "explicacao": "Poderes inerentes ao domínio (usar, gozar, dispor e reivindicar - direito de sequela).",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cc-art1829",
    "artigoNum": 1829,
    "diploma": "Código Civil (Lei 10.406/02)",
    "dispositivo": "Art. 1.829",
    "texto": "A sucessão legítima defere-se na ordem seguinte: I - aos descendentes, em concorrência com o cônjuge sobrevivente, salvo se casado este com o falecido no regime da comunhão universal, ou no da separação obrigatória de bens; ou se, no regime da comunhão parcial, o autor da herança não houver deixado bens particulares; II - aos ascendentes, em concorrência com o cônjuge; III - ao cônjuge sobrevivente; IV - aos colaterais.",
    "explicacao": "Ordem de vocação hereditária na sucessão legítima. O STF equiparou a união estável ao casamento no Tema 809 para fins sucessórios.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "Planalto (CC/02)"
  },
  {
    "id": "cpc-art1",
    "artigoNum": 1,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 1º",
    "texto": "O processo civil será ordenado, disciplinado e interpretado conforme os valores e as normas fundamentais estabelecidos na Constituição da República Federativa do Brasil, observando-se as disposições deste Código.",
    "explicacao": "Modelo Constitucional do Direito Processual Civil e filtragem constitucional de todas as normas processuais.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art4",
    "artigoNum": 4,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 4º",
    "texto": "As partes têm o direito de obter em prazo razoável a solução integral do mérito, incluída a atividade satisfativa.",
    "explicacao": "Princípio da primazia do julgamento de mérito e razoável duração do processo.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art5",
    "artigoNum": 5,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 5º",
    "texto": "Aquele que de qualquer forma participa do processo deve comportar-se de acordo com a boa-fé.",
    "explicacao": "Boa-fé processual objetiva exigível de todos os sujeitos do processo (partes, advogados, juiz, peritos e auxiliares).",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art6",
    "artigoNum": 6,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 6º",
    "texto": "Todos os sujeitos do processo devem cooperar entre si para que se obtenha, em tempo razoável, decisão de mérito justa e efetiva.",
    "explicacao": "Princípio da cooperação processual.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art9",
    "artigoNum": 9,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 9º, caput",
    "texto": "Não se proferirá decisão contra uma das partes sem que ela seja previamente ouvida.",
    "explicacao": "Contraditório substancial prévio. As únicas exceções são tutela de urgência inaudita altera parte, tutela da evidência fundada em tese vinculante e expedição de mandado monitório.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art10",
    "artigoNum": 10,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 10",
    "texto": "O juiz não pode decidir, em grau algum de jurisdição, com base em fundamento a respeito do qual não se tenha dado às partes oportunidade de se manifestar, ainda que se trate de matéria sobre a qual deva decidir de ofício.",
    "explicacao": "Vedação à decisão surpresa: mesmo em matérias de ordem pública cognoscíveis de ofício (prescrição, legitimidade), o juiz deve abrir vista prévia às partes.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art85-caput",
    "artigoNum": 85,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 85, caput",
    "texto": "A sentença condenará o vencido a pagar honorários ao advogado do vencedor.",
    "explicacao": "Princípio da sucumbência nos honorários advocatícios.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art85-par2",
    "artigoNum": 85,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 85, § 2º",
    "texto": "Os honorários serão fixados entre o mínimo de dez e o máximo de vinte por cento sobre o valor da condenação, do proveito econômico obtido ou, não sendo possível mensurá-lo, sobre o valor atualizado da causa.",
    "explicacao": "Critério legal objetivo e obrigatório de fixação dos honorários sucumbenciais (Tema 1076 STJ veda arbitramento por equidade fora das hipóteses do § 8º).",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art85-par14",
    "artigoNum": 85,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 85, § 14",
    "texto": "Os honorários constituem direito do advogado e têm natureza alimentar, com os mesmos privilégios dos créditos oriundos da legislação do trabalho, sendo vedada a compensação em caso de sucumbência recíproca.",
    "explicacao": "Natureza alimentar dos honorários e proibição expressa de compensação em sucumbência recíproca no CPC/2015.",
    "eixo": "Ética e Prerrogativas (OAB)",
    "disciplina": "Ética Profissional",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art125",
    "artigoNum": 125,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 125",
    "texto": "É admissível a denunciação da lide, promovida por qualquer das partes: I - ao alienante imediato, no processo relativo à coisa cujo domínio foi transferido ao denunciante, a fim de que possa exercer os direitos que da evicção lhe resultam; II - àquele que estiver obrigado, por lei ou pelo contrato, a indenizar, em ação regressiva, o prejuízo de quem for vencido no processo.",
    "explicacao": "Denunciação da lide fundada em evicção ou direito de regresso contratual/legal.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art133",
    "artigoNum": 133,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 133",
    "texto": "O incidente de desconsideração da personalidade jurídica será instaurado a pedido da parte ou do Ministério Público, quando lhe couber intervir no processo.",
    "explicacao": "Procedimento do incidente de desconsideração (IDPJ), cabível em todas as fases do processo de conhecimento e execução.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art300-caput",
    "artigoNum": 300,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 300, caput",
    "texto": "A tutela de urgência será concedida quando houver elementos que evidenciem a probabilidade do direito e o perigo de dano ou o risco ao resultado útil do processo.",
    "explicacao": "Requisitos cumulativos da tutela de urgência (fumus boni iuris e periculum in mora).",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art300-par3",
    "artigoNum": 300,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 300, § 3º",
    "texto": "A tutela de urgência de natureza antecipada não será concedida quando houver perigo de irreversibilidade do efeito da decisão.",
    "explicacao": "Vedação da irreversibilidade fática na tutela provisória antecipada.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art311",
    "artigoNum": 311,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 311",
    "texto": "A tutela da evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando: I - ficar caracterizado o abuso do direito de defesa ou o manifesto propósito protelatório da parte; II - as alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante; III - se tratar de pedido reipersecutório fundado em prova documental adequada do contrato de depósito, caso em que será decretada a ordem de entrega do objeto custodiado, sob cominação de multa; IV - a petição inicial for instruída com prova documental suficiente dos fatos constitutivos do direito do autor, a que o réu não oponha prova capaz de gerar dúvida razoável.",
    "explicacao": "Hipóteses taxativas de tutela da evidência (dispensam demonstração de perigo na demora). Nos incisos II e III o juiz pode conceder liminarmente.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art334",
    "artigoNum": 334,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 334",
    "texto": "Se a petição inicial preencher os requisitos essenciais e não for o caso de improcedência liminar do pedido, o juiz designará audiência de conciliação ou de mediação com antecedência mínima de 30 (trinta) dias, devendo ser citado o réu com pelo menos 20 (vinte) dias de antecedência.",
    "explicacao": "Audiência prévia obrigatória de conciliação ou mediação. O não comparecimento injustificado de qualquer das partes é ato atentatório à dignidade da justiça sancionado com multa de até 2% (art. 334, § 8º).",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art335",
    "artigoNum": 335,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 335",
    "texto": "O réu poderá oferecer contestação, por petição, no prazo de 15 (quinze) dias, cujo termo inicial será a data: I - da audiência de conciliação ou de mediação, ou da última sessão de conciliação, quando qualquer parte não comparecer ou, comparecendo, não houver acordo; II - do protocolo do pedido de cancelamento da audiência de conciliação ou de mediação apresentado pelo réu, quando ocorrer a hipótese do art. 334, § 4º, inciso I.",
    "explicacao": "Prazo da contestação (15 dias úteis) e contagem a partir da audiência frustrada de conciliação.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art356",
    "artigoNum": 356,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 356",
    "texto": "O juiz decidirá parcialmente o mérito quando um ou mais dos pedidos formulados ou parcela deles: I - mostrar-se incontroverso; II - estiver em condições de imediato julgamento, nos termos do art. 355. § 5º A decisão proferida com base neste artigo é impugnável por agravo de instrumento.",
    "explicacao": "Julgamento antecipado parcial do mérito. Tem natureza de decisão interlocutória definitiva de mérito, impugnável por AGRAVO DE INSTRUMENTO.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art373",
    "artigoNum": 373,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 373",
    "texto": "O ônus da prova incumbe: I - ao autor, quanto ao fato constitutivo de seu direito; II - ao réu, quanto à existência de fato impeditivo, modificativo ou extintivo do direito do autor. § 1º Nos casos previstos em lei ou diante de peculiaridades da causa relacionadas à impossibilidade ou à excessiva dificuldade de cumprir o encargo nos termos do caput ou à maior facilidade de obtenção da prova do fato contrário, poderá o juiz atribuir o ônus da prova de modo diverso, desde que o faça por decisão fundamentada, caso em que deverá dar à parte a oportunidade de se desincumbir do ônus que lhe foi atribuído.",
    "explicacao": "Distribuição estática e dinamização judicial do ônus da prova no saneamento do processo.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cpc-art1015",
    "artigoNum": 1015,
    "diploma": "Código de Processo Civil (Lei 13.105/15)",
    "dispositivo": "Art. 1.015",
    "texto": "Cabe agravo de instrumento contra as decisões interlocutórias que versarem sobre: I - tutelas provisórias; II - mérito do processo; III - rejeição da alegação de convenção de arbitragem; IV - incidente de desconsideração da personalidade jurídica; V - rejeição do pedido de gratuidade da justiça ou acolhimento do pedido de sua revogação; VI - exibição ou posse de documento ou coisa; VII - exclusão de litisconsorte; VIII - rejeição do pedido de limitação do litisconsórcio; IX - admissão ou inadmissão de intervenção de terceiros; X - concessão, modificação ou revogação do efeito suspensivo aos embargos à execução; XI - redistribuição do ônus da prova nos termos do art. 373, § 1º; XIII - outros casos expressamente referidos em lei. Parágrafo único. Também caberá agravo de instrumento contra decisões interlocutórias proferidas na fase de liquidação de sentença ou de cumprimento de sentença, no processo de execução e no processo de inventário.",
    "explicacao": "Hipóteses de cabimento do agravo de instrumento. O STJ fixou no Tema 988 a Tese da Taxatividade Mitigada quando verificada urgência inadiável decorrente da inutilidade do julgamento da questão na apelação.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (CPC/15)"
  },
  {
    "id": "cp-art1",
    "artigoNum": 1,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 1º",
    "texto": "Não há crime sem lei anterior que o defina. Não há pena sem prévia cominação legal.",
    "explicacao": "Princípio da legalidade penal (anterioridade, reserva legal absoluta e vedação da analogia in malam partem).",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art2",
    "artigoNum": 2,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 2º",
    "texto": "Ninguém pode ser punido por fato que lei posterior deixa de considerar crime, cessando em virtude dela a execução e os efeitos penais da sentença condenatória. Parágrafo único. A lei posterior, que de qualquer modo favorecer o agente, aplica-se aos fatos anteriores, ainda que decididos por sentença condenatória transitada em julgado.",
    "explicacao": "Abolitio criminis e novatio legis in mellius: retroagem mesmo após o trânsito em julgado (Súmula 611 do STF atribui a competência ao juízo da execução penal).",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art13",
    "artigoNum": 13,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 13, caput",
    "texto": "O resultado, de que depende a existência do crime, somente é imputável a quem lhe deu causa. Considera-se causa a ação ou omissão sem a qual o resultado não teria ocorrido.",
    "explicacao": "Relação de causalidade física e Teoria da Equivalência dos Antecedentes Causais (conditio sine qua non) combinada com a eliminação hipotética de Thyrén.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art13-par1",
    "artigoNum": 13,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 13, § 1º",
    "texto": "A superveniência de causa relativamente independente exclui a imputação quando, por si só, produziu o resultado; os fatos anteriores, entretanto, imputam-se a quem os praticou.",
    "explicacao": "Causa superveniente relativamente independente que produz por si só o resultado (ex.: ambulância que tomba a caminho do hospital ou incêndio no hospital). O agente responde apenas pelos atos anteriores (tentativa).",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art14",
    "artigoNum": 14,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 14",
    "texto": "Diz-se o crime: I - consumado, quando nele se reúnem todos os elementos de sua definição legal; II - tentado, quando, iniciada a execução, não se consuma por circunstâncias alheias à vontade do agente. Parágrafo único. Salvo disposição em contrário, pune-se a tentativa com a pena correspondente ao crime consumado, diminuída de um a dois terços.",
    "explicacao": "Iter criminis: cogitação, preparação, execução e consumação. A tentativa inicia-se na execução e a redução de 1 a 2 terços é inversamente proporcional à proximidade da consumação.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art15",
    "artigoNum": 15,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 15",
    "texto": "O agente que, voluntariamente, desiste de prosseguir na execução ou impede que o resultado se produza, só responde pelos atos já praticados.",
    "explicacao": "Ponte de ouro da dogmática penal: desistência voluntária (cessa a execução voluntariamente) e arrependimento eficaz (impede o resultado com sucesso). Afastam a tentativa e o agente só responde pelos fatos já praticados.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art16",
    "artigoNum": 16,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 16",
    "texto": "Nos crimes cometidos sem violência ou grave ameaça à pessoa, reparado o dano ou restituída a coisa, até o recebimento da denúncia ou da queixa, por ato voluntário do agente, a pena será reduzida de um a dois terços.",
    "explicacao": "Ponte de prata: arrependimento posterior. Requisitos: sem violência à pessoa, reparação integral e voluntária ANTES do recebimento da denúncia.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art17",
    "artigoNum": 17,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 17",
    "texto": "Não se pune a tentativa quando, por ineficácia absoluta do meio ou por absoluta impropriedade do objeto, é impossível consumar-se o crime.",
    "explicacao": "Crime impossível (tentativa inidônea). A ineficácia ou impropriedade deve ser ABSOLUTA. A Súmula 145 do STF estabelece que o flagrante preparado por provocação policial configura crime impossível.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art20",
    "artigoNum": 20,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 20, caput",
    "texto": "O erro sobre elemento constitutivo do tipo legal de crime exclui o dolo, mas permite a punição por crime culposo, se previsto em lei.",
    "explicacao": "Erro de tipo essencial: se inevitável (escusável), exclui o dolo e a culpa; se evitável (inescusável), exclui o dolo mas permite a punição por culpa, se houver previsão típica culposa.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art21",
    "artigoNum": 21,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 21",
    "texto": "O desconhecimento da lei é inescusável. O erro sobre a ilicitude do fato, se inevitável, isenta de pena; se evitável, poderá diminuí-la de um sexto a um terço.",
    "explicacao": "Erro de proibição: atua na culpabilidade (potencial consciência da ilicitude). Se inevitável, isenta de pena (exclui a culpabilidade); se evitável, reduz a pena.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art23",
    "artigoNum": 23,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 23",
    "texto": "Não há crime quando o agente pratica o fato: I - em estado de necessidade; II - em legítima defesa; III - em estrito cumprimento de dever legal ou no exercício regular de direito. Parágrafo único. O agente, em qualquer das hipóteses deste artigo, responderá pelo excesso doloso ou culposo.",
    "explicacao": "Excludentes gerais de ilicitude (antijuridicidade). O excesso doloso ou culposo é sempre punível.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art25",
    "artigoNum": 25,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 25",
    "texto": "Entende-se em legítima defesa quem, usando moderadamente dos meios necessários, repele injusta agressão, atual ou iminente, a direito seu ou de outrem.",
    "explicacao": "Requisitos da legítima defesa: agressão injusta humana atual ou iminente, defesa de direito próprio ou alheio, uso moderado dos meios necessários.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art59",
    "artigoNum": 59,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 59",
    "texto": "O juiz, atendendo à culpabilidade, aos antecedentes, à conduta social, à personalidade do agente, aos motivos, às circunstâncias e conseqüências do crime, bem como ao comportamento da vítima, estabelecerá, conforme seja necessário e suficiente para reprovação e prevenção do crime: I - as penas aplicáveis dentre as cominadas; II - a quantidade de pena aplicável, dentro dos limites previstos; III - o regime inicial de cumprimento da pena privativa de liberdade; IV - a substituição da pena privativa da liberdade aplicada, por outra espécie de pena, se cabível.",
    "explicacao": "Primeira fase da dosimetria da pena (fixação da pena-base pelas circunstâncias judiciais). Inquéritos em curso não agravam a pena-base (Súmula 444 STJ).",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art68",
    "artigoNum": 68,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 68",
    "texto": "A pena-base será fixada atendendo-se ao critério do art. 59 deste Código; em seguida serão consideradas as circunstâncias atenuantes e agravantes; por último, as causas de diminuição e de aumento de pena.",
    "explicacao": "Critério trifásico de Nelson Hungria para dosimetria da pena (1ª fase: pena-base; 2ª fase: atenuantes e agravantes; 3ª fase: causas de aumento e diminuição).",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art121-caput",
    "artigoNum": 121,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 121, caput",
    "texto": "Matar alguém: Pena - reclusão, de seis a vinte anos.",
    "explicacao": "Homicídio simples. Competência do Tribunal do Júri.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art121-par2",
    "artigoNum": 121,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 121, § 2º",
    "texto": "Se o homicídio é cometido: I - mediante paga ou promessa de recompensa, ou por outro motivo torpe; II - por motivo futil; III - com emprego de veneno, fogo, explosivo, asfixia, tortura ou outro meio insidioso ou cruel, ou de que possa resultar perigo comum; IV - à traição, de emboscada, ou mediante dissimulação ou outro recurso que dificulte ou torne impossivel a defesa do ofendido; V - para assegurar a execução, a ocultação, a impunidade ou vantagem de outro crime: Pena - reclusão, de doze a trinta anos.",
    "explicacao": "Homicídio qualificado. Crime hediondo (art. 1º, I, da Lei 8.072/90).",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art155",
    "artigoNum": 155,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 155",
    "texto": "Subtrair, para si ou para outrem, coisa alheia móvel: Pena - reclusão, de um a quatro anos, e multa.",
    "explicacao": "Furto simples. Consuma-se no instante da inversão da posse (teoria da amotio/apprehensio), dispensando posse mansa e pacífica.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art157-caput",
    "artigoNum": 157,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 157, caput",
    "texto": "Subtrair coisa móvel alheia, para si ou para outrem, mediante grave ameaça ou violência a pessoa, ou depois de havê-la, por qualquer meio, reduzido à impossibilidade de resistência: Pena - reclusão, de quatro a dez anos, e multa.",
    "explicacao": "Roubo próprio simples. A grave ameaça ou violência contra a pessoa impede a concessão de sursis ou substituição por restritiva de direitos.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art171",
    "artigoNum": 171,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 171",
    "texto": "Obter, para si ou para outrem, vantagem ilícita, em prejuízo alheio, induzindo ou mantendo alguém em erro, mediante artifício, ardil, ou qualquer outro meio fraudulento: Pena - reclusão, de um a cinco anos, e multa.",
    "explicacao": "Estelionato. Após o Pacote Anticrime (Lei 13.964/19), a regra geral da ação penal passou a ser pública condicionada à representação da vítima (art. 171, § 5º), ressalvadas as hipóteses legais (administração pública, criança/adolescente, idoso ou pessoa com deficiência).",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art312",
    "artigoNum": 312,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 312",
    "texto": "Apropriar-se o funcionário público de dinheiro, valor ou qualquer outro bem móvel, público ou particular, de que tem a posse em razão do cargo, ou desviá-lo, em proveito próprio ou alheio: Pena - reclusão, de dois a doze anos, e multa.",
    "explicacao": "Peculato-apropriação e peculato-desvio praticados por funcionário público no exercício do cargo.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art316",
    "artigoNum": 316,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 316",
    "texto": "Exigir, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de assumi-la, mas em razão dela, vantagem indevida: Pena - reclusão, de dois a doze anos, e multa.",
    "explicacao": "Concussão: crime formal caracterizado pelo verbo nuclear EXIGIR. Consuma-se com a exigência, sendo o recebimento mero exaurimento.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art317",
    "artigoNum": 317,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 317",
    "texto": "Solicitar ou receber, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de assumi-la, mas em razão dela, vantagem indevida, ou aceitar promessa de tal vantagem: Pena - reclusão, de dois a doze anos, e multa.",
    "explicacao": "Corrupção passiva: verbos SOLICITAR, RECEBER ou ACEITAR promessa de vantagem indevida.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cp-art319",
    "artigoNum": 319,
    "diploma": "Código Penal (Decreto-Lei 2.848/40)",
    "dispositivo": "Art. 319",
    "texto": "Retardar ou deixar de praticar, indevidamente, ato de ofício, ou praticá-lo contra disposição expressa de lei, para satisfazer interesse ou sentimento pessoal: Pena - detenção, de três meses a um ano, e multa.",
    "explicacao": "Prevaricação: elemento subjetivo especial exigido é a intenção de satisfazer interesse ou sentimento pessoal.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (CP/40)"
  },
  {
    "id": "cpp-art5",
    "artigoNum": 5,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 5º",
    "texto": "Nos crimes de ação pública o inquérito policial será iniciado: I - de ofício; II - mediante requisição da autoridade judiciária ou do Ministério Público, ou a requerimento do ofendido ou de quem tiver qualidade para representá-lo.",
    "explicacao": "Formas de instauração do inquérito policial na ação penal pública.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art17",
    "artigoNum": 17,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 17",
    "texto": "A autoridade policial não poderá mandar arquivar autos de inquérito.",
    "explicacao": "Princípio da indisponibilidade do inquérito policial pelo delegado de polícia.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art28-a",
    "artigoNum": 28,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 28-A",
    "texto": "Não sendo caso de arquivamento e tendo o investigado confessado formal e circunstancialmente a prática de infração penal sem violência ou grave ameaça e com pena mínima inferior a 4 (quatro) anos, o Ministério Público poderá propor acordo de não persecução penal, desde que necessário e suficiente para reprovação e prevenção do crime.",
    "explicacao": "Acordo de Não Persecução Penal (ANPP) instituído pela Lei 13.964/19 (Pacote Anticrime). Não gera reincidência nem antecedentes.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art158-a",
    "artigoNum": 158,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 158-A",
    "texto": "Considera-se cadeia de custódia o conjunto de todos os procedimentos utilizados para manter e documentar a história cronológica do vestígio coletado em locais ou em vítimas de crimes, para rastrear sua posse e manuseio a partir de seu reconhecimento até o descarte.",
    "explicacao": "Conceito legal da cadeia de custódia da prova penal (incluído pela Lei 13.964/19).",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art158-b",
    "artigoNum": 158,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 158-B",
    "texto": "A cadeia de custódia compreende o rastreamento do vestígio nas seguintes etapas: I - reconhecimento; II - isolamento; III - fixação; IV - coleta; V - acondicionamento; VI - transporte; VII - recebimento; VIII - processamento; IX - armazenamento; X - descarte.",
    "explicacao": "As dez etapas sucessivas e obrigatórias da cadeia de custódia pericial.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art155",
    "artigoNum": 155,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 155, caput",
    "texto": "O juiz formará sua convicção pela livre apreciação da prova produzida em contraditório judicial, não podendo fundamentar sua decisão exclusivamente nos elementos informativos colhidos na investigação, ressalvadas as provas cautelares, não repetíveis e antecipadas.",
    "explicacao": "Sistema do livre convencimento motivado e proibição de condenação baseada exclusivamente em elementos do inquérito policial.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art157",
    "artigoNum": 157,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 157, caput",
    "texto": "São inadmissíveis, devendo ser desentranhadas do processo, as provas ilícitas, assim entendidas as obtidas em violação a normas constitucionais ou legais. § 1º São também inadmissíveis as provas derivadas das ilícitas, salvo quando não evidenciado o nexo de causalidade entre umas e outras, ou quando as derivadas puderem ser obtidas por uma fonte independente.",
    "explicacao": "Inadmissibilidade das provas ilícitas e ilícitas por derivação (fruits of the poisonous tree), com as exceções da fonte independente e da descoberta inevitável.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art312",
    "artigoNum": 312,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 312, caput",
    "texto": "A prisão preventiva poderá ser decretada como garantia da ordem pública, da ordem econômica, por conveniência da instrução criminal ou para assegurar a aplicação da lei penal, quando houver prova da existência do crime e indício suficiente de autoria e de perigo gerado pelo estado de liberdade do imputado.",
    "explicacao": "Requisitos da prisão preventiva: fumus comissi delicti e periculum libertatis contemporâneo (art. 312, § 2º). É vedada a decretação de prisão preventiva de ofício pelo magistrado (art. 311).",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art383",
    "artigoNum": 383,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 383",
    "texto": "O juiz, sem modificar a descrição do fato contida na denúncia ou queixa, poderá atribuir-lhe definição jurídica diversa, ainda que, em conseqüência, tenha de aplicar pena mais grave.",
    "explicacao": "Emendatio libelli: o juiz corrige a classificação jurídica sem alterar os fatos descritos. Não exige aditamento nem nova oitiva da defesa.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art384",
    "artigoNum": 384,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 384",
    "texto": "Encerrada a instrução probatória, se entender cabível nova definição jurídica do fato, em conseqüência de prova existente nos autos de elemento ou circunstância da infração penal não contida na acusação, o Ministério Público deverá aditar a denúncia ou queixa, no prazo de 5 (cinco) dias, se em virtude desta houver sido instaurado o processo em crime de ação pública, reduzindo-se a termo o aditamento, quando feito oralmente.",
    "explicacao": "Mutatio libelli: surgimento de fato ou elementar novo durante a instrução. EXIGE aditamento obrigatório do Ministério Público e nova oportunidade de defesa e produção de provas, sob pena de nulidade.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art413",
    "artigoNum": 413,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 413",
    "texto": "O juiz, fundamentadamente, pronunciará o acusado, se convencido da materialidade do fato e da existência de indícios suficientes de autoria ou de participação.",
    "explicacao": "Decisão interlocutória mista de pronúncia: remete o acusado a julgamento pelo Tribunal do Júri Popular.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art414",
    "artigoNum": 414,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 414",
    "texto": "Não se convencendo da materialidade do fato ou da existência de indícios suficientes de autoria ou de participação, o juiz, fundamentadamente, impronunciará o acusado.",
    "explicacao": "Decisão de impronúncia: faz coisa julgada meramente formal, permitindo nova denúncia se surgirem novas provas (art. 414, parágrafo único).",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art415",
    "artigoNum": 415,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 415",
    "texto": "O juiz, fundamentadamente, absolverá desde logo o acusado, quando: I - provada a inexistência do fato; II - provado não ser ele autor ou partícipe do fato; III - o fato não constituir infração penal; IV - demonstrada causa de isenção de pena ou de exclusão do crime.",
    "explicacao": "Absolvição sumária no Júri: faz coisa julgada material terminativa.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "cpp-art581",
    "artigoNum": 581,
    "diploma": "Código de Processo Penal (Decreto-Lei 3.689/41)",
    "dispositivo": "Art. 581",
    "texto": "Caberá recurso, em sentido estrito, da decisão, despacho ou sentença: I - que não receber a denúncia ou a queixa; IV - que pronunciar o réu; V - que conceder, negar, arbitrar, cassar ou julgar inidônea a fiança, indeferir requerimento de prisão preventiva ou revogá-la, conceder liberdade provisória ou relaxar a prisão em flagrante.",
    "explicacao": "Hipóteses taxativas de cabimento do Recurso em Sentido Estrito (RESE). Da pronúncia cabe RESE; da impronúncia cabe Apelação (art. 416).",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (CPP/41)"
  },
  {
    "id": "clt-art2",
    "artigoNum": 2,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 2º",
    "texto": "Considera-se empregador a empresa, individual ou coletiva, que, assumindo os riscos da atividade econômica, admite, assalaria e dirige a prestação pessoal de serviço.",
    "explicacao": "Conceito legal de empregador e consagração do princípio da alteridade (o empregado jamais assume os riscos do negócio ou prejuízos operacionais).",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art3",
    "artigoNum": 3,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 3º",
    "texto": "Considera-se empregado toda pessoa física que prestar serviços de natureza não eventual a empregador, sob a dependência deste e mediante salário.",
    "explicacao": "Elementos fático-jurídicos cumulativos da relação de emprego: pessoa física, pessoalidade, não eventualidade (habitualidade), subordinação jurídica e onerosidade.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art9",
    "artigoNum": 9,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 9º",
    "texto": "Serão nulos de pleno direito os atos praticados com o objetivo de desvirtuar, impedir ou fraudar a aplicação dos preceitos contidos na presente Consolidação.",
    "explicacao": "Princípio da primazia da realidade sobre a forma. Qualquer tentativa de pejotização fictícia ou simulação fraudulenta acarreta nulidade absoluta.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art11",
    "artigoNum": 11,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 11",
    "texto": "A pretensão quanto a créditos resultantes das relações de trabalho prescreve em cinco anos para os trabalhadores urbanos e rurais, até o limite de dois anos após a extinção do contrato de trabalho.",
    "explicacao": "Prescrição trabalhista bienal (2 anos após o fim do contrato) e quinquenal (limite de 5 anos pretéritos contados da propositura da ação).",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art58",
    "artigoNum": 58,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 58, caput e § 1º",
    "texto": "A duração normal do trabalho, para os empregados em qualquer atividade privada, não excederá de 8 (oito) horas diárias, desde que não seja fixado expressamente outro limite. § 1º Não serão descontadas nem computadas como jornada extraordinária as variações de horário no registro de ponto não excedentes de cinco minutos, observado o limite máximo de dez minutos diários.",
    "explicacao": "Jornada padrão e tolerância legal de 5 minutos por batida até o máximo de 10 minutos diários (Súmula 366 do TST).",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art59",
    "artigoNum": 59,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 59",
    "texto": "A duração diária do trabalho poderá ser acrescida de horas suplementares, em número não excedente de duas, por acordo individual, convenção coletiva ou acordo coletivo de trabalho.",
    "explicacao": "Regime de prorrogação da jornada de trabalho e limitação de no máximo 2 horas extras diárias com adicional mínimo de 50%.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art59-a",
    "artigoNum": 59,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 59-A",
    "texto": "Em exceção ao disposto no art. 59 desta Consolidação, é facultado às partes, mediante acordo individual escrito, convenção coletiva ou acordo coletivo de trabalho, estabelecer horário de trabalho de doze horas seguidas por trinta e seis horas ininterruptas de descanso, observados ou indenizados os intervalos para repouso e alimentação.",
    "explicacao": "Legalização do regime de trabalho 12x36 por mero acordo individual escrito ou negociação coletiva.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art62",
    "artigoNum": 62,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 62",
    "texto": "Não são abrangidos pelo regime previsto neste capítulo: I - os empregados que exercem atividade externa incompatível com a fixação de horário de trabalho; II - os gerentes, assim considerados os exercentes de cargos de gestão; III - os empregados em regime de teletrabalho que prestam serviços por produção ou tarefa.",
    "explicacao": "Exceções ao controle de ponto e jornada extraordinária: externos sem fiscalização, cargos de confiança com gratificação superior a 40% e teletrabalho por tarefa.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art71",
    "artigoNum": 71,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 71, § 4º",
    "texto": "A não concessão ou a concessão parcial do intervalo intrajornada mínimo, para repouso e alimentação, a empregados urbanos e rurais, implica o pagamento, de natureza indenizatória, apenas do período suprimido, com acréscimo de 50% (cinquenta por cento) sobre o valor da remuneração da hora normal de trabalho.",
    "explicacao": "Após a Reforma Trabalhista, o intervalo suprimido é indenizado apenas pelo período não gozado, sem reflexos salariais em outras verbas.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art75-c",
    "artigoNum": 75,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 75-C",
    "texto": "A prestação de serviços na modalidade de teletrabalho deverá constar expressamente do instrumento de contrato individual de trabalho, que especificará as atividades que serão realizadas pelo empregado.",
    "explicacao": "Forma escrita obrigatória para o teletrabalho. A alteração de presencial para teletrabalho exige mútuo acordo; de teletrabalho para presencial independe de concordância, bastando prazo de transição de 15 dias.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art189",
    "artigoNum": 189,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 189",
    "texto": "Serão consideradas atividades ou operações insalubres aquelas que, por sua natureza, condições ou métodos de trabalho, exponham os empregados a agentes nocivos à saúde, acima dos limites de tolerância fixados em razão da natureza e da intensidade do agente e do tempo de exposição aos seus efeitos.",
    "explicacao": "Conceito de insalubridade. Adicionais de 10% (mínimo), 20% (médio) e 40% (máximo) calculados sobre o salário mínimo nacional (Súmula Vinculante 4).",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art193",
    "artigoNum": 193,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 193",
    "texto": "São consideradas atividades ou operações perigosas, na forma da regulamentação aprovada pelo Ministério do Trabalho e Emprego, aquelas que, por sua natureza ou métodos de trabalho, impliquem risco acentuado em virtude de exposição permanente do trabalhador a: I - inflamáveis, explosivos ou energia elétrica; II - roubos ou outras espécies de violência física nas atividades profissionais de segurança pessoal ou patrimonial. § 1º O trabalho em condições de periculosidade assegura ao empregado um adicional de 30% (trinta por cento) sobre o salário sem os acréscimos resultantes de gratificações, prêmios ou participações nos lucros da empresa.",
    "explicacao": "Periculosidade: risco iminente de morte. Adicional de 30% calculado exclusivamente sobre o salário básico contratual (não incide sobre gratificações).",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art392",
    "artigoNum": 392,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 392",
    "texto": "A empregada gestante tem direito à licença-maternidade de 120 (cento e vinte) dias, sem prejuízo do emprego e do salário.",
    "explicacao": "Garantia constitucional de emprego da gestante desde a confirmação da gravidez até 5 meses após o parto (Art. 10, II, 'b' do ADCT e Súmula 244 do TST).",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art457",
    "artigoNum": 457,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 457, §§ 1º e 2º",
    "texto": "Integram o salário a importância fixa estipulada, as gratificações legais e de função e as comissões pagas pelo empregador. § 2º As importâncias, ainda que habituais, pagas a título de ajuda de custo, auxílio-alimentação, vedado seu pagamento em dinheiro, diárias para viagem, prêmios e abonos não integram a remuneração do empregado, não se incorporam ao contrato de trabalho e não constituem base de incidência de qualquer encargo trabalhista e previdenciário.",
    "explicacao": "Natureza jurídica indenizatória expressa de prêmios, diárias e ajuda de custo, mesmo que pagos com habitualidade.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art461",
    "artigoNum": 461,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 461",
    "texto": "Sendo idêntica a função, a todo trabalho de igual valor, prestado ao mesmo empregador, no mesmo estabelecimento empresarial, corresponderá igual salário, sem distinção de sexo, etnia, nacionalidade ou idade.",
    "explicacao": "Equiparação salarial. Requisitos: mesmo estabelecimento, diferença de tempo na função inferior a 2 anos e na empresa inferior a 4 anos, sem plano de cargos homologado.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art468",
    "artigoNum": 468,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 468",
    "texto": "Nos contratos individuais de trabalho só é lícita a alteração das respectivas condições por mútuo consentimento, e ainda assim desde que não resultem, direta ou indiretamente, em prejuízos ao empregado, sob pena de nulidade da cláusula infringente desta garantia.",
    "explicacao": "Princípio da inalterabilidade contratual lesiva e limites ao jus variandi empresarial.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art477",
    "artigoNum": 477,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 477, § 6º",
    "texto": "A entrega ao empregado de documentos que comprovem a comunicação da extinção contratual aos órgãos competentes bem como o pagamento dos valores constantes do instrumento de rescisão ou recibo de quitação deverão ser efetuados até dez dias contados do término do contrato.",
    "explicacao": "Prazo unificado de 10 dias corridos para homologação e pagamento de todas as verbas rescisórias, sob pena de multa equivalente a um salário mensal (Art. 477, § 8º).",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art482",
    "artigoNum": 482,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 482",
    "texto": "Constituem justa causa para rescisão do contrato de trabalho pelo empregador: a) ato de improbidade; b) incontinência de conduta ou mau procedimento; c) negociação habitual por conta própria ou alheia sem permissão do empregador; d) condenação criminal do empregado, passada em julgado; e) desídia no desempenho das respectivas funções; f) embriaguez habitual ou em serviço; g) violação de segredo da empresa; h) ato de indisciplina ou de insubordinação; i) abandono de emprego; j) ato lesivo da honra ou da boa fama praticado no serviço contra qualquer pessoa; k) ato lesivo da honra ou da boa fama praticado contra o empregador e superiores hierárquicos; l) prática constante de jogos de azar; m) perda da habilitação ou dos requisitos estabelecidos em lei para o exercício da profissão.",
    "explicacao": "Rol taxativo das faltas graves que justificam a dispensa por justa causa pelo empregador, com perda do aviso prévio, 13º proporcional, férias proporcionais e multa de 40% do FGTS.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art483",
    "artigoNum": 483,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 483",
    "texto": "O empregado poderá considerar rescindido o contrato e pleitear a devida indenização quando: a) forem exigidos serviços superiores às suas forças, defesos por lei, contrários aos bons costumes, ou alheios ao contrato; b) for tratado pelo empregador ou por seus superiores hierárquicos com rigor excessivo; c) correr perigo manifesto de mal considerável; d) não cumprir o empregador as obrigações do contrato; e) praticar o empregador ou seus prepostos ato lesivo da honra e boa fama; f) o empregador reduzir o seu trabalho de forma a afetar sensivelmente a importância dos salários.",
    "explicacao": "Rescisão indireta do contrato de trabalho (justa causa cometida pelo empregador). O trabalhador recebe todas as verbas rescisórias como se demitido sem justa causa fosse.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art484-a",
    "artigoNum": 484,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 484-A",
    "texto": "O contrato de trabalho poderá ser extinto por acordo entre empregado e empregador, caso em que serão devidos por metade: o aviso prévio, se indenizado; e a indenização sobre o saldo do Fundo de Garantia do Tempo de Serviço. Na extinção do contrato por acordo, a movimentação da conta vinculada do trabalhador no FGTS é limitada a até 80% do valor dos depósitos, não autorizando o ingresso no Programa de Seguro-Desemprego.",
    "explicacao": "Distrato trabalhista formal: aviso indenizado pela metade (50%), multa do FGTS reduzida a 20%, saque de até 80% do FGTS e vedação ao seguro-desemprego.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art611-a",
    "artigoNum": 611,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 611-A",
    "texto": "A convenção coletiva e o acordo coletivo de trabalho têm prevalência sobre a lei quando, entre outros, dispuserem sobre: pacto quanto à jornada de trabalho, banco de horas anual, intervalo intrajornada, plano de cargos e salários, teletrabalho, regime de sobreaviso e remuneração por produtividade.",
    "explicacao": "Princípio do negociado sobre o legislado consagrado no Direito Coletivo do Trabalho e chancelado pelo STF no Tema 1.046.",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art791-a",
    "artigoNum": 791,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 791-A",
    "texto": "Ao advogado, ainda que atue em causa própria, serão devidos honorários de sucumbência, fixados entre o mínimo de 5% (cinco por cento) e o máximo de 15% (quinze por cento) sobre o valor que resultar da liquidação da sentença, do proveito econômico obtido ou, não sendo possível mensurá-lo, sobre o valor atualizado da causa.",
    "explicacao": "Honorários sucumbenciais na Justiça do Trabalho. Fixados entre 5% e 15%. O STF declarou inconstitucional a retenção de créditos de beneficiário da gratuidade da justiça (ADI 5766).",
    "eixo": "Direito Processual do Trabalho",
    "disciplina": "Direito Processual do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art818",
    "artigoNum": 818,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 818",
    "texto": "O ônus da prova incumbe: I - ao reclamante, quanto ao fato constitutivo de seu direito; II - ao reclamado, quanto à existência de fato impeditivo, modificativo ou extintivo do direito do reclamante. § 1º Nos casos previstos em lei ou diante de peculiaridades da causa relacionadas à impossibilidade ou à excessiva dificuldade de cumprir o encargo, poderá o juiz atribuir o ônus da prova de modo diverso, desde que o faça por decisão fundamentada.",
    "explicacao": "Distribuição estática e dinamização do ônus probatório na reclamatória trabalhista.",
    "eixo": "Direito Processual do Trabalho",
    "disciplina": "Direito Processual do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art895",
    "artigoNum": 895,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 895",
    "texto": "Cabe recurso ordinário para a instância superior: I - das decisões definitivas ou terminativas das Varas e Juízos, no prazo de 8 (oito) dias; II - das decisões definitivas ou terminativas dos Tribunais Regionais, em processos de sua competência originária, no prazo de 8 (oito) dias.",
    "explicacao": "Recurso Ordinário (RO): equivalente à apelação cível no rito trabalhista, com prazo recursal de 8 dias úteis.",
    "eixo": "Direito Processual do Trabalho",
    "disciplina": "Direito Processual do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "clt-art896",
    "artigoNum": 896,
    "diploma": "Consolidação das Leis do Trabalho (CLT)",
    "dispositivo": "Art. 896, § 1º-A",
    "texto": "Sob pena de não conhecimento, é ônus da parte: I - indicar o trecho da decisão recorrida que consubstancia o prequestionamento da controvérsia objeto do recurso de revista; II - indicar, de forma explícita e fundamentada, contrariedade a dispositivo de lei, súmula ou orientação jurisprudencial do Tribunal Superior do Trabalho que conflite com a decisão regional; III - expor as razões do pedido de reforma, impugnando todos os fundamentos jurídicos da decisão recorrida.",
    "explicacao": "Requisitos de admissibilidade estrita do Recurso de Revista perante o Tribunal Superior do Trabalho (TST), somados à transcendência do Art. 896-A.",
    "eixo": "Direito Processual do Trabalho",
    "disciplina": "Direito Processual do Trabalho",
    "fonteOficial": "Planalto (CLT)"
  },
  {
    "id": "ctn-art3",
    "artigoNum": 3,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 3º",
    "texto": "Tributo é toda prestação pecuniária compulsória, em moeda ou cujo valor nela se possa exprimir, que não constitua sanção de ato ilícito, instituída em lei e cobrada mediante atividade administrativa plenamente vinculada.",
    "explicacao": "Conceito clássico de tributo: compulsório, não sancionatório (multa não é tributo), sob reserva de lei e de cobrança vinculada.",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art4",
    "artigoNum": 4,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 4º",
    "texto": "A natureza jurídica específica do tributo é determinada pelo fato gerador da respectiva obrigação, sendo irrelevantes para qualificá-la: I - a denominação e demais características formais adotadas pela lei; II - a destinação legal do produto da sua arrecadação.",
    "explicacao": "Teoria do fato gerador para qualificação do tributo e irrelevância da denominação legal (princípio do 'non olet').",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art97",
    "artigoNum": 97,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 97",
    "texto": "Somente a lei pode estabelecer: I - a instituição de tributos, ou a sua extinção; II - a majoração de tributos, ou sua redução; III - a definição do fato gerador da obrigação tributária principal; IV - a fixação de alíquota do tributo e da sua base de cálculo; V - a cominação de penalidades para as ações ou omissões contrárias a seus dispositivos; VI - as hipóteses de exclusão, suspensão e extinção de créditos tributários, ou de dispensa ou redução de penalidades.",
    "explicacao": "Princípio da legalidade tributária estrita e matérias reservadas à lei.",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art106",
    "artigoNum": 106,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 106, inciso II",
    "texto": "A lei aplica-se a ato ou fato pretérito: II - tratando-se de ato não definitivamente julgado: a) quando deixe de defini-lo como infração; b) quando deixe de tratá-lo como contrário a qualquer exigência de ação ou omissão, desde que não tenha sido fraudulento e não tenha implicado em falta de pagamento de tributo; c) quando lhe comine penalidade menos severa que a prevista na lei vigente ao tempo da sua prática.",
    "explicacao": "Retroatividade benigna da legislação tributária em matéria de penalidades e infrações não definitivamente julgadas.",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art111",
    "artigoNum": 111,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 111",
    "texto": "Interpreta-se literalmente a legislação tributária que disponha sobre: I - suspensão ou exclusão do crédito tributário; II - outorga de isenção; III - dispensa do cumprimento de obrigações tributárias acessórias.",
    "explicacao": "Interpretação literal e estrita obrigatória em casos de benefícios fiscais, isenções e causas de exclusão ou suspensão do tributo.",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art135",
    "artigoNum": 135,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 135, inciso III",
    "texto": "São pessoalmente responsáveis pelos créditos correspondentes a obrigações tributárias resultantes de atos praticados com excesso de poderes ou infração de lei, contrato social ou estatutos: III - os diretores, gerentes ou representantes de pessoas jurídicas de direito privado.",
    "explicacao": "Responsabilidade pessoal e subjetiva dos administradores. O mero inadimplemento da obrigação tributária não enseja o redirecionamento da execução fiscal (Súmula 430 do STJ); exige-se dissolução irregular (Súmula 435 do STJ) ou ato doloso contra a lei.",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art151",
    "artigoNum": 151,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 151",
    "texto": "Suspendem a exigibilidade do crédito tributário: I - moratória; II - o depósito do seu montante integral; III - as reclamações e os recursos, nos termos das leis reguladoras do processo tributário administrativo; IV - a concessão de medida liminar em mandado de segurança; V - a concessão de medida liminar ou de tutela antecipada, em outras espécies de ação judicial; VI - o parcelamento.",
    "explicacao": "Rol taxativo de suspensão do crédito tributário (mnemônico MODERELIPA / MODELOPA). Impede a cobrança judicial, execução fiscal e permite a emissão de certidão positiva com efeitos de negativa (CPDEN).",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art156",
    "artigoNum": 156,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 156",
    "texto": "Extinguem o crédito tributário: I - o pagamento; II - a compensação; III - a transação; IV - remissão; V - a prescrição e a decadência; VI - a conversão de depósito em renda; VII - o pagamento antecipado e a homologação do lançamento; VIII - a consignação em pagamento; IX - a decisão administrativa irrecorrível; X - a decisão judicial passada em julgado; XI - a dação em pagamento em bens imóveis, na forma e condições estabelecidas em lei.",
    "explicacao": "Causas de extinção definitiva da obrigação tributária. Atenção para a dação em pagamento: a lei só admite exclusivamente para bens IMÓVEIS.",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art173",
    "artigoNum": 173,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 173, inciso I",
    "texto": "O direito de a Fazenda Pública constituir o crédito tributário extingue-se após 5 (cinco) anos, contados: I - do primeiro dia do exercício seguinte àquele em que o lançamento poderia ter sido efetuado; II - da data em que se tornar definitiva a decisão que houver anulado, por vício formal, o lançamento anteriormente efetuado.",
    "explicacao": "Decadência tributária: prazo extintivo de 5 anos para o Fisco realizar o lançamento do tributo. Após decorrido o prazo, extingue-se o próprio direito material de tributar.",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art174",
    "artigoNum": 174,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 174",
    "texto": "A ação para a cobrança do crédito tributário prescreve em cinco anos, contados da data da sua constituição definitiva. Parágrafo único. A prescrição se interrompe: I - pelo despacho do juiz que ordenar a citação em execução fiscal; II - pelo protesto judicial; III - por qualquer ato judicial que constitua em mora o devedor; IV - por qualquer ato inequívoco ainda que extrajudicial, que importe em reconhecimento do débito pelo devedor.",
    "explicacao": "Prescrição da execução fiscal tributária: 5 anos a contar da constituição definitiva do crédito, interrompida pelo despacho que ordena a citação.",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "ctn-art175",
    "artigoNum": 175,
    "diploma": "Código Tributário Nacional (Lei 5.172/66)",
    "dispositivo": "Art. 175",
    "texto": "Excluem o crédito tributário: I - a isenção; II - a anistia. Parágrafo único. A exclusão do crédito tributário não dispensa o cumprimento das obrigações acessórias dependentes da obrigação principal cujo crédito seja excluído, ou dela conseqüentes.",
    "explicacao": "Causas de exclusão do crédito tributário. A isenção dispensa o pagamento do tributo; a anistia perdoa as penalidades pecuniárias e multas tributárias.",
    "eixo": "Direito Tributário",
    "disciplina": "Direito Tributário",
    "fonteOficial": "Planalto (CTN)"
  },
  {
    "id": "cdc-art2",
    "artigoNum": 2,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 2º, caput e parágrafo único",
    "texto": "Consumidor é toda pessoa física ou jurídica que adquire ou utiliza produto ou serviço como destinatário final. Parágrafo único. Equipara-se a consumidor a coletividade de pessoas, ainda que indetermináveis, que haja intervindo nas relações de consumo.",
    "explicacao": "Conceito padrão de consumidor (Teoria Finalista Mitigada pelo STJ quando há vulnerabilidade técnica, jurídica ou econômica) e consumidor por equiparação.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art6",
    "artigoNum": 6,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 6º, incisos VI e VIII",
    "texto": "São direitos básicos do consumidor: VI - a efetiva prevenção e reparação de danos patrimoniais e morais, individuais, coletivos e difusos; VIII - a facilitação da defesa de seus direitos, inclusive com a inversão do ônus da prova, a seu favor, no processo civil, quando, a critério do juiz, for verossímil a alegação ou quando for ele hipossuficiente, segundo as regras ordinárias de experiências.",
    "explicacao": "Direitos fundamentais do consumidor e inversão judicial do ônus da prova (ope judicis), dependente de verossimilhança ou hipossuficiência técnica/econômica.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art12",
    "artigoNum": 12,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 12",
    "texto": "O fabricante, o produtor, o construtor, nacional ou estrangeiro, e o importador respondem, independentemente da existência de culpa, pela reparação dos danos causados aos consumidores por defeitos decorrentes de projeto, fabricação, construção, montagem, fórmulas, manipulação, apresentação ou acondicionamento de seus produtos, bem como por informações insuficientes ou inadequadas sobre sua utilização e riscos.",
    "explicacao": "Responsabilidade objetiva do fabricante pelo fato do produto (acidente de consumo). A culpa é irrelevante; responde diretamente pelo defeito de segurança gerador de dano.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art13",
    "artigoNum": 13,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 13",
    "texto": "O comerciante é igualmente responsável, nos termos do artigo anterior, quando: I - o fabricante, o construtor, o produtor ou o importador não puderem ser identificados; II - o produto for fornecido sem identificação clara do seu fabricante, produtor, construtor ou importador; III - não conservar adequadamente os produtos perecíveis.",
    "explicacao": "Responsabilidade subsidiária do comerciante no acidente de consumo. O comerciante só responde se o fabricante não for identificado, for anônimo ou se houver má conservação de perecíveis.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art14",
    "artigoNum": 14,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 14, § 4º",
    "texto": "A responsabilidade pessoal dos profissionais liberais será apurada mediante a verificação de culpa.",
    "explicacao": "Exceção fundamental do microssistema do CDC: enquanto os fornecedores respondem de forma objetiva, os profissionais liberais (advogados, médicos, etc.) respondem subjetivamente (mediante culpa).",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art18",
    "artigoNum": 18,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 18, § 1º",
    "texto": "Não sendo o vício sanado no prazo máximo de trinta dias, pode o consumidor exigir, alternativamente e à sua escolha: I - a substituição do produto por outro da mesma espécie, em perfeitas condições de uso; II - a restituição imediata da quantia paga, monetariamente atualizada, sem prejuízo de eventuais perdas e danos; III - o abatimento proporcional do preço.",
    "explicacao": "Tríplice escolha do consumidor diante do vício não consertado em 30 dias: substituição do produto, devolução do dinheiro com correção ou abatimento do preço.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art26",
    "artigoNum": 26,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 26",
    "texto": "O direito de reclamar pelos vícios aparentes ou de fácil constatação caduca em: I - trinta dias, tratando-se de fornecimento de serviço e de produtos não duráveis; II - noventa dias, tratando-se de fornecimento de serviço e de produtos duráveis. § 3º Tratando-se de vício oculto, o prazo decadencial inicia-se no momento em que ficar evidenciado o defeito.",
    "explicacao": "Prazos de decadência no vício do produto/serviço: 30 dias para não duráveis (alimentos) e 90 dias para duráveis (veículos, eletrodomésticos). No vício oculto, conta-se da ciência do defeito.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art27",
    "artigoNum": 27,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 27",
    "texto": "Prescreve em cinco anos a pretensão à reparação pelos danos causados por fato do produto ou do serviço prevista na Seção II deste Capítulo, iniciando-se a contagem do prazo a partir do conhecimento do dano e de sua autoria.",
    "explicacao": "Prazo de prescrição de 5 anos para pretensões indenizatórias decorrentes de acidentes de consumo (fato do produto/serviço).",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art28",
    "artigoNum": 28,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 28, § 5º",
    "texto": "Também poderá ser desconsiderada a pessoa jurídica sempre que sua personalidade for, de alguma forma, obstáculo ao ressarcimento de prejuízos causados aos consumidores.",
    "explicacao": "Teoria Menor da desconsideração da personalidade jurídica: dispensa a prova de desvio de finalidade ou confusão patrimonial (exigidos no Art. 50 do CC); basta a mera insolvência da pessoa jurídica para atingir bens dos sócios.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art42",
    "artigoNum": 42,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 42, parágrafo único",
    "texto": "O consumidor cobrado em quantia indevida tem direito à repetição do indébito, por valor igual ao dobro do que pagou em excesso, acrescido de correção monetária e juros legais, salvo hipótese de engano justificável.",
    "explicacao": "Repetição do indébito em dobro no CDC. Segundo o STJ (EAREsp 676.608/RJ), a devolução em dobro independe de má-fé, exigindo apenas conduta contrária à boa-fé objetiva.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art49",
    "artigoNum": 49,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 49",
    "texto": "O consumidor pode desistir do contrato, no prazo de 7 dias a contar de sua assinatura ou do ato de recebimento do produto ou serviço, sempre que a contratação de fornecimento de produtos e serviços ocorrer fora do estabelecimento comercial, especialmente por telefone ou a domicílio. Parágrafo único. Se o consumidor exercitar o direito de arrependimento facultado neste artigo, os valores eventualmente pagos, a qualquer título, durante o prazo de reflexão, serão devolvidos, de imediato, monetariamente atualizados.",
    "explicacao": "Direito de arrependimento (prazo de reflexão de 7 dias) em compras online, por telefone ou fora da loja física, com reembolso integral de valores inclusive de frete.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "cdc-art51",
    "artigoNum": 51,
    "diploma": "Código de Defesa do Consumidor (Lei 8.078/90)",
    "dispositivo": "Art. 51, incisos I e IV",
    "texto": "São nulas de pleno direito, entre outras, as cláusulas contratuais relativas ao fornecimento de produtos e serviços que: I - impossibilitem, exonerem ou atenuem a responsabilidade do fornecedor por vícios de qualquer natureza dos produtos e serviços ou impliquem renúncia ou disposição de direitos; IV - estabeleçam obrigações consideradas iníquas, abusivas, que coloquem o consumidor em desvantagem exagerada, ou sejam incompatíveis com a boa-fé ou a eqüidade.",
    "explicacao": "Nulidade de pleno direito de cláusulas abusivas e cláusulas de não indenizar no direito consumerista.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "Planalto (CDC)"
  },
  {
    "id": "eaoab-art1",
    "artigoNum": 1,
    "diploma": "Estatuto da Advocacia e da OAB (Lei 8.906/94)",
    "dispositivo": "Art. 1º",
    "texto": "São atividades privativas de advocacia: I - a postulação a órgão do Poder Judiciário e aos juizados especiais; II - as atividades de consultoria, assessoria e direção jurídicas. § 1º Não se inclui na atividade privativa a impetração de habeas corpus em qualquer instância ou tribunal.",
    "explicacao": "Atividades privativas da advocacia. Qualquer cidadão pode impetrar habeas corpus sem advogado.",
    "eixo": "Ética e Estatuto da OAB",
    "disciplina": "Ética e Estatuto da OAB",
    "fonteOficial": "Planalto (Lei 8.906/94)"
  },
  {
    "id": "eaoab-art7",
    "artigoNum": 7,
    "diploma": "Estatuto da Advocacia e da OAB (Lei 8.906/94)",
    "dispositivo": "Art. 7º, incisos II e III",
    "texto": "São direitos do advogado: II - a inviolabilidade de seu escritório ou local de trabalho, bem como de seus instrumentos de trabalho, de sua correspondência escrita, eletrônica, telefônica e telemática, desde que relativas ao exercício da advocacia; III - comunicar-se com seus clientes, pessoal e reservadamente, mesmo sem procuração, quando estes se acharem presos, detidos ou recolhidos em estabelecimentos civis ou militares, ainda que considerados incomunicáveis.",
    "explicacao": "Prerrogativas basilares da advocacia: inviolabilidade do escritório e comunicação reservada com cliente preso mesmo sem procuração.",
    "eixo": "Ética e Estatuto da OAB",
    "disciplina": "Ética e Estatuto da OAB",
    "fonteOficial": "Planalto (Lei 8.906/94)"
  },
  {
    "id": "eaoab-art7-v",
    "artigoNum": 7,
    "diploma": "Estatuto da Advocacia e da OAB (Lei 8.906/94)",
    "dispositivo": "Art. 7º, inciso V",
    "texto": "São direitos do advogado: não ser recolhido preso, antes de sentença transitada em julgado, senão em sala de Estado Maior, com instalações e comodidades condignas, e, na sua falta, em prisão domiciliar.",
    "explicacao": "Prerrogativa da prisão cautelar em sala de Estado-Maior ou prisão domiciliar imediata em caso de ausência de vaga condigna.",
    "eixo": "Ética e Estatuto da OAB",
    "disciplina": "Ética e Estatuto da OAB",
    "fonteOficial": "Planalto (Lei 8.906/94)"
  },
  {
    "id": "eaoab-art7-a",
    "artigoNum": 7,
    "diploma": "Estatuto da Advocacia e da OAB (Lei 8.906/94)",
    "dispositivo": "Art. 7º-A",
    "texto": "São direitos da advogada: I - gestante: a) entrada em tribunais sem ser submetida a detectores de metais e aparelhos de raios X; b) reserva de vaga em garagens dos fóruns; II - lactante, adotante ou que der à luz, acesso a creche onde houver, ou a local adequado para atendimento das necessidades do bebê; III - gestante, lactante, adotante ou que der à luz, preferência na ordem das sustentações orais e das audiências a serem realizadas a cada dia.",
    "explicacao": "Prerrogativas da mulher advogada gestante, lactante e adotante introduzidas no Estatuto.",
    "eixo": "Ética e Estatuto da OAB",
    "disciplina": "Ética e Estatuto da OAB",
    "fonteOficial": "Planalto (Lei 8.906/94)"
  },
  {
    "id": "eaoab-art28",
    "artigoNum": 28,
    "diploma": "Estatuto da Advocacia e da OAB (Lei 8.906/94)",
    "dispositivo": "Art. 28",
    "texto": "A advocacia é incompatível, mesmo em causa própria, com as seguintes atividades: I - chefe do Poder Executivo e membros da Mesa do Poder Legislativo e seus substitutos legais; II - membros de órgãos do Poder Judiciário, do Ministério Público, dos tribunais e conselhos de contas; III - ocupantes de cargos ou funções de direção em órgãos da Administração Pública direta ou indireta; V - ocupantes de cargos ou funções vinculados direta ou indiretamente a atividade policial de qualquer natureza; VII - ocupantes de cargos ou funções que tenham competência de lançamento, arrecadação ou fiscalização de tributos e contribuições parafiscais.",
    "explicacao": "Hipóteses de incompatibilidade total com o exercício da advocacia (proibição absoluta, inclusive em causa própria).",
    "eixo": "Ética e Estatuto da OAB",
    "disciplina": "Ética e Estatuto da OAB",
    "fonteOficial": "Planalto (Lei 8.906/94)"
  },
  {
    "id": "eaoab-art34",
    "artigoNum": 34,
    "diploma": "Estatuto da Advocacia e da OAB (Lei 8.906/94)",
    "dispositivo": "Art. 34, incisos VII, IX e XXI",
    "texto": "Constitui infração disciplinar: VII - violar, sem justa causa, sigilo profissional; IX - advogar contra literal disposição de lei, presumindo-se a boa-fé quando fundamentado na inconstitucionalidade, na injustiça da lei ou em pronunciamento judicial anterior; XXI - recusar-se, injustificadamente, a prestar contas ao cliente de quantias recebidas dele ou de terceiros por conta dele.",
    "explicacao": "Infrações disciplinares do advogado com sanção de censura, suspensão e exclusão dos quadros da OAB.",
    "eixo": "Ética e Estatuto da OAB",
    "disciplina": "Ética e Estatuto da OAB",
    "fonteOficial": "Planalto (Lei 8.906/94)"
  },
  {
    "id": "lia-art1",
    "artigoNum": 1,
    "diploma": "Lei de Improbidade Administrativa (Lei 8.429/92)",
    "dispositivo": "Art. 1º, §§ 1º e 2º",
    "texto": "O sistema de responsabilização por atos de improbidade administrativa tutelará a probidade na organização do Estado e no exercício de suas funções. § 1º Consideram-se atos de improbidade administrativa as condutas tipificadas nos arts. 9º, 10 e 11 desta Lei, exigindo-se para a sua configuração a demonstração do dolo com a finalidade ilícita. § 2º Considera-se dolo a vontade livre e consciente de alcançar o resultado ilícito tipificado nos arts. 9º, 10 e 11 desta Lei, não bastando a voluntariedade do agente.",
    "explicacao": "Exigência de dolo específico após a Lei 14.230/21. Foi extinta por completo a modalidade culposa de improbidade administrativa no ordenamento pátrio.",
    "eixo": "Direito Administrativo",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (Lei 8.429/92)"
  },
  {
    "id": "lia-art23",
    "artigoNum": 23,
    "diploma": "Lei de Improbidade Administrativa (Lei 8.429/92)",
    "dispositivo": "Art. 23",
    "texto": "A ação para a aplicação das sanções previstas nesta Lei prescreve em 8 (oito) anos, contados a partir da ocorrência do fato ou, no caso de infrações permanentes, do dia em que cessou a permanência.",
    "explicacao": "Prazo prescricional unificado de 8 anos a contar da data da ocorrência do fato para ajuizamento da ação de improbidade.",
    "eixo": "Direito Administrativo",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (Lei 8.429/92)"
  },
  {
    "id": "licit-art74",
    "artigoNum": 74,
    "diploma": "Nova Lei de Licitações (Lei 14.133/21)",
    "dispositivo": "Art. 74",
    "texto": "É inexigível a licitação quando inviável a competição, em especial nos casos de: I - aquisição de materiais, de equipamentos ou de gêneros ou contratação de serviços que só possam ser fornecidos por produtor, empresa ou representante comercial exclusivo; II - contratação de profissional do setor artístico, diretamente ou por meio de empresário exclusivo, desde que consagrado pela crítica especializada ou pela opinião pública; III - contratação de serviços técnicos especializados de natureza predominantemente intelectual com profissionais ou empresas de notória especialização.",
    "explicacao": "Inexigibilidade de licitação: decorre da inviabilidade fática de competição (fornecedor exclusivo, artista consagrado e serviços técnicos de notória especialização).",
    "eixo": "Direito Administrativo",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (Lei 14.133/21)"
  },
  {
    "id": "licit-art75",
    "artigoNum": 75,
    "diploma": "Nova Lei de Licitações (Lei 14.133/21)",
    "dispositivo": "Art. 75",
    "texto": "É dispensável a licitação: I - para contratação que envolva valores inferiores a R$ 100.000,00, no caso de obras e serviços de engenharia ou de serviços de manutenção de veículos automotores; II - para contratação que envolva valores inferiores a R$ 50.000,00, no caso de outros serviços e compras.",
    "explicacao": "Licitação dispensável por baixo valor na Lei 14.133/21. A competição seria juridicamente viável, mas a lei autoriza a contratação direta por razões de economia processual.",
    "eixo": "Direito Administrativo",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "Planalto (Lei 14.133/21)"
  },
  {
    "id": "lep-art112",
    "artigoNum": 112,
    "diploma": "Lei de Execução Penal (Lei 7.210/84)",
    "dispositivo": "Art. 112",
    "texto": "A pena privativa de liberdade será executada em forma progressiva com a transferência para regime menos rigoroso, a ser determinada pelo juiz, quando o preso tiver cumprido ao menos: I - 16% da pena, se o apenado for primário e o crime tiver sido cometido sem violência à pessoa ou grave ameaça; II - 20% da pena, se o apenado for reincidente em crime cometido sem violência à pessoa ou grave ameaça; III - 25% da pena, se o apenado for primário e o crime tiver sido cometido com violência à pessoa ou grave ameaça; IV - 30% da pena, se o apenado for reincidente em crime cometido com violência à pessoa ou grave ameaça; V - 40% da pena, se o apenado for condenado pela prática de crime hediondo ou equiparado, se for primário.",
    "explicacao": "Percentuais de progressão de regime instituídos pelo Pacote Anticrime na LEP.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (Lei 7.210/84)"
  },
  {
    "id": "ms-art23",
    "artigoNum": 23,
    "diploma": "Lei do Mandado de Segurança (Lei 12.016/09)",
    "dispositivo": "Art. 23",
    "texto": "O direito de requerer mandado de segurança extinguir-se-á decorridos 120 (cento e vinte) dias contados da ciência, pelo interessado, do ato impugnado.",
    "explicacao": "Prazo decadencial estrito de 120 dias para impetração do Mandado de Segurança.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (Lei 12.016/09)"
  },
  {
    "id": "acp-art5",
    "artigoNum": 5,
    "diploma": "Lei da Ação Civil Pública (Lei 7.347/85)",
    "dispositivo": "Art. 5º",
    "texto": "Têm legitimidade para propor a ação principal e a ação cautelar: I - o Ministério Público; II - a Defensoria Pública; III - a União, os Estados, o Distrito Federal e os Municípios; IV - a autarquia, empresa pública, fundação ou sociedade de economia mista; V - a associação que, concomitantemente: a) esteja constituída há pelo menos 1 (um) ano nos termos da lei civil; b) inclua, entre suas finalidades institucionais, a proteção ao patrimônio público e social, ao meio ambiente, ao consumidor, à ordem econômica ou ao patrimônio cultural.",
    "explicacao": "Legitimados concorrentes e disjuntivos para propositura da Ação Civil Pública.",
    "eixo": "Processo Coletivo",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (Lei 7.347/85)"
  },
  {
    "id": "jec-art3",
    "artigoNum": 3,
    "diploma": "Lei dos Juizados Especiais Cíveis e Criminais (Lei 9.099/95)",
    "dispositivo": "Art. 3º",
    "texto": "O Juizado Especial Cível tem competência para conciliação, processo e julgamento das causas cíveis de menor complexidade, assim consideradas: I - as causas cujo valor não exceda a quarenta vezes o salário mínimo; II - as enumeradas no art. 275, inciso II, do Código de Processo Civil; III - a ação de despejo para uso próprio; IV - as ações possessórias sobre bens imóveis de valor não excedente ao fixado no inciso I.",
    "explicacao": "Competência material e de valor (40 salários mínimos) dos Juizados Especiais Cíveis. Até 20 salários mínimos não exige advogado.",
    "eixo": "Direito Processual Civil",
    "disciplina": "Direito Processual Civil",
    "fonteOficial": "Planalto (Lei 9.099/95)"
  },
  {
    "id": "jec-art76",
    "artigoNum": 76,
    "diploma": "Lei dos Juizados Especiais Cíveis e Criminais (Lei 9.099/95)",
    "dispositivo": "Art. 76",
    "texto": "Havendo representação ou tratando-se de crime de ação penal pública incondicionada, não sendo caso de arquivamento, o Ministério Público poderá propor a aplicação imediata de pena restritiva de direitos ou multas, a ser especificada na proposta.",
    "explicacao": "Transação penal no JECRIM. Cabível em crimes de menor potencial ofensivo (pena máxima até 2 anos). O cumprimento não gera reincidência nem maus antecedentes.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "Planalto (Lei 9.099/95)"
  },
  {
    "id": "drogas-art33",
    "artigoNum": 33,
    "diploma": "Lei de Drogas (Lei 11.343/06)",
    "dispositivo": "Art. 33, § 4º",
    "texto": "Nos delitos definidos no caput e no § 1º deste artigo, as penas poderão ser reduzidas de um sexto a dois terços, desde que o agente seja primário, de bons antecedentes, não se dedique às atividades criminosas nem integre organização criminosa.",
    "explicacao": "Tráfico privilegiado de entorpecentes: causa especial de diminuição da pena. O STF e o STJ pacificaram que o tráfico privilegiado NÃO é crime hediondo ou equiparado.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (Lei 11.343/06)"
  },
  {
    "id": "maria-art7",
    "artigoNum": 7,
    "diploma": "Lei Maria da Penha (Lei 11.340/06)",
    "dispositivo": "Art. 7º",
    "texto": "São formas de violência doméstica e familiar contra a mulher, entre outras: I - a violência física; II - a violência psicológica; III - a violência sexual; IV - a violência patrimonial; V - a violência moral.",
    "explicacao": "Cinco formas de violência doméstica tipificadas na Lei Maria da Penha. É vedada a aplicação da Lei 9.099/95 e a cominação de penas de cesta básica ou substituição isolada por multa.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "Planalto (Lei 11.340/06)"
  },
  {
    "id": "sv-stf-4",
    "artigoNum": 4,
    "diploma": "Súmula Vinculante STF",
    "dispositivo": "Súmula Vinculante 4",
    "texto": "Salvo nos casos previstos na Constituição, o salário mínimo não pode ser usado como indexador de base de cálculo de vantagem de servidor público ou de empregado, nem ser substituído por decisão judicial.",
    "explicacao": "Vedação do uso do salário mínimo como indexador monetário e proibição de o Poder Judiciário legislar positivamente para criar nova base.",
    "eixo": "Direito Constitucional",
    "disciplina": "Direito Constitucional",
    "fonteOficial": "STF Jurisprudência"
  },
  {
    "id": "sv-stf-5",
    "artigoNum": 5,
    "diploma": "Súmula Vinculante STF",
    "dispositivo": "Súmula Vinculante 5",
    "texto": "A falta de defesa técnica por advogado no processo administrativo disciplinar não ofende a Constituição.",
    "explicacao": "A presença de advogado no processo administrativo disciplinar (PAD) é facultativa e sua ausência não gera nulidade do procedimento.",
    "eixo": "Direito Administrativo",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "STF Jurisprudência"
  },
  {
    "id": "sv-stf-11",
    "artigoNum": 11,
    "diploma": "Súmula Vinculante STF",
    "dispositivo": "Súmula Vinculante 11",
    "texto": "Só é lícito o uso de algemas em casos de resistência e de fundado receio de fuga ou de perigo à integridade física própria ou alheia, por parte do preso ou de terceiros, justificada a excepcionalidade por escrito, sob pena de responsabilidade disciplinar, civil e penal do agente ou da autoridade e de nulidade da prisão ou do ato processual a que se refere, sem prejuízo da responsabilidade civil do Estado.",
    "explicacao": "Uso excepcional de algemas condicionado aos requisitos do mnemônico PRF (Perigo, Resistência, Fuga), sempre com justificativa expressa por escrito sob pena de nulidade.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "STF Jurisprudência"
  },
  {
    "id": "sv-stf-13",
    "artigoNum": 13,
    "diploma": "Súmula Vinculante STF",
    "dispositivo": "Súmula Vinculante 13",
    "texto": "A nomeação de cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau, inclusive, da autoridade nomeante ou de servidor da mesma pessoa jurídica investido em cargo de direção, chefia ou assessoramento, para o exercício de cargo em comissão ou de confiança ou, ainda, de função gratificada na administração pública direta e indireta em qualquer dos poderes da União, dos Estados, do Distrito Federal e dos Municípios, compreendido o ajuste mediante designações recíprocas, viola a Constituição Federal.",
    "explicacao": "Vedação do nepotismo direto e cruzado até o 3º grau na Administração Pública direta e indireta. Não se aplica, como regra geral, a cargos de natureza estritamente política (Ministros de Estado e Secretários Municipais/Estaduais).",
    "eixo": "Direito Administrativo",
    "disciplina": "Direito Administrativo",
    "fonteOficial": "STF Jurisprudência"
  },
  {
    "id": "sv-stf-14",
    "artigoNum": 14,
    "diploma": "Súmula Vinculante STF",
    "dispositivo": "Súmula Vinculante 14",
    "texto": "É direito do defensor, no interesse do representado, ter amplo acesso aos elementos de prova que, já documentados em procedimento investigatório realizado por órgão com competência de polícia judiciária, digam respeito ao exercício do direito de defesa.",
    "explicacao": "Direito de acesso pleno do advogado aos autos de inquérito sobre diligências já cumpridas e formalizadas, não podendo a autoridade policial impor sigilo sobre provas prontas.",
    "eixo": "Direito Processual Penal",
    "disciplina": "Direito Processual Penal",
    "fonteOficial": "STF Jurisprudência"
  },
  {
    "id": "sv-stf-24",
    "artigoNum": 24,
    "diploma": "Súmula Vinculante STF",
    "dispositivo": "Súmula Vinculante 24",
    "texto": "Não se tipifica crime material contra a ordem tributária, previsto no art. 1º, incisos I a IV, da Lei nº 8.137/90, antes do lançamento definitivo do tributo.",
    "explicacao": "Nos crimes materiais contra a ordem tributária (sonegação), a consumação e a instauração da ação penal exigem o prévio esgotamento da esfera administrativa e o lançamento definitivo.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "STF Jurisprudência"
  },
  {
    "id": "sv-stf-25",
    "artigoNum": 25,
    "diploma": "Súmula Vinculante STF",
    "dispositivo": "Súmula Vinculante 25",
    "texto": "É ilícita a prisão civil de depositário infiel, qualquer que seja a modalidade do depósito.",
    "explicacao": "Proibição da prisão civil do depositário infiel com esteio no Pacto de São José da Costa Rica (status supralegal). A única prisão civil por dívida admitida no Brasil é a do devedor voluntário e inescusável de pensão alimentícia.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "STF Jurisprudência"
  },
  {
    "id": "sv-stf-47",
    "artigoNum": 47,
    "diploma": "Súmula Vinculante STF",
    "dispositivo": "Súmula Vinculante 47",
    "texto": "Os honorários advocatícios incluídos na condenação ou destacados do montante principal pertencem ao advogado, tendo natureza alimentar e crédito com privilégio geral em concurso de credores.",
    "explicacao": "Natureza alimentar dos honorários advocatícios (sucumbenciais e contratuais) e privilégio creditório equivalente a créditos trabalhistas.",
    "eixo": "Ética e Estatuto da OAB",
    "disciplina": "Ética e Estatuto da OAB",
    "fonteOficial": "STF Jurisprudência"
  },
  {
    "id": "sv-stf-56",
    "artigoNum": 56,
    "diploma": "Súmula Vinculante STF",
    "dispositivo": "Súmula Vinculante 56",
    "texto": "A falta de estabelecimento penal adequado não autoriza a manutenção do condenado em regime prisional mais gravoso, devendo-se observar, nessa hipótese, os parâmetros fixados no RE 641.320/RS.",
    "explicacao": "Vedação ao excesso na execução penal: se não há vaga no semiaberto ou aberto, o apenado não pode ser mantido no fechado, devendo cumprir prisão domiciliar ou em regime mais brando.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "STF Jurisprudência"
  },
  {
    "id": "sum-stj-130",
    "artigoNum": 130,
    "diploma": "Súmula STJ",
    "dispositivo": "Súmula 130 STJ",
    "texto": "A empresa responde, perante o cliente, pela reparação de dano ou furto de veículo ocorridos em seu estacionamento.",
    "explicacao": "Dever de guarda e custódia nos estacionamentos comerciais oferecidos por shoppings e hipermercados, mesmo que gratuitos.",
    "eixo": "Direito do Consumidor",
    "disciplina": "Direito do Consumidor",
    "fonteOficial": "STJ Jurisprudência"
  },
  {
    "id": "sum-stj-227",
    "artigoNum": 227,
    "diploma": "Súmula STJ",
    "dispositivo": "Súmula 227 STJ",
    "texto": "A pessoa jurídica pode sofrer dano moral.",
    "explicacao": "Dano moral à honra objetiva (bom nome comercial, credibilidade e reputação mercantil) da pessoa jurídica.",
    "eixo": "Direito Civil",
    "disciplina": "Direito Civil",
    "fonteOficial": "STJ Jurisprudência"
  },
  {
    "id": "sum-stj-542",
    "artigoNum": 542,
    "diploma": "Súmula STJ",
    "dispositivo": "Súmula 542 STJ",
    "texto": "A ação penal por crime de lesão corporal no âmbito da violência doméstica e familiar contra a mulher é pública incondicionada.",
    "explicacao": "Ação penal pública incondicionada na lesão corporal decorrente da Lei Maria da Penha (leve, grave ou gravíssima), dispensando representação da vítima e inviabilizando renúncia em audiência preliminar.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "STJ Jurisprudência"
  },
  {
    "id": "sum-stj-599",
    "artigoNum": 599,
    "diploma": "Súmula STJ",
    "dispositivo": "Súmula 599 STJ",
    "texto": "O princípio da insignificância é inaplicável aos crimes contra a administração pública.",
    "explicacao": "Inaplicabilidade do princípio da insignificância (bagatela) em crimes funcionais contra a administração pública, haja vista que a moralidade administrativa é bem jurídico indisponível e incomensurável.",
    "eixo": "Direito Penal",
    "disciplina": "Direito Penal",
    "fonteOficial": "STJ Jurisprudência"
  },
  {
    "id": "sum-tst-331",
    "artigoNum": 331,
    "diploma": "Súmula TST",
    "dispositivo": "Súmula 331 TST, itens IV e V",
    "texto": "O inadimplemento das obrigações trabalhistas, por parte do empregador, implica a responsabilidade subsidiária do tomador dos serviços quanto àquelas obrigações. Os entes integrantes da Administração Pública direta e indireta respondem subsidiariamente, caso evidenciada a sua conduta culposa no cumprimento das obrigações da Lei n.º 8.666, especialmente na fiscalização do cumprimento das obrigações contratuais e legais da prestadora de serviço.",
    "explicacao": "Responsabilidade subsidiária do tomador de serviços na terceirização lícita, exigindo na Administração Pública a comprovação de culpa in vigilando ou in eligendo (ADC 16 e Tema 246 do STF).",
    "eixo": "Direito do Trabalho",
    "disciplina": "Direito do Trabalho",
    "fonteOficial": "TST Jurisprudência"
  }
];

export function getAllDiplomas(): DiplomaMeta[] {
  return DIPLOMAS_META;
}

export function getItemsByDiploma(diploma: string): VadeMecumItem[] {
  if (!diploma || diploma === "Todos os Diplomas") return VADE_MECUM_ITEMS;
  return VADE_MECUM_ITEMS.filter(item => item.diploma === diploma);
}

export function searchVadeMecum(term: string): VadeMecumItem[] {
  if (!term.trim()) return VADE_MECUM_ITEMS;
  const lower = term.toLowerCase();
  return VADE_MECUM_ITEMS.filter(item =>
    item.dispositivo.toLowerCase().includes(lower) ||
    item.diploma.toLowerCase().includes(lower) ||
    item.texto.toLowerCase().includes(lower) ||
    item.explicacao.toLowerCase().includes(lower)
  );
}
