var express = require('express');
var router = express.Router();

const commentController = require('../controller/CommentController');
const todosController = require('../controller/todosController');

router.delete('/:todoId/comments/:commentId', commentController.deleteComment);
router.put('/:todoId/comments/:commentId', commentController.putComment);
router.get('/:todoId/comments/:commentId', commentController.getComment);
router.get('/:todoId/comments', commentController.getCommentList);
router.post('/:todoId/comments', commentController.postComment);
router.delete('/:todoId',todosController.deleteTodos);
router.put('/:todoId/complete', todosController.putCompleteTodos)
router.put('/:todoId', todosController.putTodos);
router.get('/:todoId', todosController.getTodos);
router.get('/', todosController.getTodosList);
router.post('/', todosController.postTodos);

module.exports = router;

