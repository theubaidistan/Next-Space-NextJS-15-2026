// 'use client';
// import { useRouter } from 'next/navigation';
// import { useState, useTransition } from 'react';

// interface Props {
//   targetUserId: string;
//   isFollowing: boolean;
// }

// export default function FollowClient({ targetUserId, isFollowing }: Props) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [isFetching, setIsFetching] = useState(false);
//   const isMutating = isFetching || isPending;

//   const follow = async () => {
//     setIsFetching(true);

//     const res = await fetch('/api/follow', {
//       method: 'POST',
//       body: JSON.stringify({ targetUserId }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // <--- important
//     });

//     setIsFetching(false);

//     console.log(res);

//     startTransition(() => {
//       // Refresh the current route:
//       // - Makes a new request to the server for the route
//       // - Re-fetches data requests and re-renders Server Components
//       // - Sends the updated React Server Component payload to the client
//       // - The client merges the payload without losing unaffected
//       //   client-side React state or browser state
//       router.refresh();
//     });
//   };

//   const unfollow = async () => {
//     setIsFetching(true);

//     const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
//       method: 'DELETE',
//       credentials: 'include', // <--- important
//     });

//     setIsFetching(false);
//     startTransition(() => router.refresh());
//   };

//   if (isFollowing) {
//     return (
//       <button onClick={unfollow}>{!isMutating ? 'Unfollow' : '...'}</button>
//     );
//   } else {
//     return <button onClick={follow}>{!isMutating ? 'Follow' : '...'}</button>;
//   }
// }
//*------------------------------------------------------------------------------------------
'use client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface Props {
  targetUserId: string;
  isFollowing: boolean;
}

export default function FollowClient({ targetUserId, isFollowing }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMutating = isFetching || isPending;

  const follow = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const res = await fetch('/api/follow', {
        method: 'POST',
        body: JSON.stringify({ targetUserId }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to follow user');
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error('Follow error:', err);
      setError(err instanceof Error ? err.message : 'Failed to follow');
    } finally {
      setIsFetching(false);
    }
  };

  const unfollow = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to unfollow user');
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error('Unfollow error:', err);
      setError(err instanceof Error ? err.message : 'Failed to unfollow');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      {isFollowing ? (
        <button onClick={unfollow} disabled={isMutating}>
          {!isMutating ? 'Unfollow' : '...'}
        </button>
      ) : (
        <button onClick={follow} disabled={isMutating}>
          {!isMutating ? 'Follow' : '...'}
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
