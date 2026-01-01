// import Link from 'next/link';

// export default async function Blog() {
//   const posts = await fetch('http://localhost:3000/api/content').then((res) =>
//     res.json()
//   );
//   return (
//     <div>
//       <h1>Welcome to our Blog</h1>
//       <ul>
//         {posts.map((post: any) => (
//           <li key={post.slug}>
//             <Link href={`/blog/${post.slug}`}>{post.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//*---------------------------------------------------------------------------
// import Link from 'next/link';
// import { prisma } from '@/lib/prisma'; // make sure this path is correct

// export default async function Blog() {
//   // Fetch posts directly from the database
//   const posts = await prisma.post.findMany({
//     select: {
//       title: true,
//       slug: true,
//     },
//   });

//   return (
//     <div>
//       <h1>Welcome to our Blog</h1>
//       <ul>
//         {posts.map((post:any) => (
//           <li key={post.slug}>
//             <Link href={`/blog/${post.slug}`}>{post.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//*-----------------------------------------------------------------------------------
// import Link from 'next/link';
// import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
// import { DeleteButton } from './delete-button'; // we'll create this next
// import './page.module.css'

// export const revalidate = 1200; // optional ISR

// export default async function Blog() {
//   // Get current user session
//   const session = await getServerSession(authOptions);

//   // Fetch all posts with authorId
//   const posts = await prisma.post.findMany({
//     select: {
//       title: true,
//       slug: true,
//       authorId: true,
//     },
//   });

//   return (
//     <div>
//       <h1>Welcome to our Blog</h1>

//       {session?.user?.id && (
//         <Link href="/blog/create">
//           <button style={{ marginBottom: '20px' }}>+ Create New Post</button>
//         </Link>
//       )}

//       <ul>
//         {posts.map((post:any) => (
//           <li key={post.slug} style={{ marginBottom: '10px' }}>
//             <Link href={`/blog/${post.slug}`} style={{ marginRight: '10px' }}>
//               {post.title}
//             </Link>

//             {/* Show delete button only if user is the author */}
//             {session?.user?.id === post.authorId && <DeleteButton slug={post.slug} />}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//*------------------------------------------
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { DeleteButton } from './delete-button';
import styles from './page.module.css';

export const revalidate = 1200;

export default async function Blog() {
  const session = await getServerSession(authOptions);

  const posts = await prisma.post.findMany({
    select: { title: true, slug: true, authorId: true },
  });

  return (
    <div className={styles.container}>
      <h1>Welcome to our Blog</h1>

      {session?.user?.id && (
        <Link href="/blog/create">
          <button className={styles.createButton}>+ Create New Post</button>
        </Link>
      )}

      <ul className={styles.postList}>
        {posts.map((post: any) => (
          <li key={post.slug} className={styles.postItem}>
            <Link href={`/blog/${post.slug}`} className={styles.postLink}>
              {post.title}
            </Link>

            {session?.user?.id === post.authorId && <DeleteButton slug={post.slug} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
