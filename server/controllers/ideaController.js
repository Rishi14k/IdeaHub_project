const mongoose = require("mongoose");
const Idea = require("../models/Idea");

const getAllIdeas = async (req, res) => {
  try {
    const idea = await Idea.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(idea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createIdea = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIdea = await Idea.create({
      title,
      description,
      category,
      createdBy: req.user.id,
    });
    
    res.status(201).json(newIdea);
  } catch (error) {
    res.status(500).json({ error:error.message});
  }
};

const getSingleIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate("createdBy", "name")
      .populate({
        path: "comment",
        populate: {
          path: "postedBy",
          select: "name", // you can also add "email" or any other field
        },
      });

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.status(200).json(idea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const likeIdea = async(req,res)=>{
//   try {
//     const ideaId = req.params.id;
//     const userId = req.user.id;

//     const idea = await Idea.findById(ideaId);

//     if(!idea){
//         return res.status(404).json({message:"Idea not found"});
//     }

//     if(idea.like.includes(userId)){
//         return res.status(400).json({message:"You already liked this idea"})
//     }

//     idea.like.push(userId);
//     await idea.save();

//     res.status(200).json({ message: "Idea liked successfully" });
//   } catch (error) {
//     res.status(500).json({ error:error.message});
//   }
// }

// const unlikeIdea = async(req,res)=>{
//     try {
//         const ideaId = req.params.id;
//         const userId = req.user.id;
    
//         const idea = await Idea.findById(ideaId);
    
//         if(!idea){
//             return res.status(404).json({ message: "Idea not found" });
//         }
    
//         if(!idea.like.includes(userId)){
//             return res.status(400).json({ message: "You have not liked this idea yet" });
//         }
    
//         idea.like = idea.like.filter(id=>id.toString() !== userId);
//         await idea.save()
    
//         res.status(200).json({ message: "Idea unliked successfully" });    
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// }

const toggleLikeIdea = async (req, res) => {
    try {
      const ideaId = req.params.id;
      const userId = req.user.id;
  
      const idea = await Idea.findById(ideaId);
  
      if (!idea) {
        return res.status(404).json({ message: "Idea not found" });
      }
  
      const alreadyLiked = idea.like.includes(userId);
  
      if (alreadyLiked) {
        // Unlike: Remove userId from the like array
        idea.like = idea.like.filter(id => id.toString() !== userId);
        await idea.save();
        return res.status(200).json({ message: "Idea unliked successfully" });
      } else {
        // Like: Add userId to the like array
        idea.like.push(userId);
        await idea.save();
        return res.status(200).json({ message: "Idea liked successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
  getAllIdeas,
  createIdea,
  getSingleIdea,
  toggleLikeIdea
};
