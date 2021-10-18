const router = require('express').Router();
const user = require('../controllers/user.controller.js');
const upload = require('../middlewares/multer.js');


router.post('/user/upload', upload.single('file') , user.controller);

module.exports = router;