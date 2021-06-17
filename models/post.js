const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
      },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
         }
    },{
        timestamps:true
    
});

const post = mongoose.model('post',postSchema);
module.exports =post;