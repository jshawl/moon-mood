var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/moon-moods")
var moment = require("moment")
var SunCalc = require("suncalc")
var Phone = require("./phone")(mongoose)


app.set("view engine","hbs")
app.use(bodyParser.urlencoded())
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(function(req, res, next){
  res.set("Access-Control-Allow-Origin","*")
  next()
})

app.get("/", function(req, res){
  if(req.query.tel){
    console.log("+" + req.query.tel)
    return Phone.findOne({number: "+" + req.query.tel}).then(function(phone){
      console.log(phone)
      if(phone){
        phone.entries = phone.entries.map(function(entry){
	  entry.relative = moment(entry.createdAt).fromNow()
	  return entry
	}).reverse()
	res.render("index", {phone: phone})
      }else{
        res.send("Not found.")
      }
    }).catch(function(err){
      res.send(""+err)
    })
  }else{
    res.sendFile(__dirname + "/index.html")
  }
})


app.get("/all", function(req, res){
  Phone.find().then(function(phones){
    res.json(phones)
  })
})

app.post("/", function(req, res){
  Phone.findOne({number: req.body.From}).then(function(phone){
    if(!phone){
      return Phone.create({number: req.body.From}).then(function(phone){
	res.json(phone)
	addEntryTo(phone, req.body.Body)
      })
    }
    addEntryTo(phone, req.body.Body)
  })
})

function addEntryTo(phone, body){
  phone.entries.push({
    createdAt: new Date(),
    moon: SunCalc.getMoonIllumination(new Date()).phase.toFixed(2),
    body: body
  })
  phone.save().then(function(p){
    console.log(p)
  })
}

app.listen(3000)