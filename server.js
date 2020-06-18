const express = require('express');
const mongoose = require('mongoose');

const app = express();

//middle ware
app.use(express.json());

const items = require('./routes/api/items');

//DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server strated on port ${port}`));
