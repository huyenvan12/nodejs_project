const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const mongooseDelete = require('mongoose-delete');

const NewsSchema = new Schema(
    {
        //_id: { type: Number, },
        from: { type: String, default: 'Stranger', required: true },
        title: {
            type: String,
            default: 'New Updates from A Stranger.',
            required: true,
        },
        description: { type: String, required: true },
        image: {
            type: String,
            default: 'https://i.ibb.co/hyTmN5d/default.jpg',
        },
        full_des: { type: String, required: false },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        _id: true,
        timestamps: true,
    },
);

//Custom query helpers
NewsSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            // use sort function of Mongoose
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

// Add plugins
mongoose.plugin(slug);
NewsSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
// NewsSchema.plugin(AutoIncrement);
module.exports = mongoose.model('News', NewsSchema);
