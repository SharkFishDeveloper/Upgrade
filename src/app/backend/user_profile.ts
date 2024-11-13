"use server"

import { dbConnect } from "../../../lib/mongodb";
import User from "../../modals/modal";

export default async function ProfileDetails({ id }: { id: string }) {
  try {
    await dbConnect(); 

    const user = await User.findById(id); 


    if (!user) {
      return { message: "User not found", status: 404 };
    }

    const data = JSON.parse(JSON.stringify(user))
    return { data, status: 200 };
    
} catch (error) {
    const data = JSON.parse(JSON.stringify(error))
    console.log("ERROR", data);
    return { message: "Issue while fetching user profile", status: 500 };
  }
}
