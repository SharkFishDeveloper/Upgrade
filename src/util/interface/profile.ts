import DailyGoals from "./Dailygoals";
import Goals from "./goal";
import LongTermObjective from "./longTermObjective";
import SkillArea from "./SkillArea";

interface Profile {
    health: number;
    coins: number;
    score: number;
    level: number;
    strengths: string;
    weakness: string;
    daily_goals: DailyGoals[];
    long_Term_Objective: LongTermObjective[];
    skill_area: SkillArea[];
    goals: Goals[];
  }

  export default Profile;
  