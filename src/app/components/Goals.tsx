"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { addGoal } from "../backend/addGoal";
import toast from "react-hot-toast";
import { goalTaskDone } from "../backend/goalTaskDone";
import { deleteGoal } from "../backend/deleteGoal";



interface Task {
  id: number;
  name: string;
  done: boolean;
  deadline: string; // Use Date if converting to a Date object
  goalId: number;
}

interface SingleGoal {
  id: number;
  name: string;
  score: number;
  penalty: number;
  profileId: number;
  tasks: Task[];
}



interface GoalsData {
  id: number;
  profileId: number;
  singleGoal: SingleGoal[];
}



const Goals = () => {
  const session = useSession();
  const [all_goals,setGoals] = useState<GoalsData[]>([]);

  const [goal, setGoal] = useState({
    name: "",
    score: 0,
    penalty: 0,
    tasks: [{ name: "", deadline: "" }],
  });




  const handleGoalChange = (field: string, value: string | number) => {
    setGoal({ ...goal, [field]: value });
  };

  const handleTaskChange = (taskIndex: number, field: string, value: string) => {
    const updatedTasks = [...goal.tasks];
    //@ts-ignore
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload(); 



  };

  const getGoals = () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const goals = parsedUser?.profile?.goals;
    setGoals(goals);
  };

  const [expandedGoalId, setExpandedGoalId] = useState<number | null>(null);

  // Toggle goal expansion
  const toggleGoalDetails = (goalId: number) => {
    if (expandedGoalId === goalId) {
      setExpandedGoalId(null); // Collapse if it's already expanded
    } else {
      setExpandedGoalId(goalId); // Expand the clicked goal
    }
  };

  // Toggle task expansion
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const toggleTaskDetails = (taskId: number) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null); // Collapse if it's already expanded
    } else {
      setExpandedTaskId(taskId); // Expand the clicked task
    }
  };

 const handleTaskDone = async (goalId:number,taskId:number,deadline:string,score:number,penalty:number)=>{
  const userIdString = session.data?.user.id;
  const userId = parseInt(userIdString as string)

 if(userId){
  const resp = await goalTaskDone({userId,goalId,taskId,deadline,score,penalty});
  if (resp.status !== 200) {
    toast.error(resp.message);
  } else {
    toast.success(resp.message);
  }
  const user = localStorage.getItem("user");
  const parsedUser:GoalsData = user ?  JSON.parse(user) : null;
  console.log(parsedUser)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  window.location.reload(); 

  // Iterate through goals, singleGoal, and tasks to find the specific task to update
  // parsedUser.profile.goals.forEach((goal) => {
  //   goal.singleGoal.forEach((task) => {
  //     task.tasks.forEach((singleTask, index) => {
  //       if (singleTask.id === taskId && index === taskIndex) {
  //         // Update the task's `done` field to true
  //         singleTask.done = true;
  //       }
  //     });
  //   });
  // });

  // Save the updated user object back to localStorage
  if (!parsedUser) {
    return;
  }


  localStorage.setItem("user", JSON.stringify(parsedUser));
 }else{
  toast.error("Please sign in")
 }
 }

 const handleDeleteGoal = async (goalId:number)=>{
  const userIdString = session.data?.user.id;
  const userId = parseInt(userIdString as string)
  console.log(goalId,userId)
  if(userId){
    const resp = await deleteGoal({goalId,userId});
    if (resp.status !== 200) {
      toast.error(resp.message);
    } else {
      toast.success(resp.message);
      // const user = localStorage.getItem("user");
      // const parsedUser:GoalsData = user ?  JSON.parse(user) : null;
      // console.log(goalId,userId)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload(); 
    }
  }else{
    toast.error("Please sign in")
  }
 }
  
  useEffect(() => {
    getGoals();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
    {/* ADD UI FOR GOALS */}
       
    <div>
  {all_goals && all_goals.length > 0 ? (
    all_goals.map((goalData, index) => (
      <div key={index}>
        {goalData.singleGoal && goalData.singleGoal.length > 0 ? (
          goalData.singleGoal.map((goal, goalIndex) => (
            <div
              key={goalIndex}
              className="bg-gray-800 p-4 text-white mb-4 cursor-pointer"
              onClick={() => toggleGoalDetails(goal.id)} // Handle goal tile click
            >
              <h3 className="text-xl">{goal.name}</h3>
              <p>Score: {goal.score}</p>
              <p>Penalty: {goal.penalty}</p>

              {/* Show detailed information if goal is expanded */}
              {expandedGoalId === goal.id && (
                <div className="mt-2">
                  <p>Profile ID: {goal.profileId}</p>


                  <button className="h-[3rem] w-[4rem] bg-red-500" onClick={()=>handleDeleteGoal(goal.id)}>Delete</button>


                  {goal.tasks && goal.tasks.length > 0 ? (
                    goal.tasks.map((task, taskIndex) => {
                      // Check if the task's deadline has passed
                      const taskDeadline = new Date(task.deadline);
                      const currentDate = new Date();
                      const isDeadlinePassed = taskDeadline < currentDate;

                      return (
                        <div
                          key={taskIndex}
                          className="bg-gray-700 p-2 mt-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent goal tile expansion on task click
                            toggleTaskDetails(task.id); // Toggle task details
                          }}
                        >
                          <p>Task: {task.name}</p>
                          <p>Deadline: {task.deadline}</p>

                          {/* Button indicating deadline status */}
                          <button onClick={()=>handleTaskDone(goal.id,task.id,task.deadline,goal.score,goal.penalty)}
                            className={`mt-2 px-4 py-2 rounded text-white ${
                              isDeadlinePassed ? 'bg-red-600' : 'bg-green-600'
                            }`}
                          >
                            {isDeadlinePassed ? 'Done' : 'Done'}
                          </button>

                          {/* Show task details if task is expanded */}
                          {expandedTaskId === task.id && (
                            <div className="mt-2">
                              <p>Task ID: {task.id}</p>
                              <p>Done: {task.done ? 'Yes' : 'No'}</p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p>No tasks for this goal</p>
                  )}
                </div>
              )}
              {/* Delete button for the goal */}

            </div>
          ))
        ) : (
          <p>No single goals available</p>
        )}
      </div>
    ))
  ) : (
    <p>Nothing to show</p>
  )}
</div>




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
