"use server"
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../lib/prisma";

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
        const userEmail = user.email as string;
        const userName = user.name as string;

        // Check if user already exists
        let existingUser = await prisma.user.findUnique({
          where: { email: userEmail },
          include: { profile: true }, // Include the user's profile
        });

        if (!existingUser) {
          if (userEmail) {
            const newUser = await prisma.user.create({
              data: {
                email: userEmail,
                name: userName,
                profile: {
                  create: {
                    health: 100,
                    coins: 0,
                    score: 0,
                    level: 0,
                    strengths: "null",
                    weakness: "null",
                    dailyGoals: {
                      create: [] 
                    },
                    longTermObjectives: {
                      create: [] 
                    },
                    skillAreas: {
                      create: [] 
                    },
                    goals: {
                      create: [] 
                    },
                  },
                },
              },
              include: { profile: true },
            });
            user.id = newUser.id.toString();
            existingUser = newUser;
          }
        } else {
          user.id = existingUser.id.toString();
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

    async session({ session }) {
      if (session.user.email) {
        const user = await prisma.user.findUnique({
          where: { email:session.user.email },
          include: {
            profile: {
              include: {
                dailyGoals: true,
                longTermObjectives: true,
                skillAreas: true,
                goals: {
                 include:{
                  singleGoal: {
                    include: {
                      tasks: true,
                    },
                  },
                 }
                },
              },
            },
          },
        });

        if (user) {
          session.user = {
            id: user.id.toString(), 
            email: user.email,
            name: user.name,
            profile: {
              health: user.profile?.health ?? 100,
              coins: user.profile?.coins ?? 0,
              score: user.profile?.score ?? 0,
              level: user.profile?.level ?? 0,
              strengths: user.profile?.strengths ?? '',
              weakness: user.profile?.weakness ?? '',
              dailyGoals: user.profile?.dailyGoals ?? [], 
              longTermObjectives: user.profile?.longTermObjectives ?? [], 
              skillAreas: user.profile?.skillAreas ?? [],
              goals:user.profile?.goals ?? []
            },
          };
        } else {
          session.user.profile = {  // Provide a default profile if no user is found
            health: 100,
            coins: 0,
            score: 0,
            level: 0,
            strengths: '',
            weakness: '',
            dailyGoals: [],
            longTermObjectives: [],
            skillAreas: [],
            goals: []
          };
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "../../autherror",
  },
});

export { handler as POST, handler as GET };
