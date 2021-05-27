const app = require('./app.js')
const port = 3000
const fs = require('fs')

app.listen(port, () => {
    const staticDirs = ['./uploadedImages', './database']
    for (const staticDir of staticDirs)
        if (!fs.existsSync(staticDir))
            fs.mkdirSync(staticDir)

    if (!fs.existsSync('./database/stocks.json'))
        fs.writeFileSync('./database/stocks.json', '')

    console.log('Express listening on port', port)
})