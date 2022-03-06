const pool = require('../db/db');

function validEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

exports.signup = async (req, res) => {
    try{
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      if (validEmail(email))
      {
        const result = await pool.query("INSERT INTO account (username, password, email) VALUES ($1, $2, $3) RETURNING *", [username, password, email]);
        res.send(JSON.stringify(result.rows));
      }
      else
      {
        res.send(-1);   
      }
    }
    catch(error) {
      console.log(error.message);
    }
  };