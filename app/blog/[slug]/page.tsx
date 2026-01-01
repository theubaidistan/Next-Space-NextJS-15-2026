// export const revalidate = 1200; // not necessary, just for ISR demonstration

// interface Post {
//   title: string;
//   content: string;
//   slug: string;
// }

// export async function generateStaticParams() {
//   const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
//     (res) => res.json()
//   );

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// interface Props {
//   params: Promise<{ slug: string }>;
// }

// export default async function BlogPostPage(props: Props) {
//   const params = await props.params;
//   // deduped
//   const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
//     (res) => res.json()
//   );
//   const post = posts.find((post) => post.slug === params.slug)!;

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//     </div>
//   );
// }
//*------------------------------------------------------------------------------------
// import { prisma } from '@/lib/prisma';
// import { useRouter } from 'next/router';
// import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
// // import DeleteButton from '../delete-button'; // import client component


// export const revalidate = 1200; // optional ISR

// interface Post {
//   title: string;
//   content: string;
//   slug: string;
// }

// // Generate static params for ISR / SSG
// export async function generateStaticParams() {
//   const posts: Post[] = await prisma.post.findMany({
//     select: { slug: true, title: true, content: true },
//   });

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// // ✅ FIXED: params is now a Promise in Next.js 15
// interface PageProps {
//   params: Promise<{ slug: string }>; // Changed to Promise
// }

// export default async function BlogPostPage({ params }: PageProps) {
//   // ✅ FIXED: Await params before using it
//   const { slug } = await params;

//   const post = await prisma.post.findUnique({
//     where: { slug },
//   });

//   if (!post) return <p>Post not found</p>;

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//     </div>
//   );
// }

// interface DeleteButtonProps {
//   slug: string;
// }

// export function DeleteButton({ slug }: DeleteButtonProps) {
//   const router = useRouter();

//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this post?')) return;

//     const res = await fetch(`/api/blog/delete/${slug}`, { method: 'DELETE' });

//     if (res.ok) {
//       router.push('/blog');
//     } else {
//       alert('Failed to delete post');
//     }
//   };

//   return <button onClick={handleDelete}>Delete Post</button>;
// }

//*--------------------------------------------------------------------------------------------------------
// import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
// import {DeleteButton} from '../delete-button'; // import client component

// interface PageProps {
//   params: { slug: string };
// }

// export const revalidate = 1200;

// export default async function BlogPostPage({ params }: PageProps) {
//   const { slug } = params;

//   // Fetch post
//   const post = await prisma.post.findUnique({
//     where: { slug },
//   });

//   if (!post) return <p>Post not found</p>;

//   // Fetch session
//   const session = await getServerSession(authOptions);

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>

//       {/* Show delete button only for author */}
//       {session?.user?.id === post.authorId && <DeleteButton slug={post.slug} />}
//     </div>
//   );
// }
//*----------------------------------------------------------------------------------
// import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
// import { DeleteButton } from '../delete-button';

// interface PageProps {
//   params: { slug: string };
// }

// export default async function BlogPostPage({ params }: PageProps) {
//   const { slug } = params;

//   const post = await prisma.post.findUnique({
//     where: { slug },
//     select: {
//       title: true,
//       content: true,
//       slug: true,
//       authorId: true, // must include authorId
//     },
//   });

//   if (!post) return <p>Post not found</p>;

//   const session = await getServerSession(authOptions);

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>

//       {/* Show delete button only if logged in AND is the author */}
//       {session?.user?.id === post.authorId && <DeleteButton slug={post.slug} />}
//     </div>
//   );
// }
//*------------------------------------------------------------------------------------------
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { DeleteButton } from '../delete-button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      title: true,
      content: true,
      slug: true,
      authorId: true, // must include authorId
    },
  });

  if (!post) return <p>Post not found</p>;

  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* Show delete button only if logged in AND is the author */}
      {session?.user?.id === post.authorId && <DeleteButton slug={post.slug} />}
    </div>
  );
}