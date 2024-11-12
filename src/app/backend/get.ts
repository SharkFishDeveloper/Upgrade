"use server"

export default async function Register() {
    console.log("ENV",process.env.GITHUB_ID)
    return  {message:"HELLO"}
}