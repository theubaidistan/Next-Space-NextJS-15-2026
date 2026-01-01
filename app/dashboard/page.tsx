// import { getServerSession } from 'next-auth';
// import { prisma } from '@/lib/prisma';
// import { ProfileForm } from './ProfileForm';
// import { redirect } from 'next/navigation';
// import { SignOutButton } from '@/components/buttons';
// import { authOptions } from '../api/auth/[...nextauth]/authOptions';

// export default async function Dashboard() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect('/api/auth/signin');
//   }

//   const currentUserEmail = session?.user?.email!;
//   const user = await prisma.user.findUnique({
//     where: {
//       email: currentUserEmail,
//     },
//   });

//   return (
//     <>
//       <h1>Dashboard</h1>
//       <SignOutButton />
//       <ProfileForm user={user} />
//     </>
//   );
// }
//*----------------------------------------------------------------------
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import { ProfileForm } from './ProfileForm';
import { SignOutButton } from '@/components/buttons';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <ProfileForm user={user} />
      {/* <SignOutButton /> */}
    </div>
  );
}
