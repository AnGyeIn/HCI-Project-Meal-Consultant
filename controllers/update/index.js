const {Router} = require('express')
const router = Router()
const ctrl = require('./update.ctrl')

router.get('/mealname', ctrl.get_mealname)
router.post('/mealname', ctrl.post_mealname)

router.get('/ingredients/:meal_name', ctrl.get_ingredients)
router.post('/ingredients/:meal_name', ctrl.post_ingredients)

module.exports = router