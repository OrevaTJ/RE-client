import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    location: '',
    priceRegular: 50,
    priceDiscounted: 20,
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    offer: false,
    type: 'rent',
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formUploadError, setFormUploadError] = useState(null);
  const [formUploading, setFormUploading] = useState(false);

  const navigate = useNavigate();

  console.log(formData);

  useEffect(() => {
    if (!formData.offer) {
      setFormData((prevData) => ({
        ...prevData,
        priceDiscounted: 0,
      }));
    }
  }, [formData.offer]);

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

      // Array.from because error 'images.map not a function'
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

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;

    setFormData((prevData) => {
      if (id === 'sale' || id === 'rent') {
        return {
          ...prevData,
          type: id,
        };
      }

      if (id === 'parking' || id === 'furnished' || id === 'offer') {
        return {
          ...prevData,
          [id]: checked,
        };
      }

      if (type === 'text' || type === 'number' || type === 'textarea') {
        return {
          ...prevData,
          [id]: value,
        };
      }

      return prevData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormUploadError(null);

    if (formData.imageUrls.length < 1)
      return setFormUploadError('No image added');
    if (+formData.priceRegular < +formData.priceDiscounted)
      return setFormUploadError(
        'Discounted price should be lower than regular price'
      );

    try {
      setFormUploading(true);

      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      setFormUploading(false);

      if (data.success === false) {
        setFormUploadError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setFormUploadError(error.message);
      setFormUploading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center font-semibold text-3xl my-5">
        Create Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col flex-1 gap-3">
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            className="rounded-md border p-3"
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            required
            className="rounded-md border p-3"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            id="location"
            required
            className="rounded-md border p-3"
            onChange={handleChange}
            value={formData.location}
          />
          <div className="flex gap-12 flex-wrap my-4">
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Sell</span>
              <input
                type="checkbox"
                id="sale"
                className="checkbox checkbox-primary"
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
            </label>
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Rent</span>
              <input
                type="checkbox"
                id="rent"
                className="checkbox checkbox-primary"
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
            </label>
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Parking spot</span>
              <input
                type="checkbox"
                id="parking"
                className="checkbox checkbox-primary"
                onChange={handleChange}
                checked={formData.parking}
              />
            </label>
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Furnished</span>
              <input
                type="checkbox"
                id="furnished"
                className="checkbox checkbox-primary"
                onChange={handleChange}
                checked={formData.furnished}
              />
            </label>
            <label className="cursor-pointer flex gap-2">
              <span className="label-text">Offer</span>
              <input
                type="checkbox"
                id="offer"
                className="checkbox checkbox-primary"
                onChange={handleChange}
                checked={formData.offer}
              />
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
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <span>Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="priceRegular"
                required
                min="50"
                className="border p-3 rounded-md w-16 h-10 border-gray-300 outline-none"
                onChange={handleChange}
                value={formData.priceRegular}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                {formData.type === 'rent' && (
                  <span className="text-xs">($/month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="priceDiscounted"
                  required
                  min="0"
                  className="border p-3 rounded-md w-16 h-10 border-gray-300 outline-none"
                  onChange={handleChange}
                  value={formData.priceDiscounted}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  {formData.type === 'rent' && (
                    <span className="text-xs">($/month)</span>
                  )}
                </div>
              </div>
            )}
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
          <button
            disabled={formUploading || imageUploading}
            className="btn btn-neutral uppercase"
          >
            {formUploading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              'Create Listing'
            )}
          </button>
          {formUploadError && (
            <p className="text-sm text-red-700">{formUploadError}</p>
          )}
        </div>
      </form>
    </main>
  );
}
