import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@lib/db";
import { generateUniqueUsername } from "@lib/username";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (token.id) return token;

      if (profile?.email) {
        await connectToDB();
        const sessionUser = await User.findOne({ email: profile.email });

        if (sessionUser) {
          token.id = sessionUser._id.toString();
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          const baseUsername = (profile.name ?? profile.email.split("@")[0])
            .replace(/\s/g, "")
            .toLowerCase();
          const username = await generateUniqueUsername(baseUsername);

          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
  },
};
