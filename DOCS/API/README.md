# MediSupply API Documentation

## Overview
The MediSupply API is a RESTful service built with Express.js and Node.js, designed to handle medical supply management for hospitals and pharmacies. The API provides authentication, medicine catalog management, shopping cart functionality, and user activity tracking.

## Base URL
- **Development**: `http://localhost:3500`
- **Production**: `https://your-production-domain.com`

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication Endpoints

#### User Authentication

##### POST `/apiAUTH/user/signup`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "address": "123 Medical St, City, State 12345"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

##### POST `/apiAUTH/user/login`
Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

##### POST `/apiAUTH/user/update`
Update user profile information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+1234567890",
  "address": "456 New Address, City, State 12345"
}
```

#### Company Authentication

##### POST `/apiAUTH/COMP/signup`
Register a new company account.

**Request Body:**
```json
{
  "name": "City General Hospital",
  "email": "admin@cityhospital.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "address": "789 Hospital Ave, City, State 12345",
  "license": "MED123456",
  "type": "Hospital"
}
```

##### POST `/apiAUTH/COMP/login`
Authenticate a company and receive a JWT token.

**Request Body:**
```json
{
  "email": "admin@cityhospital.com",
  "password": "securePassword123"
}
```

##### POST `/apiAUTH/COMP/update`
Update company profile information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "name": "City General Medical Center",
  "phone": "+1234567890",
  "address": "789 Updated Hospital Ave, City, State 12345",
  "license": "MED123456",
  "type": "Hospital"
}
```

### Token Validation

##### GET `/apiAUTH/validateToken`
Validate a JWT token.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "message": "Token valid",
  "AUTH": true
}
```

### Medicine Catalog Endpoints

#### POST `/api/MEDPage/fetch-and-store`
Fetch medicine data from external APIs and store in database.

**Request Body:**
```json
{
  "source": "local",
  "count": 20
}
```

**Sources Available:**
- `local`: Generate fake medicine data locally
- `openfda`: Fetch from FDA API
- `jsonplaceholder`: Fetch from JSONPlaceholder API

#### POST `/api/MEDPage/all`
Get all medicines with optional pagination.

**Query Parameters:**
- `page`: Page number (optional)
- `limit`: Items per page (optional)

**Request Body:**
```json
{
  "page": 1,
  "limit": 12
}
```

**Response:**
```json
{
  "success": true,
  "medicines": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 100,
    "itemsPerPage": 12
  }
}
```

#### GET `/api/MEDPage/:id`
Get a specific medicine by ID.

**Response:**
```json
{
  "success": true,
  "medicine": {
    "_id": "medicine_id",
    "name": "Amoxicillin 500mg",
    "category": "Antibiotics",
    "price": 15.99,
    "stock": "In Stock",
    "description": "Antibiotic medication...",
    "longDescription": "Detailed description...",
    "image": "💊",
    "manufacturer": "Pfizer Inc.",
    "dosage": "1 tablet daily",
    "expiryDate": "2025-12-31T00:00:00.000Z",
    "sideEffects": ["Nausea", "Dizziness"],
    "contraindications": ["Pregnancy", "Liver disease"],
    "minimumOrder": 10,
    "maxOrder": 10000,
    "deliveryTime": "2-3 business days",
    "certifications": ["FDA Approved", "GMP Certified"],
    "rating": 4.5,
    "reviewCount": 150
  }
}
```

### Shopping Cart Endpoints

#### POST `/api/shopping-cart/add`
Add item to shopping cart.

**Request Body:**
```json
{
  "userId": "user_id",
  "medicineId": "medicine_id",
  "quantity": 5
}
```

#### POST `/api/shopping-cart/remove`
Remove item from shopping cart.

**Request Body:**
```json
{
  "userId": "user_id",
  "medicineId": "medicine_id"
}
```

#### GET `/api/shopping-cart/list/:userId`
Get all items in user's shopping cart.

**Response:**
```json
{
  "success": true,
  "items": [
    {
      "_id": "cart_item_id",
      "user": "user_id",
      "medicine": {
        "_id": "medicine_id",
        "name": "Amoxicillin 500mg",
        "price": 15.99
      },
      "quantity": 5
    }
  ]
}
```

### Quote Request Endpoints

#### POST `/api/quote-request/request`
Request a quote for medicine.

**Request Body:**
```json
{
  "userId": "user_id",
  "medicineId": "medicine_id",
  "quantity": 100
}
```

### User Activity Endpoints

#### POST `/api/user-activity/log`
Log user activity.

**Request Body:**
```json
{
  "userId": "user_id",
  "type": "add_to_cart",
  "medicineId": "medicine_id",
  "quantity": 5
}
```

**Activity Types:**
- `favorite`: User favorited a medicine
- `add_to_cart`: User added medicine to cart
- `buy`: User purchased medicine
- `request_quote`: User requested a quote

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Medicine not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details"
}
```

## Rate Limiting
The API implements rate limiting to prevent abuse:
- Login attempts: 10 attempts per minute per IP
- General requests: 100 requests per minute per IP

## Security Features
- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Rate limiting

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Company Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  license: String,
  type: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Medicine Model
```javascript
{
  name: String,
  category: String,
  price: Number,
  stock: String,
  description: String,
  longDescription: String,
  image: String,
  manufacturer: String,
  dosage: String,
  expiryDate: Date,
  sideEffects: [String],
  contraindications: [String],
  minimumOrder: Number,
  maxOrder: Number,
  deliveryTime: String,
  certifications: [String],
  rating: Number,
  reviewCount: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables
Create a `.env` file in the API directory:

```env
PORT=3500
MONGODB_URI=mongodb://localhost:27017/MEDISupply
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables
3. Start the server:
```bash
npm start
```

4. For development with auto-restart:
```bash
npm run Devstart
```

## Support
For API support and questions, contact the development team or refer to the internal documentation. 