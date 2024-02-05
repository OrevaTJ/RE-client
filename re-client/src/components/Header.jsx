import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('q', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  // Sync the search input to the browser url
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const urlSearchTerm = urlParams.get('q')
    setSearchTerm(urlSearchTerm || '')
  }, [location.search])
  

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-2 sm:p-4 items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-slate-500">Gi</span>
            <span className="text-slate-700">Ti</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="flex items-center bg-slate-100 p-3 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-700" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/about">
            <li className="text-slate-600 hidden sm:inline hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePhoto}
                alt="Profile Photo"
                className="object-cover rounded-full w-7 h-7"
              />
            ) : (
              <li className="text-slate-600 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
