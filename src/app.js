const express = require('express')
const connectDB = require('./db/index.js')
const {config} = require('dotenv')
const app = express();

config({path : "./.env"})

const port = process.env.PORT || 4000

connectDB(process.env.MONGO_URI);

app.use(express.json())


app.get("/", (req, res) => {
    res.send("API is working");
});

app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});
