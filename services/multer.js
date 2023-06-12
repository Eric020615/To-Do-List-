const mutler = require('multer');

const Storage = mutler.diskStorage({
    // this is a destination path
    destination: 'uploads',
    filename: (req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const storage = mutler.memoryStorage();

// const upload = mutler({
//    storage: storage
// })

const upload = mutler({
  storage: storage,
  fileFilter: function(req,file,callback){
    if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg"

    ){
        callback(null,true)
    }else{
        console.log("Only png & jpg file supported");
        callback(null,false);
    }
  },
  limits:{
    fileSize: 1024 * 1024 *10
  }
});

module.exports = {mutler,upload,storage};