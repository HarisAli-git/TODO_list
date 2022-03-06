const pool = require('../db/db');

function validEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

exports.signin = async (req, res) => {
  try{
    const { email, password } = req.query;
    if (validEmail(email))
    {
      let result = await pool.query("SELECT * from account where email = $1", [email]);
      if (result.rows.length == 0)
      {
        return res.sendStatus(404).send("Not Exists!");
      }
      else
      {
        result = (await pool.query("SELECT * from account where email = $1 and password = $2", [email, password])).rows;
        if (result.length == 0)
        {
          return res.sendStatus(401).send("Invalid Credentials!");
        }
        else
        {
          console.log(result);
          return res.send(result);
        }
      }
    }
    else
    {
      return res.sendStatus(401).send("Invalid Email");   
    }
  }
  catch(error) {
    console.log(error.message);
  }
};