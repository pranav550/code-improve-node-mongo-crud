var blogMiddleware = (req, res, next) => {
    if (req.url == '/blogger') {
        res.send('Invalid Url')
    } else {
        next()
    }
}

var postMiddleware = (req, res, next) => {
    console.log(req.query)
    if (req.url == '/posted') {
        res.send('Invalid Url')
    } else if (req.query.id == 1) {
        res.send('Invalid Url')
    } else {
        next()
    }
}
//router.use(postMiddleware)

module.exports = {
    blogMiddleware,
    postMiddleware
}