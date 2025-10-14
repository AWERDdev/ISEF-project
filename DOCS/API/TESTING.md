# MediSupply API Testing Guide

## Overview
This document outlines the testing strategy for the MediSupply API, including unit tests, integration tests, end-to-end tests, and performance testing.

## Testing Strategy

### Testing Pyramid
```
    /\
   /  \     E2E Tests (Few)
  /____\    Integration Tests (Some)
 /______\   Unit Tests (Many)
```

### Test Types
1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test API endpoints and database interactions
3. **End-to-End Tests**: Test complete user workflows
4. **Performance Tests**: Test API performance under load
5. **Security Tests**: Test authentication and authorization

## Testing Framework Setup

### Dependencies
```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.0.0",
    "mongodb-memory-server": "^8.0.0",
    "faker": "^6.0.0",
    "nodemon": "^3.0.0"
  }
}
```

### Jest Configuration (jest.config.js)
```javascript
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/coverage/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testTimeout: 10000
};
```

### Test Setup (tests/setup.js)
```javascript
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
```

## Unit Tests

### Authentication Tests

#### User Authentication Tests (tests/unit/auth/userAuth.test.js)
```javascript
const request = require('supertest');
const app = require('../../index');
const User = require('../../Models/UserModel');
const { faker } = require('@faker-js/faker');

describe('User Authentication', () => {
  describe('POST /apiAUTH/user/signup', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'SecurePass123!',
        phone: faker.phone.number(),
        address: faker.location.streetAddress()
      };

      const response = await request(app)
        .post('/apiAUTH/user/signup')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should reject signup with invalid email', async () => {
      const userData = {
        name: faker.person.fullName(),
        email: 'invalid-email',
        password: 'SecurePass123!',
        phone: faker.phone.number(),
        address: faker.location.streetAddress()
      };

      const response = await request(app)
        .post('/apiAUTH/user/signup')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('email');
    });

    it('should reject signup with weak password', async () => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123',
        phone: faker.phone.number(),
        address: faker.location.streetAddress()
      };

      const response = await request(app)
        .post('/apiAUTH/user/signup')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('password');
    });

    it('should reject duplicate email signup', async () => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'SecurePass123!',
        phone: faker.phone.number(),
        address: faker.location.streetAddress()
      };

      // Create first user
      await request(app)
        .post('/apiAUTH/user/signup')
        .send(userData)
        .expect(201);

      // Try to create second user with same email
      const response = await request(app)
        .post('/apiAUTH/user/signup')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('email');
    });
  });

  describe('POST /apiAUTH/user/login', () => {
    let testUser;

    beforeEach(async () => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'SecurePass123!',
        phone: faker.phone.number(),
        address: faker.location.streetAddress()
      };

      const response = await request(app)
        .post('/apiAUTH/user/signup')
        .send(userData);
      
      testUser = response.body.user;
    });

    it('should login with valid credentials', async () => {
      const loginData = {
        email: testUser.email,
        password: 'SecurePass123!'
      };

      const response = await request(app)
        .post('/apiAUTH/user/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.id).toBe(testUser.id);
    });

    it('should reject login with invalid email', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'SecurePass123!'
      };

      const response = await request(app)
        .post('/apiAUTH/user/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid email or password');
    });

    it('should reject login with invalid password', async () => {
      const loginData = {
        email: testUser.email,
        password: 'WrongPassword123!'
      };

      const response = await request(app)
        .post('/apiAUTH/user/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid email or password');
    });
  });
});
```

#### Company Authentication Tests (tests/unit/auth/companyAuth.test.js)
```javascript
const request = require('supertest');
const app = require('../../index');
const Company = require('../../Models/CompanyModel');
const { faker } = require('@faker-js/faker');

describe('Company Authentication', () => {
  describe('POST /apiAUTH/COMP/signup', () => {
    it('should create a new company with valid data', async () => {
      const companyData = {
        name: faker.company.name(),
        email: faker.internet.email(),
        password: 'SecurePass123!',
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        license: faker.string.alphanumeric(8).toUpperCase(),
        type: 'Hospital'
      };

      const response = await request(app)
        .post('/apiAUTH/COMP/signup')
        .send(companyData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.company).toHaveProperty('id');
      expect(response.body.company.email).toBe(companyData.email);
    });

    it('should validate required fields', async () => {
      const companyData = {
        name: faker.company.name(),
        // Missing email, password, etc.
      };

      const response = await request(app)
        .post('/apiAUTH/COMP/signup')
        .send(companyData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
```

### Medicine API Tests

#### Medicine Endpoints Tests (tests/unit/medicine/medicineApi.test.js)
```javascript
const request = require('supertest');
const app = require('../../index');
const Medicine = require('../../Models/MedicineModel');
const { faker } = require('@faker-js/faker');

describe('Medicine API', () => {
  let testMedicine;

  beforeEach(async () => {
    testMedicine = new Medicine({
      name: faker.commerce.productName(),
      category: 'Antibiotics',
      price: faker.number.float({ min: 5, max: 100, precision: 0.01 }),
      stock: 'In Stock',
      description: faker.lorem.sentence(),
      longDescription: faker.lorem.paragraph(),
      image: '💊',
      manufacturer: faker.company.name(),
      dosage: '1 tablet daily',
      expiryDate: faker.date.future(),
      sideEffects: ['Nausea', 'Dizziness'],
      contraindications: ['Pregnancy'],
      minimumOrder: 10,
      maxOrder: 1000,
      deliveryTime: '2-3 business days',
      certifications: ['FDA Approved'],
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      reviewCount: faker.number.int({ min: 0, max: 1000 })
    });

    await testMedicine.save();
  });

  describe('GET /api/MEDPage/:id', () => {
    it('should return medicine by ID', async () => {
      const response = await request(app)
        .get(`/api/MEDPage/${testMedicine._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.medicine._id).toBe(testMedicine._id.toString());
      expect(response.body.medicine.name).toBe(testMedicine.name);
    });

    it('should return 404 for non-existent medicine', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const response = await request(app)
        .get(`/api/MEDPage/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not found');
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/MEDPage/invalid-id')
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/MEDPage/all', () => {
    beforeEach(async () => {
      // Create multiple medicines for pagination testing
      const medicines = Array.from({ length: 15 }, () => ({
        name: faker.commerce.productName(),
        category: 'Antibiotics',
        price: faker.number.float({ min: 5, max: 100, precision: 0.01 }),
        stock: 'In Stock',
        description: faker.lorem.sentence(),
        longDescription: faker.lorem.paragraph(),
        image: '💊',
        manufacturer: faker.company.name(),
        dosage: '1 tablet daily',
        expiryDate: faker.date.future(),
        sideEffects: ['Nausea'],
        contraindications: ['Pregnancy'],
        minimumOrder: 10,
        maxOrder: 1000,
        deliveryTime: '2-3 business days',
        certifications: ['FDA Approved'],
        rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        reviewCount: faker.number.int({ min: 0, max: 1000 })
      }));

      await Medicine.insertMany(medicines);
    });

    it('should return all medicines without pagination', async () => {
      const response = await request(app)
        .post('/api/MEDPage/all')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.medicines).toBeInstanceOf(Array);
      expect(response.body.medicines.length).toBeGreaterThan(0);
    });

    it('should return paginated results', async () => {
      const response = await request(app)
        .post('/api/MEDPage/all')
        .send({ page: 1, limit: 5 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.medicines.length).toBeLessThanOrEqual(5);
      expect(response.body.pagination).toHaveProperty('currentPage', 1);
      expect(response.body.pagination).toHaveProperty('totalPages');
      expect(response.body.pagination).toHaveProperty('totalItems');
    });

    it('should filter by category', async () => {
      const response = await request(app)
        .post('/api/MEDPage/all')
        .send({ category: 'Antibiotics' })
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.medicines.forEach(medicine => {
        expect(medicine.category).toBe('Antibiotics');
      });
    });
  });
});
```

### Shopping Cart Tests

#### Shopping Cart API Tests (tests/unit/cart/shoppingCart.test.js)
```javascript
const request = require('supertest');
const app = require('../../index');
const ShoppingCart = require('../../Models/ShoppingCartModel');
const Medicine = require('../../Models/MedicineModel');
const User = require('../../Models/UserModel');
const { faker } = require('@faker-js/faker');

describe('Shopping Cart API', () => {
  let testUser, testMedicine, authToken;

  beforeEach(async () => {
    // Create test user
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'SecurePass123!',
      phone: faker.phone.number(),
      address: faker.location.streetAddress()
    };

    const userResponse = await request(app)
      .post('/apiAUTH/user/signup')
      .send(userData);
    
    testUser = userResponse.body.user;

    // Login to get auth token
    const loginResponse = await request(app)
      .post('/apiAUTH/user/login')
      .send({
        email: userData.email,
        password: userData.password
      });
    
    authToken = loginResponse.body.token;

    // Create test medicine
    testMedicine = new Medicine({
      name: faker.commerce.productName(),
      category: 'Antibiotics',
      price: faker.number.float({ min: 5, max: 100, precision: 0.01 }),
      stock: 'In Stock',
      description: faker.lorem.sentence(),
      longDescription: faker.lorem.paragraph(),
      image: '💊',
      manufacturer: faker.company.name(),
      dosage: '1 tablet daily',
      expiryDate: faker.date.future(),
      sideEffects: ['Nausea'],
      contraindications: ['Pregnancy'],
      minimumOrder: 10,
      maxOrder: 1000,
      deliveryTime: '2-3 business days',
      certifications: ['FDA Approved'],
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      reviewCount: faker.number.int({ min: 0, max: 1000 })
    });

    await testMedicine.save();
  });

  describe('POST /api/shopping-cart/add', () => {
    it('should add item to cart', async () => {
      const cartData = {
        userId: testUser.id,
        medicineId: testMedicine._id.toString(),
        quantity: 5
      };

      const response = await request(app)
        .post('/api/shopping-cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send(cartData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.cartItem).toHaveProperty('quantity', 5);
    });

    it('should update quantity if item already exists', async () => {
      const cartData = {
        userId: testUser.id,
        medicineId: testMedicine._id.toString(),
        quantity: 5
      };

      // Add item first time
      await request(app)
        .post('/api/shopping-cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send(cartData);

      // Update quantity
      const updateData = { ...cartData, quantity: 10 };
      const response = await request(app)
        .post('/api/shopping-cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.cartItem.quantity).toBe(10);
    });

    it('should reject invalid quantity', async () => {
      const cartData = {
        userId: testUser.id,
        medicineId: testMedicine._id.toString(),
        quantity: -1
      };

      const response = await request(app)
        .post('/api/shopping-cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send(cartData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/shopping-cart/list/:userId', () => {
    it('should return user cart items', async () => {
      // Add item to cart first
      const cartData = {
        userId: testUser.id,
        medicineId: testMedicine._id.toString(),
        quantity: 5
      };

      await request(app)
        .post('/api/shopping-cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send(cartData);

      // Get cart items
      const response = await request(app)
        .get(`/api/shopping-cart/list/${testUser.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].quantity).toBe(5);
    });
  });
});
```

## Integration Tests

### API Integration Tests (tests/integration/api.test.js)
```javascript
const request = require('supertest');
const app = require('../../index');
const { faker } = require('@faker-js/faker');

describe('API Integration Tests', () => {
  let authToken, testUser, testMedicine;

  beforeAll(async () => {
    // Setup test user and get auth token
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'SecurePass123!',
      phone: faker.phone.number(),
      address: faker.location.streetAddress()
    };

    await request(app)
      .post('/apiAUTH/user/signup')
      .send(userData);

    const loginResponse = await request(app)
      .post('/apiAUTH/user/login')
      .send({
        email: userData.email,
        password: userData.password
      });

    authToken = loginResponse.body.token;
    testUser = loginResponse.body.user;
  });

  describe('Complete User Workflow', () => {
    it('should complete full user journey', async () => {
      // 1. User browses medicines
      const medicinesResponse = await request(app)
        .post('/api/MEDPage/all')
        .expect(200);

      expect(medicinesResponse.body.success).toBe(true);
      expect(medicinesResponse.body.medicines.length).toBeGreaterThan(0);

      testMedicine = medicinesResponse.body.medicines[0];

      // 2. User views medicine details
      const medicineResponse = await request(app)
        .get(`/api/MEDPage/${testMedicine._id}`)
        .expect(200);

      expect(medicineResponse.body.success).toBe(true);
      expect(medicineResponse.body.medicine._id).toBe(testMedicine._id);

      // 3. User adds medicine to cart
      const addToCartResponse = await request(app)
        .post('/api/shopping-cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          userId: testUser.id,
          medicineId: testMedicine._id,
          quantity: 2
        })
        .expect(200);

      expect(addToCartResponse.body.success).toBe(true);

      // 4. User views cart
      const cartResponse = await request(app)
        .get(`/api/shopping-cart/list/${testUser.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(cartResponse.body.success).toBe(true);
      expect(cartResponse.body.items).toHaveLength(1);

      // 5. User requests quote
      const quoteResponse = await request(app)
        .post('/api/quote-request/request')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          userId: testUser.id,
          medicineId: testMedicine._id,
          quantity: 10
        })
        .expect(200);

      expect(quoteResponse.body.success).toBe(true);

      // 6. User logs activity
      const activityResponse = await request(app)
        .post('/api/user-activity/log')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          userId: testUser.id,
          type: 'add_to_cart',
          medicineId: testMedicine._id,
          quantity: 2
        })
        .expect(200);

      expect(activityResponse.body.success).toBe(true);
    });
  });
});
```

## Performance Tests

### Load Testing (tests/performance/load.test.js)
```javascript
const request = require('supertest');
const app = require('../../index');

describe('Performance Tests', () => {
  describe('Medicine API Performance', () => {
    it('should handle concurrent requests efficiently', async () => {
      const concurrentRequests = 50;
      const startTime = Date.now();

      const promises = Array.from({ length: concurrentRequests }, () =>
        request(app)
          .post('/api/MEDPage/all')
          .send({ page: 1, limit: 10 })
      );

      const responses = await Promise.all(promises);
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // All requests should succeed
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });

      // Average response time should be under 500ms
      const averageTime = totalTime / concurrentRequests;
      expect(averageTime).toBeLessThan(500);

      console.log(`Average response time: ${averageTime}ms`);
    });

    it('should handle large datasets efficiently', async () => {
      const startTime = Date.now();

      const response = await request(app)
        .post('/api/MEDPage/all')
        .send({ page: 1, limit: 100 })
        .expect(200);

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(response.body.success).toBe(true);
      expect(responseTime).toBeLessThan(1000); // Under 1 second

      console.log(`Large dataset response time: ${responseTime}ms`);
    });
  });
});
```

## Security Tests

### Security Testing (tests/security/security.test.js)
```javascript
const request = require('supertest');
const app = require('../../index');

describe('Security Tests', () => {
  describe('Authentication Security', () => {
    it('should reject requests without authentication', async () => {
      const response = await request(app)
        .get('/api/shopping-cart/list/123')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should reject invalid JWT tokens', async () => {
      const response = await request(app)
        .get('/api/shopping-cart/list/123')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should prevent SQL injection attempts', async () => {
      const maliciousId = "'; DROP TABLE users; --";
      
      const response = await request(app)
        .get(`/api/MEDPage/${maliciousId}`)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      const requests = Array.from({ length: 150 }, () =>
        request(app)
          .post('/api/MEDPage/all')
          .send({ page: 1, limit: 10 })
      );

      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status === 429);

      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });
});
```

## Test Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "test:performance": "jest tests/performance",
    "test:security": "jest tests/security",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test types
npm run test:unit
npm run test:integration
npm run test:performance
npm run test:security

# Run in CI environment
npm run test:ci
```

## Continuous Integration

### GitHub Actions (.github/workflows/test.yml)
```yaml
name: API Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - run: npm ci
    
    - run: npm run test:ci
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

## Test Data Management

### Test Data Factories (tests/factories/index.js)
```javascript
const { faker } = require('@faker-js/faker');

const createUserData = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: 'SecurePass123!',
  phone: faker.phone.number(),
  address: faker.location.streetAddress()
});

const createCompanyData = () => ({
  name: faker.company.name(),
  email: faker.internet.email(),
  password: 'SecurePass123!',
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
  license: faker.string.alphanumeric(8).toUpperCase(),
  type: faker.helpers.arrayElement(['Hospital', 'Pharmacy', 'Clinic'])
});

const createMedicineData = () => ({
  name: faker.commerce.productName(),
  category: faker.helpers.arrayElement(['Antibiotics', 'Pain Relief', 'Cardiovascular']),
  price: faker.number.float({ min: 5, max: 100, precision: 0.01 }),
  stock: faker.helpers.arrayElement(['In Stock', 'Low Stock', 'Out of Stock']),
  description: faker.lorem.sentence(),
  longDescription: faker.lorem.paragraph(),
  image: '💊',
  manufacturer: faker.company.name(),
  dosage: '1 tablet daily',
  expiryDate: faker.date.future(),
  sideEffects: faker.helpers.arrayElements(['Nausea', 'Dizziness', 'Headache'], { min: 1, max: 3 }),
  contraindications: faker.helpers.arrayElements(['Pregnancy', 'Liver disease'], { min: 1, max: 2 }),
  minimumOrder: faker.number.int({ min: 1, max: 50 }),
  maxOrder: faker.number.int({ min: 1000, max: 10000 }),
  deliveryTime: `${faker.number.int({ min: 1, max: 5 })}-${faker.number.int({ min: 3, max: 7 })} business days`,
  certifications: faker.helpers.arrayElements(['FDA Approved', 'GMP Certified', 'ISO 9001'], { min: 1, max: 3 }),
  rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
  reviewCount: faker.number.int({ min: 0, max: 1000 })
});

module.exports = {
  createUserData,
  createCompanyData,
  createMedicineData
};
```

## Best Practices

### Test Organization
1. **Group related tests** using describe blocks
2. **Use descriptive test names** that explain the expected behavior
3. **Follow AAA pattern**: Arrange, Act, Assert
4. **Keep tests independent** and isolated
5. **Use setup and teardown** for common operations

### Test Data
1. **Use factories** for creating test data
2. **Clean up after tests** to prevent interference
3. **Use realistic data** that matches production scenarios
4. **Avoid hardcoded values** in tests

### Performance
1. **Mock external services** to avoid network calls
2. **Use in-memory databases** for faster tests
3. **Run tests in parallel** when possible
4. **Monitor test execution time**

### Coverage
1. **Aim for 80%+ coverage** across all metrics
2. **Focus on critical paths** and edge cases
3. **Test error conditions** and failure scenarios
4. **Include integration tests** for end-to-end workflows 