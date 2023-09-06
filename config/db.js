import mongoose from "mongoose";

const conectMongodb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const url = `${conn.connection.host}:${conn.connection.port}`;
        console.log(`MongoDB Conectado en: ${url}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
        
    }
}

export default conectMongodb