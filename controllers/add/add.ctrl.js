const {PredictionServiceClient} = require('@google-cloud/automl').v1
const fs = require('fs')
const util = require('util')

exports.get_selection = (_, res) => {
    res.render('add/selection.html')
}

exports.get_by_text = (_, res) => {
    res.render('add/by_text.html')
}

exports.post_by_text = (req, res) => {
    let stocks
    try {
        stocks = JSON.parse(fs.readFileSync('database/stocks.json', 'utf-8'))
    } catch (error) {
        stocks = {}
    }

    const max_idx = Number(req.body['max_idx'])
    for (let idx = 0; idx < max_idx; idx++) {
        if (!('name'+idx in req.body))
            continue
        
        const name = req.body['name'+idx]
        if (!(name in stocks))
            stocks[name] = {
                limit_duration: 30, // todo
                date_list: []
            }
            
        for (let i = 0; i < req.body['count'+idx]; i++)
            stocks[name].date_list.push(new Date(req.body['bought_date'+idx]))
    }

    fs.writeFileSync('database/stocks.json', JSON.stringify(stocks),'utf-8')

    res.redirect('/')
}

exports.get_image_upload = (_, res) => {
    res.render('add/by_image/upload.html')
}

exports.post_image_upload = async (req, res) => {
    const filepath = req.file.path
    
    let content
    if (filepath)
        content = fs.readFileSync(filepath)

    const client = new PredictionServiceClient({
        projectId: process.env.PROJECT_ID,
        keyFilename: process.env.KEY_FILENAME
    })
    
    const MLrequest = {
        name: client.modelPath(process.env.PROJECT_ID,
                               process.env.LOCATION,
                               process.env.MODEL_ID),
        payload: {
            image: {
                imageBytes: content
            }
        }
    }

    try {
        const [MLresponse] = await client.predict(MLrequest)
        fs.writeFileSync('database/MLresponse.json', JSON.stringify(MLresponse), 'utf-8')
    } catch (error) {
        console.log(error)
    }

    res.redirect('od_check/' + filepath)
}

exports.get_image_od_check = (req, res) => {
    res.render('add/by_image/od_check.html', req.params)
}

exports.post_image_od_check = (req, res) => {
    let stocks
    const {filedir, filename} = req.params
    const src = filedir + '/' + filename
    
    try {
        stocks = JSON.parse(fs.readFileSync('database/stocks.json', 'utf-8'))
    } catch (error) {
        stocks = {}
    }

    const max_idx = Number(req.body['max_idx'])
    for (let idx = 0; idx < max_idx; idx++) {
        if (!('name'+idx in req.body))
            continue
        
        const name = req.body['name'+idx]
        if (!(name in stocks))
            stocks[name] = {
                limit_duration: 30, // todo
                date_list: []
            }
            
        for (let i = 0; i < req.body['count'+idx]; i++)
            stocks[name].date_list.push(new Date(req.body['bought_date'+idx]))
        
        const detectionBox = JSON.parse(req.body['detection_boxes'])
                            .filter(d => d.id === idx)[0].coord

        stocks[name].img = {
            src,
            detectionBox
        }
    }

    fs.writeFileSync('database/stocks.json', JSON.stringify(stocks), 'utf-8')

    res.redirect('/')
}
