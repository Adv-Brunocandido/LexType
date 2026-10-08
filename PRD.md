# Product Requirements Document (PRD) - Lextype Ultimate

## 1. Core Mechanics & Text Editor

### 1.1 Behavior Rules (Strict vs Fluid Input)
* Define a state variable `stopOnError` (Boolean, default: true).
* **If `stopOnError === true` (Strict Mode):** Block user input when `event.key !== expectedChar`. The cursor freezes on the current character until the correct key is pressed.
* **If `stopOnError === false` (Fluid Mode):** Allow the user to keep typing forward even if characters are incorrect. Highlight errors in red. Block submission or completion until the user presses `Backspace` to fix all incorrect characters.

### 1.2 Viewport & Visual Layout
* Implement a **Smooth Caret** using CSS transitions (`transition: left 0.1s ease, top 0.1s ease`) to reduce eye strain.
* Implement a **Line Preview** scrolling container. The active line of text must remain fixed at the vertical center of the editor component, pushing completed lines upward smoothly.

### 1.3 Absolute Keyboard Navigation (Zero Mouse Policy)
* Listen for global keydown events:
  * `Tab + Enter` -> Trigger full test reset (`resetTest()`).
  * `Escape` -> Open a Command Palette modal (`isOpenCommandPalette = true`). 
* The Command Palette must mimic an IDE panel, allowing the user to type and filter settings (e.g., "Toggle Punctuation", "Switch Theme", "Change Mode") using arrow keys and `Enter`.

---

## 2. Text Generation Modes & Content Filters

### 2.1 Complexity Modules (State Toggles)
Create three state triggers that dynamically append constraints to the text generator engine:
* `includeCapitalization` (Boolean): Mix uppercase letters naturally into the word array.
* `includePunctuation` (Boolean): Inject basic separators (`.`, `,`, `?`, `!`) at the end of random generated phrases.
* `includeSpecialSymbols` (Boolean): Inject development tokens (`@`, `#`, `$`, `_`, `§`) for advanced mechanical practice.

### 2.2 Specialized Sub-Modes
* **Code Mode (Real IDE Simulation):** Render text inside a code-block theme using monospaced layout. When a user types `{` followed by `Enter`, automatically indent the next line by 2 or 4 spaces and insert a closing `}` down below.
* **Endurance Mode (Long Texts):** Support continuous reading/typing strings by pulling public domain book chapters or modern RSS news feeds.
* **Custom Import:** Provide a plain `<textarea>` for users to paste raw strings. Split the submitted text into ergonomic 30-word blocks.

---

## 3. Analytics, Scoring & Anti-Cheat

### 3.1 Key-by-Key Heatmap Tracking
* Track analytics using a persistent object structured as: `keysPerformance: Record<string, { errors: number, totalHits: number, latencyMs: number[] }>`.
* On keydown, measure performance: `latency = performance.now() - lastKeyPressTime`.
* **Adaptive Practice Engine:** When starting a new session, query `keysPerformance` to find characters with the highest error rates or slow reaction times (latency > 300ms). Inject words containing those exact weak characters into the upcoming test string.

### 3.2 Focus Indicators & Gamification
* **Precision Milestone:** Calculate dynamic performance scores. If a test completes with `Precision >= 95%`, apply visual multipliers/streaks. Show an onboarding tooltip: *"Speed follows precision. Type slow to grow fast."*
* **Daily Streak Component:** Store daily practice timestamps in `localStorage`. If the user hits a cumulative 5-minute training block inside a 24-hour window, increment `dailyStreakCount ++`.

### 3.3 Competitive Matchmaking & Integrity
* **Ranked Pairing:** Match concurrent users into racing lobbies using a moving average of their last 10 WPM scores (Tolerance window: `currentWPM ± 5`).
* **Anti-Macro Validation:** If the time delta between 5 or more sequential keydown events is strictly identical (e.g., standard interval anomalies from bot injection scripts), flag the test state as invalid and reject leaderboard submission.
