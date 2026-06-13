import { useEffect, useState } from "react";
import { Lock, LogOut, Plus, Trash2, ArrowLeft, Heart } from "lucide-react";
import { toast } from "sonner";
import {
    verifyAdmin,
    setAdminToken,
    getAdminToken,
    getStats,
    getContributors,
    adminAddContributor,
    adminDeleteContributor,
    getMessages,
    adminDeleteMessage,
} from "@/lib/api";
import { Link } from "react-router-dom";

const formatEUR = (n) =>
    new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 2,
    }).format(n || 0);

export default function Admin() {
    const [authed, setAuthed] = useState(false);
    const [tokenInput, setTokenInput] = useState("");
    const [stats, setStats] = useState(null);
    const [contributors, setContributors] = useState([]);
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [busy, setBusy] = useState(false);

    const load = async () => {
        try {
            const [s, c, m] = await Promise.all([
                getStats(),
                getContributors(),
                getMessages(),
            ]);
            setStats(s);
            setContributors(c);
            setMessages(m);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const t = getAdminToken();
        if (t) {
            verifyAdmin(t)
                .then(() => {
                    setAuthed(true);
                    load();
                })
                .catch(() => {
                    setAdminToken(null);
                    setAuthed(false);
                });
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const t = tokenInput.trim();
        if (!t) return;
        try {
            await verifyAdmin(t);
            setAdminToken(t);
            setAuthed(true);
            toast.success("Bem-vinda, organizadora 🧡");
            load();
        } catch {
            toast.error("Token inválido");
        }
    };

    const handleLogout = () => {
        setAdminToken(null);
        setAuthed(false);
        setTokenInput("");
        toast.success("Sessão terminada");
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const n = name.trim();
        const a = parseFloat(amount);
        if (!n) return toast.error("Indica o nome");
        if (!a || a <= 0) return toast.error("Indica um valor válido");
        setBusy(true);
        try {
            await adminAddContributor({
                name: n,
                amount: a,
                note: note.trim() || null,
            });
            toast.success(`${n} adicionada à vaquinha`);
            setName("");
            setAmount("");
            setNote("");
            load();
        } catch (err) {
            console.error(err);
            toast.error("Não foi possível adicionar");
        } finally {
            setBusy(false);
        }
    };

    const handleDelete = async (id, who) => {
        if (!window.confirm(`Remover contribuição de ${who}?`)) return;
        try {
            await adminDeleteContributor(id);
            toast.success("Contribuição removida");
            load();
        } catch {
            toast.error("Erro ao remover");
        }
    };

    const handleDeleteMessage = async (id, who) => {
        if (!window.confirm(`Remover mensagem de ${who}?`)) return;
        try {
            await adminDeleteMessage(id);
            toast.success("Mensagem removida");
            load();
        } catch {
            toast.error("Erro ao remover");
        }
    };

    if (!authed) {
        return (
            <main
                data-testid="admin-login-page"
                className="min-h-screen flex items-center justify-center px-6"
                style={{ background: "var(--bg)" }}
            >
                <form
                    onSubmit={handleLogin}
                    data-testid="admin-login-form"
                    className="w-full max-w-md rounded-3xl bg-[#FDFBF7] border border-[#E6D5B8] p-8 sm:p-10 shadow-sm"
                >
                    <Link
                        to="/"
                        data-testid="admin-back-link"
                        className="inline-flex items-center gap-2 text-sm text-[#8B5A2B] hover:text-[#C85A17] mb-6"
                    >
                        <ArrowLeft size={14} /> Voltar ao site
                    </Link>
                    <div className="w-12 h-12 rounded-2xl bg-[#C85A17]/15 text-[#C85A17] flex items-center justify-center mb-5">
                        <Lock size={20} strokeWidth={1.5} />
                    </div>
                    <h1 className="font-serif-display text-3xl text-[#2C2621] mb-2">
                        Área dos organizadores
                    </h1>
                    <p className="text-sm text-[#5C5248] mb-6">
                        Insere o token partilhado para gerir as contribuições.
                    </p>
                    <input
                        data-testid="admin-token-input"
                        type="password"
                        value={tokenInput}
                        onChange={(e) => setTokenInput(e.target.value)}
                        placeholder="Token de admin"
                        className="w-full rounded-2xl bg-[#F4EFE6] border border-[#E6D5B8] px-4 py-3.5 text-[#2C2621] placeholder:text-[#8B5A2B]/60 focus:outline-none focus:ring-2 focus:ring-[#C85A17]/40 focus:border-[#C85A17] transition mb-4"
                    />
                    <button
                        data-testid="admin-login-button"
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A17] hover:bg-[#A64A12] text-white px-6 py-3.5 text-base font-medium transition-all"
                    >
                        Entrar
                    </button>
                </form>
            </main>
        );
    }

    const pct = Math.min(100, stats?.percentage || 0);

    return (
        <main
            data-testid="admin-dashboard"
            className="min-h-screen px-6 sm:px-10 py-12"
            style={{ background: "var(--bg)" }}
        >
            <div className="max-w-5xl mx-auto">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#8B5A2B] hover:text-[#C85A17] mb-2"
                        >
                            <ArrowLeft size={12} /> Site público
                        </Link>
                        <h1 className="font-serif-display text-4xl text-[#2C2621]">
                            Gestão da Vaquinha
                        </h1>
                    </div>
                    <button
                        data-testid="admin-logout-button"
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-full border border-[#E6D5B8] hover:border-[#C85A17] hover:text-[#C85A17] text-[#5C5248] px-4 py-2.5 text-sm transition-all"
                    >
                        <LogOut size={14} /> Sair
                    </button>
                </header>

                {/* Stats */}
                <div className="rounded-3xl bg-[#FDFBF7] border border-[#E6D5B8] p-6 sm:p-8 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-[#8B5A2B]">
                                Angariado
                            </p>
                            <p className="font-serif-display text-4xl text-[#2C2621]">
                                {formatEUR(stats?.raised)}
                            </p>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-xs uppercase tracking-wider text-[#8B5A2B]">
                                Meta · {stats?.contributors_count || 0}{" "}
                                contribuidores
                            </p>
                            <p className="font-serif-display text-2xl text-[#5C5248]">
                                {formatEUR(stats?.goal || 1000)} · {pct.toFixed(0)}%
                            </p>
                        </div>
                    </div>
                    <div className="h-4 rounded-full bg-[#F4EFE6] border border-[#E6D5B8] overflow-hidden">
                        <div
                            className="h-full progress-fill rounded-full transition-[width] duration-700"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                </div>

                {/* Add form */}
                <form
                    onSubmit={handleAdd}
                    data-testid="admin-add-form"
                    className="rounded-3xl bg-[#FDFBF7] border border-[#E6D5B8] p-6 sm:p-8 mb-10"
                >
                    <h2 className="font-serif-display text-2xl text-[#2C2621] mb-5 flex items-center gap-2">
                        <Plus size={18} /> Registar contribuição
                    </h2>
                    <div className="grid sm:grid-cols-12 gap-3">
                        <input
                            data-testid="admin-name-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome"
                            maxLength={80}
                            className="sm:col-span-5 rounded-2xl bg-[#F4EFE6] border border-[#E6D5B8] px-4 py-3 text-[#2C2621] placeholder:text-[#8B5A2B]/60 focus:outline-none focus:ring-2 focus:ring-[#C85A17]/40 focus:border-[#C85A17]"
                        />
                        <input
                            data-testid="admin-amount-input"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Valor €"
                            className="sm:col-span-3 rounded-2xl bg-[#F4EFE6] border border-[#E6D5B8] px-4 py-3 text-[#2C2621] placeholder:text-[#8B5A2B]/60 focus:outline-none focus:ring-2 focus:ring-[#C85A17]/40 focus:border-[#C85A17]"
                        />
                        <input
                            data-testid="admin-note-input"
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Nota (opcional)"
                            maxLength={240}
                            className="sm:col-span-4 rounded-2xl bg-[#F4EFE6] border border-[#E6D5B8] px-4 py-3 text-[#2C2621] placeholder:text-[#8B5A2B]/60 focus:outline-none focus:ring-2 focus:ring-[#C85A17]/40 focus:border-[#C85A17]"
                        />
                    </div>
                    <button
                        data-testid="admin-add-button"
                        type="submit"
                        disabled={busy}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A17] hover:bg-[#A64A12] disabled:opacity-60 text-white px-6 py-3 text-sm font-medium transition-all"
                    >
                        {busy ? "A adicionar..." : "Adicionar contribuição"}
                    </button>
                </form>

                {/* Contributors list */}
                <section className="mb-12">
                    <h2 className="font-serif-display text-2xl text-[#2C2621] mb-4">
                        Contribuições ({contributors.length})
                    </h2>
                    {contributors.length === 0 ? (
                        <p className="text-[#5C5248] text-sm">
                            Ainda não há contribuições registadas.
                        </p>
                    ) : (
                        <div className="rounded-3xl bg-[#FDFBF7] border border-[#E6D5B8] divide-y divide-[#E6D5B8] overflow-hidden">
                            {contributors.map((c) => (
                                <div
                                    key={c.id}
                                    data-testid={`admin-contributor-row-${c.id}`}
                                    className="flex items-center justify-between gap-4 p-4 sm:p-5 hover:bg-[#F4EFE6]/40 transition-colors"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-9 h-9 rounded-full bg-[#C85A17]/15 text-[#C85A17] flex items-center justify-center font-serif-display text-base shrink-0">
                                            {c.name?.[0]?.toUpperCase() || "?"}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-[#2C2621] truncate">
                                                {c.name}
                                            </p>
                                            {c.note && (
                                                <p className="text-xs text-[#8B5A2B] truncate">
                                                    {c.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="font-serif-display text-[#C85A17]">
                                            {formatEUR(c.amount)}
                                        </span>
                                        <button
                                            data-testid={`admin-delete-${c.id}`}
                                            onClick={() =>
                                                handleDelete(c.id, c.name)
                                            }
                                            className="w-9 h-9 rounded-full text-[#5C5248] hover:text-[#C85A17] hover:bg-[#C85A17]/10 flex items-center justify-center transition-colors"
                                            aria-label="Remover"
                                        >
                                            <Trash2 size={16} strokeWidth={1.7} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Messages moderation */}
                <section>
                    <h2 className="font-serif-display text-2xl text-[#2C2621] mb-4">
                        Mensagens ({messages.length})
                    </h2>
                    {messages.length === 0 ? (
                        <p className="text-[#5C5248] text-sm">
                            Ainda não há mensagens.
                        </p>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {messages.map((m) => (
                                <article
                                    key={m.id}
                                    data-testid={`admin-message-row-${m.id}`}
                                    className="rounded-2xl bg-[#FDFBF7] border border-[#E6D5B8] p-5"
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <p className="text-sm uppercase tracking-wider text-[#8B5A2B]">
                                            {m.name}
                                        </p>
                                        <button
                                            data-testid={`admin-delete-message-${m.id}`}
                                            onClick={() =>
                                                handleDeleteMessage(m.id, m.name)
                                            }
                                            className="text-[#5C5248] hover:text-[#C85A17] transition-colors"
                                            aria-label="Remover mensagem"
                                        >
                                            <Trash2 size={14} strokeWidth={1.7} />
                                        </button>
                                    </div>
                                    <p className="font-serif-display italic text-[#2C2621] text-base leading-relaxed">
                                        "{m.text}"
                                    </p>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <p className="mt-12 text-center text-xs text-[#8B5A2B] flex items-center justify-center gap-1">
                    Vaquinha do Wilson{" "}
                    <Heart size={11} strokeWidth={2} fill="#C85A17" color="#C85A17" />
                </p>
            </div>
        </main>
    );
}
