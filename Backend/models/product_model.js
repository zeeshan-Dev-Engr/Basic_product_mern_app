import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    image: {
        type: String,
        required: [true, 'Product image URL is required']
    }
}, {
    timestamps: true
});

// Add error handling for model compilation
let Product;
try {
    // Check if model already exists
    Product = mongoose.models.Product || mongoose.model('Product', productSchema);
} catch (error) {
    Product = mongoose.model('Product', productSchema);
}

export default Product;
