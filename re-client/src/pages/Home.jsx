import { useEffect, useState } from 'react';
import ListingItem from '../components/Listing-item';
import hero from '../../assets/hero.jpg';
import ListingByLocation from '../components/home-components/Listing-location';

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
        <div className="my-8">
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
    </div>
  );
}
