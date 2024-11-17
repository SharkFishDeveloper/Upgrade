"use server"

import prisma from "../../../lib/prisma";

export async function longTermGoal({ userId,name, deadline, score }:{ userId:number,name:string, deadline:string, score:number }) {
    try {
         await prisma.user.update({
            where: { id: userId }, 
            data: {
              profile: {
                update: {
                  longTermObjectives:{
                    create:{
                        deadline,
                        name,
                        score
                    }
                  }
                },
              },
            }   
    })
    return { message: "Added ultimate goal", status: 200 }; 
} catch (error) {
    console.log(error);
    return { message: "Try after some time", status: 300};

    }
}