import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const imageFileRef = useRef(null);
  const [imageFile, setImageFile] = useState(undefined);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  console.log(formData);

  useEffect(() => {
    if (imageFile) {
      handleImageFileUpload(imageFile);
    }
  }, [imageFile]);

  const handleImageFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercent(Math.round(progress));
      },
      (error) => {
        setUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, profilePhoto: downloadUrl })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center text-3xl my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setImageFile(e.target.files[0])}
          type="file"
          ref={imageFileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => imageFileRef.current.click()}
          src={formData.profilePhoto || currentUser.profilePhoto}
          alt="Profile Photo"
          className="object-cover rounded-full h-24 w-24 m-2 cursor-pointer self-center"
        />
        <p className='text-sm self-center'>
          {uploadError ? (
            <span className='text-red-600'>Image upload error</span>
          ) : uploadPercent > 0 && uploadPercent < 100 ? (
            <span className='text-slate-600'>Uploading {`${uploadPercent}%`}</span>
          ) : uploadPercent === 100 ? (
            <span className='text-green-600'>Image upload successful</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-md"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-md"
        />
        <button
          className="text-white bg-slate-700 rounded-md
            p-3 uppercase hover:opacity-95 disabled:opacity-70"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer">Delete account</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
