const express = require("express")

const app = express();
const cors = require('cors')
app.use(cors())

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing applica
// routers
const indexRouter = require('./routes/index')
const addRouter = require('./routes/add')
const productsRouter = require("./routes/products")
app.use(indexRouter.router)
app.use(addRouter.router)
app.use(productsRouter.router)
app.listen(3000, () => {
  console.log('Start server at port 3000.')
})