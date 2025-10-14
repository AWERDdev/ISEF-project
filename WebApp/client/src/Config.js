export const API_BASE_URL = process.env.NEXT_PUBLIC_PROD === 'true'
  ? 'https://stockmarket-backend.vercel.app' //* Production URL change this to your production URL
  : process.env.NEXT_PUBLIC_USE_TUNNEL === 'true'
  ? 'https://your-stock-api.loca.lt'  // Replace with your actual LocalTunnel URL
  : 'http://localhost:3500';

  //* before running please create a .env file with the NEXT_PUBLIC_PROD and NEXT_PUBLIC_USE_TUNNEL set to the wanted value 
