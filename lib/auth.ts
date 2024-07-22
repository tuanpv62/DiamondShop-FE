import axios from "axios";
import NextAuth, { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface CustomJWT extends JWT {
  id: string;
  name: string;
  email: string;
  img: string;
  role: string;
  dob: string;
  gender: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  emailVerified: Date | null;
}
export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("test", credentials);
        try {
          const res = await fetch(
            "http://localhost:5000/api/v1/authentications/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          console.log("vinh", res);

          if (!res.ok) {
            return null;
          }

          const data = await res.json();

          console.log(data);

          const tokens = data.tokens;
          // const userRes = data.payload;
          // const metadata = data.metadata;

          const user = { ...data, ...tokens };
          console.log("ok");

          return user;
        } catch (error) {
          return "null";
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account }) {
    //   if (account?.provider === "google") {
    //     try {
    //       const googleAuthData = {
    //         name: user.name,
    //         email: user.email,
    //         avatar: user.image,
    //         authProvider: 'google',
    //         password: ''
    //       };

    //       const loginResponse = await axios.post("https://orchid.fams.io.vn/api/v1/auth/google-login", googleAuthData);

    //       if (loginResponse.data && loginResponse.data.token) {
    //         // Lưu accessToken và các thông tin khác từ API vào token hoặc user
    //         const { token, ...otherData } = loginResponse.data;
    //         user = { ...user, ...otherData, accessToken: token };
    //         return true;
    //       } else {
    //         return false; // Đăng nhập thất bại
    //       }
    //     } catch (error) {
    //       console.error("Error logging in with Google:", error);
    //       return false; // Đăng nhập thất bại
    //     }
    //   }

    //   return true; // Cho phép đăng nhập với các provider khác
    // },

    async jwt({ token, user, account, trigger, session }) {
      console.log(user);
      // {
      //   id: '5d52bcb1-c463-4a73-af0a-6b4d17433c19',
      //   name: 'Nguyen Thanh Vinh (K16 HCM)',
      //   email: 'vinhntse161950@fpt.edu.vn',
      //   image: 'https://lh3.googleusercontent.com/a/ACg8ocLfFWvFAEFIRiXApXHK6flO0_STRooUjoSr22GIJ0b4=s96-c'
      // }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as CustomJWT;

      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.img = token.img as string;
        session.user.dob = token.dob as string;
        session.user.gender = token.gender as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.tokenType = token.tokenType as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
} satisfies NextAuthConfig;

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth(authOptions);
