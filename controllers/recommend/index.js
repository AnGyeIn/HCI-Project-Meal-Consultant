const {Router} = require('express')
const router = Router()
const ctrl = require('./recommend.ctrl')

router.get('/list/:ingredientsStr', ctrl.get_list)
router.post('/list/:ingredientsStr', ctrl.post_list)

router.get('/recipe/:opt/:meal_name', ctrl.get_recipe)

module.exports = router