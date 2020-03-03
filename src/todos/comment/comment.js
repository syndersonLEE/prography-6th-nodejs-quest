var express = require('express');
var router = express.Router();

const commentController = require('../../controller/CommentController');

router.delete('/:commentId', commentController.deleteComment);
router.put('/:commentId', commentController.putComment);
router.get('/:commentId', commentController.getComment);
router.get('/', commentController.getCommentList);
router.post('/', commentController.postComment);
module.exports = router;