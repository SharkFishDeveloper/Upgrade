"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { addGoal } from "../backend/addGoal";
import toast from "react-hot-toast";

const Goals = () => {
  const session = useSession();
  const [goal, setGoal] = useState({
    name: "",
    score: 0,
    penalty: 0,
    tasks: [{ name: "", deadline: "" }],
  });

  const [allgoals, setAllgoals] = useState<
    {
      name: string;
      score: number;
      penalty: number;
      tasks: { name: string; deadline: string }[];
    }[]
  >([]);

  const handleGoalChange = (field: string, value: string | number) => {
    setGoal({ ...goal, [field]: value });
  };

  const handleTaskChange = (taskIndex: number, field: string, value: string) => {
    const updatedTasks = [...goal.tasks];
    updatedTasks[taskIndex][field] = value;
    setGoal({ ...goal, tasks: updatedTasks });
  };

  const handleAddTask = () => {
    setGoal({ ...goal, tasks: [...goal.tasks, { name: "", deadline: "" }] });
  };

  const handleRemoveLastTask = () => {
    if (goal.tasks.length > 1) {
      const updatedTasks = [...goal.tasks];
      updatedTasks.pop();
      setGoal({ ...goal, tasks: updatedTasks });
    } else {
      toast.error("At least one task is required!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = session.data?.user?.id;

    if (userId && goal) {
      const resp = await addGoal({ userId, goal });
      if (resp.status !== 200) {
        toast.error(resp.message);
      } else {
        toast.success(resp.message);
      }
    } else {
      toast.error("User ID or goal is missing");
    }
  };

  const getGoals = () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const goals = parsedUser?.profile?.goals;
    setAllgoals(goals || []);
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
    {/* ADD UI FOR GOALS */}
    </div>






      <h1 className="text-3xl font-semibold mb-6 text-center">Create a New Goal</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Single Goal */}
        <div className="p-6 border rounded-lg bg-gray-50 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Goal Details</h2>

          {/* Goal Name */}
          <div className="mb-4">
            <label htmlFor="goalName" className="block text-sm font-medium text-gray-700">Goal Name</label>
            <input
              type="text"
              value={goal.name}
              onChange={(e) => handleGoalChange("name", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your goal name"
              required
            />
          </div>

          {/* Score */}
          <div className="mb-4">
            <label htmlFor="goalScore" className="block text-sm font-medium text-gray-700">Score</label>
            <input
              type="number"
              value={goal.score}
              onChange={(e) => handleGoalChange("score", Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter score"
              required
            />
          </div>

          {/* Penalty */}
          <div className="mb-4">
            <label htmlFor="goalPenalty" className="block text-sm font-medium text-gray-700">Penalty</label>
            <input
              type="number"
              value={goal.penalty}
              onChange={(e) => handleGoalChange("penalty", Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter penalty"
              required
            />
          </div>

          {/* Tasks Section */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3">Tasks</h3>
            {goal.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="p-4 border rounded-md bg-white mb-4">
                <label className="block text-sm font-medium text-gray-700">Task Name</label>
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => handleTaskChange(taskIndex, "name", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Task name"
                  required
                />
                <label className="block text-sm font-medium text-gray-700 mt-3">Deadline</label>
                <input
                  type="date"
                  value={task.deadline}
                  onChange={(e) => handleTaskChange(taskIndex, "deadline", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            ))}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddTask}
                className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
              >
                Add Task
              </button>

              <button
                type="button"
                onClick={handleRemoveLastTask}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Remove Last Task
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default Goals;
