"use server"
import prisma from "../../../lib/prisma";


export async function deleteGoal({goalId,userId}:{goalId:number,userId:number}) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                profile: {
                    update: {
                        goals: {
                            delete: {
                                id: goalId, 
                            },
                        },
                    },
                },
            },
        });
        // console.log(goalId,userId)
        return { message: "Deleted goal successfully", status: 200 };
    } catch (error) {
        // console.log(error);
        return { message: "Try again after some time", status: 300 };
    }
}