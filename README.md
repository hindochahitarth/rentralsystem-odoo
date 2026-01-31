# Rental Management System (ERP)

A full-stack Rental Management System designed to handle the complete rental lifecycle — from quotation and reservation to invoicing, payments, pickup, return, and reporting.

This project is inspired by real-world rental ERP platforms (e.g., equipment & furniture rental systems) and demonstrates end-to-end ERP workflows with role-based access.

---

## ⚡ Setup & running the app

### Backend (Node + PostgreSQL)

1. **Install dependencies**
   ```bash
   cd backend && npm install
   ```

2. **Database (PostgreSQL)**  
   Create a PostgreSQL database (local or cloud). Then set the connection string in `backend/.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"
   ```

3. **Create database tables (Prisma)**  
   Tables are defined in `backend/prisma/schema.prisma`. To create/update them:
   ```bash
   cd backend
   npx prisma migrate dev
   ```
   - First run: creates the `User` table (and any other models) and a migration history table.
   - Use `npx prisma migrate dev --name your_migration_name` to add new migrations after changing the schema.
   - To sync schema without migration files (e.g. quick dev): `npx prisma db push`.

4. **Start the API**
   ```bash
   npm run dev
   ```
   API runs at `http://localhost:5000`. If signup/login fails with "Database is not available", check `DATABASE_URL` and that you ran `npx prisma migrate dev`.

### Frontend (React + Vite)

1. **Install and run**
   ```bash
   cd frontend && npm install && npm run dev
   ```
2. Open the URL shown (e.g. `http://localhost:5173`). You’ll see the **index (landing) page**; use **Sign up** or **Sign in** to create an account or log in.

---

## 🚀 Features Overview

### 🔐 Authentication & User Management
- Email & password login
- Customer signup with company details and GSTIN
- Role-based access: Admin, Vendor, Customer
- Forgot password flow
- Coupon support during signup (optional)

---

### 📦 Rental Product Management
- Mark products as rentable
- Flexible rental pricing (hour/day/week/custom)
- Quantity and availability tracking
- Product publish/unpublish on website
- Attributes & variants (e.g., size, color, brand)

---

### 🧾 Rental Quotation & Order Flow
- Customers create editable quotations
- Quotation → Rental Order on confirmation
- Reservation logic blocks inventory after confirmation
- Prevents double booking
- Order states: Draft → Sent → Confirmed

---

### 🚚 Pickup & Return Management
- Pickup document generated on order confirmation
- Inventory marked as “With Customer”
- Return processing restores stock
- Automatic late return fee calculation
- Notifications for upcoming and delayed returns

---

### 💳 Invoicing & Payments
- Invoices auto-generated from rental orders
- Supports:
  - Full payment
  - Partial payment / security deposit
- Automatic tax calculation
- Invoice download (PDF)
- Payment status:
  - Not Paid
  - Partially Paid
  - Paid

---

### 🌐 Website & Customer Portal
- Public website for browsing rental products
- Product detail page with rental configuration
- Cart and checkout flow
- Customer portal:
  - View rental orders
  - Download invoices
  - Track order status

---

### ⚙️ Settings & Configuration (Admin)
- Rental periods (hour/day/week)
- Product attributes & values
- Role management
- Company & GST configuration

---

### 📊 Reports & Dashboards
- Total rental revenue
- Most rented products
- Vendor-wise performance
- Order trends over time
- Date-range filters
- Exportable reports (CSV / PDF)

---

## 👥 User Roles

### Admin
- Full system access
- Manage users, products, settings, and reports

### Vendor
- Manage rental products
- Process pickup and returns
- View own orders and earnings

### Customer
- Browse and rent products
- Make payments
- View invoices and order history

---

## 🔄 Core Rental Lifecycle

