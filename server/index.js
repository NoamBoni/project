const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/reviews', reviewRouter);
app.use('/users', userRouter);

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
