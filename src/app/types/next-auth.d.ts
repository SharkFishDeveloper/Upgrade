import "next-auth";

declare module "next-auth" {
    interface Profile {
        health: number;
        coins: number;
        score: number;
        level: number;
        strengths: string;
        weakness: string;
        daily_goals: { name: string; score: number; done: boolean }[]; // Change type to match the subdocument structure
        long_Term_Objective: { name: string; description: string }[]; // Adjust type as needed
        skill_area: { name: string; description: string }[]; // Adjust type as needed
        goals: { name: string; description: string }[]; // Adjust type as needed
    }

    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            profile: Profile; 
        };
    }
}
