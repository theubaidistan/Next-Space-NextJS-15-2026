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
import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to NextSpace!</h1>
      <p>
        A next-gen social media app to connect with frens inspired by MySpace
      </p>
      <p>To get started, sign up for an account</p>
      <Link href="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}
