import { useEffect, useState } from "react";
import { longTermGoal } from "../backend/longTermGoal";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import LongTermObjective from "@/util/interface/longTermObjective";

const LongTermGoal = () => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [score, setScore] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [longTermGoals, setLongTermGoal] = useState<LongTermObjective[] | []>([]);
  const [showAllGoals, setShowAllGoals] = useState(false);
  const session = useSession();

  const handleToggle = () => {
    setShowForm((prev) => !prev);
  };

  const handleToggleGoals = () => {
    setShowAllGoals((prev) => !prev);
  };

  const getLongTermGoals = async () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    if (parsedUser) {
      const parsedUserLongGoals = parsedUser.profile.longTermObjectives;
      setLongTermGoal(parsedUserLongGoals);
    }
  };

  useEffect(() => {
    getLongTermGoals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userIdString = session.data?.user.id;
    const userId = parseInt(userIdString as string);
    if (userId) {
      const resp = await longTermGoal({ userId, name, deadline, score });
      if (resp.status !== 200) {
        toast.error(resp.message);
      } else {
        toast.success(resp.message);
      }

      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        const userFromLocalStorageParsed = JSON.parse(userFromLocalStorage);

        // Ensure that longTermObjectives exists under profile
        if (!Array.isArray(userFromLocalStorageParsed.profile.longTermObjectives)) {
          userFromLocalStorageParsed.profile.longTermObjectives = [];
        }

        const longTermObjectives = [
          ...userFromLocalStorageParsed.profile.longTermObjectives,
          {
            name,
            deadline,
            score,
          },
        ];

        userFromLocalStorageParsed.profile.longTermObjectives = longTermObjectives;
        localStorage.setItem("user", JSON.stringify(userFromLocalStorageParsed));

        setLongTermGoal(longTermObjectives);
        setName("");
        setDeadline("");
        setScore(0);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Add Long Term Goal</h2>
        <button
          onClick={handleToggle}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "Add Goal"}
        </button>
      </div>

      {/* Form for Adding Long Term Goal */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Goal Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter goal name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="deadline" className="text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="score" className="text-sm font-medium text-gray-700">
              Goal Score
            </label>
            <input
              type="number"
              id="score"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter goal score"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Toggle to view all long-term goals */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleToggleGoals}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {showAllGoals ? "Hide All Goals" : "Show All Goals"}
        </button>
      </div>

      {/* List of Existing Long Term Goals */}
      {showAllGoals && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Long Term Goals</h3>
          {longTermGoals.length > 0 ? (
            <ul className="space-y-4">
              {longTermGoals.map((goal,index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">{goal.name}</h4>
                    <p className="text-sm text-gray-500">{goal.deadline}</p>
                    <p className="text-sm text-gray-600">Score: {goal.score}</p>
                  </div>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => {
                      // Handle "Done" functionality here (mark as done)
                      toast.success("Goal marked as done!");
                    }}
                  >
                    Done
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You have no long term goals yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LongTermGoal;
