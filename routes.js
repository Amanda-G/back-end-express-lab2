const express = require("express");

const todoRoutes = express.Router();
const pool = require("./connection");

const todos = [];

todoRoutes.get("/todo-items", (req, res) => {
    pool.query("SELECT * FROM todo_list ORDER BY id").then(result => {
        res.json(result.rows);
    });
});

// route
todoRoutes.post("/todo-items", (req, res) => {
    pool.query("INSERT INTO todo_list(task, completed) VALUES($1::VARCHAR, $2::BOOLEAN)", [req.body.task, req.body.completed]).then(() => {
        res.json(req.body);
    })
});

// route
todoRoutes.put("/todo-items/:id", (req, res) => {
    pool.query("UPDATE todo_list SET completed=$1::BOOLEAN WHERE id=$2::INT", [req.body.completed, req.params.id]).then(() => {
        res.json(req.body);
    })
});

// route
todoRoutes.delete("/todo-items/:id", (req, res) => {
    pool.query("DELETE FROM todo_list WHERE id=$1::INT", [req.params.id]).then(() => {
        res.status(200).json(`${req.params.id}`);
    })
});

module.exports = { todoRoutes };