const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
    try {
        // Use environment variable if available, otherwise fall back to config
        const db = process.env.MONGODB_URI || config.get("mongoURI");
        
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected...")
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
