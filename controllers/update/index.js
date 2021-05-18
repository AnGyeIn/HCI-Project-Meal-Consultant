const {Router} = require('express')
const router = Router()
const ctrl = require('./update.ctrl')

router.get('/mealname', ctrl.get_mealname)
router.get('/ingredients', ctrl.get_ingredients)

module.exports = router