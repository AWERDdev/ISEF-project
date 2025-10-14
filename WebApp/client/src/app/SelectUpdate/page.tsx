"use client";
import NavBarNoAUTH from "@/Components/NavBarNoAUTH";
import { useRouter } from 'next/navigation';
import  { ROUTES } from "@/Types/Routes";

const SelectSignup: React.FC = () => {
  const router = useRouter();

  const gotToCOMPDATAUPDATE = () =>{
    router.push(ROUTES.COMPDATAUPDATE)
  }
  const gotToUSERDATAUPDATE = () =>{
    router.push(ROUTES.USERDATAUPDATE)
  }
  return (
    <main className="min-h-screen bg-gradient-to-r from-white to-green-50 flex flex-col items-center">
      <header className="w-full">
        <NavBarNoAUTH />
      </header>
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-8 justify-center mt-20">
        {/* Company Card */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-8 border-2 border-blue-200 text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Company</h2>
          <p className="text-gray-600 mb-4">For hospitals, clinics, and organizations</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={gotToCOMPDATAUPDATE}
              className="cursor-pointer w-full py-2 rounded bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition"
            >
              Company Update
            </button>
          </div>
        </div>
        {/* User Card */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-8 border-2 border-green-200 text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-2">Individual User</h2>
          <p className="text-gray-600 mb-4">For doctors, staff, and personal accounts</p>
          <div className="flex flex-col gap-3">
            <button
             onClick={gotToUSERDATAUPDATE}
              className="cursor-pointer w-full py-2 rounded bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition"
            >
              User Update
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SelectSignup