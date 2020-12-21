const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Final_Test', { useNewUrlParser: true, useUnifiedTopology: true });


const jokeSchema = new mongoose.Schema({
    joke: {
        type: String,
        required: true
    }
})


const jokeModel = mongoose.model('joke', jokeSchema)


module.exports = jokeModel