import mongoose from 'mongoose';
// setup a connection to MongoDB
import dotenv from 'dotenv'

dotenv.config()

// connect to MongoDB
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
