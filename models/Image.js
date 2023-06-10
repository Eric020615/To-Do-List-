const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        // buffer is a binary data
        data: Buffer,
        contentType: String,
    },
})

const Image = mongoose.model("image",imageSchema);
module.exports = Image;