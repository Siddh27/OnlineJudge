import multer from "multer";


// cb is just used for callback
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      if(file?.name){
        cb(null, file.originalname)
      }
    }
  })
  
  export const upload = multer({ 
    storage: storage
 })