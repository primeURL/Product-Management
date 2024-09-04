const express = require('express')
const connectDB = require('./db/index.js')
const {config} = require('dotenv')
config({path : "./.env"})
const {errorMiddleWare,missingRouteMiddleWare} = require('./middlewares/index.js')
const morgan = require('morgan')
const userRoutes = require('./routes/user.js')
const productRoutes = require('./routes/products.js')
const app = express();

const port = process.env.PORT || 4000

app.use(express.json())
app.use(morgan('dev'))

// Test Route
app.get('/', (req, res) => {
    res.send('API is working');
});


// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/products', productRoutes);


// Middleware for handling errors when an error is passed to next(err) 
app.use(errorMiddleWare);

// Middlewar for handling mis-match route
app.use(missingRouteMiddleWare);

app.listen(port, async() => {
  await connectDB(process.env.MONGO_URI);
  console.log(`Express is working on http://localhost:${port}`);
});
