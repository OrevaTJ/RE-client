import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { BsFillHouseHeartFill } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaMoneyCheck } from 'react-icons/fa';

export function Features() {
  return (
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
  );
}
