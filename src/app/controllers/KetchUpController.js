const News = require('../models/News');
const { mongooseToObject } = require('../../util/mongoose');
const urlencodedParser = require('../../index').urlencodedParser;

class KetchUpController {
    //[GET] /ketch-ups/:slug
    show(req, res, next) {
        News.findOne({ slug: req.params.slug })
            .then((news) => {
                res.render('ketchups/show', { news: mongooseToObject(news) });
            })
            .catch(next);
    }

    //[GET] /ketch-ups/create
    create(req, res, next) {
        res.render('ketchups/create');
    }
    //[POST] /ketch-ups/store
    store(req, res, next) {
        // console.log(req.body)
        // res.json(req.body);

        const news = new News(req.body);
        news.save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }

    //[GET] /ketch-ups/:id/edit
    edit(req, res, next) {
        // const formData = req.body;
        // const news = new News(formData);
        News.findById(req.params.id)
            .then((news) => {
                res.render('ketchups/edit', { news: mongooseToObject(news) });
            })
            .catch(next);
    }

    //[PUT] /ketch-ups/:id
    update(req, res, next) {
        News.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/ketch-ups'))
            .catch(next);
    }

    //[DELETE] /ketch-ups/:id/permanent
    destroy(req, res, next) {
        News.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /ketch-ups/:id
    softErase(req, res, next) {
        News.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /ketch-ups/:id/restore
    restore(req, res, next) {
        News.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /ketch-ups/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                News.delete({ _id: { $in: req.body.newsIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Invalid' });
        }
        // res.json(req.body);
    }
}

module.exports = new KetchUpController();
