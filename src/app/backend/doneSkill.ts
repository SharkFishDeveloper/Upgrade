"use server"

import prisma from "../../../lib/prisma"

export async function doneSkill({userId,skillId,score}:{userId:number,skillId:number,score:number}) {
    try {
        const resp = await prisma.user.update({
            where:{id:userId},
            data:{
                profile:{
                    update:{
                        score:{
                            increment:score
                        },
                        skillAreas:{
                            update:{
                                where:{
                                    id:skillId
                                },
                                data:{
                                    streak:{
                                        increment:1
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        return { message: "Streak maintained", status: 200 };  
    } catch (error) {
        return { message: "Try again after some time", status: 300 };  
    }
}