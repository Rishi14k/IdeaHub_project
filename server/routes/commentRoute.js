const express = require('express')
const {createComment,getAllComments} = require('../controllers/commentController')
const verifyToken = require('../middleware/authMiddleware')

const route = express.Router()

route.get('/:id/comments',getAllComments);
route.post('/:id/create',verifyToken,createComment);

module.exports = route;