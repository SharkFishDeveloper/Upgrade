"use server";
import prisma from "../../../lib/prisma";  

export default async function updateUserStrengthsWeaknesses({
  strength,
  weakness,
  id,
}: {
  strength: string;
  weakness: string;
  id: string;
}) {
  try {
    const userId = parseInt(id);

    const updatedUser = await prisma.profile.update({
      where: {
        userId: userId, 
      },
      data: {
        strengths: strength,
        weakness: weakness,
      },
    });
    const data = JSON.parse(JSON.stringify(updatedUser))
    return { message: "User updated successfully", status: 200, user: data };
  } catch (error) {
    console.log(error);
    return { message: "Error in updating", status: 303 };
  }
}
