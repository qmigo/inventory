const notFoundMiddleware = (req, res)=>{
    res.status(404).send('Path not found')
}

module.exports = notFoundMiddleware