import { useState } from 'react';
import Skillarea from './Skillarea'; // Assuming Skillarea is a component
import DailyGoals from './DailyGoals'; // Assuming DailyGoals is a component
import LongTermGoal from './LongTermGoal'; // Assuming LongTermGoal is a component
import Goals from './Goals'; // Assuming Goals is a component

const HeroSection = () => {
  // State for toggling visibility of components
  const [showSkillarea, setShowSkillarea] = useState(true);
  const [showDailyGoals, setShowDailyGoals] = useState(true);
  const [showLongTermGoal, setShowLongTermGoal] = useState(true);
  const [showGoals, setShowGoals] = useState(true);

  // Function to close all toggles
  const closeAllToggles = () => {
    setShowSkillarea(false);
    setShowDailyGoals(false);
    setShowLongTermGoal(false);
    setShowGoals(false);
  };

  return (
    <div className="bg-black p-6 text-white w-full max-w-7xl mx-auto"> {/* Increased card width */}
      <p className="font-bold text-lg mb-4">Hero Section</p>

      {/* Button to close all toggles */}
      <div className="mb-6 w-[90%]">
        <button
          onClick={closeAllToggles}
          className="py-2 px-4 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none transition duration-300"
        >
          Close All
        </button>
      </div>

      {/* Grid layout with two items per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* First Row (Skillarea and Daily Goals) */}
        <div className="p-4 bg-gray-900 rounded-md">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Skill Area</p>
            <button
              onClick={() => setShowSkillarea(!showSkillarea)}
              className="text-sm text-gray-400 hover:text-white"
            >
              {showSkillarea ? 'Hide' : 'Show'}
            </button>
          </div>
          {showSkillarea && <Skillarea />}
        </div>

        <div className="p-4 bg-gray-900 rounded-md">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Daily Goals</p>
            <button
              onClick={() => setShowDailyGoals(!showDailyGoals)}
              className="text-sm text-gray-400 hover:text-white"
            >
              {showDailyGoals ? 'Hide' : 'Show'}
            </button>
          </div>
          {showDailyGoals && <DailyGoals />}
        </div>

        {/* Second Row (Long Term Goal and Goals) */}
        <div className="p-4 bg-gray-900 rounded-md">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Long Term Goal</p>
            <button
              onClick={() => setShowLongTermGoal(!showLongTermGoal)}
              className="text-sm text-gray-400 hover:text-white"
            >
              {showLongTermGoal ? 'Hide' : 'Show'}
            </button>
          </div>
          {showLongTermGoal && <LongTermGoal />}
        </div>

        <div className="p-4 bg-gray-900 rounded-md">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Goals</p>
            <button
              onClick={() => setShowGoals(!showGoals)}
              className="text-sm text-gray-400 hover:text-white"
            >
              {showGoals ? 'Hide' : 'Show'}
            </button>
          </div>
          {showGoals && <Goals />}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
