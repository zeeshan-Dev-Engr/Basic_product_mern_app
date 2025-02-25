import Product from "../models/product_model.js";
import mongoose from "mongoose";



const insert_products = async(req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
  
}

const get_products = async(req,res) => {
    try {
        const products = await Product.find({})
        res.status(201).json({success: true,message:"products founds",products})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const delete_products =  async(req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const update_products = async(req,res)=>{
    const {id}=req.params

    const productData  = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({success:false, message:"your id is invalid"})
    }
    try{
     const update_products = await Product.findByIdAndUpdate(id,productData ,{new:true})
     res.status(200).json({success:true,data:update_products})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}


export {insert_products,get_products,delete_products,update_products};
