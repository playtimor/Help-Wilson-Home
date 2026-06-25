import { Heart, Sun, Music } from "lucide-react";

const pillars = [
    {
        icon: Heart,
        title: "Cada contribuição contou",
        body: "Todos que deram um pouco do seu, fizeram este momento possível. Sem excepção.",
        accent: "#D21034",
    },
    {
        icon: Sun,
        title: "Uma só vontade",
        body: "De Lisboa a Moçambique — a distância não apagou o carinho que existe por ele.",
        accent: "#FCB514",
    },
    {
        icon: Music,
        title: "Obrigado, do fundo do coração",
        body: "Este abraço que o Wilson vai dar à família também é vosso. Levaram um bocadinho de todos.",
        accent: "#009A44",
    },
];

export default function Gratitude() {
    return (
        <section
            id="gratidao"
            data-testid="gratitude-section"
            className="relative px-6 sm:px-10 py-24 sm:py-32 moz-surface"
        >
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mb-14">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#009A44] mb-4">
                        Missão cumprida
                    </p>
                    <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2C2621] leading-tight">
                        Vocês fizeram
                        <br />
                        <span className="moz-accent-text">acontecer</span>.
                    </h2>
                    <p className="mt-6 text-lg text-[#5C5248] leading-relaxed font-light">
                        A meta foi atingida graças a uma comunidade incrível.
                        Não conseguimos agradecer um a um — mas sabem quem são,
                        e o Wilson sabe que os leva no coração.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {pillars.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <div
                                key={i}
                                className="group rounded-3xl bg-[#FDFBF7] border border-[#E6D5B8] p-8 sm:p-10 hover:shadow-xl hover:-translate-y-1 transition-all"
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                                    style={{
                                        background: p.accent + "18",
                                        color: p.accent,
                                    }}
                                >
                                    <Icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif-display text-2xl text-[#2C2621] mb-3">
                                    {p.title}
                                </h3>
                                <p className="text-[#5C5248] leading-relaxed font-light">
                                    {p.body}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 rounded-3xl moz-dark text-[#FDFBF7] p-8 sm:p-10 text-center">
                    <p className="font-serif-display text-2xl sm:text-3xl italic leading-relaxed">
                        "Kanimambo" &mdash; obrigado em Changana, a língua da sua terra.
                    </p>
                    <p className="mt-4 text-[#FDFBF7]/70 text-sm tracking-wide">
                        Wilson da Conceição Fernandes &middot; Junho 2026
                    </p>
                </div>
            </div>
        </section>
    );
}
