interface Task {
    name: string;
    done: boolean;
    deadline: string;
  }
  
  interface SingleGoal {
    name: string;
    score: number;
    penalty: number;
    tasks: Task[];
  }
  
  interface Goals {
    single_Goal: SingleGoal[];
  }
  
  interface LongTermObjective {
    name: string;
    deadline: string;
    score: number;
  }
  
  interface DailyGoals {
    name: string;
    score: number;
    done: boolean;
  }
  
  interface SkillArea {
    name: string;
    total_Points: number;
    week: number;
    level: number;
  }
  
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
  
  interface UserInterface {
    id: string;
    email: string;
    name: string;
    profile: Profile;
  }

export default UserInterface;
