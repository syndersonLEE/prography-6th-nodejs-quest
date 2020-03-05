const mysql = require("./library/mysql");

const TodoQuery = "CREATE TABLE IF NOT EXISTS todo " +
    "(id INT(11) unsigned NOT NULL AUTO_INCREMENT, " +
    "title VARCHAR(45) NOT NULL, " +
    "description VARCHAR(200) NOT NULL, " +
    "isCompleted BOOLEAN NOT NULL DEFAULT FALSE, " +
    "createdAt DATETIME NULL DEFAULT now(), " +
    "updatedAt DATETIME NULL DEFAULT now(), " +
    "PRIMARY KEY (id)) " +
    "ENGINE = InnoDB " +
    "DEFAULT CHARACTER SET = utf8;"

const tagQuery = "CREATE TABLE IF NOT EXISTS tag " +
    "(id INT(11) unsigned NOT NULL AUTO_INCREMENT, " +
    "tagName VARCHAR(45) NOT NULL, " +
    "todoId INT(11) unsigned NOT NULL, " +
    "PRIMARY KEY (id), " +
    "CONSTRAINT todo_tag " +
    "  FOREIGN KEY (todoId) " +
    "  REFERENCES todo (id) " +
    "  ON DELETE NO ACTION " +
    "  ON UPDATE NO ACTION) "; 

const commentQuery = "CREATE TABLE IF NOT EXISTS comment " + 
    "(id INT(11) unsigned NOT NULL AUTO_INCREMENT, " +
    "contents VARCHAR(200) NOT NULL, " +
    "createdAt DATETIME NULL DEFAULT now(), " +
    "updatedAt DATETIME NULL DEFAULT now(), " +
    "todoId INT(11) unsigned NOT NULL, " +
    "PRIMARY KEY (id), " +
    "CONSTRAINT comment_todo " +
    "  FOREIGN KEY (TodoId) " +
    "  REFERENCES todo (id) " +
    "  ON DELETE NO ACTION " +
    "  ON UPDATE NO ACTION) " +
    "ENGINE = InnoDB " +
    "DEFAULT CHARACTER SET = utf8"; 

const makeTable = async (req, res) => {
    await mysql.query(TodoQuery);
    await mysql.query(tagQuery);
    await mysql.query(commentQuery);

    res.status(200).send('make DB');
}

module.exports = {
    makeTable
}