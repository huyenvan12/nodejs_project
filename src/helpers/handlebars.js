const Handlebars = require('handlebars');

module.exports = {
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

        const address = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        const output = `<a href="${address}">
                    <span class="${icon}"></span>
                </a>`;
        return new Handlebars.SafeString(output);
    },
};
