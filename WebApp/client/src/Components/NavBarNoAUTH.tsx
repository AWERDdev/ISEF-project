import { Box } from "lucide-react";
import  { ROUTES } from "@/Types/Routes"
import Link from "next/link";
const NavBarNoAUTH: React.FC = () =>{

    return(
        <>
        <main className="bg-white flex shadow-md w-full">
            <div className="container  mx-auto px-4 flex items-center justify-between h-16">
                <div className="webName flex items-center gap-2">
                <Link href={ROUTES.HOME}>
                <span className="bg-blue-100 flex rounded-lg p-1">
                    <Box className="text-blue-600" size={28} />
                        <h1 className="text-2xl flex font-bold text-blue-700">MediSupply</h1>
                </span>
                
                </Link>
                </div>
            </div>
        </main>
        </>
    )
}

export default NavBarNoAUTH;