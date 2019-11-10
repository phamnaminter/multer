let upload = require('multer')
let path =require('path')

let storage = upload.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.resolve(__dirname,'../public'))
    },
    
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

module.exports = upload({storage})