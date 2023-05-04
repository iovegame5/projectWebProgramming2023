const express = require('express')

const app = express()
const cors = require('cors')
app.use(cors())


// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for pars


// routers
const indexRouter = require('./routes/index')

app.use(indexRouter.router)

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})