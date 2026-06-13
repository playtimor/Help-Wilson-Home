import { Heart } from "lucide-react";

export default function MessagesWall({ messages }) {
    if (!messages || messages.length === 0) {
        return (
            <section
                data-testid="messages-wall-empty"
                className="relative px-6 sm:px-10 py-24 bg-[#F4EFE6]/40"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8B5A2B] mb-4">
                        Mural de mensagens
                    </p>
                    <h3 className="font-serif-display text-3xl sm:text-4xl text-[#2C2621] mb-4">
                        Sê o primeiro a escrever ao Wilson.
                    </h3>
                    <p className="text-[#5C5248] font-light text-base">
                        Assim que enviares a tua mensagem, ela aparece nesta
                        parede para todos lerem.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section
            data-testid="messages-wall"
            className="relative px-6 sm:px-10 py-24 sm:py-32 bg-[#F4EFE6]/40"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8B5A2B] mb-4">
                        Mural de mensagens
                    </p>
                    <h2 className="font-serif-display text-4xl sm:text-5xl text-[#2C2621] leading-tight">
                        Palavras para levar
                        <br />
                        para <span className="text-[#C85A17]">casa</span>.
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {messages.map((m) => (
                        <article
                            key={m.id}
                            data-testid={`message-card-${m.id}`}
                            className="rounded-3xl bg-[#FDFBF7] border border-[#E6D5B8] p-6 hover:-translate-y-0.5 hover:shadow-md transition-all"
                        >
                            <Heart
                                size={14}
                                strokeWidth={2}
                                fill="#C85A17"
                                color="#C85A17"
                                className="mb-3"
                            />
                            <p className="text-base text-[#2C2621] leading-relaxed italic font-serif-display">
                                "{m.text}"
                            </p>
                            <p className="mt-4 text-sm text-[#8B5A2B] uppercase tracking-wider">
                                — {m.name}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
