import express from "express";
import { connectDB } from "./config/bd.js";
import products_routes from "./routes/products_routes.js";
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5001;  // Force port 5001

app.use(express.json());
app.use(cors());

const __dirname = path.resolve();

app.use("/api/products", products_routes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}

// Connect to MongoDB first
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});





