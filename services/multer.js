const mutler = require('multer');

const Storage = mutler.diskStorage({
    // this is a destination path
    destination: 'uploads',
    filename: (req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const storage = mutler.memoryStorage();

const upload = mutler({
   storage: storage
})

module.exports = {mutler,upload,storage};