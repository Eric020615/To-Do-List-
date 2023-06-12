// import image model
const Image = require('../models/Image');
// import multer
const {mutler,upload,storage} = require('../services/multer');
// import user model
const User = require('../models/User');
const fs = require('fs');


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

// module.exports.uploadImg = async (req,res,next) =>{
//     try{
//         const newImage = new Image({
//             name: req.file.originalname,
//             image:{
//                 data:req.file.buffer,
//                 contentType:req.file.mimetype
//             }
//         })
//         await newImage.save();
//         res.redirect('/profile');
//     }
//     catch(err){
//         console.log(err)
//     }
// }

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

// module.exports.getImg = async (req,res,next) =>{
//     try{
//         const images = await Image.find();
//         res.locals.images = images;
//         next();
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// module.exports.getImg = async (req, res, next) => {
//   const user_id = res.locals.user._id;
//   try {
//     const images = await User.findOne({ _id: user_id },{ image: 1 });
//     res.locals.images = images;
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// };

// upload Image
module.exports.uploadImg = async (req, res, next) => {
  const user_id = res.locals.user._id;
  try {
    if(req.file == undefined){
       res.status(400).send("No file selected.");
    }else{
      const uploadImage = await User.findByIdAndUpdate(
        { _id: user_id },
        {
         $set: {
          image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
          }
        }
      },
      );
      // res.status(201).json({ uploadImage});
      res.redirect("/profile");
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.profile_edit = async (req, res) => {
  let {email, username, contact_num, date_of_birth} = req.body;
  try {
    await User.findOneAndUpdate(
      { email: email },
      {
        username: username,
        phone_num: contact_num,
        date_of_birth: date_of_birth,
      }
    );
    // res.status(201).json({ profile_edited });
    next();
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};


