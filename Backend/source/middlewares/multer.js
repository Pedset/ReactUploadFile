const multer = require('multer');


//Multer is used to temporarily store the file in our servers so we can read later on 
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./storage");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const upload = multer({storage: fileStorageEngine});

module.exports = upload;