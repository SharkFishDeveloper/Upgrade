"use server"
import prisma from "../../../lib/prisma";

export async function addGoal({userId,goal}:{userId:string, goal: {
    name: string; // Changed to string
    score: number; // Changed to number
    penalty: number; // Changed to number
    tasks: { name: string; deadline: string }[]; // Changed task types to match structure
  };}) {
    try {
        const userIdNumber = parseInt(userId);
        const resp = await prisma.user.update({
            where:{
                id:userIdNumber
            },
            data:{
                profile:{
                    update:{
                        goals:{
                            create:{
                                singleGoal:{
                                    create:{
                                        name:goal.name,
                                        score: goal.score,
                                        penalty: goal.penalty,
                                        tasks: {
                                            create: goal.tasks.map((task) => ({
                                              name: task.name,
                                              deadline: task.deadline,
                                            })),
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        console.log(resp);
        return { message: "Added goal successfully", status: 200 };
    } catch (error) {
        console.log(error);
        return { message: "Try again after some time", status: 300 };
    }
}