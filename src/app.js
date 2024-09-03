const express = require('express')
const connectDB = require('./db/index.js')
const {config} = require('dotenv')
const errorMiddleWare = require('./middlewares/error.js')
const userRoutes = require('./routes/user.js')
const productRoutes = require('./routes/products.js')
const app = express();

config({path : "./.env"})

const port = process.env.PORT || 4000

connectDB(process.env.MONGO_URI);

app.use(express.json())


app.get("/", (req, res) => {
    res.send("API is working");
});


// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);

// Middleware for handling errors
app.use(errorMiddleWare);

app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});
