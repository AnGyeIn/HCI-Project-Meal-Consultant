const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

class App {
    constructor () {
        this.app = express()

        this.setViewEngine()

        this.setMiddleWare()

        this.getRouting()

        // 404 not found
        this.status404()

        this.errorHandler()
    }

    setMiddleWare (){
        this.app.use(logger('dev'))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    setViewEngine (){
        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        })
    }

    getRouting (){
        this.app.use(require('./controllers'))
    }

    status404() {        
        this.app.use( ( req , res, _ ) => {
            res.status(404).render('common/404.html')
        })
    }

    errorHandler() {
        if(process.env.NODE_ENV == 'production'){
            this.app.use( (err, req, res,  _ ) => {
                res.status(500).render('common/500.html')
            })
        }
    }
}

module.exports = new App().app