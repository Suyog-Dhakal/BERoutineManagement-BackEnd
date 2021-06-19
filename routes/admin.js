const express               = require('express')
const programRouter         = require('./program')
const teacherRouter         = require('./teacher')
const User                  = require('../Schema/userSchema')
const auth                  = require('../config/auth')


const router = express.Router()


// setup admin user
router.get('/', async (req, res) => {
    const exists = await User.exists({ username: 'admin' })
    
    if (exists) {
        console.log('user exists')
        res.redirect('/user/login')
        return
    }
    
    const newAdmin = new User({
        username: 'admin',
        password: auth.hash('admin'),
    })
    newAdmin.save()
    
    res.redirect('/user/login')
})

router.use('/api/teacher', auth.isAdmin, teacherRouter)
router.use('/api/program', auth.isAdmin, programRouter)


module.exports = router