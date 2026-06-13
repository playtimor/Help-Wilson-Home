import { useState } from "react";
import { Copy, Check, Smartphone, Wallet, Landmark, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const methods = [
    {
        key: "mbway",
        title: "MBWay",
        subtitle: "O mais rápido",
        icon: Smartphone,
        value: "913 419 879",
        copyValue: "913419879",
        hint: "Luís Morais Leitão",
        link: null,
        testid: "copy-mbway-button",
        accent: "#C85A17",
    },
    {
        key: "revolut",
        title: "Revolut",
        subtitle: "Toca para abrir",
        icon: Wallet,
        value: "revolut.me/luslo31l",
        copyValue: "https://revolut.me/luslo31l",
        hint: "Luís Morais Leitão",
        link: "https://revolut.me/luslo31l",
        testid: "copy-revolut-button",
        accent: "#8B5A2B",
    },
];

export default function DonationMethods() {
    const [copied, setCopied] = useState(null);

    const copy = async (key, value) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(key);
            toast.success("Copiado!", {
                description: `${value} foi copiado para a área de transferência.`,
            });
            setTimeout(() => setCopied(null), 2000);
        } catch (e) {
            toast.error("Não foi possível copiar", {
                description: "Tenta selecionar e copiar manualmente.",
            });
        }
    };

    return (
        <section
            id="contribuir"
            data-testid="donation-methods-section"
            className="relative px-6 sm:px-10 py-24 sm:py-32 bg-[#F4EFE6]/40"
        >
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8B5A2B] mb-4">
                        Como contribuir
                    </p>
                    <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C2621] leading-tight">
                        Cada euro nos aproxima
                        <br />
                        do <span className="text-[#C85A17]">abraço</span>.
                    </h2>
                    <p className="mt-6 text-lg text-[#5C5248] leading-relaxed font-light">
                        Envia a tua contribuição até{" "}
                        <strong className="text-[#2C2621]">20 de junho</strong>{" "}
                        por MBWay ou Revolut. No descritivo,{" "}
                        <em>põe o teu nome</em> para mantermos o registo de quem
                        ajudou.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {methods.map((m) => {
                        const Icon = m.icon;
                        const isCopied = copied === m.key;
                        return (
                            <div
                                key={m.key}
                                data-testid={`donation-card-${m.key}`}
                                className="group rounded-3xl bg-[#FDFBF7] border border-[#E6D5B8] p-8 sm:p-10 hover:shadow-xl hover:-translate-y-1 transition-all"
                            >
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                        style={{
                                            background: m.accent + "15",
                                            color: m.accent,
                                        }}
                                    >
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-xs uppercase tracking-wider text-[#8B5A2B]">
                                        {m.subtitle}
                                    </span>
                                </div>
                                <h3 className="font-serif-display text-3xl text-[#2C2621] mb-2">
                                    {m.title}
                                </h3>
                                <p className="text-sm text-[#5C5248] mb-6">
                                    Em nome de{" "}
                                    <span className="text-[#2C2621] font-medium">
                                        {m.hint}
                                    </span>
                                </p>

                                <div className="flex items-center gap-3">
                                    {m.link ? (
                                        <a
                                            data-testid={`link-${m.key}`}
                                            href={m.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 rounded-2xl bg-[#F4EFE6] border border-[#E6D5B8] px-5 py-4 font-mono text-base sm:text-lg text-[#2C2621] tracking-wider hover:bg-[#E6D5B8]/40 transition flex items-center justify-between gap-2"
                                        >
                                            <span className="truncate">
                                                {m.value}
                                            </span>
                                            <ExternalLink
                                                size={16}
                                                strokeWidth={1.7}
                                                className="shrink-0 text-[#8B5A2B]"
                                            />
                                        </a>
                                    ) : (
                                        <div className="flex-1 rounded-2xl bg-[#F4EFE6] border border-[#E6D5B8] px-5 py-4 font-mono text-lg text-[#2C2621] tracking-wider select-all">
                                            {m.value}
                                        </div>
                                    )}
                                    <button
                                        data-testid={m.testid}
                                        onClick={() => copy(m.key, m.copyValue)}
                                        className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#2C2621] hover:bg-[#C85A17] text-[#FDFBF7] w-12 h-12 transition-all"
                                        aria-label={`Copiar ${m.title}`}
                                    >
                                        {isCopied ? (
                                            <Check
                                                size={18}
                                                strokeWidth={2}
                                            />
                                        ) : (
                                            <Copy size={18} strokeWidth={1.7} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 rounded-3xl bg-[#2C2621] text-[#FDFBF7] p-8 sm:p-10 flex flex-col sm:flex-row items-start gap-6">
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: "#C85A1722", color: "#E07B35" }}
                    >
                        <Landmark size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h4 className="font-serif-display text-2xl mb-2">
                            Pequena nota
                        </h4>
                        <p className="text-[#FDFBF7]/80 leading-relaxed text-base font-light">
                            Cada um participa com o que puder e quiser — não
                            discriminamos. O importante é estarmos juntos
                            nesta. Põe o teu nome no descritivo para os
                            organizadores manterem o registo. 🧡
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
