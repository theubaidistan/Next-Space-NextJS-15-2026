// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

// export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const post = await prisma.post.findUnique({
//       where: { slug: params.slug },
//     });

//     if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

//     if (post.authorId !== session.user.id) {
//       return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
//     }

//     await prisma.post.delete({ where: { slug: params.slug } });

//     return NextResponse.json({ message: 'Post deleted' });
//   } catch (err) {
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }
//*-------------------------------------------------------------------------------------------------
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Await params to get the slug
    const { slug } = await params;

    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    if (post.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
    }

    await prisma.post.delete({ where: { slug } });

    return NextResponse.json({ message: 'Post deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}