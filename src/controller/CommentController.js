const db = require('../library/mysql');

async function getOneComment(commentId) {
    const selectQuery = `SELECT * FROM comment WHERE id = ?`;
    const returnData = await db.query(selectQuery, commentId);
    if(returnData.length == 0) return null;
    return returnData[0];
}

async function getTodo(todoId) {
    const selectQuery = `SELECT * FROM todo WHERE id = ?`;
    const returnData = await db.query(selectQuery, todoId);
    
    if(returnData.length == 0) return null;
    return returnData[0];
}

//7.할일에 댓글 등록: POST /todos/:todoId/comments

async function postComment(req, res) {
    try {
        if (await getTodo(req.params.todoId) == null) {
            res.status(400).json({ msg: "Bad Request" });
        }
        else if(!req.body.contents) { 
            res.status(400).json({ msg : "No Content" })
        } else {
            const insertQuery = `INSERT INTO comment(contents, todoId) VALUES(?, ?)`;
            const insertResult = await db.query(insertQuery, [req.body.contents, req.params.todoId]);
            const returnData = await getOneComment(insertResult.insertId);
            res.status(201).json({ 
                msg : "Insert Complete",
                data :  returnData
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//8.할일의 댓글 목록: GET /todos/:todoId/comments

async function getCommentList(req, res) {
    try {
        if (await getTodo(req.params.todoId) == -1) {
            res.status(400).json({ msg: "Bad Request" });
        } else {
            const selectQuery = `SELECT * FROM comment WHERE todoId = ?`;
            const returnData = await db.query(selectQuery, [req.params.todoId]);
            res.status(200).json({ 
                msg : "Select Complete",
                data :  returnData
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//9.할일의 댓글 읽기: GET /todos/:todoId/comments/:commentId

async function getComment(req, res) {
    try {
        const commentData = await getOneComment(req.params.commentId);
        if (await getTodo(req.params.todoId) == -1) {
            res.status(400).json({ msg: "No Data" });
        } else if(commentData == null || commentData.todoId != req.params.todoId) { 
            res.status(400).json({ msg : "Bad Request" })
        } else {
            res.status(200).json({ 
                msg : "Select Complete",
                data : commentData
            })
        }
    } catch (error) {
        console.log(error);
    }
}
//10.할일의 댓글 수정: PUT /todos/:todoId/comments/:commentId

async function putComment(req, res) {
    try {
        const commentData = await getOneComment(req.params.commentId);
        if (await getTodo(req.params.todoId) == -1) {
            res.status(400).json({ msg: "Bad Request" });
        } else if(commentData == null || commentData.todoId != req.params.todoId) { 
            res.status(400).json({ msg : "Bad Request" })
        } else if(!req.body.contents) { 
            res.status(400).json({ msg : "No Content" })
        } else {
            const updateQuery = 'UPDATE comment SET contents = ?, updatedAt = now() WHERE id = ?';
            await db.query(updateQuery, [req.body.contents, req.params.commentId]);
            const returnData = await getOneComment(req.params.commentId);
            res.status(200).json({ 
                msg : "Update Complete",
                data : returnData
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//11.할일의 댓글 삭제: DELETE /todos/:todoId/comments/:commentId

async function deleteComment(req, res) {
    try {
        const commentData = await getOneComment(req.params.commentId);
        if (await getTodo(req.params.todoId) == -1) {
            res.status(400).json({ msg: "No Data" });
        } else if(commentData == null || commentData.todoId != req.params.todoId) { 
            res.status(400).json({ msg : "Bad Request" })
        } else {
            const deleteQuery = 'DELETE FROM comment WHERE id = ?';
            await db.query(deleteQuery, [req.params.commentId]);
            res.status(200).json({ 
                msg : "success"
            })
        }
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