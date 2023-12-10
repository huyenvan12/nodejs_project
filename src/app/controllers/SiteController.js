const News = require('../models/News');
const { multipleMongoosetoObject } = require('../../util/mongoose');

class SiteController {
    //[GET] /
    index(req, res, next) {
        News.find({})
            .then((news) => {
                news = news.map((new_i) => new_i.toObject());
                res.render('home', { news });
            })
            .catch(next);
    }
    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
