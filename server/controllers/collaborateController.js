// const User = require('../models/User');
// const Idea = require('../models/Idea');

// const sendRequest = async(req,res)=>{
//     try {
//         const userId = req.user.id;
//         const ideaId = req.params.id;

//         const idea = await Idea.findById(ideaId);
//         if(!idea) return res.status(404).json({message:'Idea not found'});

//         if(idea.createdBy.toString() === userId){
//             return res.status(400).json({message:'You cannot send a request to your own idea'});
//         }

//         if(idea.collaborationRequests?.includes(userId)){
//             return res.status(400).json({ message: "Collaboration request already sent" });
//         }

//         //add user to pending collaboration requests
//         idea.collaborationRequests.push(userId);
//         await idea.save();

//         res.status(200).json({ message: "Collaboration request sent successfully" });

//     } catch (error) {
//         res.status(500).json({ message: error.message });    
//     }
// }

// const acceptRequest = async(req,res)=>{
//     try {
//         const ideaId = req.params.id;
//         const userIdToAccept = req.body.userId;

//         console.log("Received ideaId:", ideaId);
//         console.log("Type of ideaId:", typeof ideaId);


//         const idea = await Idea.findById(ideaId);
//         if(!idea) return res.status(404).json({message:'Idea not found'});

//         if(idea.createdBy.toString() !== req.user.id){
//             return res.status(403).json({message:'You are not authorized to accept this request'});
//         }
//         if(!idea.collaborationRequests?.includes(userIdToAccept)){
//             return res.status(400).json({message:'User has not sent a collaboration request'});
//         }
        
//         idea.collaborators.push(userIdToAccept);

//         //remove from pending collaboration requests
//         idea.collaborationRequests = idea.collaborationRequests.filter((id)=>{
//             return id.toString() !== userIdToAccept.toString()
//         })

//         await idea.save();

//         res.status(200).json({ message: "Collaboration request accepted" });
//     }catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


// const rejectRequest = async(req,res)=>{
//     try {
//         const ideaId = req.params.id;
//         const userIdToReject = req.body.userId;

//         const idea = await Idea.findById(ideaId);
//         if(!idea){
//             return res.status(404).json({message:'Idea not found'});
//         }

//         if(idea.createdBy.toString() !== req.user.id){
//             return res.status(403).json({message:'You are not authorized to reject this request'});
//         }

//         if(!idea.collaborationRequests?.includes(userIdToReject)){
//             return res.status(400).json({message:'User has not sent a collaboration request'});
//         }

//         idea.collaborationRequests = idea.collaborationRequests.filter((id)=>{
//             return id.toString() !== userIdToReject
//         })

//         await idea.save();
//         res.status(200).json({ message: "Collaboration request rejected" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


// module.exports = {
//     sendRequest,
//     acceptRequest,
//     rejectRequest
// }