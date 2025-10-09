<div align="center">
  <h1><img src="https://gocartshop.in/favicon.ico" width="20" height="20" alt="GoCart Favicon">
   GoCart</h1>
</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🗂️ MVC Architecture](#-mvc-architecture)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## ✨ Features

- **Multi-Vendor Architecture:** Vendors can register, manage products, and sell on a single platform.
- **AI-Assisted Product Listing:** Automatically generates product name and description from images using OpenAI.
- **Customer-Facing Storefront:** Browse products, apply coupons, and place orders with multiple payment methods (COD & Stripe).
- **Vendor Dashboards:** Manage products, view sales analytics, track orders, and generate invoices.
- **Admin Panel:** Oversee vendors, products, orders, and commissions from a centralized dashboard.
- **Order Management:** Customers can view past orders, rate products, and track order status.
- **Coupon System:** Supports discounts for new users, members, or global campaigns.
- **Redux State Management:** Manages cart, ratings, and user interactions globally for smooth UX.
- **Responsive Design:** Fully responsive for mobile, tablet, and desktop users.

---

## 🗂️ MVC Architecture

GoCart follows the **Model-View-Controller (MVC)** pattern:

- **Model:** 
  - Managed using **Prisma ORM**.
  - Models include `User`, `Product`, `Order`, `Rating`, `Coupon`, and `Store`.
  - Handles database interactions for creating, reading, updating, and deleting records.

- **View:** 
  - Built with **Next.js** and **Tailwind CSS**.
  - Includes pages like storefront, cart, checkout, vendor dashboard, and admin panel.
  - UI components include product cards, rating modals, and order summaries.

- **Controller:** 
  - Implemented via **API routes** in Next.js (server actions) and Redux async thunks.
  - Handles business logic: placing orders, applying coupons, generating AI product info, and processing payments.
  - Includes integrations like **Stripe** for payment and **OpenAI** for AI-based product description.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, Lucide React icons  
- **Backend:** Next.js API Routes, Prisma ORM, PostgreSQL / MySQL  
- **Authentication:** Clerk  
- **State Management:** Redux Toolkit  
- **AI Integration:** OpenAI API for image-based product listing  
- **Payments:** Stripe  
- **Other:** Axios for HTTP requests, React Hot Toast for notifications

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
