function hash(password) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(password, salt, function(err, hashed) {
            if (err) return next(err)
            return hashed
        })
    })
}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/user/login')
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next()
    res.redirect('/user')
}

function isAdmin() {

}



module.exports.hash         = hash;
module.exports.isLoggedIn   = isLoggedIn;
module.exports.isLoggedOut  = isLoggedOut;
module.exports.isAdmin      = isAdmin;