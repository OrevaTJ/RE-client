import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBath, FaBed } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden 
        rounded-lg w-full"
    >
      <Link
        to={`/listing/${listing._id}`}
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="h-72 sm:h-52 w-full object-cover hover:scale-105 transition-scale duration-300"
          loading="lazy"
        />
        <div className="card-body p-4">
          <h2 className="card-title truncate">{listing.name}</h2>
          <p className="text-orange-500 font-semibold ">
            $
            {listing.offer
              ? listing.priceDiscounted.toLocaleString('en-US')
              : listing.priceRegular.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-800 truncate w-full">
              {listing.location}
            </p>
          </div>
          <div className="text-slate-700 flex gap-4">
            <div className="flex items-center font-bold text-xs gap-1">
              <FaBed className="text-sm text-orange-400" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="flex items-center font-bold text-xs gap-1">
              <FaBath className="text-sm text-orange-400" />
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
