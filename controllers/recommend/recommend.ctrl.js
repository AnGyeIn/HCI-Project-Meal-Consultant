const fs = require('fs')

exports.get_list = (req, res) => {
    //todo
    console.log(req.params)

    res.render('recommend/list.html', req.params)
}
exports.post_list = (req, res) => {
    //todo
    console.log(req.body)

    let recommended
    try {
        recommended = JSON.parse(fs.readFileSync('database/recommended.json'), 'utf-8')
    } catch (error) {
        recommended = []
    }

    recommended = [req.body.meal_name, ...recommended.filter(e => e !== req.body.meal_name)]

    fs.writeFileSync('database/recommended.json', JSON.stringify(recommended), 'utf-8')
    
    res.redirect('/recommend/recipe/' + req.body.opt + '/' + req.body.meal_name)
}

exports.get_recipe = (req, res) => {
    res.render('recommend/recipe.html', req.params)
}