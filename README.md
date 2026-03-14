# Retail Inventory Portal

## Problem Statement

Build a full-stack **Retail Inventory Portal** that allows users to browse products by category (similar to fast-food ordering interfaces like burgers, drinks, sides, etc.) and allows administrators to manage inventory, products, and categories.

The system must support:

* User authentication
* Product and category management
* Inventory stock updates
* Product discovery (search and pagination)
* Clean and responsive UI
* Secure API access

---

# Solution Overview

This project implements a **retail inventory system** where:

Users can:

* Sign up and log in
* Browse products by category
* Search products using fuzzy search
* View product listings with pagination

Admins can:

* Create products
* Create categories
* Update stock inventory

The system follows a **full-stack architecture using MERN technologies**.

---

# System Architecture

Frontend → Backend API → Database

Frontend
React / Next.js + Tailwind CSS

Backend
Node.js + Express.js

Database
MongoDB

Authentication
JWT Token

---

# Core Features

## User Features

* User Signup
* User Login
* Product browsing
* Category-based product listing
* Fuzzy search
* Pagination
* Order history (optional)

## Admin Features

* Create product
* Create category
* Update stock
* Manage inventory

---

# Database Design

## Users Collection

Fields:

* name
* email
* password
* role (user/admin)
* createdAt

## Products Collection

Fields:

* title
* description
* price
* tax
* image
* categoryId
* stock
* createdAt

## Categories Collection

Fields:

* name
* logo
* description

## Stock History (Optional)

Fields:

* productId
* oldStock
* newStock
* updatedAt

---

# API Endpoints

## Authentication

Signup

POST /api/auth/signup

Description
Register a new user account.

Login

POST /api/auth/login

Description
Authenticate user credentials and return a JWT token.

---

## Product Management

Create Product (Admin)

POST /api/products

Description
Create a new product entry.

Update Stock

PUT /api/products/{id}/stock

Description
Update the stock quantity for a product.

---

## Category Management

Create Category (Admin)

POST /api/categories

Description
Create a new product category.

List Category Products

GET /api/categories/{id}/products

Description
List all products belonging to a category.

---

## Product Discovery

Search Products

GET /api/products/search?q=keyword

Description
Search products using fuzzy search by name or category.

Pagination

GET /api/products?page=1

Description
Return products with pagination support.

---

# Security Model

Role-Based Access Control

Roles:

* User
* Admin

Admin-only operations:

* Create products
* Create categories
* Update stock

---

JWT Authentication

After login, a JWT token is generated.

The token must be included in the Authorization header for protected routes.

Example:

Authorization: Bearer <token>

---

# Frontend Pages

/login
/signup
/home
/category/{id}
/product/{id}
/admin/dashboard

---

# UI Requirements

* Single Page Application (SPA)
* Responsive UI
* Lazy loading for images
* Fast loading homepage
* Category-based navigation
* Pagination for product lists
* Product combos / add-ons

---

# Team Responsibilities

Member 1 – Backend Development

* Authentication APIs
* Product APIs
* Category APIs
* Stock update APIs

Member 2 – Database Design

* MongoDB schemas
* Data relationships
* Stock history logic

Member 3 – Frontend Development

* Homepage UI
* Category product listing
* Login / Signup UI
* Product cards

Member 4 – Integration and Security

* API integration
* JWT authentication
* Protected routes
* Pagination and search

---

# Development Plan

Hour 1
Project setup and planning.

Hour 2
Backend API development.

Hour 3
Frontend UI development.

Hour 4
Frontend-backend integration.

Hour 5
Feature completion (search, pagination, admin panel).

Hour 6
Testing, bug fixing, and deployment.

---

# Testing

Postman is used to test all APIs.

Validation includes:

* Success responses
* Error handling
* HTTP status codes

Examples:

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 404 Not Found

---

# Deployment

Frontend
Vercel

Backend
Render / Node server

Database
MongoDB Atlas

---

# Deliverables

* Public GitHub repository
* README documentation
* Postman API collection
* Cloud deployed application
* Working frontend and backend system

---

# Future Improvements

* Shopping cart
* Payment integration
* Recommendation system
* Advanced analytics for inventory
* Real-time stock updates
