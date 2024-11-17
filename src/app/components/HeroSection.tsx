import DailyGoals from "./DailyGoals";
import Goals from "./Goals";
import LongTermGoal from "./LongTermGoal";
import Skillarea from "./Skillarea";

const HeroSection = () => {
  return (
    <div className="bg-slate-200 p-6">
      <p className="font-bold text-lg mb-4">Hero section</p>
      <div className="flex flex-row gap-4">
        {/* Skillarea Component */}
        <div className="flex-1">
          <Skillarea />
        </div>
        <div className="flex-1">
          <DailyGoals />
        </div>

        <div>
          <LongTermGoal/>
        </div>

        <div>
        <Goals/>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
