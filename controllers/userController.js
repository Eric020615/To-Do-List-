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
const handleErrors = (err) => {
  let errors = {
    username: "",
    contact_num: "",
    date_of_birth: "",
  };

  if (err.message.includes("task validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.profile_edit = async (req, res) => {
  let {email, username, contact_num, date_of_birth} = req.body;
  try {
    const profile_edited = await User.findOneAndUpdate(
      { email: email },
      {
        username: username,
        phone_num: contact_num,
        date_of_birth: date_of_birth,
      }
    );
    res.status(201).json({ profile_edited });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
// module.exports.user_infor_get = async (req, res, next) => {
//   const user = res.locals.user;
//   let currentDate = new Date();
//   const user_id = user._id;

//   try {
//     const query = await User.find({ user_id: user_id });
//     res.locals.infor = query;
//     console.log("llllll"+query)
//     console.log("kkkkkkkkkkkkk" + user._id);
//     res.locals.date = currentDate;
//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

