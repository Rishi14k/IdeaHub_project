const mongoose = require('mongoose')

const ideaSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Title is required'],
        maxlength:100
    },
    description:{
        type:String,
        required:[true, 'Description is required'],
        maxlength:3500,
    },
    category:{
        type:String,
        required:[true, 'Category is required'],
        enum:['Technology', 'AI','Web', 'Mobile', 'Health', 'Education', 'Finance', 'Entertainment', 'Food', 'Others'],
        default:'Others'
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    // collaborators:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User'
    // }],
    // collaborationRequests: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    badgeWinner:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

},{timestamps:true})

const Idea = mongoose.model('Idea',ideaSchema);

module.exports = Idea;