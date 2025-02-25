import express from "express";
import { connectDB } from "./config/bd.js";
import products_routes from "./routes/products_routes.js";
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
console.log('Starting server...');
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();
const PORT = 5001;
console.log('Server will run on PORT:', PORT);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// CORS configuration
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// API routes with error handling
app.use("/api/products", (req, res, next) => {
    console.log('MongoDB State:', mongoose.connection.readyState);
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({
            success: false,
            message: 'Database not connected'
        });
    }
    next();
}, products_routes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// Start server only after MongoDB connects
const startServer = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await connectDB();
        console.log('MongoDB connected successfully');
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
            console.log('Available endpoints:');
            console.log(`  Frontend: http://localhost:${PORT}`);
            console.log(`  API: http://localhost:${PORT}/api/products`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer().catch(console.error);

// Error handlers
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});





