const {Router} = require('express')
const router = Router()
const ctrl = require('./calendar.ctrl')

router.get('/monthly', ctrl.get_monthly)
router.get('/photo', ctrl.get_photo)

module.exports = router