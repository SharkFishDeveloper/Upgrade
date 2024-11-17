"use server"

import Dailyggoal from "@/util/interface/Dailygoals";
import prisma from "../../../lib/prisma";



export default async function addDailyGoal({ newGoal, id }: { newGoal: Dailyggoal, id: string }) {
  try {
   
    const user = await prisma.user.update({
      where: { id: parseInt(id) }, 
      data: {
        profile: {
          update: {
            dailyGoals: {
              create: newGoal, 
            },
          },
        },
      },
      include: {
        profile: {
          include: {
            dailyGoals:true, // Include the newly added daily goal
            longTermObjectives: true, // Include long-term objectives
            skillAreas: true, // Include skill areas
            goals: {
              include:{
                singleGoal:true
              }
            }, // Include all related goals
          },
        },
      },
    });
    
    const data = JSON.parse(JSON.stringify(user))
    return { message: "Added goal successfully", status: 200, data };

  } catch (error) {
    console.log(error);
    return { message: "Error in adding goal", status: 303 };
  }
}
