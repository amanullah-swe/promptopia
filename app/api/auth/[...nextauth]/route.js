import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectTODB } from "@utils/database";
import User from "@models/user";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectTODB();

        // check if user is already exist
        const userExists = await User.findOne({ email: profile.email });
        // if use not exist, create new One

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLocaleLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("sign in error", error);
      }
    },
  },
});

// console.log({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });

export { handler as GET, handler as POST };
