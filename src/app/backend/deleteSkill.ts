"use server"

import prisma from "../../../lib/prisma";


export async function deleteSkill({userId,skillId}:{userId:number,skillId:number}) {
    try {
         await prisma.user.update({
            where: { id: userId },
            data: {
                profile: {
                    update: {
                        skillAreas: {
                            delete: {
                                id: skillId, 
                            },
                        },
                    },
                },
            },
        });
        return { message: "Deleted skill successfully", status: 200 };
    } catch (error) {
        console.log(error)
        return { message: "Try again after some time", status: 300 };
    }
}