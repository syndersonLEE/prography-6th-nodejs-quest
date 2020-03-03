const response = require('../library/response');

async function postComment(req, res) {
    try {
        res.end('postComment');
    } catch (error) {
        console.log(error);
    }
}

async function getCommentList(req, res) {
    try {
        res.end('getComment');
    } catch (error) {
        console.log(error);
    }
}

async function getComment(req, res) {
    try {
        res.end('postTodos');
    } catch (error) {
        console.log(error);
    }
}

async function putComment(req, res) {
    try {
        res.end('postTodos');
    } catch (error) {
        console.log(error);
    }
}

async function deleteComment(req, res) {
    try {
        res.end('postTodos');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postComment,
    getCommentList,
    getComment,
    putComment,
    deleteComment
}