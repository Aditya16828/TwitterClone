const bodyParser = require('body-parser');
const express = require('express');
const connect = require('./config/database');

const {LikeService} = require('./services/index');
const {UserRepository} = require('./repository/index');

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

    // const userrepo = new UserRepository();
    // const user = await userrepo.create({
    //     userEmail: 'aditya@gmail.com',
    //     name: 'Aditya',
    //     password: '12345'
    // });

    // const likeservice = new LikeService();
    // await likeservice.toggleLike('63df8b7eadf9487c28577678', 'Tweet', '63df89a7074bb05c619ee280');
});