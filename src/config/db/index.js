const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ketchup_news_dev');
        console.log('Connect database successfully.');
    } catch (error) {
        console.log('Connect database fail.');
    }
}

module.exports = { connect };
