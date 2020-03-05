const response = require('../library/response');
const db = require('../library/mysql');
const moment = require('moment');

async function selectTodo(todoid) {
    const returnQuery = `SELECT todo.*, (SELECT GROUP_CONCAT(tag.tagName) FROM tag WHERE todo.id = tag.todoId) AS tags FROM todo WHERE todo.id = ?`;
    let returnData = await db.query(returnQuery, todoid);
    if(returnData[0]) returnData[0]["tags"] = returnData[0]["tags"].split(',');
    return returnData[0];
}


//1.할일 등록: POST /todos
async function postTodos(req, res) {
    try {
        if (req.body) {
            const bodyData = req.body;
            if (!bodyData.title || !bodyData.description) res.status(400).json({
                msg : "Not All data"
            });
            else {
                const TodoQuery = `INSERT INTO todo(title, description) VALUES (?, ?)`;
                const tagQuery = `INSERT INTO tag(tagName, todoId) VALUES (?, ?)`
                const insertTodoResult = await db.query(TodoQuery, [bodyData.title, bodyData.description]);
                if (bodyData.tags.length > 0) {
                    await Promise.all(bodyData.tags.map(async (row) => {
                        await db.query(tagQuery, [row, insertTodoResult.insertId]);
                    }))

                }

                  const returnData = await selectTodo(insertTodoResult.insertId);

                res.status(201).json({
                    msg: "Insert Complete",
                    data: returnData
                });
            }
        } else {
            res.status(400).json({
                msg : "Not All data"
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server error");
        console.log(error);
    }
}

//2.할일 목록: GET /todos
async function getTodosList(req, res) {
    try {
        const returnQuery = `SELECT todo.*, (SELECT GROUP_CONCAT(tag.tagName) FROM tag WHERE todo.id = tag.todoId) AS tags FROM todo`;
        let returnData = await db.query(returnQuery);
        await Promise.all(returnData.map((row) => {
            let reviseRow = row;
            reviseRow["tags"] = row["tags"].split(',');
            return reviseRow;
        }))
                

        res.status(200).json({
            msg: "Select Complete",
            data: returnData
        })
    } catch (error) {
        res.status(500).send("Internal Server error");
        console.log(error);
    }
}

//3.할일 읽기: GET /todos/:todoId
async function getTodos(req, res) {
    try {
        const selectQuery = `SELECT * FROM todo WHERE id = ${req.params.todoId}`;
        const selectResult = await db.query(selectQuery);
        if (selectResult.length == 0) res.status(400).json({ msg: "No Data" });
        else {
            const returnData = await selectTodo(req.params.todoId);

            res.status(200).json({
                msg: "Select Complete",
                data: returnData
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server error");
        console.log(error);
    }
}

//4.할일 수정: PUT /todos/:todoId
async function putTodos(req, res) {
    try {
        const todoKey = req.params.todoId;
        const selectQuery = `SELECT * FROM todo WHERE id = ${todoKey}`;
        const selectResult = await db.query(selectQuery);
        if (selectResult.length == 0) res.status(400).json({ msg : "No Data" });
        else {
            let title = selectResult[0].title;
            let des = selectResult[0].description;
            if(req.body.title) title = req.body.title;
            if(req.body.description) des = req.body.description;
            if(req.body.title || req.body.description) {
                const updateTodoQuery = `UPDATE todo SET title = ?, description = ? WHERE id = ?`;
                await db.query(updateTodoQuery, [title, des, todoKey]);
            }

            if(req.body.tags) {
                const deleteTagQuery = `DELETE FROM tag WHERE todoId = ?`;
                const insertTagQuery = `INSERT INTO tag(tagName, todoId) VALUES(?, ?)`;
                await db.query(deleteTagQuery, [todoKey]);
                await Promise.all(req.body.tags.map(async (row) => {
                    await db.query(insertTagQuery, [row, todoKey])
                }))
            }
            
            if(req.body.title || req.body.description || req.body.tags) {
                const updateDateQuery = `UPDATE todo SET updatedAt = now() WHERE id = ?`;
                await db.query(updateDateQuery, todoKey);
            }

            const returnData = await selectTodo(todoKey);

            res.status(200).json({
                msg: "Select Complete",
                data: returnData
            })
        }
    } catch (error) {
        res.status(500).send("Internal Server error");
        console.log(error);
    }
}

//5.PUT /todos/:todoId/complete
async function putCompleteTodos(req, res) {
    try {
        const todoKey = req.params.todoId;
        const selectQuery = `SELECT * FROM todo WHERE id = ${todoKey}`;
        const selectResult = await db.query(selectQuery);
        if (selectResult.length == 0) res.status(400).json({ msg: "No Data" });
        else {
            if(selectResult[0].isCompleted) {
                res.status(200).json({ msg : "Already Checked"});
            } else {
                const updateQuery = `UPDATE todo SET isCompleted = true, updatedAt = now() WHERE id = ?`
                await db.query(updateQuery, [todoKey]);

                const returnData = await selectTodo(todoKey);
                res.status(200).json({
                    msg : "Update Complete",
                    data : returnData
                })
            }
        }

    } catch (error) {
        res.status(500).send("Internal Server error");
        console.log(error);
    }
}

//6.할일 삭제: DELETE /todos/:todoId
async function deleteTodos(req, res) {
    try {
        const todoKey = req.params.todoId;
        const selectQuery = `SELECT * FROM todo WHERE id = ${todoKey}`;
        const selectResult = await db.query(selectQuery);
        if (selectResult.length == 0) res.status(400).json({ msg : "No Data" });
        else {
            const deleteTagQuery = `DELETE FROM tag WHERE todoId = ?`;
            const deleteTodoQuery = `DELETE FROM todo WHERE id = ?`;
            await db.query(deleteTagQuery, [todoKey]);
            await db.query(deleteTodoQuery, [todoKey]);
            res.status(200).json({
                msg : "success"
            })
        }

    } catch (error) {
        res.status(500).send("Internal Server error");
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