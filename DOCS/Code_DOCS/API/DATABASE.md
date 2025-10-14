# MediSupply Database Documentation

## Overview
The MediSupply application uses MongoDB as its primary database, with Mongoose as the ODM (Object Document Mapper). This document outlines the database schema, relationships, indexes, and management procedures.

## Database Configuration

### Connection String
```javascript
// Development
mongodb://localhost:27017/MEDISupply

// Production
mongodb://username:password@host:port/database?retryWrites=true&w=majority
```

### Connection Options
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
});
```

## Database Schema

### User Model

#### Schema Definition
```javascript
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

#### Indexes
```javascript
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ isActive: 1 });
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8i",
  "phone": "+1234567890",
  "address": "123 Medical St, City, State 12345",
  "role": "user",
  "isActive": true,
  "lastLogin": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Company Model

#### Schema Definition
```javascript
const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  license: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Hospital', 'Pharmacy', 'Clinic', 'Laboratory']
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    default: 'Medium'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

#### Indexes
```javascript
CompanySchema.index({ email: 1 });
CompanySchema.index({ license: 1 });
CompanySchema.index({ type: 1 });
CompanySchema.index({ isVerified: 1 });
CompanySchema.index({ createdAt: -1 });
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "City General Hospital",
  "email": "admin@cityhospital.com",
  "password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8i",
  "phone": "+1234567890",
  "address": "789 Hospital Ave, City, State 12345",
  "license": "MED123456",
  "type": "Hospital",
  "size": "Large",
  "isVerified": true,
  "isActive": true,
  "lastLogin": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Medicine Model

#### Schema Definition
```javascript
const MedicineSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: [
      'Antibiotics', 'Pain Relief', 'Cardiovascular', 'Diabetes',
      'Mental Health', 'Gastrointestinal', 'Respiratory', 'Dermatology',
      'Oncology', 'Emergency', 'Hormonal', 'Immunosuppressants',
      'Anticoagulants', 'Antihistamines'
    ]
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    precision: 2
  },
  stock: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock'
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  image: {
    type: String,
    default: "💊"
  },
  manufacturer: {
    type: String,
    trim: true,
    maxlength: 200
  },
  dosage: {
    type: String,
    trim: true,
    maxlength: 100
  },
  expiryDate: {
    type: Date,
    required: true
  },
  sideEffects: [{
    type: String,
    trim: true,
    maxlength: 100
  }],
  contraindications: [{
    type: String,
    trim: true,
    maxlength: 100
  }],
  minimumOrder: {
    type: Number,
    default: 10,
    min: 1
  },
  maxOrder: {
    type: Number,
    default: 10000,
    min: 1
  },
  deliveryTime: {
    type: String,
    default: "2-3 business days",
    maxlength: 50
  },
  certifications: [{
    type: String,
    trim: true,
    maxlength: 100
  }],
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
    precision: 1
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

#### Indexes
```javascript
MedicineSchema.index({ name: 'text', category: 'text', description: 'text' });
MedicineSchema.index({ category: 1 });
MedicineSchema.index({ price: 1 });
MedicineSchema.index({ stock: 1 });
MedicineSchema.index({ manufacturer: 1 });
MedicineSchema.index({ expiryDate: 1 });
MedicineSchema.index({ rating: -1 });
MedicineSchema.index({ isActive: 1 });
MedicineSchema.index({ createdAt: -1 });
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Amoxicillin 500mg",
  "category": "Antibiotics",
  "price": 15.99,
  "stock": "In Stock",
  "description": "Broad-spectrum antibiotic used to treat bacterial infections",
  "longDescription": "Amoxicillin is a penicillin antibiotic that fights bacteria in the body. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.",
  "image": "💊",
  "manufacturer": "Pfizer Inc.",
  "dosage": "1 tablet daily",
  "expiryDate": "2025-12-31T00:00:00.000Z",
  "sideEffects": ["Nausea", "Dizziness", "Headache"],
  "contraindications": ["Pregnancy", "Liver disease"],
  "minimumOrder": 10,
  "maxOrder": 10000,
  "deliveryTime": "2-3 business days",
  "certifications": ["FDA Approved", "GMP Certified"],
  "rating": 4.5,
  "reviewCount": 150,
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Shopping Cart Model

#### Schema Definition
```javascript
const ShoppingCartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medicine: {
    type: Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});
```

#### Indexes
```javascript
ShoppingCartSchema.index({ user: 1, medicine: 1 }, { unique: true });
ShoppingCartSchema.index({ user: 1 });
ShoppingCartSchema.index({ addedAt: -1 });
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "user": "507f1f77bcf86cd799439011",
  "medicine": "507f1f77bcf86cd799439013",
  "quantity": 5,
  "addedAt": "2024-01-15T10:30:00.000Z"
}
```

### Quote Request Model

#### Schema Definition
```javascript
const QuoteRequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medicine: {
    type: Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Expired'],
    default: 'Pending'
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: 500
  }
});
```

#### Indexes
```javascript
QuoteRequestSchema.index({ user: 1 });
QuoteRequestSchema.index({ status: 1 });
QuoteRequestSchema.index({ requestedAt: -1 });
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "user": "507f1f77bcf86cd799439011",
  "medicine": "507f1f77bcf86cd799439013",
  "quantity": 100,
  "status": "Pending",
  "requestedAt": "2024-01-15T10:30:00.000Z",
  "notes": "Bulk order for hospital inventory"
}
```

### User Activity Model

#### Schema Definition
```javascript
const UserActivitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['favorite', 'add_to_cart', 'buy', 'request_quote', 'view', 'search']
  },
  medicine: {
    type: Schema.Types.ObjectId,
    ref: 'Medicine'
  },
  quantity: {
    type: Number,
    min: 1
  },
  metadata: {
    type: Schema.Types.Mixed
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});
```

#### Indexes
```javascript
UserActivitySchema.index({ user: 1 });
UserActivitySchema.index({ type: 1 });
UserActivitySchema.index({ medicine: 1 });
UserActivitySchema.index({ timestamp: -1 });
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439016",
  "user": "507f1f77bcf86cd799439011",
  "type": "add_to_cart",
  "medicine": "507f1f77bcf86cd799439013",
  "quantity": 5,
  "metadata": {
    "source": "medicine_detail_page",
    "session_id": "abc123"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Database Relationships

### One-to-Many Relationships
- **User → Shopping Cart Items**: One user can have multiple cart items
- **User → Quote Requests**: One user can make multiple quote requests
- **User → User Activities**: One user can have multiple activity records
- **Medicine → Shopping Cart Items**: One medicine can be in multiple carts
- **Medicine → Quote Requests**: One medicine can have multiple quote requests

### Many-to-Many Relationships
- **Users ↔ Medicines**: Through shopping cart and quote requests

## Database Operations

### Common Queries

#### Find All Active Medicines
```javascript
const medicines = await Medicine.find({ isActive: true })
  .sort({ createdAt: -1 })
  .limit(20);
```

#### Find Medicines by Category
```javascript
const antibiotics = await Medicine.find({ 
  category: 'Antibiotics',
  isActive: true 
}).sort({ name: 1 });
```

#### Find User's Shopping Cart
```javascript
const cartItems = await ShoppingCart.find({ user: userId })
  .populate('medicine')
  .sort({ addedAt: -1 });
```

#### Find User's Quote Requests
```javascript
const quoteRequests = await QuoteRequest.find({ user: userId })
  .populate('medicine')
  .sort({ requestedAt: -1 });
```

#### Search Medicines by Text
```javascript
const searchResults = await Medicine.find({
  $text: { $search: "amoxicillin" },
  isActive: true
}).sort({ score: { $meta: "textScore" } });
```

#### Get Medicine Statistics
```javascript
const stats = await Medicine.aggregate([
  { $match: { isActive: true } },
  { $group: {
    _id: '$category',
    count: { $sum: 1 },
    avgPrice: { $avg: '$price' },
    avgRating: { $avg: '$rating' }
  }},
  { $sort: { count: -1 } }
]);
```

### Aggregation Examples

#### User Activity Analysis
```javascript
const userActivity = await UserActivity.aggregate([
  { $match: { user: userId } },
  { $group: {
    _id: '$type',
    count: { $sum: 1 },
    lastActivity: { $max: '$timestamp' }
  }},
  { $sort: { count: -1 } }
]);
```

#### Medicine Performance Metrics
```javascript
const medicineMetrics = await Medicine.aggregate([
  { $lookup: {
    from: 'useractivities',
    localField: '_id',
    foreignField: 'medicine',
    as: 'activities'
  }},
  { $addFields: {
    viewCount: {
      $size: {
        $filter: {
          input: '$activities',
          cond: { $eq: ['$$this.type', 'view'] }
        }
      }
    },
    cartAddCount: {
      $size: {
        $filter: {
          input: '$activities',
          cond: { $eq: ['$$this.type', 'add_to_cart'] }
        }
      }
    }
  }},
  { $project: {
    name: 1,
    category: 1,
    price: 1,
    rating: 1,
    viewCount: 1,
    cartAddCount: 1
  }},
  { $sort: { viewCount: -1 } }
]);
```

## Database Maintenance

### Backup Procedures

#### Automated Backup Script
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"
mkdir -p $BACKUP_DIR

# Create backup
mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR/backup_$DATE"

# Compress backup
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C "$BACKUP_DIR" "backup_$DATE"

# Remove uncompressed backup
rm -rf "$BACKUP_DIR/backup_$DATE"

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete

echo "Backup completed: backup_$DATE.tar.gz"
```

#### Restore Procedures
```bash
# Restore from backup
mongorestore --uri="$MONGODB_URI" --drop /path/to/backup/directory

# Restore specific collection
mongorestore --uri="$MONGODB_URI" --collection=medicines /path/to/backup/directory
```

### Index Management

#### Create Indexes
```javascript
// Create text index for search
await Medicine.collection.createIndex({
  name: 'text',
  category: 'text',
  description: 'text'
});

// Create compound index
await ShoppingCart.collection.createIndex({
  user: 1,
  medicine: 1
}, { unique: true });
```

#### Monitor Index Usage
```javascript
// Get index usage statistics
const indexStats = await Medicine.collection.indexStats();
console.log('Index usage:', indexStats);
```

### Data Validation

#### Schema Validation
```javascript
// Enable schema validation
const MedicineSchema = new Schema({
  // ... schema definition
}, {
  strict: true,
  validateBeforeSave: true
});
```

#### Custom Validators
```javascript
const MedicineSchema = new Schema({
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function(v) {
        return v <= 10000; // Max price $10,000
      },
      message: 'Price cannot exceed $10,000'
    }
  },
  expiryDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v > new Date(); // Must be future date
      },
      message: 'Expiry date must be in the future'
    }
  }
});
```

## Performance Optimization

### Query Optimization

#### Use Projection
```javascript
// Only fetch needed fields
const medicines = await Medicine.find({ isActive: true })
  .select('name category price stock image')
  .limit(20);
```

#### Use Lean Queries
```javascript
// For read-only operations
const medicines = await Medicine.find({ isActive: true })
  .lean()
  .limit(20);
```

#### Batch Operations
```javascript
// Bulk insert
const medicines = [/* array of medicine objects */];
await Medicine.insertMany(medicines);

// Bulk update
await Medicine.updateMany(
  { category: 'Antibiotics' },
  { $set: { deliveryTime: '1-2 business days' } }
);
```

### Connection Pooling
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0
});
```

## Monitoring and Analytics

### Database Metrics
```javascript
// Monitor connection status
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
```

### Performance Monitoring
```javascript
// Monitor query performance
mongoose.set('debug', process.env.NODE_ENV === 'development');

// Custom query logging
const originalFind = mongoose.Model.find;
mongoose.Model.find = function() {
  const start = Date.now();
  return originalFind.apply(this, arguments).then(result => {
    const duration = Date.now() - start;
    if (duration > 100) { // Log slow queries
      console.log(`Slow query (${duration}ms):`, arguments);
    }
    return result;
  });
};
```

## Security Considerations

### Data Encryption
- **At Rest**: Enable MongoDB encryption
- **In Transit**: Use TLS/SSL connections
- **Application Level**: Hash sensitive data (passwords)

### Access Control
```javascript
// Database user with limited permissions
db.createUser({
  user: "medisupply_app",
  pwd: "secure_password",
  roles: [
    { role: "readWrite", db: "MEDISupply" }
  ]
});
```

### Input Validation
```javascript
// Sanitize user inputs
const sanitizeInput = (input) => {
  return input.replace(/[<>]/g, '');
};

// Use in queries
const searchTerm = sanitizeInput(req.query.search);
const medicines = await Medicine.find({
  $text: { $search: searchTerm }
});
``` 