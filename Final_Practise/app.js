var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var request = require('request');

const Jokes = require('./models/Joke');

var app = express()

var API = "https://sv443.net/jokeapi/v2/joke/Programming?type=single";

app.set("port", 3000);

mongoose.connect('mongodb://localhost:27017/Final_Test', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});



app.post('/save_joke', async(req, res)=>{
    new Jokes({
        joke: req.body.joke
    }).save((err) =>{
        if(err){
            console.log(err);
        }
        else {
            console.log("succesfully added joke")
        }
    })
});


app.get('/get_average/:num', async(req, res) =>{

    var njokes = req.params.num

    var sum = 0
    //less recent to most recent
    var jokes = await Jokes.find().skip(Jokes.count()-njokes)

    jokes.forEach(jokes =>{
        sum += (jokes.joke).split(" ").length
    });

    var response = {
        average: sum/njokes
    }

    res.send(response)

})


app.listen(3000, () =>
    console.log(`App started on port ${app.get("port")}`)
);