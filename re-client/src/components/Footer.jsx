import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaLinkedin,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-700 text-white">
      <aside className="flex flex-col gap-2">
        <h1 className="font-semibold text-sm sm:text-xl">GiTi Housing</h1>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nulla
          quod quis aliquid cumque magni quia excepturi, veniam fugiat corporis.
        </p>
        <div className="flex items-center gap-4 text-slate-600">
          <FaFacebookSquare className="size-6 bg-white rounded-sm" />
          <FaInstagram className="size-6 bg-white rounded-sm" />
          <FaLinkedin className="size-6 bg-white rounded-sm" />
          <FaTwitterSquare className="size-6 bg-white rounded-sm" />
        </div>
      </aside>
      <div className="flex flex-col ml-10 capitalize">
        <div className="mb-2">
          <h1 className="mb-0 font-semibold">quick links</h1>
          <div className="h-1 w-8 bg-red-400" />
        </div>
        <ul className="flex flex-col text-sm">
          <Link to="#">
            <li>About us</li>
          </Link>
          <Link to="#">
            <li>blogs & articles</li>
          </Link>
          <Link to="#">
            <li>terms & condition</li>
          </Link>
          <Link to="#">
            <li>privacy policy</li>
          </Link>
          <Link to="#">
            <li>contact us</li>
          </Link>
        </ul>
      </div>
      <nav className="flex flex-col gap-2">
        <div className="mb-2">
          <h1 className="mb-0 font-semibold capitalize">news letter</h1>
          <div className="h-1 w-8 bg-red-400" />
        </div>
        <input
          type="text"
          placeholder="Enter Email Address"
          className="input input-bordered w-full max-w-xs rounded-sm"
        />
        <button className="btn max-w-28 border-none text-white bg-orange-600 hover:bg-orange-700 py-1 px-4 rounded">
          Subscribe
        </button>
        <p className="text-xs">We never span you!</p>
      </nav>
      <nav className='ml-10'>
        <div className="mb-2">
          <h1 className="mb-0 font-semibold">Contact</h1>
          <div className="h-1 w-8 bg-red-400" />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaMapMarkerAlt />
          <p>Konoha</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MdOutlineEmail />
          <p>gitiestates@gmail.com</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FiPhone />
          <p>+234 9060052231</p>
        </div>
      </nav>
    </footer>
  );
}
