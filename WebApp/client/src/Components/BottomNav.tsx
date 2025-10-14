import  { ROUTES } from "@/Types/Routes"
import Link from "next/link";
import { Box } from "lucide-react";
const BottomNav: React.FC = () =>{

 return(
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center text-center md:justify-between md:items-start md:text-left gap-10 border-b border-gray-800 pb-8">
        {/* Brand Section */}
        <div className="flex-1 mb-8 md:mb-0 min-w-[200px] flex flex-col items-center md:items-start">
  <div className="webName flex items-center gap-2 mb-2">
    <span className=" rounded-lg p-1">
      <Box className="text-blue-600" size={28} />
    </span>
    <h1 className="text-2xl font-bold text-white">MediSupply</h1>
  </div>
  <p className="text-gray-400 text-sm max-w-xs">Connecting healthcare providers with reliable medical supplies worldwide.</p>
</div>
        {/* Product */}
        <div className="flex-1 mb-8 md:mb-0 min-w-[150px]">
          <h1 className="text-white font-bold mb-3 text-base">Product</h1>
          <ul className="space-y-2">
            <li><Link className="hover:text-white transition" href={ROUTES.FEATURES}>Features</Link></li>
            <li><Link className="hover:text-white transition" href={ROUTES.PRICING}>Pricing</Link></li>
            <li><Link className="hover:text-white transition" href={ROUTES.API}>API</Link></li>
          </ul>
        </div>
        {/* Company */}
        <div className="flex-1 mb-8 md:mb-0 min-w-[150px]">
          <h1 className="text-white font-bold mb-3 text-base">Company</h1>
          <ul className="space-y-2">
            <li><Link className="hover:text-white transition" href={ROUTES.ABOUT}>About</Link></li>
            <li><Link className="hover:text-white transition" href={ROUTES.CAREERS}>Careers</Link></li>
            <li><Link className="hover:text-white transition" href={ROUTES.CONTACT}>Contact</Link></li>
          </ul>
        </div>
        {/* Support */}
        <div className="flex-1 min-w-[150px]">
          <h1 className="text-white font-bold mb-3 text-base">Support</h1>
          <ul className="space-y-2">
            <li><Link className="hover:text-white transition" href={ROUTES.HELP_CENTER}>Help Center</Link></li>
            <li><Link className="hover:text-white transition" href={ROUTES.DOCUMENTATION}>Documentation</Link></li>
            <li><Link className="hover:text-white transition" href={ROUTES.STATUS}>Status</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-6 text-center text-gray-500 text-sm">
        © 2024 MediSupply. All rights reserved.
      </div>
    </footer>
 )
}

export default BottomNav