// // app/api/auth/[...nextauth]/authOptions.ts
// import type { NextAuthOptions } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//       authorization: { params: { scope: 'read:user user:email' } },
//     }),
//   ],
// };
// //*---------------------------------------------------------------------------------------------
// import type { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';
// import bcrypt from 'bcryptjs';

// export const authOptions: NextAuthOptions = {
//   session: { strategy: 'jwt' },
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.passwordHash) return null;

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.passwordHash
//         );
//         if (!isValid) return null;

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) session.user.id = token.sub!;
//       return session;
//     },
//   },
// };
//*------------------------------------------------------------------------------------------
// import type { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';
// import bcrypt from 'bcryptjs';

// export const authOptions: NextAuthOptions = {
//   session: { strategy: 'database' }, // JWT-based session
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: PrismaAdapter(prisma),

//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.passwordHash) return null;

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.passwordHash
//         );
//         if (!isValid) return null;

//         // Convert null fields to undefined for NextAuth
//         return {
//           id: user.id,
//           name: user.name ?? undefined,
//           email: user.email ?? undefined,
//           image: user.image ?? undefined,
//           age: user.age ?? undefined,
//           bio: user.bio ?? undefined,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user, trigger }) {
//       // On initial sign-in
//       if (user) {
//         token.id = user.id;
//       }

//       // 🔥 ALWAYS fetch latest user from DB
//       if (token.id) {
//         const dbUser = await prisma.user.findUnique({
//           where: { id: token.id as string },
//           select: {
//             name: true,
//             email: true,
//             image: true,
//             age: true,
//           },
//         });

//         if (dbUser) {
//           token.name = dbUser.name;
//           token.email = dbUser.email;
//           token.image = dbUser.image;
//           token.age = dbUser.age;
//         }
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.image = token.image as string;
//         session.user.age = token.age as number;
//       }
//       return session;
//     },
//   },
// };
//*------------------------------------------------------------------------------------
// app/api/auth/[...nextauth]/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // database sessions
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

  return {
  id: user.id,
  name: user.name ?? undefined,
  email: user.email ?? undefined,
  image: user.image ?? undefined,
  age: user.age ?? undefined, // ✅ TypeScript now knows age?: number
  bio: user.bio ?? undefined,
};
      },
    }),
  ],

 callbacks: {
  async jwt({ token, user }) {
    // On first sign-in, add user.id to token
    if (user) {
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.image = user.image;
      token.age = user.age;
      token.bio = user.bio;
    }
    return token;
  },
  async session({ session, token }:any) {
    if (session.user) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.age = token.age;
      session.user.bio = token.bio;
    }
    return session;
  },
},

};
//*-----------------------------------------------------------------------------------------------
// app/api/auth/[...nextauth]/authOptions.ts (or wherever you define it)
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "database", // ← Database sessions (not JWT)
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login", // optional: custom sign-in page
//   },

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.passwordHash) {
//           return null;
//         }

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.passwordHash
//         );

//         if (!isValid) {
//           return null;
//         }

//         // Return the user object – NextAuth will create a session with this
//         return {
//           id: user.id,
//           name: user.name ?? null,
//           email: user.email ?? null,
//           image: user.image ?? null,
//           age: user.age ?? null,    // custom field
//           bio: user.bio ?? null,    // custom field
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async session({ session, user }) {
//       // This callback runs on every session lookup when using database strategy
//       // `user` comes directly from the database (via the session record)
//       if (session.user && user) {
//         session.user.id = user.id;
//         session.user.name = user.name ?? undefined;
//         session.user.email = user.email ?? undefined;
//         session.user.image = user.image ?? undefined;

//         // Add your custom fields
//         session.user.age = user.age ?? undefined;
//         session.user.bio = user.bio ?? undefined;
//       }

//       return session;
//     },
//   },
// };

//*-----------------------------------------------------------------------------------------------------------
// app/api/auth/[...nextauth]/authOptions.ts
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import type { AuthConfig } from "next-auth"; // ✅ Correct type in v5
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { AdapterUser } from "next-auth/adapters";

// export const authOptions: AuthConfig = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "database",
//   },
//   secret: process.env.AUTH_SECRET, // ✅ AUTH_SECRET is preferred in v5 (fallback to NEXTAUTH_SECRET works)
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.passwordHash) {
//           return null;
//         }

//         // Explicitly type to avoid overload inference bugs
//         const passwordValid: boolean = await bcrypt.compare(
//           credentials.password as string,
//           user.passwordHash as string
//         );

//         if (!passwordValid) {
//           return null;
//         }

//         return {
//           id: user.id,
//           name: user.name ?? null,
//           email: user.email ?? null,
//           image: user.image ?? null,
//           age: user.age ?? null,
//           bio: user.bio ?? null,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }:any) {
//       // ✅ Explicit typing – `user` is AdapterUser when strategy: "database"
//       if (session.user && user) {
//         const adapterUser = user as AdapterUser;

//         session.user.id = adapterUser.id;
//         session.user.name = adapterUser.name ?? undefined;
//         session.user.email = adapterUser.email ?? undefined;
//         session.user.image = adapterUser.image ?? undefined;

//         // Custom fields
//         session.user.age = adapterUser.age ?? undefined;
//         session.user.bio = adapterUser.bio ?? undefined;
//       }

//       return session;
//     },
//   },
// };
//*----------------------------------------------------------------------------------------------
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import {prisma} from "../../../../lib/prisma";
// import { compare } from "bcryptjs";

// export const authOptions: Parameters<typeof NextAuth>[0] = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.passwordHash) return null;

//         const isValid = await compare(credentials.password, user.passwordHash);
//         if (!isValid) return null;

//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) session.user.id = token.id as string;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
// };

// export default NextAuth(authOptions);
