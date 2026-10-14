import { useState } from "react";
import {
  PROFILE_AVATARS,
  PROFILE_ROLES,
  createProfile,
  deleteProfile,
  getActiveProfile,
  loadAllProfiles,
  switchProfile,
  type UserProfile,
} from "@/lib/profiles";
import { downloadBackupFile, restoreBackupData } from "@/lib/backup";
import { cn } from "@/lib/utils";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSwitched: (profile: UserProfile) => void;
}

export function ProfileModal({ isOpen, onClose, onProfileSwitched }: ProfileModalProps) {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => loadAllProfiles());
  const [activeProfile, setActiveProfile] = useState<UserProfile>(() => getActiveProfile());
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState(PROFILE_ROLES[0]!);
  const [newAvatar, setNewAvatar] = useState(PROFILE_AVATARS[0]!);
  const [newPin, setNewPin] = useState("");
  const [pinPromptProfile, setPinPromptProfile] = useState<UserProfile | null>(null);
  const [pinAttempt, setPinAttempt] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [googleModal, setGoogleModal] = useState(false);
  const [googleName, setGoogleName] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");

  if (!isOpen) return null;

  const refreshList = () => {
    const all = loadAllProfiles();
    setProfiles(all);
    setActiveProfile(getActiveProfile());
  };

  const handleSelectProfile = (p: UserProfile) => {
    if (p.id === activeProfile.id) {
      onClose();
      return;
    }

    if (p.pin) {
      setPinPromptProfile(p);
      setPinAttempt("");
      setErrorMsg(null);
      return;
    }

    const res = switchProfile(p.id);
    if (res.success && res.profile) {
      setActiveProfile(res.profile);
      onProfileSwitched(res.profile);
      refreshList();
      onClose();
    } else {
      setErrorMsg(res.error || "Falha ao trocar de perfil.");
    }
  };

  const handleConfirmPin = () => {
    if (!pinPromptProfile) return;
    const res = switchProfile(pinPromptProfile.id, pinAttempt);
    if (res.success && res.profile) {
      setActiveProfile(res.profile);
      onProfileSwitched(res.profile);
      refreshList();
      setPinPromptProfile(null);
      onClose();
    } else {
      setErrorMsg(res.error || "PIN incorreto.");
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setErrorMsg("Informe um nome para o perfil.");
      return;
    }
    const created = createProfile({
      name: newName,
      role: newRole,
      avatar: newAvatar,
      pin: newPin || undefined,
    });
    switchProfile(created.id);
    setActiveProfile(created);
    onProfileSwitched(created);
    refreshList();
    setIsCreating(false);
    setNewName("");
    setNewPin("");
    setErrorMsg(null);
    onClose();
  };

  const handleGoogleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const name = googleName.trim() || "Usuário Google";
    const email = googleEmail.trim() || "usuario@gmail.com";
    const created = createProfile({
      name,
      role: "Advogado(a)",
      avatar: "🏛️",
      isGoogle: true,
      googleEmail: email,
    });
    switchProfile(created.id);
    setActiveProfile(created);
    onProfileSwitched(created);
    refreshList();
    setGoogleModal(false);
    onClose();
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Deseja realmente remover o perfil de "${name}" deste dispositivo?`)) {
      return;
    }
    const res = deleteProfile(id);
    if (!res.success) {
      alert(res.error || "Não foi possível excluir.");
      return;
    }
    const all = loadAllProfiles();
    setProfiles(all);
    const active = getActiveProfile();
    setActiveProfile(active);
    onProfileSwitched(active);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-gold/40 bg-card p-6 shadow-2xl space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-2xl text-gold">
              👤
            </span>
            <div>
              <h2 className="text-lg font-bold text-foreground">Gerenciador de Perfis</h2>
              <p className="text-xs text-muted-foreground">
                Mantenha estatísticas, histórico e ranking 100% individualizados por usuário.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground text-sm"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Modal de PIN/Senha ao alternar */}
        {pinPromptProfile && (
          <div className="space-y-4 rounded-xl border border-gold/40 bg-gold/5 p-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔒</span>
              <span className="text-xs font-bold text-foreground">
                Perfil Protegido: {pinPromptProfile.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Digite a senha ou PIN de segurança para carregar as estatísticas e records deste
              perfil:
            </p>
            <input
              type="password"
              autoFocus
              maxLength={12}
              value={pinAttempt}
              onChange={(e) => setPinAttempt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConfirmPin()}
              placeholder="Digite a senha ou PIN..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none font-mono-type text-center tracking-widest"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPinPromptProfile(null)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmPin}
                className="rounded-lg bg-gold px-4 py-1.5 text-xs font-bold text-gold-foreground hover:opacity-90 shadow-sm"
              >
                Desbloquear e Entrar
              </button>
            </div>
          </div>
        )}

        {/* Modal de Conectar com Google */}
        {googleModal && (
          <form
            onSubmit={handleGoogleLogin}
            className="space-y-4 rounded-xl border border-border bg-background p-4 shadow-inner"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Vincular Conta Google ao LexType</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Acesse seu perfil individual com sua identidade Google:
            </p>
            <div className="space-y-2">
              <input
                type="text"
                required
                value={googleName}
                onChange={(e) => setGoogleName(e.target.value)}
                placeholder="Seu Nome Completo (ex: Bruno Souza)"
                className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-xs focus:border-gold focus:outline-none"
              />
              <input
                type="email"
                required
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
                placeholder="seu.email@gmail.com"
                className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-xs focus:border-gold focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setGoogleModal(false)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-gold px-4 py-1.5 text-xs font-bold text-gold-foreground hover:opacity-90 shadow-sm"
              >
                Confirmar Login Google
              </button>
            </div>
          </form>
        )}

        {/* Formulário de Criação de Novo Perfil */}
        {isCreating && !pinPromptProfile && !googleModal && (
          <form
            onSubmit={handleCreate}
            className="space-y-4 rounded-xl border border-gold/30 bg-gold/5 p-4"
          >
            <div className="flex items-center justify-between border-b border-gold/20 pb-2">
              <span className="text-xs font-bold text-foreground">
                Cadastrar Novo Perfil Individual
              </span>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ✕ Cancelar
              </button>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">
                Nome ou Pseudônimo:
              </label>
              <input
                type="text"
                required
                maxLength={30}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex.: Dra. Ana Beatriz"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-gold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-muted-foreground">
                  Cargo / Atuação:
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-gold focus:outline-none"
                >
                  {PROFILE_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-muted-foreground">
                  Senha / PIN (Opcional):
                </label>
                <input
                  type="password"
                  maxLength={10}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Ex.: 1234 (opcional)"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-gold focus:outline-none font-mono-type"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">
                Escolha o Ícone / Avatar:
              </label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {PROFILE_AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setNewAvatar(av)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg border text-base transition-all",
                      newAvatar === av
                        ? "border-gold bg-gold/20 scale-110 shadow-sm"
                        : "border-border bg-background hover:bg-secondary",
                    )}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-gold px-4 py-1.5 text-xs font-bold text-gold-foreground hover:opacity-90 shadow-sm"
              >
                Salvar e Ativar Perfil
              </button>
            </div>
          </form>
        )}

        {/* Lista de Perfis Cadastrados */}
        {!isCreating && !pinPromptProfile && !googleModal && (
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Perfis no Dispositivo ({profiles.length})
              </span>
              <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
                {profiles.map((p) => {
                  const isActive = p.id === activeProfile.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProfile(p)}
                      className={cn(
                        "group flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all",
                        isActive
                          ? "border-gold bg-gold/15 shadow-sm"
                          : "border-border/80 bg-background/60 hover:border-gold/50 hover:bg-secondary/40",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-2xl">
                          {p.avatar}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-foreground">{p.name}</span>
                            {p.pin && (
                              <span className="text-[10px]" title="Protegido por senha">
                                🔒
                              </span>
                            )}
                            {p.isGoogle && (
                              <span
                                className="text-[10px] text-sky-400 font-semibold"
                                title="Conta Google"
                              >
                                Google
                              </span>
                            )}
                            {isActive && (
                              <span className="rounded bg-gold/20 px-1.5 py-0.2 text-[9px] font-bold text-gold uppercase">
                                Ativo
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span>{p.role}</span>
                            <span>•</span>
                            <span className="font-mono-type">{p.bestWpm || 0} PPM máx</span>
                            <span>•</span>
                            <span className="text-gold font-mono-type">{p.xp || 0} XP</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isActive && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(p.id, p.name);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive text-xs transition"
                            title="Remover perfil"
                          >
                            🗑️
                          </button>
                        )}
                        <span className="text-xs font-semibold text-gold">
                          {isActive ? "Selecionado ✓" : "Alternar →"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Seção de Backup e Restauração de Dados */}
            <div className="rounded-lg border border-border/70 bg-secondary/30 p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  💾 Backup & Restauração (.json)
                </span>
                <span className="text-[10px] text-muted-foreground">Todos os perfis e históricos</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const fn = downloadBackupFile();
                    setErrorMsg(`Backup exportado: ${fn}`);
                  }}
                  className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-secondary transition shadow-sm"
                >
                  📥 Exportar Backup (.json)
                </button>
                <label className="cursor-pointer rounded-md border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-secondary transition shadow-sm">
                  📤 Restaurar Backup (.json)
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(ev) => {
                      const file = ev.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const content = e.target?.result as string;
                        if (!content) return;
                        const res = restoreBackupData(content);
                        if (res.success) {
                          refreshList();
                          onProfileSwitched(getActiveProfile());
                          setErrorMsg(res.message);
                        } else {
                          setErrorMsg(res.message);
                        }
                      };
                      reader.readAsText(file);
                      ev.target.value = "";
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Ações Inferiores */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
              <button
                type="button"
                onClick={() => setGoogleModal(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary transition shadow-sm"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Entrar com Google</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-3.5 py-1.5 text-xs font-bold text-gold-foreground hover:opacity-90 transition shadow-sm"
              >
                <span>➕ Criar Novo Perfil</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
