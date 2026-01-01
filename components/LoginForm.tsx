// 'use client';
// import { signIn } from 'next-auth/react';
// import { useState } from 'react';

// export default function LoginForm() {
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     const form = e.currentTarget as HTMLFormElement;
//     const formData = new FormData(form);
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     const res = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//     });

//     if (res?.error) setError(res.error);
//     else window.location.href = '/dashboard';
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" type="email" placeholder="Email" />
//       <input name="password" type="password" placeholder="Password" />
//       <button type="submit">Login</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// }
//*-----------------------------------------------------------------------------
// 'use client';
// import { signIn } from 'next-auth/react';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginForm() {
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     const form = e.currentTarget;
//     const formData = new FormData(form);
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     try {
//       // Call signIn with redirect: true and a callback URL
//       await signIn('credentials', {
//         redirect: true, // let NextAuth handle the redirect
//         email,
//         password,
//         callbackUrl: '/blog', // redirect here after successful login
//       });
//     } catch (err: any) {
//       setError(err?.message || 'Login failed');
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" type="email" placeholder="Email" />
//       <input name="password" type="password" placeholder="Password" />
//       <button type="submit">Login</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// }
//*---------------------------------------------------------------------------------------------------------
// 'use client';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function LoginForm() {
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     try {
//       const res = await signIn('credentials', {
//         redirect: false,
//         email,
//         password,
//       });

//       if (res?.error) {
//         setError('Invalid email or password');
//         setIsLoading(false);
//         return;
//       }

//       if (res?.ok) {
//         // Use Next.js router for client-side navigation
//         router.push('/blog');
//         // Alternative: router.replace('/blog') to prevent back button
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Login failed');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" type="email" placeholder="Email" required />
//       <input name="password" type="password" placeholder="Password" required />
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? 'Logging in...' : 'Login'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// }
//*----------------------------------------------------------------------------------------
// 'use client';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import './LoginForm.module.css'

// export default function LoginForm() {
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     try {
//       const res = await signIn('credentials', {
//         redirect: false,
//         email,
//         password,
//       });

//       if (res?.error) {
//         setError('Invalid email or password');
//         setIsLoading(false);
//         return;
//       }

//       if (res?.ok) {
//         // Use window.location for full page reload to ensure session is loaded
//         // window.location.href = '/blog';
        
//         // Alternative with router (less reliable for session loading):
//         router.refresh();
//         router.push('/blog');
//       }
        
//     } catch (err) {
//       console.error(err);
//       setError('Login failed');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" type="email" placeholder="Email" required />
//       <input name="password" type="password" placeholder="Password" required />
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? 'Logging in...' : 'Login'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// }
//*------------------------------------------------------------------------------------------------------
'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './LoginForm.module.css'; // ✅ import styles object

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      if (res?.ok) {
        router.refresh();
        router.push('/blog');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className={styles.inputField}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className={styles.inputField}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className={styles.errorText}>{error}</p>}
    </form>
  );
}
