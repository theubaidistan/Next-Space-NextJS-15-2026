// import { Metadata } from 'next';

// // export const dynamic = 'force-static'; // no necessary, just for demonstration
// export const dynamic = 'force-dynamic';

// export const metadata: Metadata = {
//   title: 'About Us',
//   description: 'About NextSpace',
// };

// export default function Blog() {
//   return (
//     <div>
//       <h1>About us</h1>
//       <p>We are a social media company that wants to bring people together!</p>
//     </div>
//   );
// }
//*----------------------------------------------
import { Metadata } from 'next';
import styles from './About.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About NextSpace',
};

export default function About() {
  return (
    <div className={styles.container}>
      <h1>About Us</h1>
      <p>
        We are a social media company that wants to bring people together!
      </p>
    </div>
  );
}
