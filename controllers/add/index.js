const {Router} = require('express')
const router = Router()
const ctrl = require('./add.ctrl')
const fs = require('fs')
const multer = require('multer')

// space for images uploaded by users
if (!fs.existsSync('./uploadedImages'))
    fs.mkdirSync('./uploadedImages')
const upload = multer({dest: 'uploadedImages'})

router.get('/selection', ctrl.get_selection)

router.get('/by_text', ctrl.get_by_text)
router.post('/by_text', ctrl.post_by_text)

router.get('/by_image/upload', ctrl.get_image_upload)
router.post('/by_image/upload', upload.single('attachment'), ctrl.post_image_upload)

router.get('/by_image/od_check/:filedir/:filename', ctrl.get_image_od_check)
router.post('/by_image/od_check/:filedir/:filename', ctrl.post_image_od_check)

module.exports = router