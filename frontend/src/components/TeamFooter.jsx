const REUNION_IMG = "/Help-Wilson-Home/images/wilson-reunion.png";

export default function TeamFooter() {
    return (
        <footer
            data-testid="team-footer"
            className="relative px-6 sm:px-10 pt-24 pb-12 sm:pt-32"
        >
            <div className="max-w-5xl mx-auto">
                <div className="relative rounded-[2.5rem] overflow-hidden">
                    <img
                        src={REUNION_IMG}
                        alt="Wilson na praia em Timor-Leste, ao pôr do sol"
                        className="w-full h-[420px] sm:h-[520px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a1a]/90 via-[#2C2621]/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12 sm:pb-16 px-6">
                        <div className="moz-flag-stripe-wide mb-6 w-24" />
                        <p className="text-xs uppercase tracking-[0.25em] text-[#FCB514] mb-4">
                            Moçambique, Junho 2026
                        </p>
                        <h2
                            data-testid="thanks-title"
                            className="font-serif-display text-3xl sm:text-5xl text-[#FDFBF7] leading-tight max-w-3xl"
                        >
                            Obrigado a todos os que tornaram isto possível.
                        </h2>
                        <p className="mt-5 text-[#FDFBF7]/80 max-w-md text-base font-light">
                            Cada gesto foi um passo do Wilson em direção a casa.
                            A missão está cumprida — e é linda.
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8B5A2B]">
                    <p>© 2026 · Para o Wilson, com saudade e muito amor.</p>
                    <p className="text-[#009A44] font-medium tracking-wide uppercase text-xs">
                        Kanimambo &middot; Obrigado
                    </p>
                </div>
            </div>
        </footer>
    );
}
