import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden 
        rounded-lg w-full sm:w-72"
    >
      <Link
        to={`/listing/${listing._id}`}
        // className="card card-compact w-96 bg-base-100 shadow-xl"
      >
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className="h-72 sm:h-52 w-full object-cover hover:scale-105 transition-scale duration-300"
          />
        <div className="card-body p-4">
          <h2 className="card-title truncate">{listing.name}</h2>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.location}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold ">
            $
            {listing.offer
              ? listing.priceDiscounted.toLocaleString('en-US')
              : listing.priceRegular.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
};
