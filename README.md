# Rental Management System (ERP)

A full-stack Rental Management System designed to handle the complete rental lifecycle — from quotation and reservation to invoicing, payments, pickup, return, and reporting.

This project is inspired by real-world rental ERP platforms (e.g., equipment & furniture rental systems) and demonstrates end-to-end ERP workflows with role-based access.

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

