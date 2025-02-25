import express from "express";
import mongoose from "mongoose";
import {insert_products,get_products,delete_products,update_products} from "../controller/products_controller.js";
import Product from "../models/product_model.js";

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        console.log("GET /api/products - Start");
        
        // Check MongoDB connection
        console.log("MongoDB readyState:", mongoose.connection.readyState);
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database not connected');
        }

        console.log("Attempting to fetch products...");
        const products = await Product.find({}).lean();
        console.log("Products found:", JSON.stringify(products, null, 2));
        
        return res.status(200).json({
            success: true,
            products: products || []
        });
    } catch (error) {
        console.error("Error in GET /api/products:", error);
        console.error("Error stack:", error.stack);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch products",
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Create product
router.post("/", async(req, res) => {
    try {
        const product = req.body;
        console.log("Received product data:", product);

        if (!product.name || !product.price || !product.imageUrl) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        const newProduct = new Product({
            name: product.name,
            price: Number(product.price),
            image: product.imageUrl
        });

        console.log("Attempting to save product:", newProduct);
        const savedProduct = await newProduct.save();
        console.log("Product saved successfully:", savedProduct);
        
        res.status(201).json({ 
            success: true, 
            message: "Product created successfully", 
            product: savedProduct 
        });
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Failed to create product" 
        });
    }
});

// Delete product
router.delete("/:id", async (req, res) => {
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
        console.error("Delete error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete product"
        });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
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
            product: product
        });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update product"
        });
    }
});

export default router;
