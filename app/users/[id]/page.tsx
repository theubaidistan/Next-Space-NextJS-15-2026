import FollowButton from '@/components/FollowButton/FollowButton';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${user?.name}` };
}

export default async function UserProfile(props: Props) {
  const params = await props.params;
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const { name, bio, image, id } = user ?? {};

  return (
    <div>
      <h1>{name}</h1>

      <img
        width={300}
        src={image ?? '/mememan.webp'}
        alt={`${name}'s profile`}
      />

      <h3>Bio</h3>
      <p>{bio}</p>

      {/* @ts-expect-error Server Component */}
      <FollowButton targetUserId={params.id} />
    </div>
  );
}
