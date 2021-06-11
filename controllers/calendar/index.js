const {Router} = require('express')
const router = Router()
const ctrl = require('./calendar.ctrl')
const fs = require('fs')
const multer = require('multer')

// space for images uploaded by users
if (!fs.existsSync('./uploadedImages'))
    fs.mkdirSync('./uploadedImages')
const upload = multer({dest: 'uploadedImages'})

router.get('/monthly', ctrl.get_monthly)

router.get('/photo/:meal_name', ctrl.get_photo)
router.post('/photo/:meal_name', upload.single('attachment'), ctrl.post_photo)

module.exports = router