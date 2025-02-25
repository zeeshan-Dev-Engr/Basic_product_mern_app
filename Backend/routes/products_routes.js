import express from "express";
import mongoose from "mongoose";
import {insert_products,get_products,delete_products,update_products} from "../controller/products_controller.js";
import Product from "../models/product_model.js";

const router = express.Router();

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

        const savedProduct = await newProduct.save();
        
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

router.get('/',get_products)
router.delete("/:id",delete_products)
router.put('/:id',update_products)

export default router;
