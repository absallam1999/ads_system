# Ads API

This is a Node.js + TypeScript REST API for managing Ads and Admin users. It uses MySQL as the database and includes authentication, role-based access control, and file uploads.

---

## Table of Contents

- [Features](#features)  
- [Technologies](#technologies)  
- [Setup](#setup)  
- [Database Setup](#database-setup)  
- [Environment Variables](#environment-variables)  
- [Running the API](#running-the-api)  
- [API Endpoints](#api-endpoints)  

---

## Features

- Admin management (CRUD)
- Ads management (CRUD + image uploads)
- Authentication (login & forgot password)
- Role-based authorization
- Validation using Zod
- Database migrations and seeds

---

## Technologies

- Node.js (v20+)
- TypeScript
- Express.js
- MySQL
- Zod (validation)
- Multer (file uploads)
- bcryptjs (password hashing)
- dotenv (environment variables)
- db-migrate (database migrations)

---

## Setup

1. **Clone the repository**

```bash
git clone [https://github.com/absallam1999/ads_system.git](repo_URL)
cd ADS
```

2. **npm install**

```bash
cd ADS
npm install
```

3. **Create .env file in the project root:**

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ads_system
DB_PORT=3306
PORT=3000
```
Replace your_password with your MySQL password.

---

## Running the API

1. **Install Modules**
```bash
npm run build
```

2. **Run in development mode**
```bash
npm run dev
```

2. **Check API Console**
Now You should see: 
```bash 
Server running on port 3000
```

---

## API Endpoints

### Auth:
- POST /api/auth/login – Login admin
- POST /api/auth/forgot-password – Forgot password
Required Body (JSON):
<code>
{
  "email": "superadmin@example.com",
  "password": "SuperAdmin123",
}
</code>


### Admin:
- GET /api/admins – Get all admins
- GET /api/admins/:id – Get admin by ID
- POST /api/admins – Create new admin
- PUT /api/admins/:id – Update admin
- DELETE /api/admins/:id – Delete admin

Required Body (JSON) for Create / Update:
<code>
{
  "email": "admin@example.com",
  "role": "super_admin",
  "password": "Admin123"
}
</code>

### Ads:
- GET /api/ads – Get all ads
- GET /api/ads/:id – Get ad by ID
- POST /api/ads – Create ad (requires image upload):
- PUT /api/ads/:id – Update ad (optional image upload):
- DELETE /api/ads/:id – Delete ad

Required Body (JSON / FormData for file upload):
<code>
{
  "image": "<binary file>",
  "title": "Ad Title",
  "description": "Optional description",
  "link": "https://example.com",
  "template": "template_name"
}
</code>

---


## Created By: [Absallam](https://github.com/absallam1999).
