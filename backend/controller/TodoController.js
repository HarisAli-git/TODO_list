const pool = require('../db/db');

exports.todos_delete_todo = async (req, res, next) => {
  try {  
    const id = req.params.todo_id;
    const results = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.status(201).send("TODO was deleted!!! Successfully", results);
  }
  catch(error){
    res.sendStatus(404).send(error.message);
  }
};

exports.todos_get_all = async (req, res) => {
  try{
    let { user_id } = req.query; 
    console.log(user_id);
    const results = await pool.query("SELECT * FROM todo where user_id = $1", [user_id]);
    res.status(200).send(results.rows);
  }
  catch (error) {
    res.sendStatus(500).send(`Something went wrong while fetching ==> ${error.message}`);
  }
};

exports.todos_get_todo = async (request, res) => {
  try {  
    console.log("PostGREsql get todo :id/ page accessed");
    const id = request.params.todo_id;
    console.log(id);
    const result = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [id]);
    res.send(result.rows);
  }
  catch (error) {
    res.sendStatus(500).send(error.message);
  }
};

exports.todos_create_todo = async (req, res, then) => {
  try {
    const title = req.body.title;
    const priority = req.body.priority;
    const user_id = req.body.user_id;
    console.log(title, priority, user_id);
    const result = await pool.query("INSERT into todo (title, priority, user_id) VALUES($1, $2, $3) RETURNING *", [title, priority, user_id]);
    res.send(result.rows[0]);
  } catch(e) {
    res.status(400)
    res.send(`Something went wrong while saving ==> ${e}`)
  }
};