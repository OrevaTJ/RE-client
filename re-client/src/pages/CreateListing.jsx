import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { app } from '../firebase';

export default function CreateListing() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const handleImageUpload = async () => {
    try {
      setImageUploadError(null);
      setImageUploading(true);

      if (images.length === 0) {
        setImageUploadError('No images selected.');
        setImageUploading(false);
      }

      if (images.length + formData.imageUrls.length > 6) {
        setImageUploadError(`Cannot upload more than 6 images.`);
        setImageUploading(false);
      }

      const urls = await Promise.all(Array.from(images).map(uploadImage));

      setFormData({
        ...formData,
        imageUrls: [...formData.imageUrls, ...urls],
      });

      setImageUploadError(null);
      setImageUploading(false);
    } catch (error) {
      setImageUploadError(error.message);
      setImageUploading(false);
    }
  };

  const uploadImage = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    try {
      const uploadTask = uploadBytesResumable(storageRef, image);
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      return downloadURL;
    } catch (error) {
      throw new Error(`Failed to upload image ${image.name}.`);
    }
  };

  const handleDeleteImage = (url) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((i) => i !== url),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center font-semibold text-3xl my-5">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col flex-1 gap-3">
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            className="rounded-md border p-3"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            required
            className="rounded-md border p-3"
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            required
            className="rounded-md border p-3"
          />
          <div className="flex gap-12 flex-wrap my-4">
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Sell</span>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </label>
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Rent</span>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </label>
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Parking spot</span>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </label>
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Furnished</span>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </label>
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Offer</span>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </label>
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                required
                min="1"
                max="10"
                className="border p-3 rounded-md w-16 h-10 border-gray-300 outline-none"
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                required
                min="1"
                max="10"
                className="border p-3 rounded-md w-16 h-10 border-gray-300 outline-none"
              />
              <span>Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regular-price"
                required
                className="border p-3 rounded-md w-16 h-10 border-gray-300 outline-none"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discounted-price"
                required
                className="border p-3 rounded-md w-16 h-10 border-gray-300 outline-none"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="ml-2 font-normal text-gray-500">
              First image is cover. (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setImages(e.target.files)}
              multiple
              type="file"
              className="file-input w-full max-w-xs"
            />
            <button
              type="button"
              disabled={imageUploading}
              onClick={handleImageUpload}
              className="btn btn-outline btn-info"
            >
              {imageUploading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                'Upload'
              )}
            </button>
          </div>
          <p className="text-red-600 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="Image"
                  className="w-20 h-24 object-contain rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(url)}
                  className="p-3 text-red-700 uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="btn btn-neutral uppercase">Create Listing</button>
        </div>
      </form>
    </main>
  );
}
