import mongoose from 'mongoose';

const DailyGoals = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true },
    done: { type: Boolean, default: false }
});

const SkillArea = new mongoose.Schema({
    name: { type: String, required: true },
    total_Points: { type: Number, required: true },
    week: { type: Number, default: 0 },
    level: { type: Number, default: 0 }
});

const Task = new mongoose.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, default: false },
    deadline: { type: String, required: true }
});

const SingleGoal = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true },
    penalty: { type: Number, required: true },
    tasks: [Task]
});

const Goals = new mongoose.Schema({
    single_Goal: [SingleGoal]
});

const LongTermObjective = new mongoose.Schema({
    name: { type: String, required: true },
    deadline: { type: String, required: true },
    score: { type: Number, required: true }
});

const Profile = new mongoose.Schema({
    health: { type: Number, default: 100 },
    coins: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    strengths: { type: String, required: true },
    weakness: { type: String, required: true },
    daily_goals: [DailyGoals],
    long_Term_Objective: [LongTermObjective],
    skill_area: [SkillArea],
    goals: [Goals]
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profile: Profile
}, { timestamps: true });

const User =  mongoose.model('User', UserSchema);

export default User;