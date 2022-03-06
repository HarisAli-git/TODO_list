const pool = require('../db/db');

exports.labels_get_all = async (req, res) => {
    console.log("/POSTgre SQL get_labels page accessed");
    const result = await pool.query("SELECT * from labels");
    res.send(result.rows);
  }; 

exports.labels_add_label = async (req, res, next) => {
   try {
    const name = req.body.name;
    const result = await pool.query("INSERT into label (name) VALUES($1) RETURNING *", [name])
    res.send(result.rows); 
   } catch (error) {
     console.log(error.message);
   }
  };