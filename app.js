const express = require('express')
const nunjucks = require('nunjucks')
const logger = require('morgan')

// environment variables
const dotenv = require('dotenv')
dotenv.config()

class App {
    constructor () {
        this.app = express()

        this.setViewEngine()

        this.setMiddleWare()

        this.setStatic()

        this.setLocals()

        this.getRouting()

        // 404 not found
        this.status404()
    }

    setMiddleWare () {
        this.app.use(logger('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    setStatic () {
        this.app.use('/test', express.static('test'))
        this.app.use('/uploadedImages', express.static('uploadedImages'))
        this.app.use('/database', express.static('database'))
    }

    setViewEngine () {
        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        })
    }

    setLocals() {
        this.app.use((req, res, next) => {
            // test
            // this.app.locals.stocks = JSON.stringify([
            //     {
            //         name: '감자',
            //         limit_duration: 20,
            //         bought_date: Date()
            //     },
            //     {
            //         name: '감자',
            //         limit_duration: 20,
            //         bougth_date: Date()
            //     },
            //     {
            //         name: '옥수수',
            //         limit_duration: 30,
            //         bougth_date: Date()
            //     }
            // ])
            next()
        })
    }

    getRouting () {
        this.app.use(require('./controllers'))
    }

    status404() {        
        this.app.use((req,res, _) => {
            res.status(404).render('common/404.html')
        })
    }
}

module.exports = new App().app