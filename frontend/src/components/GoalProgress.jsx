import { useEffect, useState } from "react";
import { Calendar, Cake, Users } from "lucide-react";

const formatEUR = (n) =>
    new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(n || 0);

function useCountdown(targetIso) {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(t);
    }, []);
    const target = new Date(targetIso).getTime();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, done: diff === 0 };
}

export default function GoalProgress({ stats, loading }) {
    const pct = Math.min(100, stats?.percentage || 0);
    const deadline = useCountdown(stats?.deadline);
    const birthday = useCountdown(stats?.birthday);

    return (
        <section
            id="meta"
            data-testid="goal-section"
            className="relative px-6 sm:px-10 py-24 sm:py-32"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8B5A2B] mb-4">
                        A meta
                    </p>
                    <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C2621] leading-tight">
                        Mil euros.
                        <br />
                        Um voo. <span className="text-[#C85A17]">Casa.</span>
                    </h2>
                </div>

                {/* Big progress card */}
                <div className="rounded-[2rem] border border-[#E6D5B8] bg-[#FDFBF7] p-8 sm:p-12 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                        <div>
                            <p className="text-sm text-[#8B5A2B] uppercase tracking-wider">
                                Angariado
                            </p>
                            <p
                                data-testid="raised-amount"
                                className="font-serif-display text-5xl sm:text-6xl text-[#2C2621] mt-1"
                            >
                                {loading ? "—" : formatEUR(stats?.raised)}
                            </p>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-sm text-[#8B5A2B] uppercase tracking-wider">
                                Meta
                            </p>
                            <p className="font-serif-display text-3xl sm:text-4xl text-[#5C5248] mt-1">
                                {formatEUR(stats?.goal || 1000)}
                            </p>
                        </div>
                    </div>

                    <div
                        data-testid="progress-bar"
                        className="relative h-6 sm:h-7 rounded-full bg-[#F4EFE6] border border-[#E6D5B8] overflow-hidden"
                    >
                        <div
                            className="absolute inset-y-0 left-0 progress-fill rounded-full transition-[width] duration-1000 ease-out"
                            style={{ width: `${pct}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-end pr-4">
                            <span className="text-xs font-medium text-[#2C2621] mix-blend-multiply">
                                {pct.toFixed(0)}%
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 grid sm:grid-cols-3 gap-4">
                        <StatCard
                            icon={<Users size={18} strokeWidth={1.5} />}
                            label="Contribuidores"
                            value={
                                loading
                                    ? "—"
                                    : String(stats?.contributors_count || 0)
                            }
                            testid="stat-contributors"
                        />
                        <StatCard
                            icon={<Calendar size={18} strokeWidth={1.5} />}
                            label="Prazo (20 jun)"
                            value={
                                deadline.done
                                    ? "Encerrado"
                                    : `${deadline.days}d ${deadline.hours}h`
                            }
                            testid="stat-deadline"
                        />
                        <StatCard
                            icon={<Cake size={18} strokeWidth={1.5} />}
                            label="Aniversário (25 jun)"
                            value={
                                birthday.done
                                    ? "É hoje!"
                                    : `${birthday.days}d ${birthday.hours}h`
                            }
                            testid="stat-birthday"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ icon, label, value, testid }) {
    return (
        <div
            data-testid={testid}
            className="rounded-2xl border border-[#E6D5B8] bg-[#F4EFE6]/60 p-5 flex items-center gap-4"
        >
            <div className="w-10 h-10 rounded-xl bg-[#C85A17]/10 text-[#C85A17] flex items-center justify-center">
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
