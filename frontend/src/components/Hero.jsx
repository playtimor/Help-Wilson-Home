import { MapPin, ArrowRight } from "lucide-react";

const HERO_IMG = "/Help-Wilson-Home/images/wilson-hero.png";

export default function Hero() {
    const goTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            id="top"
            data-testid="hero-section"
            className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 px-6 sm:px-10"
        >
            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-7 fade-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#009A44]/10 border border-[#009A44]/30 text-[#009A44] text-xs tracking-wide uppercase mb-8">
                        <MapPin size={12} strokeWidth={1.8} />
                        Lisboa → Moçambique &middot; Missão Cumprida
                    </div>

                    <h1
                        data-testid="hero-title"
                        className="font-serif-display text-[#2C2621] text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight"
                    >
                        O Wilson
                        <br />
                        <em className="not-italic moz-accent-text">
                            vai a casa.
                        </em>
                    </h1>

                    <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#8B5A2B]">
                        Wilson da Conceição Fernandes
                    </p>

                    <p className="mt-6 max-w-xl text-lg sm:text-xl text-[#5C5248] leading-relaxed font-light">
                        Conseguimos. Graças a uma comunidade que não hesitou,
                        o Wilson parte no seu{" "}
                        <span className="text-[#2C2621] font-medium">25 de Junho</span>{" "}
                        para abraçar a família que não vê há quase três anos.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <button
                            data-testid="hero-donate-cta"
                            onClick={() => goTo("historia")}
                            className="group inline-flex items-center justify-center gap-2 rounded-full moz-btn-primary text-white px-7 py-4 text-base font-medium shadow-sm hover:-translate-y-0.5 hover:shadow-xl transition-all"
                        >
                            A história do Wilson
                            <ArrowRight
                                size={16}
                                strokeWidth={2}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </button>
                        <button
                            data-testid="hero-story-cta"
                            onClick={() => goTo("gratidao")}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent text-[#2C2621] hover:text-[#D21034] px-2 py-4 text-base font-medium transition-colors"
                        >
                            Ver os agradecimentos
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-5 relative fade-up" style={{ animationDelay: "0.15s" }}>
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                        <img
                            src={HERO_IMG}
                            alt="Wilson com a bandeira de Moçambique"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2621]/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-[#FDFBF7]">
                            <p className="font-serif-display text-xl sm:text-2xl italic leading-tight">
                                "A bandeira que carrega.
                                <br />A casa para onde vai voltar."
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:block absolute -top-4 -left-6 px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#E6D5B8] shadow-sm rotate-[-6deg]">
                        <p className="text-xs text-[#8B5A2B] font-medium">
                            Três anos &middot; Dois continentes
                        </p>
                    </div>
                    <div className="hidden lg:block absolute -bottom-4 -right-4 px-3 py-2 rounded-xl moz-tag-green text-white shadow-md rotate-[5deg]">
                        <p className="text-xs font-medium">
                            25 de Junho &middot; Em casa!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
