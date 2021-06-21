const express               = require('express')
const programRouter         = require('./program')
const teacherRouter         = require('./teacher')
const classRouter           = require('./class')
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

// router.use(auth.isAdmin())

router.use('/api/teacher', teacherRouter)
router.use('/api/program', programRouter)
router.use('/api/class',   classRouter)


module.exports = router