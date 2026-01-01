// import { prisma } from '@/lib/prisma';
// import bcrypt from 'bcryptjs';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { name, email, password } = await req.json();

//   if (!email || !password)
//     return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

//   const existing = await prisma.user.findUnique({ where: { email } });
//   if (existing)
//     return NextResponse.json({ error: 'User already exists' }, { status: 400 });

//   const passwordHash = await bcrypt.hash(password, 10);

//   const user = await prisma.user.create({
//     data: { name, email, passwordHash },
//   });

//   return NextResponse.json(user);
// }
//*---------------------------------------------------------------------------------------------
// import { prisma } from '@/lib/prisma';
// import bcrypt from 'bcryptjs';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const { name, email, password, image, age } = await req.json();

//     if (!name || !email || !password || age == null) {
//       return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
//     }

//     const existing = await prisma.user.findUnique({ where: { email } });
//     if (existing) {
//       return NextResponse.json(
//         { error: 'User already exists' },
//         { status: 400 }
//       );
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         passwordHash,
//         image,
//         age: Number(age), // make sure it's stored as an integer
//       },
//     });

//     // Exclude passwordHash from response
//     const { passwordHash: _, ...safeUser } = user;
//     return NextResponse.json({ user: safeUser });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json(
//       { error: err.message || 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }
//*---------------------------------------------------------------------------------------------------------
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, password, image, age } = await req.json();

    if (!name || !email || !password || age == null) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();
    const parsedAge = Number(age);

    if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 120) {
      return NextResponse.json({ error: 'Invalid age' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
        image, // ✅ Cloudinary secure_url
        age: parsedAge,
      },
    });

    const { passwordHash: _, ...safeUser } = user;

    return NextResponse.json({ user: safeUser }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
