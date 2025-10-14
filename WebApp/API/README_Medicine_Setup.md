# Medicine System Setup

This system allows you to fetch medicine data from external APIs, store it in your database, and display it in your medical app with individual pages for each medicine.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd SaaS/API
npm install
```

### 2. Populate Database with Medicine Data
```bash
# Generate 20 medicines (default)
node setup-medicines.js

# Or specify a custom number
node setup-medicines.js 50
```

### 3. Start the API Server
```bash
npm start
```

### 4. Start the Client
```bash
cd ../client
npm run dev
```

## 📋 How It Works

### Database Structure
Each medicine in the database has:
- `medicineId`: Unique ID (e.g., "MED001", "MED002")
- `name`: Medicine name with strength
- `category`: Medicine category
- `price`: Price per unit
- `stock`: Stock status
- `description`: Short description
- `longDescription`: Detailed description
- And many more fields...

### API Routes
- `GET /api/medicines/all` - Get all medicines
- `GET /api/medicines/:medicineId` - Get specific medicine
- `POST /api/medicines/fetch-and-store` - Fetch from external APIs and store

### Frontend Pages
- **MainPage**: Displays all medicines in a grid
- **Medicine Detail Page**: `/medicine/[id]` - Shows detailed info for each medicine

## 🔄 Data Flow

1. **Setup**: Run `setup-medicines.js` to populate database
2. **MainPage**: Fetches medicines from `/api/medicines/all`
3. **Click Medicine**: User clicks on medicine card
4. **Navigation**: Routes to `/medicine/MED001` (using medicineId)
5. **Detail Page**: Fetches specific medicine from `/api/medicines/MED001`
6. **Display**: Shows detailed medicine information

## 🎯 Example URLs

After setup, you'll have URLs like:
- `/medicine/MED001` - Amoxicillin 500mg
- `/medicine/MED002` - Ibuprofen 200mg
- `/medicine/MED003` - Paracetamol 500mg
- etc.

## 🔧 Customization

### Add More Medicines
```bash
node setup-medicines.js 100  # Generate 100 medicines
```

### Use External APIs
You can modify the API routes to fetch from:
- OpenFDA API (real drug data)
- JSONPlaceholder (for testing)
- Your own custom API

### Modify Medicine Data
Edit the `generateLocalFakeMedicines` function in `setup-medicines.js` to:
- Add more medicine names
- Change categories
- Modify pricing logic
- Add more fields

## 🐛 Troubleshooting

### Database Connection Issues
- Make sure MongoDB is running
- Check your connection string in `.env`

### API Not Working
- Ensure API server is running on port 3500
- Check CORS settings
- Verify database connection

### Frontend Issues
- Check if API server is accessible
- Verify medicine IDs are being passed correctly
- Check browser console for errors

## 📝 Next Steps

1. **Add Search**: Implement search functionality
2. **Add Filtering**: Filter by category, price, etc.
3. **Add Pagination**: Handle large numbers of medicines
4. **Add Real Images**: Replace emoji with actual medicine images
5. **Add Shopping Cart**: Implement cart functionality
6. **Add User Reviews**: Allow users to rate medicines

## 🎉 You're Ready!

Once you've completed the setup:
1. Your MainPage will show all medicines from the database
2. Each medicine card is clickable
3. Clicking a medicine takes you to its detailed page
4. Each medicine has a unique URL with its ID
5. All data is stored in your MongoDB database 