import mongoose from "mongoose";

type ConenctionObject = {
    isConnected?: number;
}

const connection: ConenctionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Using existing database connection");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string || '', {});
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

export default dbConnect;