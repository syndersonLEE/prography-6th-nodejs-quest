var express = require('express');
var router = express.Router();

router.use('/:todoId/comments', require('./comment'));
router.use('/', require('./todos'));

module.exports = router;
