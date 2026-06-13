import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

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
                    <Heart
                        className="text-[#C85A17]"
                        size={18}
                        strokeWidth={1.5}
                        fill="#C85A17"
                    />
                    <span className="font-serif-display text-lg sm:text-xl">
                        Para o Wilson
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
                        onClick={() => goTo("contribuir")}
                        className="link-underline"
                    >
                        Contribuir
                    </button>
                </nav>

                <button
                    data-testid="header-donate-cta"
                    onClick={() => goTo("contribuir")}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#C85A17] hover:bg-[#A64A12] text-white px-5 py-2.5 text-sm font-medium shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                    Doar agora
                    <Heart
                        size={14}
                        strokeWidth={2}
                        className="group-hover:scale-110 transition-transform"
                    />
                </button>
            </div>
        </header>
    );
}
