import { useEffect, useState } from "react";
import { getStats, getMessages } from "@/lib/api";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import GoalProgress from "@/components/GoalProgress";
import DonationMethods from "@/components/DonationMethods";
import MessagesWall from "@/components/MessagesWall";
import MessageForm from "@/components/MessageForm";
import TeamFooter from "@/components/TeamFooter";

export default function Fundraiser() {
    const [stats, setStats] = useState({
        goal: 1000,
        raised: 0,
        contributors_count: 0,
        percentage: 0,
        deadline: "2026-06-20T23:59:59+01:00",
        birthday: "2026-06-25T00:00:00+01:00",
    });
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        try {
            const [s, m] = await Promise.all([getStats(), getMessages()]);
            setStats(s);
            setMessages(m);
        } catch (e) {
            console.error("Failed loading fundraiser data", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
        const t = setInterval(() => {
            getStats().then(setStats).catch(() => {});
        }, 30000);
        return () => clearInterval(t);
    }, []);

    return (
        <main
            data-testid="fundraiser-page"
            className="relative min-h-screen overflow-x-hidden"
            style={{ background: "var(--bg)" }}
        >
            <Header />
            <Hero />
            <Journey />
            <GoalProgress stats={stats} loading={loading} />
            <DonationMethods />
            <MessageForm onCreated={refresh} />
            <MessagesWall messages={messages} />
            <TeamFooter />
        </main>
    );
}
