const fs = require('fs')

exports.get_mealname = (_, res) => {
    res.render('update/mealname.html')
}

exports.post_mealname = (req, res) => {
    res.redirect('ingredients/' + req.body['meal_name'])
}

exports.get_ingredients = (req, res) => {
    res.render('update/ingredients.html', req.params)
}

exports.post_ingredients = (req, res) => {
    let meal_record, stocks
    try {
        meal_record = JSON.parse(fs.readFileSync('database/meal_record.json', 'utf-8'))
    } catch (error) {
        meal_record = {}
    }

    try {
        stocks = JSON.parse(fs.readFileSync('database/stocks.json', 'utf-8'))
    } catch (error) {}

    const {meal_name} = req.params
    const meal_info = meal_name in meal_record ? meal_record[meal_name] : {}
    meal_info.meal_date = req.body['meal_date']
    const people_num = Number(req.body['people_num'])

    const ingredients = []
    const max_idx = Number(req.body['max_idx'])
    for (let idx = 0; idx < max_idx; idx++) {
        if (!('name'+idx in req.body))
            continue
        
        const name = req.body['name'+idx]
        const count = Math.ceil(Number(req.body['count'+idx]) / people_num)

        ingredients.push({name, count})

        if (stocks && name in stocks) {
            const date_list = stocks[name].date_list
            date_list.sort((a, b) => a > b ? -1 : (a === b ? 0 : 1))
            stocks[name].date_list = date_list.slice(count, date_list.length)
        }
    }
    meal_info.ingredients = ingredients
    meal_record[meal_name] = meal_info

    fs.writeFileSync('database/meal_record.json', JSON.stringify(meal_record),'utf-8')
    fs.writeFileSync('database/stocks.json', JSON.stringify(stocks),'utf-8')

    res.redirect('/')
}