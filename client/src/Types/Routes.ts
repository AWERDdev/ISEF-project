// Define route constants for type safety and consistency
// 'as const' makes TypeScript treat these as literal string types instead of just 'string'
export const ROUTES = {
    HOME: '/',
    ABOUT: '/About',
    FEATURES: '/Features',
    USERLOGIN: '/UserLogin',
    USERSIGNUP: '/UserSignup',
    COMPLOGIN: '/COMPLogin',
    COMPSIGNUP: '/COMPSignup',
    SELECTSIGNUP:'/SelectSignup',
    SELECTLOGIN:'/SelectLogin',
    MAIN_PAGE: '/MainPage',
    CONTACT: '/Contact',
    PRICING:"/",
    API:"/",
    CAREERS:"/",
    HELP_CENTER:"/",
    DOCUMENTATION:"/",
    STATUS:"/",
    SHOPPING_CART: '/ShoppingCart',
    PURCHASE_PAGE: '/PurchasePage',
    FAVORITES: '/Favorites',
    PROFILE: '/Profile',
    SELECTUPDATE: '/SelectUpdate',
    COMPDATAUPDATE: '/COMPDATAUpdate',
    USERDATAUPDATE: '/UserDataUpdate',
  } as const;
  
  // This creates a union type of all possible route keys
  // RouteKey = "HOME" | "ABOUT" | "FEATURES" | "LOGIN" | "SIGNUP" | "MAIN_PAGE"
  export type RouteKey = keyof typeof ROUTES;