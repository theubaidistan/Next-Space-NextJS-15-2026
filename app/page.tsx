// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div>
//       <h1>Welcome to NextSpace!</h1>
//       <p>
//         A next-gen social media app to connect with frens inspired by MySpace
//       </p>
//       <p>To get started, sign up for an account</p>
//       <Link href="/signup">
//         <button>Sign Up</button>
//       </Link>
//     </div>
//   );
// }
//*------------------------------------------------------------------------
// import Link from 'next/link';
// import styles from './Home.module.css';

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <h1>Welcome to NextSpace!</h1>
//       <p>
//         A next-gen social media app to connect with frens inspired by MySpace
//       </p>
//       <p>To get started, sign up for an account</p>
//       <Link href="/signup">
//         <button>Sign Up</button>
//       </Link>
//     </div>
//   );
// }
//*-------------------------------------------------------------------------------------
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Welcome to NextSpace!</h1>

      <p className="subtitle">
        A next-gen social media app to connect with frens inspired by MySpace
      </p>

      <p className="text">To get started, sign up for an account</p>

      <Link href="/signup">
        <button className="btn">Sign Up</button>
      </Link>

      <style jsx>{`
        .container {
          padding: 100px;
          max-width: 6000px;
          margin: 0 auto;
          text-align: center;
        }
        .title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 1.05rem;
          color: #555;
          margin-bottom: 8px;
        }

        .text {
          margin-bottom: 20px;
          color: #666;
        }

        .btn {
          padding: 10px 20px;
          background-color: #1d4ed8;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }

        .btn:hover {
          background-color: #2563eb;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
