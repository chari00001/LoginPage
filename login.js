const path = require('path')

const express = require('express')
const helmet = require('helmet')

const app = express()
app.use(helmet())

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res, next) => {
    res.send('Sanity check')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})