const {Router} = require('express')
const router = Router()
const ctrl = require('./recommend.ctrl')

router.get('/list', ctrl.get_list)
router.post('/list', ctrl.post_list)

router.get('/recipe/:opt/:meal_name', ctrl.get_recipe)

module.exports = router