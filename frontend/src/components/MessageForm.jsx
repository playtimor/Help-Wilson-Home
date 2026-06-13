import { useState } from "react";
import { Heart, Send } from "lucide-react";
import { toast } from "sonner";
import { addMessage } from "@/lib/api";

export default function MessageForm({ onCreated }) {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        const n = name.trim();
        const t = text.trim();
        if (!n) {
            toast.error("Põe o teu nome.");
            return;
        }
        if (!t) {
            toast.error("Escreve uma mensagem para o Wilson.");
            return;
        }
        setSubmitting(true);
        try {
            await addMessage({ name: n, text: t });
            toast.success("Mensagem enviada 🧡", {
                description: "O Wilson vai adorar ler.",
            });
            setName("");
            setText("");
            if (onCreated) onCreated();
        } catch (err) {
            console.error(err);
            toast.error("Algo correu mal", {
                description: "Tenta novamente daqui a uns segundos.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="mensagem"
            data-testid="message-form-section"
            className="relative px-6 sm:px-10 py-24 sm:py-32"
        >
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-12 gap-10 items-start">
                    <div className="md:col-span-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#8B5A2B] mb-4">
                            Mensagem para o Wilson
                        </p>
                        <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#2C2621] leading-tight">
                            Deixa-lhe umas
                            <br />
                            <span className="text-[#C85A17]">palavras</span>.
                        </h2>
                        <p className="mt-5 text-base text-[#5C5248] font-light leading-relaxed">
                            Mais do que dinheiro, o Wilson vai levar para casa
                            o carinho de quem está perto. Escreve-lhe uma
                            mensagem — chega no aniversário, dia 25 de junho.
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        data-testid="message-form"
                        className="md:col-span-7 rounded-3xl bg-[#FDFBF7] border border-[#E6D5B8] p-6 sm:p-8 space-y-5"
                    >
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-[#8B5A2B] mb-2">
                                O teu nome
                            </label>
                            <input
                                data-testid="message-name-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="ex: Joana Silva"
                                maxLength={80}
                                className="w-full rounded-2xl bg-[#F4EFE6] border border-[#E6D5B8] px-4 py-3.5 text-[#2C2621] placeholder:text-[#8B5A2B]/60 focus:outline-none focus:ring-2 focus:ring-[#C85A17]/40 focus:border-[#C85A17] transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-[#8B5A2B] mb-2">
                                Mensagem para o Wilson
                            </label>
                            <textarea
                                data-testid="message-text-input"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Wilson, abraça a tua família por todos nós. Estamos contigo!"
                                rows={5}
                                maxLength={500}
                                className="w-full rounded-2xl bg-[#F4EFE6] border border-[#E6D5B8] px-4 py-3 text-[#2C2621] placeholder:text-[#8B5A2B]/60 focus:outline-none focus:ring-2 focus:ring-[#C85A17]/40 focus:border-[#C85A17] transition resize-none"
                            />
                            <p className="mt-2 text-xs text-[#8B5A2B]/70 text-right">
                                {text.length}/500
                            </p>
                        </div>

                        <button
                            data-testid="message-submit-button"
                            type="submit"
                            disabled={submitting}
                            className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A17] hover:bg-[#A64A12] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-4 text-base font-medium shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
                        >
                            {submitting ? (
                                "A enviar..."
                            ) : (
                                <>
                                    Enviar mensagem
                                    <Send
                                        size={16}
                                        strokeWidth={2}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </>
                            )}
                        </button>

                        <p className="text-xs text-[#8B5A2B]/80 text-center">
                            <Heart
                                size={12}
                                className="inline mr-1"
                                strokeWidth={2}
                                fill="#C85A17"
                                color="#C85A17"
                            />{" "}
                            As mensagens são visíveis a todos os visitantes.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
