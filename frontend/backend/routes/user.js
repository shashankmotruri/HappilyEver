const express = require("express");
const path = require("path");
const router = express.Router();
const {LoginUser,SignupUser,UpdateUser,DeleteUser,GetAllUsers,GetUserById} = require('../controllers/user.js')
var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
  
let upload = multer({ storage, fileFilter });

router.post("/login",LoginUser);
router.post("/signup",SignupUser);
router.put("/updateUser/:id",upload.single('image'),function(req, res){
    UpdateUser(req, res);
});
router.delete("/deleteUser/:id",function(req, res){
    DeleteUser(req, res);
});

router.get("/getUser/:id",function(req, res){
    GetUserById(req, res);
});

router.get("/getAllUsers",function(req, res){
    GetAllUsers(req, res);
});

module.exports = router;