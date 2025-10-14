# MediSupply API Deployment Guide

## Overview
This guide covers the deployment of the MediSupply API to production environments, including environment setup, configuration, monitoring, and maintenance.

## Prerequisites

### System Requirements
- **Node.js**: Version 18.0.0 or higher
- **MongoDB**: Version 5.0 or higher
- **RAM**: Minimum 2GB, Recommended 4GB
- **Storage**: Minimum 20GB SSD
- **CPU**: 2 cores minimum, 4 cores recommended

### Required Accounts
- **Cloud Provider**: AWS, Google Cloud, or Azure
- **Domain Registrar**: For custom domain
- **SSL Certificate**: Let's Encrypt or paid certificate
- **Monitoring Service**: Sentry, DataDog, or similar

## Environment Setup

### Production Environment Variables
Create a `.env` file in the API directory:

```env
# Server Configuration
NODE_ENV=production
PORT=3500

# Database Configuration
MONGODB_URI=mongodb://username:password@host:port/database
MONGODB_OPTIONS=retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=24h

# Security Configuration
CORS_ORIGIN=https://your-domain.com,https://www.your-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging Configuration
LOG_LEVEL=info
LOG_FILE_PATH=/var/log/medisupply/api.log

# Monitoring Configuration
SENTRY_DSN=your-sentry-dsn
DATADOG_API_KEY=your-datadog-api-key

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Processing (to be implemented)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# File Storage (for medicine images)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=medisupply-images
```

### Database Setup

#### MongoDB Atlas (Recommended)
1. Create MongoDB Atlas account
2. Create new cluster
3. Configure network access (IP whitelist)
4. Create database user
5. Get connection string

#### Local MongoDB
```bash
# Install MongoDB
sudo apt-get install mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
use MEDISupply
db.createUser({
  user: "medisupply_user",
  pwd: "secure_password",
  roles: ["readWrite"]
})
```

## Deployment Options

### Option 1: Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3500

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3500/health || exit 1

# Start application
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3500:3500"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/MEDISupply
    depends_on:
      - mongo
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secure_password
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

volumes:
  mongo_data:
```

#### Deployment Commands
```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

### Option 2: PM2 Deployment

#### PM2 Configuration (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'medisupply-api',
    script: 'index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3500
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
```

#### Deployment Commands
```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start ecosystem.config.js --env production

# Monitor application
pm2 monit

# View logs
pm2 logs medisupply-api

# Restart application
pm2 restart medisupply-api

# Stop application
pm2 stop medisupply-api
```

### Option 3: Cloud Platform Deployment

#### Heroku
```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login

# Create app
heroku create medisupply-api

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key

# Deploy
git push heroku main

# Open app
heroku open
```

#### AWS EC2
```bash
# Connect to EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Clone repository
git clone https://github.com/your-repo/medisupply-api.git
cd medisupply-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with production values

# Start with PM2
pm2 start ecosystem.config.js --env production
pm2 startup
pm2 save
```

## SSL/TLS Configuration

### Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d your-domain.com

# Configure Nginx
sudo nano /etc/nginx/sites-available/medisupply-api

# Nginx configuration
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/medisupply-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Monitoring and Logging

### Application Monitoring

#### Health Check Endpoint
Add to your API:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version
  });
});
```

#### Sentry Integration
```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

#### Logging Configuration
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'medisupply-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### Database Monitoring
```javascript
// MongoDB connection monitoring
mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
  Sentry.captureException(err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});
```

## Backup Strategy

### Database Backup
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --uri="mongodb://username:password@host:port/database" --out="$BACKUP_DIR/backup_$DATE"

# Compress backup
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C "$BACKUP_DIR" "backup_$DATE"

# Remove uncompressed backup
rm -rf "$BACKUP_DIR/backup_$DATE"

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete

echo "Backup completed: backup_$DATE.tar.gz"
```

### Application Backup
```bash
# Backup application files
tar -czf "/backups/app/app_backup_$(date +%Y%m%d_%H%M%S).tar.gz" /app

# Backup environment variables
cp /app/.env "/backups/env/env_backup_$(date +%Y%m%d_%H%M%S).env"
```

## Performance Optimization

### Database Optimization
```javascript
// Add indexes for better performance
MedicineSchema.index({ name: 'text', category: 'text' });
MedicineSchema.index({ price: 1 });
MedicineSchema.index({ stock: 1 });
MedicineSchema.index({ createdAt: -1 });

// Connection pooling
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

### Caching Strategy
```javascript
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL
});

// Cache medicine data
const cacheMedicine = async (id, data) => {
  await client.setEx(`medicine:${id}`, 3600, JSON.stringify(data));
};

const getCachedMedicine = async (id) => {
  const cached = await client.get(`medicine:${id}`);
  return cached ? JSON.parse(cached) : null;
};
```

## Security Hardening

### Security Headers
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

## Maintenance Procedures

### Regular Maintenance Tasks
```bash
# Weekly tasks
npm audit fix
pm2 restart medisupply-api
mongodump --uri="your-mongodb-uri" --out="/backups/weekly"

# Monthly tasks
npm update
system update
security audit
performance review

# Quarterly tasks
dependency audit
security penetration test
backup restoration test
```

### Update Procedures
```bash
# 1. Create backup
mongodump --uri="your-mongodb-uri" --out="/backups/pre-update"

# 2. Pull latest code
git pull origin main

# 3. Install dependencies
npm install

# 4. Run migrations (if any)
npm run migrate

# 5. Restart application
pm2 restart medisupply-api

# 6. Verify health
curl http://localhost:3500/health
```

## Troubleshooting

### Common Issues

#### High Memory Usage
```bash
# Check memory usage
pm2 monit
free -h

# Restart with more memory
pm2 restart medisupply-api --max-memory-restart 2G
```

#### Database Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongodb

# Check connection
mongo --eval "db.runCommand('ping')"

# Restart MongoDB
sudo systemctl restart mongodb
```

#### SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in /etc/letsencrypt/live/your-domain.com/cert.pem -text -noout

# Renew certificate
sudo certbot renew

# Test Nginx configuration
sudo nginx -t
```

## Support and Contacts

### Emergency Contacts
- **System Administrator**: admin@your-domain.com
- **Database Administrator**: dba@your-domain.com
- **Security Team**: security@your-domain.com

### Monitoring Dashboards
- **Application**: https://your-domain.com/health
- **Server**: https://your-monitoring-service.com
- **Database**: MongoDB Atlas dashboard

### Documentation
- **API Documentation**: https://your-domain.com/docs
- **System Architecture**: Internal wiki
- **Runbooks**: Internal documentation 