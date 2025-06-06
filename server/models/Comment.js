const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        maxlength:1500,
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    idea:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Idea',
        required:true
    }
},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment