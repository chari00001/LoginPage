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

app.use((req, res, next) => {
    if(req.query.message === 'fail'){
        res.locals.message = `Sorry. This username and password combination does not exist`
    } else {
        res.locals.message = ``
    }
    next()
})

app.get('/login', (req, res, next) => {
    // the req object has a query property in Express
    // req.query is an object with a prop of every key in the query string
    // console.log(req.query);
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
        // the "? is a special character in a URL"
        res.redirect('/login?message=fail&test=hello')
    }

    // res.send(req.body)
})

app.get('/welcome', (req, res, next) => {
    // req.cookies object will have a property for every named cookie that has been set.
    res.render('welcome', {
        username: req.cookies.username
    })
})

/**
 * app.param takes 2 args:
 * 1. parameter to look for in the route
 * 2. the callback to run (with the usuals)
 */

app.param('id', (req, res, next, id) => {
    console.log("Params called:", id);
    // if id has something to do with stories...
    // if id has something to do with blogs...
    next()
})

/**
 *  In a route, anytime something has a : in front it is a wildcard.
 *  Wildcard will match anything in that slot
 */
app.get('/story/:id', (req, res, next) => {
    /**
     * the req.params object always exists
     * it will have a prop for each wildcard in the route
     */
    res.send(`<h1>Story ${req.params.storyId}</h1>`)
    // res.send('<h1>Story 1</h1>')
})

// THIS WILL NEVER RUN, because it matches above
// app.get('/story/:blogId/:link', (req, res, next) => {
//     /**
//      * the req.params object always exists
//      * it will have a prop for each wildcard in the route
//      */
//     res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`)
//     // res.send('<h1>Story 1</h1>')
// })

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