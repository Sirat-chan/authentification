const express = require('express');
const bodyParser = require('body-parser');


const actualiteRoutes = require('./routes/actualite-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

// app.use('/api/actualite', actualiteRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
    .connect(
        `mongodb+srv://siratbenjemaa:sirat123@cluster0.umk3yiq.mongodb.net/authentification?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true },

    )

    .then(() => {
        console.log("connected to database")
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
