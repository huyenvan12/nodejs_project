const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname, "public")))

// app.use(morgan('combined'))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//template engine
app.engine('hbs', hbs.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/resources/views')

//Local host --- Hosting

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/search', (req, res) => {
    res.render('search');
})
app.post('/search', (req, res) => {
    console.log(req.body);
    res.send(' ');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})