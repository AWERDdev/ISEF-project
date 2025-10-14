"use client";
import  { ROUTES } from "@/Types/Routes"
import Link from "next/link";
import { ButtonStyle1 , ButtonStyle2 } from "./ButtonStyles";
import { Box } from "lucide-react";
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () =>{
    const router = useRouter();
 
    const goToSelectSignup = () => {
      router.push(ROUTES.SELECTSIGNUP);
    };
    const goToSelectLogin = () => {
        router.push(ROUTES.SELECTLOGIN);
      };

    return(
        <>
        <main className="bg-white shadow-md w-full">
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                <div className="webName flex items-center gap-2">
                <Link href={ROUTES.HOME}>
                <span className="bg-blue-100 flex rounded-lg p-1">
                    <Box className="text-blue-600" size={28} />
                    <h1 className="text-2xl flex font-bold text-blue-700">MediSupply</h1>
                </span>
                </Link>
                </div>
                <div className="md:flex hidden elements  gap-8">
                    <div className="elment"><Link href={ROUTES.FEATURES} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</Link></div>
                    <div className="elment"><Link href={ROUTES.ABOUT} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">ABOUT</Link></div>
                    <div className="elment"><Link href={ROUTES.CONTACT} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">CONTACT</Link></div>
                  </div>
                <div className="flex items-center gap-4">
                 
                  <div className="Singup-Login sm:flex hidden gap-2">
                    <ButtonStyle2 ButtonText = 'Login' onClick={goToSelectLogin} />
                    <ButtonStyle1 ButtonText = 'Signup' onClick={goToSelectSignup} />
                  </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default Navbar;