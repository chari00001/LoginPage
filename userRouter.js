const express = require('express')
let router = express.Router()

function validateUser(req, res, next){
    res.locals.validated = true
    console.log('Validated')
    next();
}

/**
 * validateUser is middleware that will ONLY added to this router.
 * In other words, the main router desn't know about it
 */
router.use(validateUser)

router.get('/', (req, res, next) => {
    res.json({
        msg: "User router works."
    })
})

module.exports = router