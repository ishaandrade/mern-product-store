import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import path from "path";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname)

app.use(express.json()) 

app.use("/api/products", productRoutes)


if(process.env.NODE_ENV === "production") {
    console.log("NODE_ENV:", process.env.NODE_ENV)
    app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
        
    });
}


app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});

