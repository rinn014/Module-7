require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

//Import Routes
const inventoryRoutes = require("./routes/inventory.routes");
const transactionRoutes = require("./routes/transaction.routes");
const warehouseRoutes = require("./routes/warehouse.routes");

const app = express();

//Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

//Connect to Database
connectDB();

//Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/warehouses", warehouseRoutes);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));