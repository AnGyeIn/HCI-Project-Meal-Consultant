const {Router} = require('express')
const router = Router()
const ctrl = require('./recommend.ctrl')

router.get('/list', ctrl.get_list)
router.get('/recipe', ctrl.get_recipe)

module.exports = router