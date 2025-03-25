import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

//import routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from './routes/productRoutes.js';
import orderItemsRoutes from './routes/orderItemsRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

//configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

console.log("server is running")


//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order-items",orderItemsRoutes);
app.use("/api/orders", orderRoutes);

//MONGO DB CONFIG
const PORT = process.env.PORT || 9000 //provide fallback in case first port fails
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`))
})
.catch((error) => console.log(`${error} DID NOT CONNECT`))

