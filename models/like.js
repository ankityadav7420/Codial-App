const mongoose =require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    //this define the obkject id of like object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    //define the type of liked object dynamic refrence
    onModel:{
        type:String,
        required:true,
        enum:['post','comment']
    }
},{
    timestamps:true
})


const like= mongoose.model('like',likeSchema);
module.exports = like;
