<div align="center">
  <h1><img src="https://gocartshop.in/favicon.ico" width="20" height="20" alt="GoCart Favicon">
   GoCart</h1>
  <p>
    An open-source multi-vendor e-commerce platform built with Next.js, Prisma, and Tailwind CSS.
  </p>
  <p>
    <a href="https://github.com/GreatStackDev/goCart/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/GreatStackDev/goCart?style=for-the-badge" alt="License"></a>
    <a href="https://github.com/GreatStackDev/goCart/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome"></a>
    <a href="https://github.com/GreatStackDev/goCart/issues"><img src="https://img.shields.io/github/issues/GreatStackDev/goCart?style=for-the-badge" alt="GitHub issues"></a>
  </p>
</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🗂️ Architecture (MVC)](#-architecture-mvc)
- [🚀 Getting Started](#-getting-started)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## ✨ Features

### Customer Features
- User authentication via **Clerk**
- Browse multi-vendor stores and view products
- Add products to cart
- Place orders with **COD** or **Stripe** payments
- Apply **coupon codes** (with conditions for new users and members)
- Manage shipping addresses
- View order history and order status
- Rate products after delivery

### Vendor Features
- View and manage store orders
- Update order status (Confirmed, Shipped, Delivered)
- Manage store information

### Admin Features (Optional)
- Manage users, products, and coupons
- Monitor vendors and commissions

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL via Prisma ORM
- **Authentication:** Clerk
- **Payment Gateway:** Stripe
- **State Management:** Redux Toolkit
- **Notifications:** react-hot-toast
- **Icons:** Lucide React

---

## 🗂️ Architecture (MVC)

The project follows the **Model-View-Controller (MVC)** design pattern:

### 1. Model
- Represents the database structure and entities using **Prisma**.
- Examples:
  - `User`, `Order`, `Product`, `Rating`, `Coupon`, `Address`

### 2. View
- Frontend components built with **React + Next.js**.
- Examples:
  - Store shop page
  - Product cards
  - Order summary and rating modal

### 3. Controller
- Handles business logic and API requests via **Next.js API routes**.
- Examples:
  - `/api/orders` → Create and fetch orders
  - `/api/rating` → Add and fetch ratings
  - `/api/coupon` → Apply coupon logic

---

## 🚀 Getting Started

### Installation
Clone the repository:
```bash
git clone https://github.com/GreatStackDev/goCart.git
cd goCart
