const express               = require('express')
const passport              = require('passport')
const adminRouter           = require('./admin')
const auth                  = require('../config/auth')

const router = express.Router();

// mongoose.connect('mongodb+srv://santos7117:0ArqZiUUZSL3CGY6@routine.tnsnq.mongodb.net/Routine?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('DB Connection Succeded'))
//     .catch(err => console.log('DB Connection Failed'))
// const User = mongoose.model('User', UserSchema)

router.use('/admin', adminRouter)

router.get('/', auth.isLoggedIn, (req, res) => {
    res.render('user', { title: 'User' })
})

router.get('/login', auth.isLoggedOut,(req, res) => {
    const response = {
        title: 'Login',
        error: req.query.error,
    }
    res.render('login', response)
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/user/login?error=true',
}), (err) => console.log(err))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



module.exports = router;