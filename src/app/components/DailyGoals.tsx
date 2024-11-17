"use client";

import Dailyggoal from "@/util/interface/Dailygoals";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import addDailyGoal from "../backend/addDailyGoal";
import toast from "react-hot-toast";
import { handleDailyTaskDone } from "../backend/handleDailyTaskDone";

const DailyGoals = () => {
  const session = useSession();
  const [dailygoals, setDailygoals] = useState<Dailyggoal[]>([]);
  const [name, setName] = useState<string>(""); // Set name as string
  const [score, setScore] = useState<number>(0);
  const [render, setRender] = useState(0); // Set name as string
  const [showForm, setShowForm] = useState<boolean>(false); // Toggle form visibility

  // Fetch daily goals from local storage
  const getDailyGoals = async () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      //@ts-ignore
      if (user && user.profile.dailyGoals) {
          //@ts-ignore
        const daily_goals = user?.profile?.dailyGoals;
        setDailygoals(daily_goals);
      } else {
        console.log("No goals found in profile");
        setDailygoals([]);
      }
    }
  };

  useEffect(() => {
    getDailyGoals();
  }, [session, render]);

  const handleaddDailyGoal = async () => {
    setRender((p) => p + 1);
    const id = session.data?.user.id as string;
    const newGoal: Dailyggoal = {
      name,
      score,
    };

    const resp = await addDailyGoal({ newGoal, id });
    if (resp.status !== 200) {
      toast.error(resp.message);
    } else {
      localStorage.setItem("user", JSON.stringify(resp.data));
      setDailygoals(resp.data.profile.dailyGoals);
      toast.success(resp.message);
      setShowForm(false); // Hide the form after adding a goal
    }
  };

  const handleDoneGoal = async (goalId: number, goal_score: number) => {
    if (session && session.data) {
      const user = session.data.user.id;
      const userId = parseInt(user);
      await handleDailyTaskDone({ userId, goal_score });

      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        const userFromLocalStorageParsed = JSON.parse(userFromLocalStorage);
        userFromLocalStorageParsed.profile.score += goal_score;
        localStorage.setItem("user", JSON.stringify(userFromLocalStorageParsed));
      }
      toast.success(`Goal ${goalId} marked as done!`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload(); // Reload the page after 1 second
    } else {
      toast.error("Please sign in");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-2xl font-semibold text-center text-gray-800">
        Daily Goals
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      >
        {showForm ? "Hide Add Goal Form" : "Add New Goal"}
      </button>

      {/* Add daily goal form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Add a Daily Goal</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Score</label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleaddDailyGoal}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Goal
          </button>
        </div>
      )}

      {/* Display daily goals */}
      <div className="space-y-4">
        {dailygoals && dailygoals.length > 0 ? (
          dailygoals.map((goal, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-between items-center space-x-4"
            >
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-800">{goal.name}</p>
                <p className="text-sm text-gray-600">Score: {goal.score}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  //@ts-ignore
                  onClick={() => handleDoneGoal(goal.id, goal.score)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Done
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No daily goals available</p>
        )}
      </div>
    </div>
  );
};

export default DailyGoals;
