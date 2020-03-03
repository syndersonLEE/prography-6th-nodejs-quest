const response = require('../library/response');

async function postTodos(req, res) {
    try {
        res.end('postTodos');
    } catch (error) {
        console.log(error);
    }
}

async function getTodos(req, res) {
    try {

    } catch (error) {
        console.log(error);
    }
}

async function getTodosList(req, res) {
    try {

    } catch (error) {
        console.log(error);
    }
}

async function putTodos(req, res) {
    try {

    } catch (error) {
        console.log(error);
    }
}

async function putCompleteTodos(req, res) {
    try {

    } catch (error) {
        console.log(error);
    }
}

async function deleteTodos(req, res) {
    try {

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postTodos,
    getTodos,
    getTodosList,
    putTodos,
    putCompleteTodos,
    deleteTodos
}