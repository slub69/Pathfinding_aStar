const express = require('express')
const path = require('path')
const app = express()
var cors = require('cors')
const port = 3001

const { spawn } = require('node:child_process');

app.use(express.static('static'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get("/generate_map", (req,res) => {

    let width = req.query["width"]
    let length = req.query["length"]

    const run = spawn(path.resolve(`./cpp/main.exe`),[length,width])
    let returnData = ""
    
    run.stdout.on('data', (data)=>{
      returnData += Buffer.from(data).toString() 
    })

    run.on('close', ()=>{
      res.send(returnData)
    })
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})