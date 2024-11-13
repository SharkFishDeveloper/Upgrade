"use client"

import Dailyggoal from "@/util/interface/Dailygoals";
import { dbConnect } from "../../../lib/mongodb"
import User from "../../modals/modal"
 
export default async function addDailyGoal({newGoal,id}:{newGoal: Dailyggoal,id:string}){
    try {
        await dbConnect();
        const user = await User.findByIdAndUpdate(
            id,
            {
              $push: { "profile.daily_goals": newGoal }, // Push the new goal to the array
            },
            { new: true } // This will return the updated document
          );
          const data = JSON.parse(JSON.stringify(user))
        return {message:"Added goal succesfully",status:200,data}
    } catch (error) {
        console.log(error);
        return {message:"Error in adding goal",status:303}
    }
}