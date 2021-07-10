const express = require("express")
const passport = require("passport")
const adminRouter = require("./admin")
const auth = require("../config/auth")
const router = express.Router()

router.use("/admin", adminRouter)

router.get("/", auth.isLoggedIn, (req, res) => {
  console.log("user is: ", req.user)
  // res.send(req.user)
  // res.render("user", { title: req.body.username });
})

router.get("/login", auth.isLoggedOut, (req, res) => {
  const response = {
    title: "Login",
    error: req.query.error,
  }
  res.render("login", response)
})

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user)
})

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})

module.exports = router

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// mongoose.connect('mongodb+srv://@routine.tnsnq.mongodb.net/Routine?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('DB Connection Succeded'))
//     .catch(err => console.log('DB Connection Failed'))
// const User = mongoose.model('User', UserSchema)
