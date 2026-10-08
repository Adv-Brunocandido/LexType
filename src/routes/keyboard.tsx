import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Keyboard, type KeyboardScale } from "@/components/Keyboard";
import { loadKeyStats, type KeyStats } from "@/lib/typing";
import { type KeyboardLayout } from "@/lib/abnt2";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/keyboard")({
  component: KeyboardPopoutPage,
});

function KeyboardPopoutPage() {
  const [stats, setStats] = useState<KeyStats>({});
  const [nextKeys, setNextKeys] = useState<string[]>([]);
  const [flash, setFlash] = useState<{ key: string; type: "ok" | "err" } | null>(null);
  const [layout, setLayout] = useState<KeyboardLayout>("abnt2");
  const [scale, setScale] = useState<KeyboardScale>("large");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Carregar tema salvo
    const savedTheme = localStorage.getItem("lextype-theme") || "dark";
    document.documentElement.classList.remove("dark", "light", "sepia", "oled");
    document.documentElement.classList.add(savedTheme);

    const savedLayout =
      (localStorage.getItem("lextype-keyboard-layout") as KeyboardLayout) || "abnt2";
    setLayout(savedLayout);

    setStats(loadKeyStats());

    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const channel = new BroadcastChannel("lextype-channel");
      setConnected(true);

      channel.onmessage = (ev) => {
        const data = ev.data;
        if (data?.type === "KEYBOARD_SYNC") {
          if (data.nextKeys !== undefined) setNextKeys(data.nextKeys);
          if (data.flash !== undefined) setFlash(data.flash);
          if (data.stats !== undefined) setStats(data.stats);
          if (data.layout !== undefined) setLayout(data.layout);
          if (data.scale !== undefined) setScale(data.scale);
        }
      };

      // Solicita sync inicial
      channel.postMessage({ type: "REQUEST_SYNC" });

      return () => {
        channel.close();
      };
    }
    return undefined;
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground select-none">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 w-full max-w-5xl px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                connected ? "bg-success" : "bg-gold",
              )}
            />
            <span
              className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                connected ? "bg-success" : "bg-gold",
              )}
            />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {connected
              ? "Teclado Secundário · Sincronizado ao Vivo"
              : "Aguardando Janela Principal…"}
          </span>
          <span className="rounded bg-secondary px-2 py-0.5 text-[0.65rem] font-mono-type text-gold uppercase font-bold">
            {layout === "ansi" ? "ANSI (US)" : "ABNT2 (BR)"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-border overflow-hidden text-xs">
            {(["compact", "normal", "large"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={cn(
                  "px-2.5 py-1 capitalize transition-colors",
                  scale === s ? "bg-gold text-gold-foreground font-semibold" : "hover:bg-secondary",
                )}
              >
                {s === "compact" ? "P" : s === "normal" ? "M" : "G"}
              </button>
            ))}
          </div>

          <button
            onClick={toggleFullscreen}
            className="rounded-md border border-border px-3 py-1 text-xs hover:border-gold hover:text-gold transition-colors"
            title="Alternar Tela Cheia neste monitor"
          >
            ⛶ Tela Cheia
          </button>
        </div>
      </header>

      <main className="w-full max-w-5xl flex flex-col items-center justify-center">
        <div className="w-full rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-2xl flex flex-col items-center">
          <Keyboard
            stats={stats}
            selectedKeys={[]}
            nextKeys={nextKeys}
            flash={flash}
            scale={scale}
            layout={layout}
          />
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          Dica: arraste esta janela para o seu 2º monitor. As teclas e dedos são iluminados em tempo
          real conforme você digita no monitor principal!
        </p>
      </main>
    </div>
  );
}
