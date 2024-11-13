"use server"
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../modals/modal"
import { dbConnect } from "../../../../../lib/mongodb";


const connectToDatabase = async () => {
    await dbConnect();
  };

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
      try {
        await connectToDatabase();
        const userEmail = user.email as string;
        const userName = user.name as string;

        const existingUser = await User.findOne({ email: userEmail });

        if (!existingUser) {
          if (userEmail && userName) {
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
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  pages: {
    signIn:"/signin",
    error: "../../autherror"
  },
});

export { handler as POST,handler as GET };