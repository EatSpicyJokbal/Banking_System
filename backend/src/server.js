import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        app.on('error', (error) => {
            console.log("Server error: ", error)
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        });
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

startServer();