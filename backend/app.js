const express = require('express');
const app = express();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const errorController = require('./controller/error');

app.use(express.json());

const port = 3000

app.listen(port, () => { console.log('Server is listening on port ' + port) });

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/auth', authRoutes);

app.use('/post', postRoutes);

app.use('/', (req, res) => { console.log('in render'); res.json({ mess: './views/404.html' }).status(201) })

app.use(errorController.get404);

app.use(errorController.allErrors);