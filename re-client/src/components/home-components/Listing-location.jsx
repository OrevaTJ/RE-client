import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListingByLocation({ listings }) {
  const [locationListings, setLocationListings] = useState([]);

  useEffect(() => {
    const findListingsByLocations = () => {
      const uniqueLocations = [
        ...new Set(listings.map((listing) => listing.location)),
      ].slice(0, 5);

      let foundListings = [];

      for (const location of uniqueLocations) {
        foundListings.push(
          listings.find((listing) => listing.location === location)
        );
      }

      return foundListings;
    };

    setLocationListings(findListingsByLocations());
  }, [listings]);

  console.log(locationListings);

  return (
    <div>
      {locationListings.length > 0 && (
        <div className="flex flex-col items-center p-4 gap-2">
          <div className="flex flex-col items-center capitalize">
            <h3 className="font-semibold text-orange-500">locations</h3>
            <h3 className="font-bold text-slate-700">
              find properties by city
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center gap-4 p-4">
            {locationListings.map((listing) => (
                <Link
                  to=""
                  key={listing._id}
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className="relative h-72 sm:h-52 w-full rounded-md hover:scale-105 transition-scale duration-300"
                >
                  <div className="flex items-center justify-center absolute bottom-0 left-0 h-7 w-full p-4 text-white bg-red-600 bg-opacity-50 rounded-b-md">
                    <p className="font-semibold">{listing.location}</p>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ListingByLocation.propTypes = {
  listings: PropTypes.array.isRequired,
};
