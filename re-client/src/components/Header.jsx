import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import profilePicPlaceholder from '../../assets/profile-pic-placeholder.png';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-2 sm:p-4 items-center max-w-6xl mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Image"
            className="w-7 h-7 object-contain rounded-md"
          />
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-slate-500">Gi</span>
            <span className="text-slate-700">Ti</span>
          </h1>
        </Link>
        <div className="flex justify-between items-center gap-8">
          <ul className="flex gap-4 font-semibold">
            <Link to="/">
              <li className="text-slate-600 hidden sm:inline hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="text-slate-600 hover:underline">
                About
              </li>
            </Link>
            <Link to="#">
              <li className="text-slate-600 hover:underline">
                Blog
              </li>
            </Link>
            <Link to="#">
              <li className="text-slate-600 hover:underline">
                Contact Us
              </li>
            </Link>
          </ul>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePhoto}
                alt="Profile Photo"
                className="object-cover rounded-full w-7 h-7"
              />
            ) : (
              <>
                <div className="gap-2 text-white hidden sm:flex ">
                  <button className="bg-orange-600 hover:bg-orange-700 py-1 px-4 rounded">
                    Login
                  </button>
                  <button className="bg-orange-600 hover:bg-orange-700 py-1 px-4 rounded">
                    Register
                  </button>
                </div>
                <img
                  src={profilePicPlaceholder}
                  alt="Profile Photo"
                  className="object-cover rounded-full w-7 h-7 sm:hidden"
                />
              </>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
