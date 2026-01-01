// import NextAuth, { DefaultSession } from 'next-auth';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string; // include user id
//       age?: number; // add your custom field
//     } & DefaultSession['user'];
//   }
//   interface User extends DefaultUser {
//     age?: number; // add your custom field
//   }
// }
//*---------------------------------------------------------
// types/next-auth.d.ts
// import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       age?: number; // add your custom field
//     } & DefaultSession['user'];
//   }

//   interface User extends DefaultUser {
//     age?: number; // add your custom field
//   }
// }
//*---------------------------------------------------------------------------------
// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      age?: number;
      bio?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    age?: number;
    bio?: string;
  }

  interface JWT {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    age?: number;
    bio?: string;
  }
}
