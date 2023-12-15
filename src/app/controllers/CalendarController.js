const News = require('../models/News');

class CalendarController {
    //[GET] /calendar
    index(req, res, next) {
        News.find({})
            .then((news) => {
                news = news.map((new_i) => new_i.toObject());
                res.render('calendar/index', { news });
            })
            .catch(next);
    }
    //[GET] /calendar/:slug
    show(req, res) {
        res.send('CALENDAR DETAILS!!!');
    }
}

module.exports = new CalendarController();
