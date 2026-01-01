// 'use client';
// import { useState } from 'react';

// export default function RegisterForm() {
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     const formData = new FormData(e.currentTarget);

//     const body = {
//       name: formData.get('name')?.toString() || '',
//       email: formData.get('email')?.toString() || '',
//       password: formData.get('password')?.toString() || '',
//     };

//     try {
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || 'Registration failed');
//       } else {
//         alert('Registered successfully! You can now login.');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Name" />
//       <input name="email" type="email" placeholder="Email" />
//       <input name="password" type="password" placeholder="Password" />
//       <button type="submit">Register</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// }
//*----------------------------------------------------------------------------------------------
// 'use client';

// import { useState } from 'react';

// export default function RegisterForm() {
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     const formData = new FormData(e.currentTarget);

//     const body = {
//       name: formData.get('name')?.toString() || '',
//       email: formData.get('email')?.toString() || '',
//       password: formData.get('password')?.toString() || '',
//     };

//     try {
//       const res = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       });

//       // Parse the response once
//       const data = await res.json();

//       if (!res.ok) setError(data.error || 'Registration failed');
//       else alert('Registered successfully! You can now login.');
//     } catch (err: any) {
//       setError(err.message || 'Unexpected error occurred');
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Name" />
//       <input name="email" type="email" placeholder="Email" />
//       <input name="password" type="password" placeholder="Password" />
//       <button type="submit">Register</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// }
//*----------------------------------------------------------------------------------------
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function RegisterForm() {
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     const formData = new FormData(e.currentTarget);

//     const body = {
//       name: formData.get('name')?.toString() || '',
//       email: formData.get('email')?.toString() || '',
//       password: formData.get('password')?.toString() || '',
//       image: formData.get('image')?.toString() || '',
//       age: Number(formData.get('age') || 0), // added age
//     };

//     try {
//       const res = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       if (!res.ok) setError(data.error || 'Registration failed');
//       else {
//         alert('Registered successfully! You can now login.');
//         router.push(
//           '/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fsignup'
//         ); // or '/login'
//       }
//     } catch (err: any) {
//       setError(err.message || 'Unexpected error occurred');
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2>Register an Account</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">Name</label>
//         <input name="name" placeholder="Name" />

//         <label htmlFor="email">Email</label>
//         <input name="email" type="email" placeholder="Email" />

//         <label htmlFor="password">Password</label>
//         <input name="password" type="password" placeholder="Password" />

//         <label htmlFor="age">Age</label>
//         <input name="age" type="number" placeholder="Enter your age" />

//         <label htmlFor="image">Profile Image URL</label>
//         <input name="image" type="text" placeholder="Enter image URL" />

//         <button type="submit">Register</button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// }
//*-------------------------------------------------------------------------------------------------
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import styles from './RegisterForm.module.css';


// export default function RegisterForm() {
//   const [error, setError] = useState<string | null>(null);
//   const [imageUrl, setImageUrl] = useState<string>('');
//   const [uploading, setUploading] = useState(false);

//   const router = useRouter();

//   // ⬆️ Upload to Cloudinary
//  const handleImageUpload = async (file: File) => {
//   setUploading(true);
//   setError(null);

//   const data = new FormData();
//   data.append('file', file);
//   data.append('upload_preset', 'Space-Next'); // unsigned preset

//   const res = await fetch(
//     'https://api.cloudinary.com/v1_1/dobkoncyi/image/upload',
//     {
//       method: 'POST',
//       body: data,
//     }
//   );

//   const result = await res.json();
//   setUploading(false);

//   if (!res.ok) {
//     console.error('Cloudinary error:', result);
//     setError(result.error?.message || 'Image upload failed');
//     return;
//   }

//   setImageUrl(result.secure_url);
// };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     const formData = new FormData(e.currentTarget);

//     const body = {
//       name: formData.get('name')?.toString() || '',
//       email: formData.get('email')?.toString() || '',
//       password: formData.get('password')?.toString() || '',
//       age: Number(formData.get('age') || 0),
//       image: imageUrl, // ✅ Cloudinary URL
//     };

//     try {
//       const res = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       if (!res.ok) setError(data.error || 'Registration failed');
//       else {
//         alert('Registered successfully!');
//         router.push('/api/auth/signin');
//       }
//     } catch (err: any) {
//       setError(err.message || 'Unexpected error occurred');
//     }
//   };

//   return (
//     <div>
//       <h2>Register an Account</h2>

//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" required />
//         <input name="email" type="email" placeholder="Email" required />
//         <input name="password" type="password" placeholder="Password" required />
//         <input name="age" type="number" placeholder="Age" />

//         {/* 📸 File picker */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             if (e.target.files?.[0]) {
//               handleImageUpload(e.target.files[0]);
//             }
//           }}
//         />

//         {uploading && <p>Uploading image...</p>}

//         {imageUrl && (
//           <img
//             src={imageUrl}
//             alt="Preview"
//             width={100}
//             style={{ marginTop: 10 }}
//           />
//         )}

//         <button type="submit" disabled={uploading}>
//           Register
//         </button>

//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// }
//*--------------------------------------------------------------------------------------------
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError(null);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Space-Next');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dobkoncyi/image/upload',
      { method: 'POST', body: data }
    );

    const result = await res.json();
    setUploading(false);

    if (!res.ok) {
      setError(result.error?.message || 'Image upload failed');
      return;
    }

    setImageUrl(result.secure_url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      age: Number(formData.get('age') || 0),
      image: imageUrl,
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) setError(data.error || 'Registration failed');
      else router.push('/api/auth/signin');
    } catch (err: any) {
      setError(err.message || 'Unexpected error occurred');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Register an Account</h2>

      <input className={styles.inputField} name="name" placeholder="Name" required />
      <input className={styles.inputField} name="email" type="email" placeholder="Email" required />
      <input className={styles.inputField} name="password" type="password" placeholder="Password" required />
      <input className={styles.inputField} name="age" type="number" placeholder="Age" />

      <input
        className={styles.fileInput}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
      />

      {uploading && <p className={styles.errorText}>Uploading image...</p>}

      {imageUrl && <img className={styles.imagePreview} src={imageUrl} alt="Preview" />}

      <button className={styles.button} type="submit" disabled={uploading}>
        Register
      </button>

      {error && <p className={styles.errorText}>{error}</p>}
    </form>
  );
}
