const mongoose = require('mongoose');

const uri = "mongodb+srv://ericjuncheng10:XN1H5tS4BEnrYHRP@cluster0.0rnnn0v.mongodb.net/mongodb-todolist"

// return a promise
mongoose.connect(uri).then(()=>{
    console.log("MongoDB Connected");
}).catch(()=>{
    console.log("failed to connect");
})

module.exports = mongoose;