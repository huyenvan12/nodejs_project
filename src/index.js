const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');

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
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/css/app.css')));
app.use(express.static('src/public/css'));
app.use(express.static('src/public'));
// console.log(__dirname)

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', './src/resources/views');

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//Route init
route(app);
