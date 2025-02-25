import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set('debug', true);  // For debugging

export const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        console.log("MongoDB URI:", process.env.MONGO_URI?.replace(/:[^:]*@/, ':****@'));
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log('MongoDB Connected:', conn.connection.host);
        console.log('Database:', conn.connection.name);
        console.log('Connection State:', conn.connection.readyState);
        
        // Test the connection
        await mongoose.connection.db.admin().ping();
        console.log('Database ping successful');
        
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        return conn;
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        console.error('Error Stack:', error.stack);
        process.exit(1);
    }
};
