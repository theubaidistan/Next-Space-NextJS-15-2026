// 'use client';

// import { useSession, signIn, signOut } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// export function SignInButton() {
//   const { data: session, status } = useSession();
//   console.log(session, status);

//   if (status === 'loading') {
//     return <>...</>;
//   }

//   if (status === 'authenticated') {
//     return (
//       <Link href={`/dashboard`}>
//         <Image
//           src={session.user?.image ?? '/mememan.webp'}
//           width={32}
//           height={32}
//           alt="Your Name"
//         />
//       </Link>
//     );
//   }

//   return <button onClick={() => signIn()}>Sign in</button>;
// }

// 'use client';

// import { useSession, signIn,signOut } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// export function SignInButton() {
//   const { data: sessionData, status, update: updateSession } = useSession();

//   // Optional: debug
//   console.log('SignInButton session:', sessionData, status);

//   // Loading state
//   if (status === 'loading') return <>Loading...</>;

//   // Authenticated
//   if (status === 'authenticated' && sessionData?.user) {
//     return (
//       <Link href={`/dashboard`}>
//         <Image
//           src={sessionData.user.image ?? '/mememan.webp'} // fallback
//           width={32}
//           height={32}
//           alt={sessionData.user.name ?? 'User'}
//         />
//       </Link>
//     );
//   }

//   // Not signed in
//   return <button onClick={() => signIn()}>Sign in</button>;
// }


'use client';

import { useSession, signIn,signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function SignInButton() {
  const { data: sessionData, status } = useSession();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Optional debug
  console.log('SignInButton session:', sessionData, status);

  if (status === 'loading') return <>Loading...</>;

  if (status === 'authenticated' && sessionData?.user) {
    return (
      <Link href="/dashboard">
        <Image
          src={sessionData.user.image ?? '/mememan.webp'} // fallback
          width={32}
          height={32}
          alt={sessionData.user.name ?? 'User'}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          onLoad={() => {
            console.log('Profile image loaded');
            setImageLoaded(true);
          }}
          priority // optional: disables lazy loading for this critical image
        />
      </Link>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}


export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
