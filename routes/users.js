const express               = require('express')
const passport              = require('passport')
const bcrypt                = require('bcrypt')

const router = express.Router();

// mongoose.connect('mongodb+srv://santos7117:0ArqZiUUZSL3CGY6@routine.tnsnq.mongodb.net/Routine?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('DB Connection Succeded'))
//     .catch(err => console.log('DB Connection Failed'))
// const User = mongoose.model('User', UserSchema)


router.get('/', /*isLoggedIn,*/ (req, res) => {
    res.render('index', { title: 'User page' })
})

router.get('/login', /*isLoggedOut,*/ (req, res) => {
    const response = {
        title: 'Login',
        error: req.query.error,
    }
    res.render('login', response)
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/users/login?error=true',
}))

// setup admin user
router.get('/admin', async (req, res) => {
    const exists = await User.exists({ username: 'admin' })

    if (exists) {
        console.log('user exists')
        res.redirect('/users/login')
        return
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash('admin', salt, function(err, hash) {
            if (err) return next(err)
            const newAdmin = new User({
                username: 'admin',
                password: hash,
            })

            newAdmin.save()

            res.redirect('/users/login')
        })
    })
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next()
    res.redirect('/users')
}

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



module.exports = router;