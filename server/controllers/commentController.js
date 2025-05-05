const Comment = require('../models/Comment');
const Idea = require('../models/Idea')
const User = require('../models/User');

const createComment = async(req,res)=>{
   
    try {
        const userId = req.user.id;
        const ideaId = req.params.id;
        const {text} = req.body;

        if(!text || !userId || !ideaId){
            return res.status(400).json({message:"All fields are required"});
        }

        const idea = await Idea.findById(ideaId);

        if(!idea){
            return res.status(404).json({message:"Idea not found"});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const newComment = await Comment.create({text,postedBy:userId,idea:ideaId});
        idea.comment.push(newComment._id)
        await idea.save();

        const populatedComment = await Comment.findById(newComment._id).populate('postedBy', 'name');

        res.status(201).json(populatedComment);

    } catch (error) {
        return res.status(500).json({message:"Server error",error:error.message});
    }
}

const getAllComments = async(req,res)=>{
    try {
        const ideaId = req.params.id;
        const comments = await Comment.find({idea:ideaId}).populate('postedBy','name').sort('-createdAt');
        if(!comments){
            return res.status(404).json({message:"No comments found"})
        }
        res.status(200).json(comments);

    } catch (error) {
        return res.status(500).json({message:"Server error",error:error.message});
    }
}




module.exports = {
    createComment,
    getAllComments
}