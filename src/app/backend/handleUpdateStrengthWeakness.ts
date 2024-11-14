"use server"
import { dbConnect } from "../../../lib/mongodb";
import User from "@/modals/modal";

export default async function updateUserStrengthsWeaknesses({strength,weakness,id}:{strength:string,weakness:string,id:string}){
   try {
    await dbConnect();
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { "profile.strengths": strength, 
              "profile.weakness": weakness  },
            { new: true } // This option returns the modified document
          );
    const data = JSON.parse(JSON.stringify(updatedUser))
    console.log("USER UPDATED",updatedUser,strength,weakness,id)
    return { message: "User updated successfully",status:200,user:data };
   } catch (error) {
    console.log(error)
    return {message:"Error in updating",status:303}
   }
}