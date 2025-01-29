const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger')

const app = express();
const port = 3000;

app.use(cors({
    origin:"*"
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => { console.log('Connection to MongoDB established')},
        err => { console.log('Failed to connect to MongoDB')}
    );

const user = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')
const customer = require('./routes/customer.route')

app.use('/users', user);

app.use('/auth', authRoutes);

app.use('/customer', customer);


app.use(
    '/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument.options)
)

app.listen(port, () => {
    console.log("Server is up and running!")
})

module.exports = app;