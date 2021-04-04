const express = require('express')
const urllib = require('urllib')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.listen(3001,function(){
    console.log("i am running");
})
const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
let players = []
 app.get('/teams/:teamName', function(req,res){
     
  urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json').then( (result)=>{
  const teamNum = teamToIDs[req.params.teamName.toLocaleLowerCase()]
  console.log(teamNum);
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

