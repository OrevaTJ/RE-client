import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center text-3xl my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePhoto}
          alt="Profile Photo"
          className="object-cover rounded-full h-24 w-24 m-2 cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-md"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-md"
        />
        <button
          className="text-white bg-slate-700 rounded-md
            p-3 uppercase hover:opacity-95 disabled:opacity-70"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer">Delete account</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
