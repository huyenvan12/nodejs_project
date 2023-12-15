const newsRouter = require('./news');
const calendarRouter = require('./calendar');
const siteRouter = require('./site');
const ketchupRouter = require('./ketch-ups');
const meRouter = require('./me');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/calendar', calendarRouter);
    app.use('/me', meRouter);
    app.use('/ketch-ups', ketchupRouter);
    app.use('/', siteRouter);
}

module.exports = route;
