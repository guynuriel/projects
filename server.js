const express = require("express")
const app = express()
const path = require("path")
const request = require("request")
// const bodyParser = require("body-parser")
app.use(express.static(path.join(__dirname, "dist")))
// app.use(bodyParser.json())


const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.get("/teams/:teamName", function (req, res) {
    const teamName = req.params.teamName
    request("http://data.nba.net/10s/prod/v1/2018/players.json", function (error, response,body) {
        let data = JSON.parse(body).league.standard
        data = data.filter(d => d.teamId == teamToIDs[teamName])
        data = data.filter(d => d.isActive == true)
        let players = data.map(d => { return { firstName: d.firstName, lastName: d.lastName, jersey: d.jersey, pos: d.pos } })

        res.send(players)
    })

})






const port = 300
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})