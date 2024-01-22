import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

export default function OauthButton() {
    const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleGoogle = async (e) => {
    e.preventDefault();
    
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      dispatch(signInSuccess(data)) && navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button
      onClick={handleGoogle}
      className="text-white bg-red-700 p-2 rounded-lg uppercase hover:opacity-85"
    >
      Continue with Google
    </button>
  );
}
