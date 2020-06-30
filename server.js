//headers importing express and mongoose modules, need to npm install
const express = require('express');
const mongoose = require('mongoose');
//header to require node path module
const path = require('path');

const items = require('./routes/api/items');

// creates express application using the imported module
const app = express();

//middle ware
app.use(express.json());

//DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

//Serve static assets if we are in production
//.static = Sets root directory from which to serve static assets
//.resolve = Resolves the specified paths into an absolute path
//__dirname tells you the absolute path of the directory containing the currently executing file
if(process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
    
}

// To tell your web server what port to listen on, so port is in the environment variable PORT, or 5000 if there's nothing there.
const port = process.env.PORT || 5000;

//app.listen() creates the Node.js web server at the specified host and port.
app.listen(port, () => console.log(`Server strated on port ${port}`));
