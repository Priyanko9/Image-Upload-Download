var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var photoSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
      },
    contentType:{
      type: String,
      required: true
    },
    image:{
      type:Buffer,
      required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
  });
  
  module.exports = mongoose.model('Photos', photoSchema);