const pool = require("../config");

async function isLoggedIn (req, res, next) {
         let authorization = req.headers.authorization
     
         if (!authorization) {
             return res.status(401).send('You are not logged in')
         }
     
         let [part1, part2] = authorization.split(' ')
         if (part1 !== 'Bearer' || !part2) {
             return res.status(401).send('You are not logged in')
         }
         
         // Check token
         const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
         const token = tokens[0]
         if (!token) {
             return res.status(401).send('You are not logged in')
         }
     
         // Set user
         const [users] = await pool.query(
                     'SELECT user_id, username, firstname, lastname, email, phone, join_date, usertype,avatar, isbanned ' + 
                       'FROM users WHERE user_id = ?', [token.user_id]
                   )
                   req.user = users[0]
               
                   next()
     }


async function logger (req, res, next) {
     const timestamp = new Date().toISOString().substring(0, 19)
     console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
      next()
  }




  module.exports = {
     logger,isLoggedIn
 }