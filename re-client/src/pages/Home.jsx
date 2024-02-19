import { useEffect, useState } from 'react';
import ListingItem from '../components/Listing-item';
import hero from '../../assets/hero.jpg';
import tour from '../../assets/tour.jpg';
import contact from '../../assets/contact.jpg';
import ListingByLocation from '../components/home-components/Listing-location';

import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { BsFillHouseHeartFill } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { RiVideoFill } from 'react-icons/ri';
import { LuPhone } from 'react-icons/lu';
import { FaMoneyCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/listing/?type=all`);
        const data = await res.json();

        setListings(data);
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
            <button className="bg-orange-100 hover:bg-orange-600 hover:text-orange-50 transition py-1 px-4 rounded">
              Buy
            </button>
            <button className="bg-orange-100 hover:bg-orange-600 hover:text-orange-50 transition py-1 px-4 rounded">
              Rent
            </button>
            <button className="bg-orange-100 hover:bg-orange-600 hover:text-orange-50 transition py-1 px-4 rounded">
              Sell
            </button>
          </div>
          <div className="bg-orange-50 mx-4 mb-6 rounded-md capitalize">
            <form className="grid grid-cols-2 content-center sm:flex gap-1 p-2 capitalize">
              <input
                type="text"
                placeholder="Enter keyword"
                className="input input-bordered w-36 max-w-xs rounded-sm"
              />
              <select className="select select-bordered h-10 w-36 max-w-xs rounded-sm capitalize">
                <option disabled selected>
                  property type
                </option>
                <option>All</option>
                <option>Rent</option>
                <option>Sale</option>
              </select>
              <select className="select select-bordered w-36 max-w-xs rounded-sm capitalize">
                <option disabled selected>
                  location
                </option>
                <option>Abuja</option>
                <option>Lagos</option>
                <option>Port harcourt</option>
              </select>
              <select className="select select-bordered w-36 max-w-xs rounded-sm capitalize">
                <option disabled selected>
                  Price
                </option>
                <option>$0 - 500</option>
                <option>$501 - 5000</option>
                <option>Above $5000</option>
              </select>
              <button className="col-span-2 text-white bg-orange-600 hover:bg-orange-700 py-1 px-4 rounded">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {listings.length > 0 && (
        <div className="my-8 px-10">
          <div className="flex flex-col items-center max-w-7xl mx-auto p-4 gap-2">
            <div className="flex flex-col items-center capitalize">
              <h3 className="font-semibold text-orange-500">Our properties</h3>
              <h3 className="font-bold text-slate-700">
                Our featured properties
              </h3>
            </div>
            {/* className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 md:gap-6 p-4" */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4 p-4">
              {listings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
          <ListingByLocation listings={listings} />
        </div>
      )}

      <div className="bg-slate-800">
        <div className="flex flex-col items-center py-6 px-10">
          <h3 className="text-orange-300 capitalize">Our features</h3>
          <h3 className="font-bold text-white capitalize">why choose us?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 p-4">
            <div className="flex flex-col items-center justify-center p-2 bg-slate-200 rounded-md">
              <div
                className="rounded-full w-16 h-16 my-2
            flex justify-center items-center bg-red-300 bg-opacity-50 cursor-pointer"
              >
                <VscWorkspaceTrusted className="text-red-600 size-10" />
              </div>
              <div className="flex flex-col items-center text-center p-2">
                <h3 className="font-semibold text-sm">
                  Lorem ipsum dolor sit amet.
                </h3>
                <p className="text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, maiores similique qui molestias error cupiditate?
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-slate-200 rounded-md">
              <div
                className="rounded-full w-16 h-16 my-2
            flex justify-center items-center bg-red-300 bg-opacity-50 cursor-pointer"
              >
                <BsFillHouseHeartFill className="text-red-600 size-10" />
              </div>
              <div className="flex flex-col items-center text-center p-2">
                <h3 className="font-semibold text-sm">
                  Lorem ipsum dolor sit amet.
                </h3>
                <p className="text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, maiores similique qui molestias error cupiditate?
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-slate-200 rounded-md">
              <div
                className="rounded-full w-16 h-16 my-2
            flex justify-center items-center bg-red-300 bg-opacity-50 cursor-pointer"
              >
                <FaMoneyCheck className="text-red-600 size-9" />
              </div>
              <div className="flex flex-col items-center text-center p-2">
                <h3 className="font-semibold text-sm">
                  Lorem ipsum dolor sit amet.
                </h3>
                <p className="text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, maiores similique qui molestias error cupiditate?
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-slate-200 rounded-md">
              <div
                className="rounded-full w-16 h-16 my-2
                flex justify-center items-center bg-red-300 bg-opacity-50 cursor-pointer"
              >
                <AiOutlineFieldTime className="text-red-600 size-12" />
              </div>
              <div className="flex flex-col items-center text-center p-2">
                <h3 className="font-semibold text-sm">
                  Lorem ipsum dolor sit amet.
                </h3>
                <p className="text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, maiores similique qui molestias error cupiditate?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          className="h-[350px] capitalize my"
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
