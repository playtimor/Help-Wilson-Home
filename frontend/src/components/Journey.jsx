import { Plane, Home, Heart } from "lucide-react";

const JOURNEY_IMG = "/Help-Wilson-Home/images/wilson-journey.png";

const steps = [
    {
        when: "Maio 2023",
        title: "Partida para Timor",
        body: "O Wilson deixou Moçambique para trabalhar em Timor-Leste. Uma nova vida, do outro lado do mundo.",
        icon: Plane,
        accent: "#8B5A2B",
    },
    {
        when: "Junho 2025",
        title: "Chegada a Lisboa",
        body: "Veio para Portugal estudar e continuar a trabalhar. Mais perto da Europa — mas ainda longe de casa.",
        icon: Home,
        accent: "#C85A17",
    },
    {
        when: "Junho 2026",
        title: "Voltar a Moçambique",
        body: "Já são quase três anos sem ver os seus. No aniversário, queremos dar-lhe o que mais lhe falta: o abraço da família.",
        icon: Heart,
        accent: "#A64A12",
    },
];

export default function Journey() {
    return (
        <section
            id="historia"
            data-testid="journey-section"
            className="relative px-6 sm:px-10 py-24 sm:py-32"
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-2xl mb-16">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8B5A2B] mb-4">
                        A história
                    </p>
                    <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C2621] leading-tight">
                        Três anos.
                        <br />
                        Dois continentes.
                        <br />
                        <span className="text-[#C85A17]">Uma família</span> à
                        espera.
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-5 relative">
                        <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl sticky top-28">
                            <img
                                src={JOURNEY_IMG}
                                alt="Wilson em Timor-Leste com um amigo"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2C2621]/70" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="font-serif-display text-[#FDFBF7] text-lg italic">
                                    Wilson da Conceição Fernandes
                                </p>
                                <p className="text-[#FDFBF7]/70 text-sm mt-1">
                                    Moçambicano. Filho. Amigo.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-10">
                        {steps.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div
                                    key={i}
                                    data-testid={`journey-step-${i}`}
                                    className="relative group rounded-3xl border border-[#E6D5B8] bg-[#F4EFE6]/60 hover:bg-[#F4EFE6] p-8 sm:p-10 transition-colors"
                                >
                                    <div className="flex items-start gap-5">
                                        <div
                                            className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                                            style={{
                                                background: s.accent + "1A",
                                                color: s.accent,
                                            }}
                                        >
                                            <Icon size={22} strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1">
                                            <p
                                                className="text-xs uppercase tracking-[0.18em] mb-2"
                                                style={{ color: s.accent }}
                                            >
                                                {s.when}
                                            </p>
                                            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#2C2621] mb-3">
                                                {s.title}
                                            </h3>
                                            <p className="text-[#5C5248] leading-relaxed text-base sm:text-lg font-light">
                                                {s.body}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <blockquote className="relative rounded-3xl bg-[#2C2621] text-[#FDFBF7] p-8 sm:p-12">
                            <p className="font-serif-display text-xl sm:text-2xl italic leading-relaxed">
                                "Olá queridos! O nosso Wilson faz anos no dia
                                25 de Junho. Estivemos aqui a pensar e
                                decidimos organizar uma vaquinha — não pode
                                ser porquinho mealheiro, dado que ele não come
                                porco (assinado: Joana). O objetivo: ajudar o
                                Wilson a ir visitar a família a Moçambique."
                            </p>
                            <p className="mt-6 text-sm text-[#FDFBF7]/60 tracking-wide">
                                — Equipa Organizadora
                            </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}
