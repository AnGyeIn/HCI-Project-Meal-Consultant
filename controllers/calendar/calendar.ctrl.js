const fs = require('fs')

exports.get_monthly = (_, res) => {
    res.render('calendar/monthly.html')
}

exports.get_photo = (req, res) => {
    res.render('calendar/photo.html', req.params)
}

exports.post_photo = (req, res) => {
    const filepath = req.file.path
    const meal_name = req.params.meal_name

    let meal_record
    try {
        meal_record = JSON.parse(fs.readFileSync('database/meal_record.json', 'utf-8'))
    } catch (error) {
        meal_record = {}
    }

    meal_record[meal_name]['imgsrc'] = filepath

    fs.writeFileSync('database/meal_record.json', JSON.stringify(meal_record), 'utf-8')

    res.render('calendar/photo.html', req.params)
}