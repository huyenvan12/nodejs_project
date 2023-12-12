const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater');

const mongooseDelete = require('mongoose-delete');

const NewsSchema = new Schema(
    {
        from: { type: String, default: 'Stranger', required: true },
        title: {
            type: String,
            default: 'New Updates from A Stranger.',
            required: true,
        },
        description: { type: String, required: true },
        image: { type: String, required: true },
        full_des: { type: String, required: false },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        timestamps: true,
    },
);

//Custom query helpers
NewsSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

// Add plugins
mongoose.plugin(slug);
NewsSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('News', NewsSchema);
