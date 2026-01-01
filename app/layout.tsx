import NavMenu from '@/app/NavMenu';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import Link from 'next/link';
import AuthProvider from './AuthProvider';

const myFont = Open_Sans({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: 'Next Space',
   description:
    'Welcome to Next space! Sharing my passions, favorite music, and daily adventures. Connect, explore, and vibe with me here!',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <AuthProvider>
      <html lang="en" suppressContentEditableWarning>
        <body className={myFont.className} suppressHydrationWarning>
          <div className="container">
            <NavMenu />
            <main>{children}</main>

            <footer>
              <p>
                Created for the{' '}
                <Link href="https://fireship.io/courses/nextjs/">
                  Fireship Next.js 15 Full Course
                </Link>
              </p>
              <ul>
                <li>
                  <Link href={'/about'}>About</Link>
                </li>{' '}
                |
                <li>
                  <Link href={'https://www.youtube.com/@Fireship'}>
                    YouTube
                  </Link>
                </li>{' '}
                |
                <li>
                  <Link href={'https://github.com/fireship-io/nextjs-course'}>Source Code</Link>
                </li>{' '}
                |
                <li>
                  <Link href={'https://nextjs.org/docs'}>NextJS Docs</Link>
                </li>
              </ul>
            </footer>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
