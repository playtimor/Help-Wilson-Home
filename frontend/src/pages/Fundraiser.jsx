import { useMemo } from "react";
import fundraiserData from "@/data/fundraiserData.json";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import GoalProgress from "@/components/GoalProgress";
import Gratitude from "@/components/DonationMethods";
import TeamFooter from "@/components/TeamFooter";

export default function Fundraiser() {
    const stats = useMemo(() => {
        const { goal, raised, contributors_count, deadline, birthday } = fundraiserData;
        const percentage = (raised / goal) * 100;
        return { goal, raised, contributors_count, percentage, deadline, birthday };
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
            <GoalProgress stats={stats} loading={false} />
            <Gratitude />
            <TeamFooter />
        </main>
    );
}
