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

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Custom middleware
app.use(SortMiddleware);

// HTTP logger
// app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = sort.column === field ? sort.type : 'default';

                const icons = {
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                    default: 'oi oi-elevator',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                        </a>`;
            },
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
