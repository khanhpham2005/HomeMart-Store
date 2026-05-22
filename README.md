# HomeMart

HomeMart is a web application for home appliances and household products, designed to provide a simple, modern, and convenient shopping experience for customers.


## Tech Stack

- Frontend: React, Vite, TailwindCSS, Axios, React Router
- Backend: Node.js, Express.js
- Database: MySQL 

## Project Structure

```text
HomeMart/
  backend/
    database/
      schema.sql
      seed.sql
    src/
      config/
      controllers/
      middleware/
      routes/
      utils/
  frontend/
    src/
      api/
      components/
      pages/
      styles/
```

## Features

- Product list, product detail, add, edit, and delete products
- Search by product name
- Filter by category
- Sort by price ascending or descending
- Shopping cart with add, remove, quantity update, and total calculation
- Register, login, and logout with JWT saved in `localStorage`
- Responsive portfolio-friendly UI with navbar, product cards, and sidebar filters
- Express REST API organized by controllers and routes

Product categories are limited to:

- Kitchen
- Laundry
- Home Comfort

Default admin account after running `seed.sql`:

- Email: `admin@gmail.com`
- Password: `123456`
- Role: `admin`

## Database Setup

Use this section only for local development without Docker.

1. Open MySQL and run the schema:

```bash
mysql -u root -p < backend/database/schema.sql
```

2. Add sample categories and products:

```bash
mysql -u root -p < backend/database/seed.sql
```

The database name is `homemart`.

## Docker Setup

Docker runs the full app with three services:

- `frontend` - React and Vite on `http://localhost:5173`
- `backend` - Express API on `http://localhost:5000`
- `mysql` - MySQL 8.0 on `localhost:3307`

Start everything:

```bash
docker compose up --build
```

The MySQL container automatically creates the `homemart` database and runs:

- `backend/database/schema.sql`
- `backend/database/seed.sql`

This automatic SQL setup only runs when the MySQL Docker volume is first created.

Stop the containers:

```bash
docker compose down
```

Stop the containers and reset the database volume:

```bash
docker compose down -v
```

After resetting the volume, run this again to recreate and reseed the database:

```bash
docker compose up --build
```

Default Docker database credentials:

- Host from backend container: `mysql`
- Host from your computer: `localhost`
- Port from backend container: `3306`
- Port from your computer: `3307`
- User: `root`
- Password: `homemart_password`
- Database: `homemart`

Default admin account:

- Email: `admin@gmail.com`
- Password: `123456`

You do not need local MySQL installed when using Docker.

## Backend Setup

Use this section only for local development without Docker.

1. Go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create an environment file:

```bash
copy .env.example .env
```

4. Update `.env` with your MySQL username and password.

Also set `JWT_SECRET` to any long random string for signing login tokens.

5. Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## Frontend Setup

Use this section only for local development without Docker.

1. Go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create an environment file:

```bash
copy .env.example .env
```

4. Start the React app:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173`.

## API Routes

### Auth

- `POST /api/auth/register` - create a user account
- `POST /api/auth/login` - login and receive a JWT token

Register body example:

```json
{
  "name": "Student User",
  "email": "student@example.com",
  "password": "password123"
}
```

Login body example:

```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

### Products

- `GET /api/products` - list products
- `GET /api/products/:id` - get one product
- `POST /api/products` - create product
- `PUT /api/products/:id` - update product
- `DELETE /api/products/:id` - delete product

Query parameters for product listing:

- `search=washer`
- `category=Kitchen`
- `sort=price_asc` or `sort=price_desc`

### Categories

- `GET /api/categories` - list categories

### Cart

- `GET /api/cart` - get cart items and total
- `POST /api/cart` - add product to cart
- `PUT /api/cart/:id` - update cart item quantity
- `DELETE /api/cart/:id` - remove cart item

## Learning Notes

- Backend controllers use `async/await` and a shared async error wrapper.
- Routes are separated from controller logic to keep the API easy to read.
- Frontend API calls are grouped in `src/api` so components do not repeat Axios setup.
- Reusable UI pieces live in `src/components`, while full screens live in `src/pages`.
