
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const {
            category,
            search,
            minPrice,
            maxPrice,
            inStock,
            sort = "createdAt",
            order = "desc",
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (inStock === "true") {
            filter.quantity = { $gt: 0 };
        }

        const pageNumber = Math.max(1, Number(page));
        const pageSize = Math.max(1, Math.min(100, Number(limit)));

        const sortFields = ["createdAt", "name", "price", "quantity"];
        const sortField = sortFields.includes(sort) ? sort : "createdAt";
        const sortOrder = order === "asc" ? 1 : -1;

        const products = await Product.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        const total = await Product.countDocuments(filter);

        res.json({
            success: true,
            total,
            page: pageNumber,
            pages: Math.ceil(total / pageSize),
            data: products
        });
    } catch (error) {
        next(error);
    }
});

router.get("/low-stock", async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: { $lte: ["$quantity", "$reorderLevel"] }
        });

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
});

router.get("/summary", async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            }
        ]);

        res.json({
            success: true,
            data: summary[0] || {
                totalProducts: 0,
                totalQuantity: 0,
                totalValue: 0
            }
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

router.patch("/:id/stock", async (req, res, next) => {
    try {
        const { change } = req.body;

        if (!Number.isInteger(change)) {
            return res.status(400).json({
                success: false,
                message: "Change must be an integer"
            });
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                quantity: { $gte: -change }
            },
            {
                $inc: { quantity: change }
            },
            {
                new: true
            }
        );

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found or insufficient stock"
            });
        }

        res.json({
            success: true,
            message: "Stock updated successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
