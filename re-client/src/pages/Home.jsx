import { useEffect, useState } from 'react';
import ListingItem from '../components/Listing-item';
import hero from '../../assets/hero.jpg';
import tour from '../../assets/tour.jpg';
import contact from '../../assets/contact.jpg';
import ListingByLocation from '../components/home-components/Listing-location';
import { Link, useNavigate } from 'react-router-dom';

import { RiVideoFill } from 'react-icons/ri';
import { LuPhone } from 'react-icons/lu';
import { Features } from '../components/home-components/Features';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [searchParams, setSearchParams] = useState({
    q: '',
    location: '',
    type: 'all',
    price: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'q') {
      setSearchParams({ ...searchParams, q: value });
    }

    if (id === 'location') {
      setSearchParams({ ...searchParams, location: value });
    }

    if (id === 'type') {
      setSearchParams({ ...searchParams, type: value });
    }

    if (id === 'price') {
      setSearchParams({ ...searchParams, price: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty, undefined parameters
    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => {
        return value !== undefined && value !== '';
      })
    );

    // Create URLSearchParams object from filtered parameters
    const searchQuery = new URLSearchParams(filteredParams).toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/listing/?type=all`);
        const data = await res.json();

        setListings(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* top */}
      <div
        style={{
          background: `url(${hero}) center no-repeat`,
          backgroundSize: 'cover',
        }}
        className="h-[500px] flex justify-center align-middle"
      >
        <div className="flex flex-col max-w-7xl m-auto gap-5 items-center rounded-md bg-black bg-opacity-50">
          <div className="flex flex-col mt-7 items-center text-red-100">
            <h1 className="capitalize text-3xl font-semibold">
              Find your dream home{' '}
            </h1>
            <p className="text-sm">
              For as low as $10 per day with limited time offer discounts.
            </p>
          </div>
          <div className="flex gap-3 text-orange-600">
            <Link to='/search?type=sale' className="bg-orange-100 hover:bg-orange-600 hover:text-orange-50 transition py-1 px-4 rounded">
              Buy
            </Link>
            <Link to='/search?type=rent' className="bg-orange-100 hover:bg-orange-600 hover:text-orange-50 transition py-1 px-4 rounded">
              Rent
            </Link>
            <Link to='#' className="bg-orange-100 hover:bg-orange-600 hover:text-orange-50 transition py-1 px-4 rounded">
              Sell
            </Link>
          </div>
          <div className="bg-orange-50 mx-4 mb-6 rounded-md capitalize">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 content-center sm:flex gap-1 p-2 capitalize"
            >
              <input
                type="text"
                placeholder="Enter keyword"
                id="q"
                value={searchParams.q}
                className="input input-bordered w-36 max-w-xs rounded-sm"
                onChange={handleChange}
              />
              <select
                id="type"
                onChange={handleChange}
                className="select select-bordered h-10 w-36 max-w-xs rounded-sm capitalize"
              >
                <option disabled selected>
                  property type
                </option>
                <option value="all">All</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
              <select
                id="location"
                onChange={handleChange}
                className="select select-bordered w-36 max-w-xs rounded-sm capitalize"
              >
                <option disabled selected>
                  location
                </option>
                <option value="Abuja">Abuja</option>
                <option value="Lagos">Lagos</option>
                <option value="Port Harcourt">Port harcourt</option>
              </select>
              <select
                id="price"
                onChange={handleChange}
                className="select select-bordered w-36 max-w-xs rounded-sm capitalize"
              >
                <option disabled selected>
                  Price
                </option>
                <option value="1000">$0 - 1000</option>
                <option value="5000">$1001 - 5000</option>
                <option value="5000+">Above $5000</option>
              </select>
              <button className="col-span-2 text-white bg-orange-600 hover:bg-orange-700 py-1 px-4 rounded">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {listings.length > 0 && (
        <div className="sm:my-8 sm:px-10">
          <div className="flex flex-col items-center max-w-7xl mx-auto p-4 gap-2">
            <div className="flex flex-col items-center capitalize">
              <h3 className="font-semibold text-orange-500">Our properties</h3>
              <h3 className="font-bold text-slate-700">
                Our featured properties
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-1 sm:gap-4 sm:p-2">
              {listings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link to='/search?type=all' className="bg-orange-400 text-orange-50 transition px-2 rounded">
              see more
            </Link>
          </div>
          <ListingByLocation listings={listings} />
        </div>
      )}

      <Features />

      <div className="my-10 capitalize">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-semibold">our exclusive agents</h1>
          <div className="grid sm:grid-cols-2 md:mx-4 md:gap-x-20 lg:gap-x-52 sm:gap-y-10">
            <div className="flex items-center p-4 gap-4">
              <div className="avatar online">
                <div className="w-28 rounded-full">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">jenny white</h2>
                <div className="border border-red-400 rounded-sm">
                  <div className="flex items-center gap-2 p-1">
                    <LuPhone className="text-red-400" />
                    <p className="text-slate-500">call: 0900000000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center p-4 gap-4">
              <div className="avatar online">
                <div className="w-28 rounded-full">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">jenny white</h2>
                <div className="border border-red-400 rounded-sm">
                  <div className="flex items-center gap-2 p-1">
                    <LuPhone className="text-red-400" />
                    <p className="text-slate-500">call: 0900000000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center p-4 gap-4">
              <div className="avatar online">
                <div className="w-28 rounded-full">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">jenny white</h2>
                <div className="border border-red-400 rounded-sm">
                  <div className="flex items-center gap-2 p-1">
                    <LuPhone className="text-red-400" />
                    <p className="text-slate-500">call: 0900000000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center p-4 gap-4">
              <div className="avatar online">
                <div className="w-28 rounded-full">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">jenny white</h2>
                <div className="border border-red-400 rounded-sm">
                  <div className="flex items-center gap-2 p-1">
                    <LuPhone className="text-red-400" />
                    <p className="text-slate-500">call: 0900000000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: `url(${tour}) center no-repeat`,
          backgroundSize: 'cover',
        }}
        className="flex items-center h-[350px] capitalize"
      >
        <div className="flex gap-2 m-8 w-64 rounded-sm bg-slate-200 bg-opacity-80">
          <div className="p-4">
            <h3 className="text-red-500 text-xs font-semibold">
              lets take a tour
            </h3>
            <h1 className="font-semibold my-2">
              search property smarter, quicker & anywhere
            </h1>
            <Link to="#" className="flex items-center">
              <RiVideoFill className="text-red-600 rounded-md size-8" />
              <h2 className="text-xs font-semibold">play video</h2>
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          background: `url(${contact}) center no-repeat`,
          backgroundSize: 'cover',
        }}
        className="h-[350px] capitalize"
      >
        <div className="flex flex-col items-center py-6 gap-2">
          <h1 className="font-semibold">find your dream home today</h1>
          <Link
            to="#"
            className="btn bg-orange-400 border-none cursor-pointer text-white"
          >
            contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
