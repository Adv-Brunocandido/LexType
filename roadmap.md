# Roadmap — App de Digitação Jurídica (LexType)

- [x] Design system dark focado (tokens em src/styles.css)
- [x] Motor de digitação: texto alvo, WPM, precisão, erros por tecla
- [x] Seleção de teclas-alvo (fileiras, custom)
- [x] Geração de exercícios: bigramas/trigramas, palavras jurídicas, frases jurídicas
- [x] Teclado visual com mapa de dedos e destaque de teclas fracas
- [x] Sistema de motivação: maestria por tecla, streak, resumo de sessão, parecer técnico
- [x] Persistência em localStorage
- [x] Head metadata da rota /

## Atualização 1

- [x] Teclado ABNT2 completo (seleção e visual), números/acentos/pontuação
- [x] Sons: digitação, erro, vitória, combo
- [x] Recursos TDAH: combo, XP/patentes, meta diária, confete, modo foco
- [x] Modo automático adaptativo + Prof. Dr. Rigoroso
- [x] Input para celular
- [x] Modo Estudos Mistos Avançados (área do Direito, semântica da palavra + "virada de chave" gerada por IA)
- [x] Estudos: matérias da OAB + campo de matéria livre
- [x] Estudos: escolher quantidade de linhas (2 até 10)
- [x] Configurações: temas múltiplos (Escuro, Claro, Sépia/Pergaminho, OLED)
- [x] Virada de chave só fecha quando o usuário quiser (cartão fixável)
- [x] Botão repetir (ficar na mesma frase)
- [x] Enviar arquivo de texto/diretriz como referência para a IA

## Atualização 2 — Blueprint & Estabilização

- [x] Correção de tipos estritos TypeScript (`exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`) em `abnt2.ts`, `typing.ts` e `index.tsx`
- [x] Suíte de testes unitários automatizados cobrindo ABNT2, métricas, adaptatividade e cálculo de streak
- [x] Correção de cálculo de fuso horário local para streak e sessões diárias (eliminando desvio UTC)
- [x] Mapa Diagnóstico de Domínio Muscular (`DiagnosticMap`) com recomendação biomecânica e treino focado
- [x] Modo de Rigor configurável (reiniciar ao errar para precisão de concurso/cartório)
- [x] Escala visual acessível (Compacto 85%, Padrão 100%, Grande 120%) para texto e teclado
- [x] Sons de vitória evolutivos (normal, epic, grand) e controle de volume persistido
- [x] Compartilhamento de conquistas via Web Share API e área de transferência com privacidade preservada
- [x] Rodapé de transparência jurídica, educacional e privacidade de dados

## Atualização 3 — Layout Flexível, Multi-monitor, ANSI US e Professor

- [x] Disposição flexível das 3 janelas fixas: Padrão Vertical, Lado a Lado (Split em 2 colunas para telas amplas) e Teclado no Topo
- [x] Janela destacável para 2º Monitor (Pop-Out em `/keyboard`) com sincronização ao vivo via `BroadcastChannel`
- [x] Suporte completo a layout Americano ANSI US (sem Ç, com `; :` na linha guia) e ABNT2 Brasil com alternância instantânea
- [x] Controle de ocultação/exibição do teclado na tela principal para uso otimizado com monitor secundário
- [x] Grande ampliação do repertório pedagógico e humorístico do Professor Dr. Rigoroso (prazos do PJe, café frio, Vade Mecum, latim e milagre processual)
- [x] Verificação oficial de disponibilidade de domínios: `lextype.com.br` e `lextype.app` confirmados como livres para registro
- [x] Expansão da suíte de testes unitários para 18 testes aprovados com cobertura ANSI e ABNT2

## Atualização 4 (Planejada) — PRD LexType Ultimate

Consulte o documento completo em [PRD.md](file:///c:/FOLDER%20APPS/LexType/PRD.md).

### 1. Mecânica Central & Editor de Texto

- [ ] **Modos Strict vs. Fluid:** Alternador `stopOnError`:
  - _Strict:_ Trava no caractere errado até acertar a tecla correta.
  - _Fluid:_ Permite continuar digitando com erros em vermelho, exigindo `Backspace` para corrigir antes de concluir.
- [ ] **Smooth Caret:** Cursor ultra-suave com interpolação CSS (`transition: left 0.1s ease, top 0.1s ease`).
- [ ] **Line Preview Container:** Rolagem vertical suave mantendo a linha ativa centralizada.
- [ ] **Navegação Zero Mouse (Atalhos Globais):**
  - `Tab + Enter` -> Reinício instantâneo do teste (`resetTest()`).
  - `Escape` -> Abertura de Command Palette (paleta de comandos estilo IDE para temas, modos e configurações).

### 2. Geração de Texto & Filtros de Conteúdo

- [ ] **Toggles de Complexidade:**
  - `includeCapitalization`: Maiúsculas distribuídas organicamente.
  - `includePunctuation`: Injeção de pontuação (`.`, `,`, `?`, `!`).
  - `includeSpecialSymbols`: Símbolos avançados (`@`, `#`, `$`, `_`, `§`).
- [ ] **Modo Código (IDE Simulation):** Formatação com recuo automático de 2/4 espaços ao abrir `{` e fechar `}`.
- [ ] **Modo Endurance (Textos Longos):** Capítulos de obras de domínio público e feeds de notícias.
- [ ] **Importação Customizada:** Divisão automática de texto colado em blocos ergonômicos de 30 palavras.

### 3. Métricas, Telemetria & Integridade Competitiva

- [ ] **Heatmap com Latência por Tecla:** Registro de `latencyMs` por caractere e injeção adaptativa de teclas com latência > 300ms.
- [ ] **Meta de Precisão:** Multiplicador e mensagem pedagógica ao atingir Precisão >= 95%.
- [ ] **Streak Cumulativo de Tempo:** Incremento de streak diário após 5 minutos cumulativos de treino na janela de 24h.
- [ ] **Matchmaking Competitivo (Ranked):** Emparelhamento de salas de corrida com tolerância de WPM ± 5.
- [ ] **Validação Anti-Macro/Bot:** Detecção de intervalos estritamente idênticos em 5+ eventos sucessivos.
