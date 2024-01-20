import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OauthButton from '../components/Oauth-button';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // if error from api
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/sign-in');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border outline-gray-300 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border outline-gray-300 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border outline-gray-300 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="uppercase rounded-lg p-2 text-white bg-slate-700
          hover:opacity-95 disabled:opacity-75"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OauthButton />
      </form>
      <div className="flex mt-5 gap-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-600">Sign In</span>
        </Link>
      </div>
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
