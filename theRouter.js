const express = require('express')
let router = express.Router()

// router.use works the same that app.use does, but it's specific to THIS router
router.use

// instead of app.get(...), router.get(...) will be used

router.get('/', (req, res, next) => {
    res.json({
        msg: "Router works."
    })
})

/**
 * router.all
 * router.post
 * router.delete
 * router.put ...
 */

module.exports = router