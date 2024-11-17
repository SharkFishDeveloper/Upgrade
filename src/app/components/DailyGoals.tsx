"use client"

import Dailyggoal from "@/util/interface/Dailygoals";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import addDailyGoal from "../backend/addDailyGoal";
import toast from "react-hot-toast";


const DailyGoals = () => {
    const session = useSession();
    const [dailygoals,setDailygoals] = useState<Dailyggoal[]>([]);
    const [name, setName] = useState<string>(""); // Set name as string
    const [score, setScore] = useState<number>(0); // Set score as number

    //* local storage
    const getDailyGoals = async()=>{
        let goals = localStorage.getItem("user");
        if(goals){
            goals = JSON.parse(goals);
            //@ts-ignore
            if (goals.profile.goals) { // Check if goals.profile.goals exists
                const daily_goals = goals?.profile?.goals;
                setDailygoals(daily_goals);
            } else {
                console.log("No goals found in profile");
                setDailygoals([]); // Optionally set empty array if no goals exist
            }
        }
    }

    useEffect(()=>{
        getDailyGoals();
    },[])

    const handleaddDailyGoal = async()=>{
        const id =  session.data?.user.id as string;
        const newGoal: Dailyggoal = {
            name: "Complete daily task",
            score: 10,
            done: false
          };
          
        const resp = await addDailyGoal({newGoal,id});
        if(resp.status!==200){
            toast.error(resp.message);
        }else{
            localStorage.setItem("user",JSON.stringify(resp.data))
            toast.success(resp.message);
        }
    }



  return (
    <div>

        <div>
        DailyGoals
        </div>

        <div className="" >
            Add a daily goal
            <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Score:</label>
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(Number(e.target.value))}
                    />
                </div>

                <button className="" onClick={()=>handleaddDailyGoal()}>Add</button>
        </div>




        <div>
        {dailygoals && dailygoals.length > 0 && dailygoals?.map((goals,index)=>(
            <div key={index}>
                <p>{goals.name}</p>
                <p>{goals.done}</p>
                <p>{goals.score}</p>
            </div>
        ))}
        </div>


    </div>
  )
}

export default DailyGoals