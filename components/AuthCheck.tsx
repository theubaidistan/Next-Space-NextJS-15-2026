// 'use client';

// import { useSession } from 'next-auth/react';

// export default function AuthCheck({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();

//   console.log(session, status);

//   if (status === 'authenticated') {
//     return <>{children}</>;
//   } else {
//     return <></>;
//   }
// }
//*-----------------------------------------------------
'use client';

import { useSession } from 'next-auth/react';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  // Optional: log for debugging
  console.log('AuthCheck session:', session, status);

  // 1️⃣ Loading state: render nothing or a placeholder
  if (status === 'loading') return <p>Loading...</p>;

  // 2️⃣ Authenticated: render children
  if (status === 'authenticated' && session?.user) {
    return <>{children}</>;
  }

  // 3️⃣ Not authenticated: render nothing
  return null;
}
