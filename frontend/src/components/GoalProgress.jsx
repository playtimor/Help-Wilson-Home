import { Users, CheckCircle, Plane } from "lucide-react";

const formatEUR = (n) =>
    new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(n || 0);

export default function GoalProgress({ stats }) {
    const raised = stats?.raised || 0;
    const goal = stats?.goal || 1000;
    const contributors = stats?.contributors_count || 0;
    const pct = Math.min(Math.round((raised / goal) * 100), 100);

    return (
        <section
            id="meta"
            data-testid="goal-section"
            className="relative px-6 sm:px-10 py-24 sm:py-32"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#009A44] mb-4">
                        Objetivo atingido
                    </p>
                    <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C2621] leading-tight">
                        Meta superada.
                        <br />
                        <span className="moz-accent-text">Missão cumprida.</span>
                    </h2>
                </div>

                <div className="rounded-[2rem] border border-[#009A44]/30 bg-[#FDFBF7] p-8 sm:p-12 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                        <div>
                            <p className="text-sm text-[#009A44] uppercase tracking-wider">
                                Angariado
                            </p>
                            <p
                                data-testid="raised-amount"
                                className="font-serif-display text-5xl sm:text-6xl text-[#2C2621] mt-1"
                            >
                                {formatEUR(raised)}
                            </p>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-sm text-[#8B5A2B] uppercase tracking-wider">
                                Meta inicial
                            </p>
                            <p className="font-serif-display text-3xl sm:text-4xl text-[#5C5248] mt-1">
                                {formatEUR(goal)}
                            </p>
                        </div>
                    </div>

                    <div
                        data-testid="progress-bar"
                        className="relative h-6 sm:h-7 rounded-full bg-[#F4EFE6] border border-[#E6D5B8] overflow-hidden"
                    >
                        <div
                            className="absolute inset-y-0 left-0 progress-fill-success rounded-full transition-[width] duration-1000 ease-out"
                            style={{ width: "100%" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-end pr-4">
                            <span className="text-xs font-medium text-white mix-blend-screen">
                                {pct}%
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 grid sm:grid-cols-3 gap-4">
                        <StatCard
                            icon={<Users size={18} strokeWidth={1.5} />}
                            label="Contribuidores"
                            value={String(contributors)}
                            accent="#D21034"
                            testid="stat-contributors"
                        />
                        <StatCard
                            icon={<CheckCircle size={18} strokeWidth={1.5} />}
                            label="Meta superada"
                            value="100%+"
                            accent="#009A44"
                            testid="stat-deadline"
                        />
                        <StatCard
                            icon={<Plane size={18} strokeWidth={1.5} />}
                            label="Destino"
                            value="Moçambique"
                            accent="#FCB514"
                            testid="stat-birthday"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ icon, label, value, accent, testid }) {
    return (
        <div
            data-testid={testid}
            className="rounded-2xl border border-[#E6D5B8] bg-[#F4EFE6]/60 p-5 flex items-center gap-4"
        >
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: accent + "18", color: accent }}
            >
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-[#8B5A2B]">
                    {label}
                </p>
                <p className="font-serif-display text-xl text-[#2C2621] mt-0.5 truncate">
                    {value}
                </p>
            </div>
        </div>
    );
}
