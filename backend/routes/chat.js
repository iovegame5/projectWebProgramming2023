
const express = require("express");
const pool = require("../config");
router = express.Router();




// check and create room
    router.post('/chat', async function(req, res, next){
        const seller_id = req.body.seller_id
        const buyer_id = req.body.buyer_id
        try{
        const[rows1, fields1] = await pool.query("select * from chat_room where seller_id = ? and buyer_id = ?", [seller_id, buyer_id])
        console.log(rows1)
        if (rows1.length == 0){
            console.log("dont have room")
            const result = await pool.query('insert into chat_room (seller_id, buyer_id) values(?,?)', [seller_id, buyer_id])
            console.log(result)
            return res.status(200).json({message:"create new chat room success!!",
            room_id:result[0].insertId})
        }
        else{
          console.log("already have room!")
          return res.json({message:"already have room joining room ",room_id:rows1[0].room_id})
        }
    }
    catch(err){
        console.log(err)
        return res.json(err).status(400)
    }

    })

// get room

router.get("/:userid/chat", async function (req, res, next) {
  const user_id = Number(req.params.userid)
  try{
    const [rows1, fields1] = await pool.query("select room_id,user_id as 'target_id', seller_id, buyer_id, lastmsgtxt, username as 'target_username', concat(firstname, ' ', lastname) as'target_name', avatar as'target_avatar' from chat_room join users on(chat_room.buyer_id = users.user_id) where seller_id = ? order by lastmsgtime ", [user_id])
    console.log(rows1)
    const [rows2, fields2] = await pool.query ("select room_id,user_id as 'target_id', seller_id, buyer_id, lastmsgtxt, username as 'target_username', concat(firstname, ' ', lastname) as'target_name', avatar as'target_avatar' from chat_room join users on(chat_room.seller_id = users.user_id) where buyer_id = ? order by lastmsgtime", [user_id])
    res.status(200).json({buyer_rooms : rows1,
    seller_rooms : rows2})
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }

  });

//   get messages

router.get('/chat/:roomid/messages', async function(req, res, next){
  const room_id = Number(req.params.roomid)
  try{
    const [rows1, fieds1] = await pool.query(`select * , DATE_FORMAT(CONVERT_TZ(sent_time, '+00:00', '+07:00'), '%H:%i') as sent_time from messages where room_id = ? order by sent_time`, [room_id])
    return res.status(200).json({messages: rows1})
  }
  catch(err){
    console.log(err)
    return res.status(400).json(err)
  }
});


exports.router = router;
