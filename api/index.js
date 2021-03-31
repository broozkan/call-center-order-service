const express = require('express');
require('dotenv').config();

const app = express();


const officeRouter = require('./Routes/RouteOffice')
const employeeRouter = require('./Routes/RouteEmployee')
const customerRouter = require('./Routes/RouteCustomer')
const productRouter = require('./Routes/RouteProduct')
const orderRouter = require('./Routes/RouteOrder')
const reservationRouter = require('./Routes/RouteReservation')
const messageRouter = require('./Routes/RouteMessage')
const userRouter = require('./Routes/RouteUser')
const chatRouter = require('./Routes/RouteChat')
const categoryRouter = require('./Routes/RouteCategory')
const fileRouter = require('./Routes/RouteFile')
const paymentMethodRouter = require('./Routes/RoutePaymentMethod')

const cors = require('cors');

const mongoose = require('mongoose')
const bodyParser = require('body-parser');



/* connect to db */
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("Connected to db");
})
/* connect to db */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors middleware
app.use(cors());


app.use(express.static('/public'));

/* middlewares */
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})



/* routers */
app.use('/callcenter_backend/offices', officeRouter);
app.use('/callcenter_backend/employees', employeeRouter);
app.use('/callcenter_backend/customers', customerRouter);
app.use('/callcenter_backend/products', productRouter);
app.use('/callcenter_backend/orders', orderRouter);
app.use('/callcenter_backend/reservations', reservationRouter);
app.use('/callcenter_backend/users', userRouter);
app.use('/callcenter_backend/messages', messageRouter);
app.use('/callcenter_backend/chats', chatRouter);
app.use('/callcenter_backend/categories', categoryRouter);
app.use('/callcenter_backend/files', fileRouter);
app.use('/callcenter_backend/payment-methods', paymentMethodRouter);






//comment
app.listen(process.env.PORT || 8000)