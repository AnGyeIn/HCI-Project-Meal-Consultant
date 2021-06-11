const {Router} = require('express')
const router = Router()

router.get('/', (_, res) => {
    res.render('home.html')
})
router.post('/', (req, res) => {
    const ingredients = req.body['ingredients']
    const ingredientsStr = typeof ingredients === 'string' ? ingredients : ingredients.join('&') 
    res.redirect('/recommend/list/' + ingredientsStr)
})

module.exports = router