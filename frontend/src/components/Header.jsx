import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const goTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <header
            data-testid="site-header"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "py-3 backdrop-blur-xl bg-[#FDFBF7]/80 border-b border-[#E6D5B8]/60"
                    : "py-6 bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
                <a
                    href="#top"
                    data-testid="brand-link"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 text-[#2C2621]"
                >
                    <Plane
                        className="text-[#009A44]"
                        size={18}
                        strokeWidth={1.5}
                    />
                    <span className="font-serif-display text-lg sm:text-xl">
                        Wilson vai a casa
                    </span>
                </a>

                <nav className="hidden md:flex items-center gap-8 text-sm text-[#5C5248]">
                    <button
                        data-testid="nav-historia"
                        onClick={() => goTo("historia")}
                        className="link-underline"
                    >
                        A História
                    </button>
                    <button
                        data-testid="nav-meta"
                        onClick={() => goTo("meta")}
                        className="link-underline"
                    >
                        A Meta
                    </button>
                    <button
                        data-testid="nav-contribuir"
                        onClick={() => goTo("gratidao")}
                        className="link-underline"
                    >
                        Obrigado
                    </button>
                </nav>

                <button
                    data-testid="header-donate-cta"
                    onClick={() => goTo("historia")}
                    className="group inline-flex items-center gap-2 rounded-full moz-btn-primary text-white px-5 py-2.5 text-sm font-medium shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                    A viagem
                    <Plane
                        size={14}
                        strokeWidth={2}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </button>
            </div>
        </header>
    );
}
