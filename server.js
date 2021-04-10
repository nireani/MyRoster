const express = require('express')
const path = require('path')
const api = require('./server/router/api')
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/',api)

const port = 3001
app.listen(port,function(){
    console.log(`i am running on port ${port}`);
})
