// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { prisma } from '@/lib/prisma';
// import { authOptions } from '../auth/[...nextauth]/authOptions';

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);
//   const currentUserEmail = session?.user?.email!;
//   const { targetUserId } = await req.json();

//   const currentUserId = await prisma.user
//     .findUnique({ where: { email: currentUserEmail } })
//     .then((user) => user?.id!);

//   const record = await prisma.follows.create({
//     data: {
//       followerId: currentUserId,
//       followingId: targetUserId,
//     },
//   });

//   return NextResponse.json(record);
// }

// export async function DELETE(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const currentUserEmail = session?.user?.email!;
//   const targetUserId = req.nextUrl.searchParams.get('targetUserId');

//   const currentUserId = await prisma.user
//     .findUnique({ where: { email: currentUserEmail } })
//     .then((user) => user?.id!);

//   const record = await prisma.follows.delete({
//     where: {
//       followerId_followingId: {
//         followerId: currentUserId,
//         followingId: targetUserId!,
//       },
//     },
//   });

//   return NextResponse.json(record);
// }
// //*-------------------------------------------------
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next'; // ← Make sure it's from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    console.log('Session in API route:', session); // ← Add this to debug

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - You Have to Login Acoount!' },
        { status: 401 }
      );
    }

    const { targetUserId } = await req.json();

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'Target user ID is required' },
        { status: 400 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Current user not found' },
        { status: 404 }
      );
    }

    // Prevent self-follow
    if (currentUser.id === targetUserId) {
      return NextResponse.json(
        { error: 'Cannot follow yourself' },
        { status: 400 }
      );
    }

    const record = await prisma.follows.create({
      data: {
        followerId: currentUser.id,
        followingId: targetUserId,
      },
    });

    return NextResponse.json({ success: true, record });
  } catch (error) {
    console.error('Follow API Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Already following this user' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    console.log('Session in DELETE route:', session); // ← Add this to debug

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - You Have to Login Acoount!' },
        { status: 401 }
      );
    }

    const targetUserId = req.nextUrl.searchParams.get('targetUserId');

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'Target user ID is required' },
        { status: 400 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Current user not found' },
        { status: 404 }
      );
    }

    const record = await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUserId,
        },
      },
    });

    return NextResponse.json({ success: true, record });
  } catch (error) {
    console.error('Unfollow API Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Follow relationship not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
