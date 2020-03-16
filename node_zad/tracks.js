const express = require('express');
const fsPromises = require('fs').promises;
const router = express.Router();

const dir = __dirname+'/zadatak.json';

router.get('/', async (req,res)=>{
    try{
    let data = await fsPromises.readFile(dir);
    let tracks = JSON.parse(data);
    res.send(tracks.tracks.data)
    }catch(e){
        console.log(e);
        res.send({error:'Unable to fetch tracks'})
    }
    });

router.get('/sorted', async (req,res)=>{
    let sortBy = req.query.sortBy
    if(sortBy && (sortBy==='duration' || sortBy==='name')){
        try{
            let data = await fsPromises.readFile(dir);
            let tracks = JSON.parse(data);
            let tracksArray = tracks.tracks.data;
            if(req.query.sortBy==='duration'){
                tracksArray.sort((a,b)=> a.duration-b.duration
                )}
            else{
                tracksArray.sort((a,b)=>{
                    if(a.title.toLowerCase() > b.title.toLowerCase() ) return 1;
                    else return -1
                })
            }
            res.send(tracksArray)
        }catch (e) {
            console.log(e);
            res.send({error:'Unable to fetch tracks'})
        }
    }
    else res.send({error:'Please select sorting method'})
});

router.get('/:id', async (req, res)=>{
    const id = Number(req.params.id);
    try{
    let data = await fsPromises.readFile(dir);
    let tracks = JSON.parse(data);
    let track = tracks.tracks.data.find(track =>track.id===id)
        res.send(track)
    } catch (e) {
            console.log(e);
            res.send({error:'Unable to fetch track'})
        }
    });



module.exports = router;