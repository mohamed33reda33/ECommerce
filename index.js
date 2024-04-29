const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const DBConnection = require("./config/database");
DBConnection();

const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddlewares");


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use(express.json());

const brandRoutes = require("./routes/brandRoutes");
app.use("/api/brands", brandRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categorys", categoryRoutes);

const subCategoryRoutes = require("./routes/subCategoryRoutes");
app.use("/api/subCategorys", subCategoryRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/carts", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

app.all('*', (req, res, next) => {

    next(new ApiError(`can't find this route ${req.originalUrl}`, 404));
});
app.use(globalError)

const PORT = process.env.PORT || 4444;
const server = app.listen(PORT, () => {
    console.log(`connected on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error(`unhandledRejection Error: ${err.name} | ${err.message}`);
    server.close(() => {
        console.log("server shutting down...");
        process.exit(1);
    })
})
