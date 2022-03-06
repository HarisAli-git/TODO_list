const express = require('express');
const router = express.Router();

const TodosController = require('../controller/TodoController');

router.get("/", TodosController.todos_get_all);

router.post("/addTodo", TodosController.todos_create_todo);

router.get("/:id", TodosController.todos_get_todo);

router.delete("/:id", TodosController.todos_delete_todo);

module.exports = router;