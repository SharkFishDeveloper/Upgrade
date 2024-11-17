"use server"

import prisma from "../../../lib/prisma"

export async function addSkill({name,score,days,userId}:{name:string,score:number,days:number,userId:string}) {   
    

    try {
        const skill = await prisma.skillArea.create({
            data:{
                name,
                dailyPoints:score,
                days,
                profileId:parseInt(userId),
                streak:0
            }
        })
        const data = JSON.parse(JSON.stringify(skill))
        console.log("SKILL",data);
        return { message: "Added skill successfully", status: 200, data };
    } catch (error) {
        console.log(error);
        return { message: "Try after some time", status: 300};
    }
    }