const Photo=require('../models/photoSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Resize=require('../Resize');
const path = require('path');

exports.register= async (req,res,next) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        res.json({msg:"User exists already."});
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = new User({
          email: req.body.email,
          password: hashedPassword
        });
        const result = await user.save();
        res.status(200).send();
      }
    } catch (err) {
      throw err;
    }
},

exports.login= async (req,res,next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.json({msg:"User does not exist!"});
        throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isEqual) {
        res.json({msg:"Password is incorrect!"});
        throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        'somesupersecretkey',
        {
        expiresIn: '1h'
        }
    );
    res.json({ userId: user.id, token: token, tokenExpiration: 1 });
}

exports.getPhoto=async (req, res,next)=> {
    if(req.userId){
        var fileId = req.query.id;
        Photo
        .findOne({_id:fileId})
        .then(async (err,img ) => {
            if (err){
                res.send(err);
            } else if(img.userId!==req.userId){
                res.send({msg:"User not authorized"});
            } else {
                res.contentType('json');
                res.send(img).status(200);
            }
        })
    } else {
        res.send({msg:"User not authorized"});
    }
  };

exports.uploadPhoto=async (req,res,next)=>{
    if(req.file){
        const imagePath = path.join(__dirname, '../images');
        const fileUpload = new Resize(imagePath);
        const filePath = await fileUpload.save(req.file.buffer,req.file.originalname);
        const photo = new Photo({
            contentType: req.file.mimetype,
            imageUrl:filePath,
            image:req.file.buffer,
            userId:req.userId
          });
          photo
            .save()
            .then(result => {
              res.json({
                  imageId:result._id
              });
            })
            .catch(err => {
                throw err;
            });
    }
}



