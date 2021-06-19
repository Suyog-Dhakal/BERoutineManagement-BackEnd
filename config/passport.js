const passport              = require('passport')
const bcrypt                = require('bcrypt')
const LocalStrategy         = require('passport-local').Strategy
const User                  = require('../Schema/userSchema')


passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err) }
        if (!user) { return done(null, false, { message: 'Incorrect username' })}

        bcrypt.compare(password, user.password, function(err, res){
            if (err) return done(err)
            if (res === false) return done(null, false, { message: 'Incorrect password' })

            return done(null, user)
        })
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})