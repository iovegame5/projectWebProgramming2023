const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
const pool = require("./config");
const{logger} = require('./middlewares')

const io = require('socket.io')(server, {

  cors: {
    origin: '*',
  }
});

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  next();
});



io.on('connection', (socket) => {
  console.log('User connected');

 // Join a chat room
 socket.on('joinRoom', (roomId) => {
  socket.join(roomId);
  console.log(`Client joined room ${roomId}`);
});

socket.on('message', async (data) => {
  const { roomId, message } = data;

  // Save the message to the database
  try{
    await pool.query('insert into messages (room_id, sender_id, reciver_id, sent_time, message) values(?, ?, ?, ?, ?)',
    [roomId, message.sender_id, message.receiver_id,message.sent_time, message.content ])

    const[rows1, fields1] = await pool.query("select * from messages where room_id = ? order by sent_time asc", [roomId])

  let  messages = rows1
      // Emit the message to the room
      io.to(roomId).emit('message', {
          messages
      });
  }
  catch(err){console.log(err)}

 
});

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing applica
app.use(logger)
// routers
const indexRouter = require('./routes/index')
const addRouter = require('./routes/add')
const productsRouter = require("./routes/products")
const chatRouter = require("./routes/chat")
const userRoter = require("./routes/user")
const favRoter = require("./routes/favourite")
app.use(indexRouter.router)
app.use(addRouter.router)
app.use(productsRouter.router)
app.use(chatRouter.router)
app.use(userRoter.router)
app.use(favRoter.router)

server.listen(3000, () => {
  console.log('Start server at port 3000.')
})