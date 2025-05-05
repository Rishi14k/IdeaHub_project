const express = require('express')
const {getAllIdeas,createIdea,getSingleIdea,toggleLikeIdea} = require('../controllers/ideaController')
const verifyToken = require('../middleware/authMiddleware')

const route = express.Router()

route.get('/',getAllIdeas)
route.post('/create',verifyToken,createIdea)
route.get('/:id',getSingleIdea)

route.patch('/:id/toggle-like',verifyToken,toggleLikeIdea);


module.exports = route;