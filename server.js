const app = require('./app.js')
const port = 3000
const fs = require('fs')

app.listen(port, () => {
    const staticDirs = ['./uploadedImages', './database']
    for (const staticDir of staticDirs)
        if (!fs.existsSync(staticDir))
            fs.mkdirSync(staticDir)

    const dataFiles = ['./database/stocks.json', './database/meal_record.json', './database/recommended.json']
    for (const dataFile of dataFiles)
        if (!fs.existsSync(dataFile))
            fs.writeFileSync(dataFile, '')

    console.log('Express listening on port', port)
})