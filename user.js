const mongoose = require("mongoose");

const uri = "mongodb+srv://ericjuncheng10:XN1H5tS4BEnrYHRP@cluster0.0rnnn0v.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri).then(()=>{
    console.log("MongoDB Connected");
}).catch(()=>{
    console.log("failed to connect")
})

const LogInSchema = new mongoose.Schema(
    {
        name:{
            type : String,
            required : true
        },
        password:{
            type : String,
            required : true
        }   
    }
)

const collection = new mongoose.model("User Authentification",LogInSchema);
module.exports = collection;
