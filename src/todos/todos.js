var express = require('express');
var router = express.Router();

const todosController = require('../controller/TodosController');

router.delete('/:todoId',todosController.deleteTodos);
router.put('/:todoId/complete', todosController.putCompleteTodos)
router.put('/:todoId', todosController.putTodos);
router.get('/:todoId', todosController.getTodos);
router.get('/', todosController.getTodosList);
router.post('/', todosController.postTodos);

module.exports = router;