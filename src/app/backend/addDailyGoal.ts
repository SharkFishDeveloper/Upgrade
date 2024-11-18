"use server"

import Dailyggoal from "@/util/interface/Dailygoals";
import prisma from "../../../lib/prisma";



export default async function addDailyGoal({ newGoal, id }: { newGoal: Dailyggoal, id: string }) {
  try {
    // model Calender{
    //   id              Int       @id @default(autoincrement()) 
    //   manyDates       DateObject[]
    //   user            User      @relation(fields: [id], references: [id])
    // }
    
    // model DateObject{
    //   id            Int       @id @default(autoincrement())  
    //   dateId        String    @unique 
    //   singleDates   Date[]
    //   calender      Calender      @relation(fields: [id], references: [id])
    // }
    
    // model Date{
    //    id       Int       @id @default(autoincrement()) 
    //    category String
    //    taskName String
    //    time     String
    //    dateObject DateObject  @relation(fields: [id], references: [id])
    // }
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
        calender: {
          update: {
            manyDates: {
              upsert: {
                where: {
                  dateId: new Date().toISOString().substring(0, 10), // Adjust to match your stored `dateId` format
                },
                update: {
                  singleDates: {
                    create: {
                      category: "Daily",
                      taskName: "Gym 1",
                      time: new Date().toISOString(),
                    },
                  },
                },
                create: {
                  dateId: new Date().toISOString().substring(0, 10),
                  singleDates: {
                    create: {
                      category: "Daily",
                      taskName: "Gym 1",
                      time: new Date().toISOString(),
                    },
                  },
                },
              },
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
