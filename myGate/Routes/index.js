const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
router.get('/', (req, res) => {
    res.render('home')
})

router.get('/about', (req, res) => {
    res.render('about')
})


router.get('/sps', (req, res) => {
    res.render('sps')
})

router.get('/invoice', (req, res) => {
    res.render('invoice')
})
router.get('/tat', (req, res) => {
    res.render('tat')
})

router.get('/visit', async(req, res) => {
    const data = await prisma.users.findMany({
        orderBy:{created_at:'desc'},
        select:{
            name:true
        }
    })

    const usernames =  data.map((user)=>user.name)
    usernames.unshift("----------------------------------Select---------------------------------")
    res.render('visit',{
        usernames:usernames,
        isError:false,
        message:""

    })
})

router.get('/contact', (req, res) => {
    res.render('contact',{
        isError: false,
        message: ""
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        isError: false,
        message: ""
    })
})

router.get('/signup', (req, res) => {
    res.render('signup', {
        isError: false,
        message: ""
    })
})

router.get('/forgot-password', (req, res) => {
    res.render('forgotPassword', {
        isError: false,
        message: ""
    })
})

router.get('/reset-password/:token',(req,res)=>{
    let hash = req.params.token
    res.render('resetPassword',{
        hash:hash
    })
})


module.exports = router