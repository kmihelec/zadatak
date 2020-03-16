const express = require('express');
const tracks = require('./tracks.js')
const port = 3000;


const app = express();

app.use('/tracks', tracks)

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})