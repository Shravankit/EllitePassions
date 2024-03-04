import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import color from "colors";
import connectDB from "./database/dbconn.js";
import authRoutes from './Routes/authRoutes.js';
import categoryRouter from "./Routes/categoryRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import cors from "cors";


//config dotenv
// if there is another path    dotenv.config("./path");
dotenv.config();

//express
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);

// rest api
app.get('/', (req, res) => {
    res.send({
        message: 'welcome',
    });
});

//port
const PORT = process.env.PORT || 3001;

//mongodb connection
connectDB();


app.listen(PORT, () => {
    console.log(`server is running on ${process.env.DEV_MODE} mode on port ${PORT}` .bgCyan.white);
});