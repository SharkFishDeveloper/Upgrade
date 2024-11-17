import "next-auth";

declare module "next-auth" {
  interface Profile {
    health: number;
    coins: number;
    score: number;
    level: number;
    strengths: string;
    weakness: string;
    dailyGoals: { 
      id: number;
      name: string;
      score: number;
    }[]; // Reflecting the DailyGoal model structure
    longTermObjectives: { 
      id: number;
      name: string;
      deadline: string;
      score: number;
    }[]; // Reflecting the LongTermObjective model structure
    skillAreas: { 
      id: number;
      name: string;
      totalPoints: number;
      week: number;
      level: number;
    }[]; // Reflecting the SkillArea model structure
    goals: { 
      id: number;
      singleGoal: { 
        id: number;
        name: string;
        score: number;
        penalty: number;
        tasks: { 
          id: number;
          name: string;
          done: boolean;
          deadline: string;
        }[];
      }[];
    }[]; // Reflecting the Goal and SingleGoal models structure
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
