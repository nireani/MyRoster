const express = require('express')
const urllib = require('urllib')

const router = express()


const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
let players = []
 router.get('/teams/:teamName', function(req,res){
     
  urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json').then( (result)=>{
  const teamNum = teamToIDs[req.params.teamName.toLocaleLowerCase()]
  if(teamNum){
    const p =JSON.parse(result.data.toString())
    const pArr = p.league.standard
const newArr = pArr.map(pl=> {return {pos: pl.pos , jersey:pl.jersey,active :pl.isActive, fname:pl.firstName, lname:pl.lastName, teamId:pl.teamId}})
const teamArr = newArr.filter(tp=> tp.active&&tp.teamId==teamNum)
    players = teamArr

  }else{
players = "1"
}
      })

   res.send(players)
})

router.put('/team', function (req, res) {
    const obj= req.query
    teamToIDs[obj.teamName] = obj.teamId    
   
     
     res.send(teamToIDs)
 })

 let dreamTeam=[]
router.get('/dreamTeam', function (req, res) { 
     
     res.send(dreamTeam)
 })
router.post('/roster', function (req, res) { 
     let fname = req.query.fname
let lname = req.query.lname
let jersey = req.query.jersey
let pos = req.query.pos
let obj = {fname:fname,lname:lname,pos:pos,jersey:jersey}
if(dreamTeam.length<5){
    dreamTeam.push(obj)
}

     res.send(dreamTeam)
 })

module.exports = router