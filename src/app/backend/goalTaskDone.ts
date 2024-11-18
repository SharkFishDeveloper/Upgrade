"use server"
import prisma from "../../../lib/prisma";

export async function goalTaskDone({userId,goalId,taskId,deadline,score,penalty}:{userId:number,goalId:number,taskId:number,deadline:string,score:number,penalty:number}) {
    try {   
        const taskDeadline = new Date(deadline);
        const currentDate = new Date();
        const isDeadlinePassed = taskDeadline < currentDate;
        await prisma.user.update({
            where: { id: userId },
            data: {
              profile: {
                update: {
                    score: {
                        [isDeadlinePassed ? 'decrement' : 'increment']: isDeadlinePassed ? penalty : score, 
                      },
                  goals: {
                    update: {
                      where: { id: goalId },
                      data: {
                        singleGoal: {
                          update: {
                            where: { id: goalId },
                            data: {
                              tasks: {
                                update: {
                                  where: { id: taskId },
                                  data: {
                                    done: true // Mark the task as done
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          });
      
        return { message: "Added goal successfully", status: 200 };
    } catch (error) {
        console.log(error);
        return { message: "Try again after some time", status: 300 };  
    }
}