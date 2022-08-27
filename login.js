const path = require('path')

const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res, next) => {
    res.send('Sanity check')
})

app.get('/login', (req, res, next) => {
    res.render('login')
})

app.post('/process_login', (req, res, next) => {
    /** req.body is made by urlencoded, which parses the http message for the sent data
    * check the database if the user credentials are valid
    * if they are valid:
    * - save their username in a cookie
    * - send them to the welcome page
    */

    const password = req.body.password
    const username = req.body.username

    if (password === "123") {
        /** res.cookie takes 2 args:
         * 1. name of the cookie
         * 2. value to set it to
         */
        res.cookie('username', username)
        /**
         * res.redirect takes 1 arg:
         * - Where to send the browser
         */
        res.redirect('/welcome')
    } else {
        res.redirect('/login?message=fail')
    }

    // res.send(req.body)
})

app.get('/welcome', (req, res, next) => {
    // req.cookies object will have a property for every named cookie that has been set.
    res.render('welcome', {
        username: req.cookies.username
    })
})

app.get('/logout', (req, res, next) => {
    /**
     * res.clearCookie takes 1 arg:
     * - Cookie to clear (by name) 
     */
    res.clearCookie('username')
    res.redirect('/login')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})