// 'use client';

// import { useRouter } from 'next/navigation';

// interface DeleteButtonProps {
//   slug: string;
// }

// export function DeleteButton({ slug }: DeleteButtonProps) {
//   const router = useRouter();

//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this post?')) return;

//     const res = await fetch(`/api/blog/delete/${slug}`, { method: 'DELETE' });

//     if (res.ok) {
//       router.push('/blog'); // redirect to blog list
//     } else {
//       const data = await res.json();
//       alert(data.error || 'Failed to delete post');
//     }
//   };

//   return <button style={{ marginTop: '10px', color: 'white'}} onClick={handleDelete}>Delete Post</button>;
// }
//*-----------------------------------------
'use client';

import { useRouter } from 'next/navigation';
import styles from './DeleteButton.module.css';

interface DeleteButtonProps {
  slug: string;
}

export function DeleteButton({ slug }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const res = await fetch(`/api/blog/delete/${slug}`, { method: 'DELETE' });

    if (res.ok) {
      router.push('/blog'); // redirect to blog list
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to delete post');
    }
  };

  return (
    <button className={styles.deleteButton} onClick={handleDelete}>
      Delete Post
    </button>
  );
}
