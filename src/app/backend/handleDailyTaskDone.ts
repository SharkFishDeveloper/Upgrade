"use server"

import prisma from "../../../lib/prisma";

export async function handleDailyTaskDone({userId,goal_score}:{userId:number,goal_score:number}) {
    try {

        const updatedUser = await prisma.profile.update({
          where: {
            userId: userId, 
          },
          data:{
            score: {
                increment: goal_score, // Increment the score by the goal's score
              },
          }
        });
        const data = JSON.parse(JSON.stringify(updatedUser))
        return { message: "User updated successfully", status: 200, user: data };
      } catch (error) {
        console.log(error);
        return { message: "Error in updating", status: 303 };
      }
}