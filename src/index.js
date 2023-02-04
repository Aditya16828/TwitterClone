const bodyParser = require('body-parser');
const express = require('express');
const connect = require('./config/database');

const apiroutes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/', apiroutes);

const PORT = 3000;

app.listen(PORT, async () => {
    console.log('Server started at ', PORT);
    await connect();
    console.log('MongoDB server connected');
});