const express = require('express')
const app = express()
// require('dotenv').confing()
const PORT = process.env.PORT || 4001
const bodyParser = require('body-parser')
const indexRouter = require('./Routes/index')
const adminRouter = require('./Routes/admin')
const visitRouter = require('./Routes/visit')
const userRouter = require('./Routes/user')
const session = require('express-session');
app.set('view engine','ejs')

app.use(session({
    secret: 'secret', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
  }));

app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))

app.use((req,res,next)=>{
    console.log(req.method,req.url)
    next()
})

app.use('/',indexRouter)

app.use('/admin' ,adminRouter)

app.use('/visit',visitRouter)

app.use('/users',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})