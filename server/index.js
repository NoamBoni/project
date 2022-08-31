const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/reviews', reviewRouter);

dotenv.config({ path: '.env' });

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('connected to mongo'))
    .catch(err => console.log(err));

const port = process.env.PORT;
const url = process.env.SERVER_URL;

app.listen(port, url, () => {
    console.log(`listening on ${url}:${port}`);
});
