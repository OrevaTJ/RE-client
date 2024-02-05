import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import ContactOwner from '../components/Contact-owner';

export default function SingleListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [singleListing, setSingleListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/listing/get/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }

        setSingleListing(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getListing();
  }, [params.id]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main>
      {loading && (
        <div className="flex flex-col items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-center my-7 text-2xl">Something went wrong!</p>
        </div>
      )}
      {singleListing && !loading && !error && (
        <div>
          <Swiper navigation modules={[Navigation]}>
            {singleListing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[480px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 
            flex justify-center items-center bg-slate-100 cursor-pointer"
          >
            <FaShare
              className="text-slate-500"
              onClick={handleCopyToClipboard}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 text-sm p-2">
              Copied to clipboard!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-5 gap-4">
            <p className="text-2xl font-semibold">
              {singleListing.name} - ${' '}
              {singleListing.offer
                ? singleListing.priceDiscounted.toLocaleString('en-US')
                : singleListing.priceRegular.toLocaleString('en-US')}
              {singleListing.type === 'rent' && ' / month'}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {singleListing.location}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {singleListing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {singleListing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  $
                  {+singleListing.priceRegular - +singleListing.priceDiscounted}{' '}
                  Off
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {singleListing.description}
            </p>
            <ul className="flex flex-wrap gap-4 sm:gap-6 items-center text-green-900 text-sm font-semibold">
              <li className="flex whitespace-nowrap items-center gap-1">
                <FaBed className="text-lg" />
                {singleListing.bedrooms > 1
                  ? `${singleListing.bedrooms} beds`
                  : `${singleListing.bedrooms} bed`}
              </li>
              <li className="flex whitespace-nowrap items-center gap-1">
                <FaBath className="text-lg" />
                {singleListing.bedrooms > 1
                  ? `${singleListing.bedrooms} bathrooms`
                  : `${singleListing.bedrooms} bathroom`}
              </li>
              <li className="flex whitespace-nowrap items-center gap-1">
                <FaParking className="text-lg" />
                {singleListing.parking ? 'Parking' : 'No Parking'}
              </li>
              <li className="flex whitespace-nowrap items-center gap-1">
                <FaChair className="text-lg" />
                {singleListing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser &&
              singleListing.userId !== currentUser._id &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="text-white bg-slate-700 p-3 rounded-md uppercase 
                hover:opacity-80"
                >
                  Contact Owner
                </button>
              )}
              {contact && <ContactOwner singleListing={singleListing} />}
          </div>
        </div>
      )}
    </main>
  );
}
