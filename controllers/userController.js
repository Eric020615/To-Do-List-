// import image model
const Image = require('../models/Image');
// import multer
const {mutler,upload,storage} = require('../services/multer');
// import user model
const User = require('../models/User');
const fs = require('fs');

module.exports.uploadImg = async (req,res,next) =>{
    try{
        const newImage = new Image({
            name: req.file.originalname,
            image:{
                data:req.file.buffer,
                contentType:req.file.mimetype
            }
        })
        await newImage.save();
        res.redirect('/profile');
    }
    catch(err){
        console.log(err)
    }
}

// module.exports.uploadImg1 = async (req,res,next) =>{
//     try{
//         const newImage = new Image({
//             name: req.body.name,
//             image:{
//                 data: fs.readFileSync('uploads/',req.file.filename),
//                 contentType: "image/png"
//             },
//         })
//         const status = await newImage.save();
//         console.log(status);
//     }
//     catch(err){
//         console.log(err);
//     }
// }

module.exports.getImg = async (req,res,next) =>{
    try{
        const images = await Image.find();
        res.locals.images = images;
        next();
    }
    catch(err){
        console.log(err);
    }
}
