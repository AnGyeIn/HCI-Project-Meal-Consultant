const {Router} = require('express')
const router = Router()

router.use('/', require('./home'))
router.use('/add', require('./add'))
router.use('/recommend', require('./recommend'))
router.use('/update', require('./update'))
router.use('/calendar', require('./calendar'))

module.exports = router