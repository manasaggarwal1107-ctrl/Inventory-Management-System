
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Inventory Management System API is running!"
    });
});

app.use("/api/products", productRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
