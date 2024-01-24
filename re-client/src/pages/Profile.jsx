import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const imageFileRef = useRef(null);
  const [imageFile, setImageFile] = useState(undefined);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false); // prevent multiple upload
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (imageFile) {
      handleImageFileUpload(imageFile);
    }
  }, [imageFile]);

  const handleImageFileUpload = async (file) => {
    if (isUploading) return;

    setIsUploading(true);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      uploadTask.on('state_changed', (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercent(Math.round(progress));
      });

      await uploadTask;

      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
      setFormData({ ...formData, profilePhoto: downloadUrl });

      // Clear upload progress after successful upload
      setUploadPercent(0);
    } catch (error) {
      console.error('Error uploading image:', error);

      setUploadError('Image upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })

      const data = res.json()
      
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }

      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())

      const res = await fetch('/api/auth/signout')

      const data = res.json()
      
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }

      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center text-3xl my-7">Profile</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
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
        <p className="text-sm self-center">
          {uploadError && (
            <span className="text-red-600">Image upload error</span>
          )}
          {uploadPercent > 0 && uploadPercent < 100 && (
            <span className="text-slate-600">
              Uploading {`${uploadPercent}%`}
            </span>
          )}
          {uploadPercent === 100 && (
            <span className="text-green-600">Image upload successful</span>
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-md"
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-md"
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-md"
          onChange={handleInputChange}
        />
        <button
          disabled={loading}
          className="text-white bg-slate-700 rounded-md
            p-3 uppercase hover:opacity-95 disabled:opacity-70"
        >
          {loading ? 'Loading' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-600 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-600 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-3">{error ? error : ''}</p>
      <p className="text-green-700 mt-3">
        {updateSuccess && 'Update successful'}
      </p>
    </div>
  );
}
