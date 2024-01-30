import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ProfileListings() {
  const [listingsError, setListingsError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);

  const fetchUserListings = async () => {
    setListingsError(null);

    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setListingsError(data.message);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setListingsError('Error loading listings.');
    }
  };

  const handleDelete = async (id) => {
    setListingsError(null);

    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        return setListingsError(data.message);
      }

      setUserListings((prevData) =>
        prevData.filter((listing) => listing._id !== id)
      );
    } catch (error) {
      setListingsError(error.message);
    }
  };

  return (
    <div>
      <button onClick={fetchUserListings} className="text-green-700 w-full">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {listingsError && 'Error loading listings.'}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="fon text-center text-2xl mt-5 font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border gap-4 rounded-md p-3 flex justify-between items-center"
            >
              <Link
                className="flex flex-1 items-center gap-4"
                to={`/listing/${listing._id}`}
              >
                <img
                  src={listing.imageUrls[0]}
                  alt="Image"
                  className="w-20 h-24 object-contain rounded-md"
                />
                <p className="text-slate-700 truncate font-semibold hover:underline">
                  {listing.name}
                </p>
              </Link>
              <div className="flex flex-col items-center p-3">
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="text-red-700 "
                >
                  Remove
                </button>
                <Link to={`/update-listing/${listing._id}`} className="text-green-700 ">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
