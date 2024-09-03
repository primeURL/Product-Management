const express = require('express')
const connectDB = require('./db/index.js')
const {config} = require('dotenv')
const userRoutes = require('./routes/user.js')
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
// app.use("/api/v1/product", productRoutes);

app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});
