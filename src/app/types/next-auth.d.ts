import "next-auth";

declare module "next-auth" {
    interface Profile {
        health: number;
        coins: number;
        score: number;
        level: number;
        strengths: string;
        weakness: string;
        daily_goals: string[];
        long_Term_Objective: string[];
        skill_area: string[];
        goals: string[];
    }

    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            profile: Profile;  // Profile is expected to be always available
        };
    }
}
