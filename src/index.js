const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = 3000;
const path = require('path');
const db = require('./config/db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require('./routes');

//Connect DB
db.connect();

//Express Static
app.use(express.static('src/public/css'));
app.use(express.static('src/public/vendor'));
app.use(express.static('src/public'));

//Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);

//HTTP logger
// app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', './src/resources/views');

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//Route init
route(app);
