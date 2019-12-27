const express=require("express");
const router=express.Router();
const imageController=require('../controllers/ImageController');


router.post('/uploadPhoto',imageController.uploadPhoto);
router.get('/getPhoto',imageController.getPhoto);
router.post('/login',imageController.login);
router.post('/register',imageController.register);

module.exports=router;

