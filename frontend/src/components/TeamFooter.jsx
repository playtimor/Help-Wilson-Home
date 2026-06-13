const REUNION_IMG =
    "https://customer-assets.emergentagent.com/job_help-wilson-home/artifacts/62nztsmr_Screenshot_20260613-161816.png";

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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C2621]/85 via-[#2C2621]/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12 sm:pb-16 px-6">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#FDFBF7]/70 mb-4">
                            De coração
                        </p>
                        <h2
                            data-testid="thanks-title"
                            className="font-serif-display text-3xl sm:text-5xl text-[#FDFBF7] leading-tight max-w-3xl"
                        >
                            Obrigado a todos que contribuíram.
                        </h2>
                        <p className="mt-5 text-[#FDFBF7]/80 max-w-md text-base font-light">
                            Cada euro, cada palavra, cada gesto — vão com o
                            Wilson até Moçambique.
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8B5A2B]">
                    <p>© 2026 · Para o Wilson, com saudade.</p>
                    <p className="text-[#5C5248]">
                        Prazo para contribuir:{" "}
                        <span className="text-[#2C2621] font-medium">
                            20 de Junho
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
