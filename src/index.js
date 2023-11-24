const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname, "public")))

app.use(morgan('combined'))

//template engine
app.engine('hbs', hbs.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/resources/views')

// console.log(path.join(__dirname, 'resources/views'))

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})