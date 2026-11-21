# Inventory Management System

A RESTful Inventory Management System built using **Node.js, Express.js, MongoDB and Mongoose**. This application provides APIs to manage products, monitor stock levels, search and filter inventory, and generate inventory summaries.

## Features

- **Product Management:** Create, retrieve, update and delete products.
- **Product Search:** Search products by name.
- **Category Filtering:** Filter products by category.
- **Price Filtering:** Find products within a specified price range.
- **Stock Management:** Increase or decrease product quantities.
- **Low Stock Detection:** Identify products that have reached or fallen below their reorder level.
- **Inventory Summary:** Calculate total products, total quantity and total inventory value.
- **Sorting:** Sort products by name, price, quantity or creation date.
- **Pagination:** Retrieve products in manageable pages.
- **Input Validation:** Validate product data using Mongoose.
- **Error Handling:** Handle invalid requests, duplicate SKUs and database errors.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modelling |
| dotenv | Environment variable management |
| Postman | API testing |

## Project Structure

```text
Inventory-Management-System/
│
├── config/
│   └── db.js
│
├── middleware/
│   └── errorHandler.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/manasaggarwal1107-ctrl/Inventory-Management-System.git
```

### 2. Navigate to the project directory

```bash
cd Inventory-Management-System
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your own MongoDB Atlas connection string.

**Important:** Never upload your `.env` file or database credentials to GitHub.

### 5. Start the application

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The server will run at:

`http://localhost:5000`

## API Endpoints

Base URL:

```text
http://localhost:5000/api/products
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Add a new product |
| GET | `/` | Retrieve all products |
| GET | `/low-stock` | Retrieve low-stock products |
| GET | `/summary` | Retrieve inventory summary |
| GET | `/:id` | Retrieve a product by ID |
| PUT | `/:id` | Update product details |
| DELETE | `/:id` | Delete a product |
| PATCH | `/:id/stock` | Update product stock |

## Example API Requests

### Create a Product

**POST** `/api/products`

```json
{
  "name": "Dell Laptop",
  "sku": "DELL-001",
  "category": "Electronics",
  "price": 45000,
  "quantity": 10,
  "reorderLevel": 5,
  "supplier": "Dell Technologies"
}
```

### Update Stock

**PATCH** `/api/products/:id/stock`

```json
{
  "change": 10
}
```

A positive value increases stock, while a negative value decreases stock.

### Search Products

```text
GET /api/products?search=Dell
```

### Filter by Category

```text
GET /api/products?category=Electronics
```

### Filter by Price

```text
GET /api/products?minPrice=10000&maxPrice=50000
```

### Sort Products

```text
GET /api/products?sort=price&order=desc
```

### Pagination

```text
GET /api/products?page=1&limit=5
```

### Retrieve Products in Stock

```text
GET /api/products?inStock=true
```

## Product Data Model

Each product contains the following fields:

| Field | Type | Description |
|---|---|---|
| name | String | Product name |
| sku | String | Unique product identifier |
| category | String | Product category |
| price | Number | Product price |
| quantity | Number | Available stock |
| reorderLevel | Number | Minimum stock threshold |
| supplier | String | Supplier name |
| createdAt | Date | Record creation timestamp |
| updatedAt | Date | Last update timestamp |
| stockValue | Number | Calculated value of stock |

## Testing

The API endpoints were tested using **Postman**.

Testing covered:
- Product creation and retrieval.
- Product updates and deletion.
- Stock adjustments.
- Search and filtering.
- Sorting and pagination.
- Low-stock detection.
- Inventory summary generation.
- Input validation and error handling.

## Author

**Manas Aggarwal**

B.Tech – Computer Science and Engineering (AI & ML)

## Repository

[Inventory Management System – GitHub](https://github.com/manasaggarwal1107-ctrl/Inventory-Management-System)

---

*Developed as part of the Web Development III practical assignment.*
