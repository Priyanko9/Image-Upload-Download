const express=require("express");
const path=require('path');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const multer = require('multer');
const imageRouter=require('./routes/ImageRoutes');
const isAuth=require('./middleware/isAuth');

const app=express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const multerUpload=multer({ 
   limits: {
    fileSize: 2 * 1024 * 1024,
  } }).single('image');

app.use('/imageUpload',isAuth,multerUpload,imageRouter);

mongoose
  .connect(
    `mongodb+srv://priyanko:WwvZskVxt9QHMW3q@cluster0-4t1ax.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  ,{ useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => {
    app.listen(3006);
  })
  .catch(err => {
    console.log(err);
  });


