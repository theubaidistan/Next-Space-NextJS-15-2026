// 'use client';

// export function ProfileForm({ user }: any) {

//   const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {

//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);

//     const body = {
//       name: formData.get('name'),
//       bio: formData.get('bio'),
//       age: formData.get('age'),
//       image: formData.get('image'),
//     };

//     const res = await fetch('/api/user', {
//       method: 'PUT',
//       body: JSON.stringify(body),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     await res.json();
//   };

//   return (
//     <div>
//       <h2>Edit Your Profile</h2>
//       <form onSubmit={updateUser}>
//         <label htmlFor="name">Name</label>
//         <input type="text" name="name" defaultValue={user?.name ?? ''} />
//         <label htmlFor="bio">Bio</label>
//         <textarea
//           name="bio"
//           cols={30}
//           rows={10}
//           defaultValue={user?.bio ?? ''}
//         ></textarea>
//         <label htmlFor="age">Age</label>
//         <input type="text" name="age" defaultValue={user?.age ?? 0} />
//         <label htmlFor="image">Profile Image URL</label>
//         <input type="text" name="image" defaultValue={user?.image ?? ''} />

//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// }
//*-------------------------------------------------------------------------------
// 'use client';
// import { useState } from 'react';

// export function ProfileForm({ user }: any) {
//   const [formData, setFormData] = useState({
//     name: user?.name ?? '',
//     bio: user?.bio ?? '',
//     age: user?.age ?? 0,
//     image: user?.image ?? '',
//   });

//   const [saving, setSaving] = useState(false);

//   const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSaving(true);

//     const res = await fetch('/api/user', {
//       method: 'PUT',
//       body: JSON.stringify(formData),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const updatedUser = await res.json();

//     // Update local state to reflect changes immediately
//     setFormData({
//       name: updatedUser.name,
//       bio: updatedUser.bio,
//       age: updatedUser.age,
//       image: updatedUser.image,
//     });

//     setSaving(false);
//     alert('Profile updated successfully!');
//   };

//   return (
//     <div>
//       <h2>Edit Your Profile</h2>
//       <form onSubmit={updateUser}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         />

//         <label htmlFor="bio">Bio</label>
//         <textarea
//           name="bio"
//           cols={30}
//           rows={10}
//           value={formData.bio}
//           onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//         ></textarea>

//         <label htmlFor="age">Age</label>
//         <input
//           type="number"
//           name="age"
//           value={formData.age}
//           onChange={(e) =>
//             setFormData({ ...formData, age: Number(e.target.value) })
//           }
//         />

//         <label htmlFor="image">Profile Image URL</label>
//         <input
//           type="text"
//           name="image"
//           value={formData.image}
//           onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//         />

//         <button type="submit" disabled={saving}>
//           {saving ? 'Saving...' : 'Save'}
//         </button>
//       </form>

//       <div style={{ marginTop: 20 }}>
//         <h3>Preview</h3>
//         <p>Name: {formData.name}</p>
//         <p>Bio: {formData.bio}</p>
//         <p>Age: {formData.age}</p>
//         {formData.image && (
//           <img src={formData.image} alt="Profile" width={100} />
//         )}
//       </div>
//     </div>
//   );
// }
//*--------------------------------------------------------------------------------------
// 'use client';
// import { useState } from 'react';
// import { useSession, getSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export function ProfileForm({ user }: any) {
//   const { data: session } = useSession();

//   const [formData, setFormData] = useState({
//     name: user?.name ?? '',
//     bio: user?.bio ?? '',
//     age: user?.age ?? 0,
//     image: user?.image ?? '',
//   });

//   const [saving, setSaving] = useState(false);

//   const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSaving(true);
//     const router = useRouter();

//     const res = await fetch('/api/user', {
//       method: 'PUT',
//       body: JSON.stringify(formData),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     // 🔥 Force server components + navbar to re-render
//     router.refresh();

//     const updatedUser = await res.json();

//     // Update local form state
//     setFormData({
//       name: updatedUser.name,
//       bio: updatedUser.bio,
//       age: updatedUser.age,
//       image: updatedUser.image,
//     });

//     // Refresh the session so navbar updates immediately
//     await getSession();

//     setSaving(false);
//     alert('Profile updated successfully!');
//   };

//   return (
//     <div>
//       <h2>Edit Your Profile</h2>
//       <form onSubmit={updateUser}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         />

//         <label htmlFor="bio">Bio</label>
//         <textarea
//           name="bio"
//           cols={30}
//           rows={10}
//           value={formData.bio}
//           onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//         />

//         <label htmlFor="age">Age</label>
//         <input
//           type="number"
//           name="age"
//           value={formData.age}
//           onChange={(e) =>
//             setFormData({ ...formData, age: Number(e.target.value) })
//           }
//         />

//         <label htmlFor="image">Profile Image URL</label>
//         <input
//           type="text"
//           name="image"
//           value={formData.image}
//           onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//         />

//         <button type="submit" disabled={saving}>
//           {saving ? 'Saving...' : 'Save'}
//         </button>
//       </form>
//     </div>
//   );
// }
//*----------------------------------------------------------------------------------------------
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// export function ProfileForm({ user }: any) {
//   const { data: session } = useSession();
//   const router = useRouter(); // ✅ hook at top level

//   const [formData, setFormData] = useState({
//     name: user?.name ?? '',
//     bio: user?.bio ?? '',
//     age: user?.age ?? 0,
//     image: user?.image ?? '',
//   });

//   const [saving, setSaving] = useState(false);

//   const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSaving(true);

//     const res = await fetch('/api/user', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     if (!res.ok) {
//       setSaving(false);
//       alert('Failed to update profile');
//       return;
//     }

//     const updatedUser = await res.json();

//     // Update local state (form)
//     setFormData({
//       name: updatedUser.name,
//       bio: updatedUser.bio,
//       age: updatedUser.age,
//       image: updatedUser.image,
//     });

//     // 🔥 THIS is what updates the navbar
//     router.refresh();

//     setSaving(false);
//     alert('Profile updated successfully!');
//   };

//   return (
//     <div>
//       <h2>Edit Your Profile</h2>

//       <form onSubmit={updateUser}>
//         <label>Name</label>
//         <input
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         />

//         <label>Bio</label>
//         <textarea
//           value={formData.bio}
//           onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//         />

//         <label>Age</label>
//         <input
//           type="number"
//           value={formData.age}
//           onChange={(e) =>
//             setFormData({ ...formData, age: Number(e.target.value) })
//           }
//         />

//         <label>Profile Image URL</label>
//         <input
//           value={formData.image}
//           onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//         />

//         <button type="submit" disabled={saving}>
//           {saving ? 'Saving...' : 'Save'}
//         </button>
//       </form>
//     </div>
//   );
// }

//  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault(); // ⬅ make sure this runs first
//   try {
//     setSaving(true);

//     const res = await fetch('/api/user', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     if (!res.ok) throw new Error('Failed to update profile');

//     const updatedUser = await res.json();

//     setFormData({
//       name: updatedUser.name,
//       bio: updatedUser.bio,
//       age: updatedUser.age,
//       image: updatedUser.image,
//     });

//     router.refresh(); // refreshes Next.js data (no full reload)
//     alert('Profile updated successfully!');
//   } catch (err: any) {
//     console.error(err);
//     alert(err.message || 'Unexpected error');
//   } finally {
//     setSaving(false);
//   }
// };
//*----------------------------------------------------------------------------------------------------
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import './ProfileForm.module.css'

// export function ProfileForm({ user }: any) {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: user?.name ?? '',
//     bio: user?.bio ?? '',
//     age: user?.age ?? 0,
//     image: user?.image ?? '',
//   });

//   const [uploading, setUploading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // ☁️ Cloudinary upload
//   const uploadImage = async (file: File) => {
//     if (!file.type.startsWith('image/')) {
//       alert('Only image files allowed');
//       return;
//     }

//     setUploading(true);

//     const data = new FormData();
//     data.append('file', file);
//     data.append('upload_preset', 'Space-Next'); // unsigned preset

//     const res = await fetch(
//       'https://api.cloudinary.com/v1_1/dobkoncyi/image/upload',
//       {
//         method: 'POST',
//         body: data,
//       }
//     );

//     const result = await res.json();
//     setUploading(false);

//     if (!res.ok) {
//       console.error(result);
//       alert(result.error?.message || 'Image upload failed');
//       return;
//     }

//     setFormData((prev) => ({ ...prev, image: result.secure_url }));
//   };




// const { data: sessionData, update: updateSession } = useSession();

// const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   try {
//     setSaving(true);

//     const res = await fetch('/api/user', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     if (!res.ok) throw new Error('Failed to update profile');

//     const updatedUser = await res.json();

//     setFormData({
//       name: updatedUser.name,
//       bio: updatedUser.bio,
//       age: updatedUser.age,
//       image: updatedUser.image,
//     });

//     // ✅ Update session safely
//     if (sessionData && updateSession) {
//       await updateSession({
//         ...sessionData,
//         user: { ...sessionData.user, image: updatedUser.image },
//       });
//     }

//     alert('Profile updated successfully!');
//   } catch (err: any) {
//     console.error(err);
//     alert(err.message || 'Unexpected error');
//   } finally {
//     setSaving(false);
//   }
// };


//   return (
//     <div>
//       <h2>Edit Your Profile</h2>

//       <form onSubmit={updateUser}>
//         <label>Name</label>
//         <input
//           value={formData.name}
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//         />

//         <label>Bio</label>
//         <textarea
//           value={formData.bio}
//           onChange={(e) =>
//             setFormData({ ...formData, bio: e.target.value })
//           }
//         />

//         <label>Age</label>
//         <input
//           type="number"
//           value={formData.age}
//           onChange={(e) =>
//             setFormData({ ...formData, age: Number(e.target.value) })
//           }
//         />

//         {/* 📸 Cloudinary Upload */}
//         <label>Profile Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             if (e.target.files?.[0]) uploadImage(e.target.files[0]);
//           }}
//         />

//         {uploading && <p>Uploading image...</p>}

//         {formData.image && (
//           <Image
//             src={formData.image}
//             alt="Profile preview"
//             width={120}
//             height={120}
//             style={{ borderRadius: '50%', marginTop: 10 }}
//           />
//         )}

//         <button type="submit" disabled={saving || uploading}>
//           {saving ? 'Saving...' : 'Save'}
//         </button>
//       </form>
//     </div>
//   );
// }
//*---------------------------------------------------------------------------------------
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './ProfileForm.module.css';

export function ProfileForm({ user }: any) {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    bio: user?.bio ?? '',
    age: user?.age ?? 0,
    image: user?.image ?? '',
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Only image files allowed');
      return;
    }

    setUploading(true);
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
      alert(result.error?.message || 'Image upload failed');
      return;
    }

    setFormData((prev) => ({ ...prev, image: result.secure_url }));
  };

  const { data: sessionData, update: updateSession } = useSession();

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update profile');

      const updatedUser = await res.json();
      setFormData({
        name: updatedUser.name,
        bio: updatedUser.bio,
        age: updatedUser.age,
        image: updatedUser.image,
      });

      if (sessionData && updateSession) {
        await updateSession({
          ...sessionData,
          user: { ...sessionData.user, image: updatedUser.image },
        });
      }

      alert('Profile updated successfully!');
    } catch (err: any) {
      alert(err.message || 'Unexpected error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Edit Your Profile</h2>

      <form onSubmit={updateUser}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.inputField}
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <label className={styles.label}>Bio</label>
        <textarea
          className={styles.textareaField}
          value={formData.bio}
          onChange={(e) =>
            setFormData({ ...formData, bio: e.target.value })
          }
        />

        <label className={styles.label}>Age</label>
        <input
          className={styles.inputField}
          type="number"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: Number(e.target.value) })
          }
        />

        <label className={styles.label}>Profile Image</label>
        <input
          className={styles.inputField}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) uploadImage(e.target.files[0]);
          }}
        />

        {uploading && <p className={styles.infoText}>Uploading image...</p>}

        {formData.image && (
          <Image
            src={formData.image}
            alt="Profile preview"
            width={120}
            height={120}
            style={{ borderRadius: '50%', marginTop: 10 }}
          />
        )}

        <button
          type="submit"
          disabled={saving || uploading}
          className={styles.submitButton}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
