"use server"
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/modals/modal";
import { dbConnect } from "../../../../../lib/mongodb";



const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await dbConnect();
      try {
        const userEmail = user.email as string;
        const userName = user.name as string;

        let existingUser = await User.findOne({ email: userEmail });
        if (!existingUser) {
          if (userEmail ) {
            const newUser = await User.create({
              email: userEmail,
              name: userName,
              profile: {
                health: 100,
                coins: 0,
                score: 0,
                level: 0,
                strengths: "null",
                weakness: "null",
                daily_goals: [],
                long_Term_Objective: [],
                skill_area: [],
                goals: [],
              },
            });
            user.id = newUser._id.toString();
            existingUser = newUser;
          }
        } else {
          user.id = existingUser._id.toString();
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
      return true;
    },

    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
   if (token.userId) {
     await dbConnect()
     const user = await User.findById(token.userId);
     if (user) {  // Check if the profile exists
       session.user = {
         id: user._id.toString(),
         email: user.email,
         name: user.name,
         profile:user.profile 
       };
     }
     else {
       session.user.profile = {  // Provide a default profile if none exists
         health: 100,
         coins: 0,
         score: 0,
         level: 0,
         strengths: '',
         weakness: '',
         daily_goals: [],
         long_Term_Objective: [],
         skill_area: [],
         goals: []
       };
     }
   }
   return session;
 }
  },
  pages: {
    signIn: "/signin",
    error: "../../autherror",
  },
});

export { handler as POST, handler as GET };
