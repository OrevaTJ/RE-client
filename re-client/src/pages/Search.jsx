import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/Listing-item';

export default function Search() {
  const navigate = useNavigate();
  const [searchParamsData, setSearchParamsData] = useState({
    q: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const updateSearchParamsData = () => {
      const urlParams = new URLSearchParams(location.search);
      setSearchParamsData({
        q: urlParams.get('q') || '',
        type: urlParams.get('type') || 'all',
        parking: urlParams.get('parking') === 'true' ? true : false,
        furnished: urlParams.get('furnished') === 'true' ? true : false,
        offer: urlParams.get('offer') === 'true' ? true : false,
        sort: urlParams.get('sort') || 'createdAt',
        order: urlParams.get('order') || 'desc',
      });
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setShowMore(false);

        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();

        setListings(data);

        setShowMore(data.length > 9);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    updateSearchParamsData();
    fetchData();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === 'all' || id === 'rent' || id === 'sale') {
      setSearchParamsData({ ...searchParamsData, type: id });
    }

    if (id === 'q') {
      setSearchParamsData({ ...searchParamsData, q: value });
    }

    if (['parking', 'furnished', 'offer'].includes(id)) {
      setSearchParamsData({
        ...searchParamsData,
        [id]: checked || checked === 'true' ? true : false,
      });
    }

    if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSearchParamsData({
        ...searchParamsData,
        sort: sort || 'createdAt',
        order: order || 'desc',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { q, type, parking, furnished, offer, sort, order } =
      searchParamsData;

    const urlParams = new URLSearchParams({
      q,
      type,
      parking,
      furnished,
      offer,
      sort,
      order,
    });

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const onShowMore = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="q"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={searchParamsData.q}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={searchParamsData.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={searchParamsData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={searchParamsData.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={searchParamsData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={searchParamsData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={searchParamsData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
            >
              <option value="priceRegular_desc">Price high to low</option>
              <option value="priceRegular_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-4 flex flex-wrap gap-2">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <div className="w-full text-center">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              className="text-green-700 hover:underline p-7 text-center w-full"
              onClick={onShowMore}
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
