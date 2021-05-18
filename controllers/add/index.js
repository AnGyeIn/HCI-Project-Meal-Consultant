const {Router} = require('express')
const router = Router()
const ctrl = require('./add.ctrl')

router.get('/selection', ctrl.get_selection)

router.get('/by_text', ctrl.get_by_text)

router.get('/by_image/upload', ctrl.get_image_upload)
router.get('/by_image/od_check', ctrl.get_image_od_check)
router.get('/by_image/od_correction_omitted', ctrl.get_image_od_correction_omitted)
router.get('/by_image/od_correction_wrong', ctrl.get_image_od_correction_wrong)

module.exports = router