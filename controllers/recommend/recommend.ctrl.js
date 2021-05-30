const fs = require('fs')

exports.get_list = (_, res) => {
    res.render('recommend/list.html')
}

exports.post_list = (req, res) => {
    //
    console.log(req.body)
    
    res.redirect('recipe/' + req.body.opt + '/' + req.body.meal_name)
}

exports.get_recipe = (req, res) => {
    res.render('recommend/recipe.html', req.params)
}