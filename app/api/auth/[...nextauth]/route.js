import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/config/db";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Eg yourlastname@2023",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          return null;
        }

        // const passwordMatch = await compare(
        //   credentials.password,
        //   user.password
        // );
        // if (!passwordMatch) {
        //   return null;
        // }
        if (credentials.password != user.password) {
          return null;
        }

        return {
          user,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      // console.log("Session callback", { token, session });

      // const { user } = token.user;
      session.user = token;
      return session;
    },
    async jwt({ token, user }) {
      // console.log("JWT callback", { token, user });

      return { ...token, ...user };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };