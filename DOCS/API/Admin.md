# 🛡️ Admin System Overview

## 1. Purpose
The admin system manages privileged users who can oversee, configure, and maintain the platform. Admins have access to special routes and data, such as user management, company management, and order oversight.

---

## 2. Admin Model Structure

Admins are stored in the database with the following schema (see `SaaS/API/Models/AdminModel.js`):

| Field       | Type    | Description                                 |
|-------------|---------|---------------------------------------------|
| name        | String  | Admin’s full name                           |
| email       | String  | Unique email address (used for login)       |
| password    | String  | Hashed password                             |
| phone       | String  | Contact phone number                        |
| address     | String  | Physical address                            |
| AdminCode   | String  | Unique code for admin identification        |
| isActive    | Boolean | Whether the admin account is active         |
| role        | String  | 'admin' or 'super_admin'                    |
| lastLogin   | Date    | Last login timestamp                        |
| createdAt   | Date    | Account creation timestamp                  |
| updatedAt   | Date    | Last update timestamp                       |

- **Indexes:**  
  - `email` (unique)  
  - `isActive`  
  - `role`

---

## 3. Roles and Permissions

- **admin:**  
  Standard admin privileges (manage users, view orders, etc.)
- **super_admin:**  
  Elevated privileges (can manage other admins, system-wide settings, etc.)

---

## 4. Admin Capabilities

Admins can:
- Log in to the admin dashboard
- View and manage users, companies, and orders
- Update their profile and password
- (If `super_admin`) manage other admins

---

## 5. API Routes

Typical admin-related routes include:
- `POST /api/admin/login` – Admin authentication
- `GET /api/admin/orders` – View all orders
- `GET /api/admin/users` – View/manage users
- `GET /api/admin/companies` – View/manage companies
- `POST /api/admin/create` – Create a new admin (super_admin only)
- `PATCH /api/admin/:id` – Update admin details

> **Note:** All admin routes should be protected by authentication and role-based authorization middleware.

---

## 6. Security Notes

- Passwords are stored hashed (never plain text).
- Email must be unique for each admin.
- Only `super_admin` can create or manage other admins.
- Always use HTTPS and secure your API keys and credentials.

---

## 7. Example Admin Document

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "password": "<hashed>",
  "phone": "123-456-7890",
  "address": "123 Main St",
  "AdminCode": "ADM001",
  "isActive": true,
  "role": "super_admin",
  "lastLogin": "2024-06-10T12:34:56.789Z",
  "createdAt": "2024-06-01T09:00:00.000Z",
  "updatedAt": "2024-06-10T12:34:56.789Z"
}
```
