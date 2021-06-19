const createError           = require('http-errors')
const express               = require('express')
const cors                  = require('cors')
const path                  = require('path')
const cookieParser          = require('cookie-parser')
const logger                = require('morgan')
const mongoose              = require('mongoose')
const session               = require('express-session')
const passport              = require('passport')

// const MongoClient = require('mongodb').MongoClient
// const assert = require('assert')

const indexRouter           = require('./routes/index')
const programRouter         = require('./routes/program')
const teacherRouter         = require('./routes/teacher')
const usersRouter           = require('./routes/user')

const app = express()



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cookieParser('secret'))
app.use(cors())
mongoose.connect('mongodb+srv://sumit:sumitbhagat@cluster0.1pfkx.mongodb.net/routineTu?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

// app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'hbs')


// mongoose.connect('mongodb://localhost:27017/routine', { useNewUrlParser: true })
var db = mongoose.connection



db.on('error', console.error.bind(console, 'XXX DB CONNECTION FAILED XXX'))
db.once('open', function () {
  console.log('[DB CONNECTED]')
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'process.env.SESSION_SECRET',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*24 },
}))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')

app.use('/', indexRouter)
app.use('/api/program', programRouter)
app.use('/api/teacher', teacherRouter)
app.use('/user', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// client.connect(function (err) {
//   assert.equal(null, err)
//   console.log("Connected successfully to server")

//   const db = client.db(dbName)

//   client.close()
// })

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})




module.exports = app