const News = require('../models/News');
const { multipleMongoosetoObject } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/ketch-ups
    storedKetchUps(req, res, next) {
        // News.countDocumentsWithDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(next);

        News.find({})
            .then((news) => {
                news = news.map((new_i) => new_i.toObject());
                res.render('me/stored-ketch-ups', { news });
            })
            .catch(next);
    }
    //[GET] /me/trashed/ketch-ups
    trashedKetchUps(req, res, next) {
        News.findWithDeleted({ deleted: true })
            .then((news) => {
                news = news.map((new_i) => new_i.toObject());
                res.render('me/trashed-ketch-ups', { news });
            })
            .catch(next);
    }
}

module.exports = new MeController();
