require('dotenv').config()

//modules
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    ejs = require('ejs'),
    path = require('path'),
    session = require('cookie-session'),
    passport = require('passport'),
    passportInit = require('./utils/passportConfig.js'),
    flash = require('express-flash'),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');
    nodemailer = require('nodemailer')
    // twilio = require('twilio')
    // client = new Client();
    // qrcode = require('qrcode-terminal');
    request = require('request')
//routes
const landingRouter = require('./routers/landingRouter.js'),
    loginRouter = require('./routers/loginRouter.js'),
    dashboardRouter = require('./routers/dashboardRouter.js'),
    regRouter = require('./routers/regRouter.js'),
    inviteRouter = require('./routers/inviteRouter.js'),
    adminRouter = require('./routers/adminRouter.js'),
    schoolData = require('./routers/schoolData.js'),
    { botInit, discoIt } = require('./utils/discordBot'),
    userSchema = require('./schemas/userSchema.js'),
    teamSchema = require('./schemas/teamSchema.js');

const app = express(),
    PORT = process.env.PORT || 5000;

//app middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }), express.urlencoded({ extended: true, limit: '1mb' }))
app.use(flash())
app.use(expressLayouts)
app.use('/', express.static('public'))

//passport middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))

passportInit(passport)

//connect mongodb
const dbUri = process.env.MONGO_URI
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Connected to mongodb"))

//discord 
botInit()
//more passport
app.use(passport.initialize())
app.use(passport.session())

//main
app.use('/', landingRouter)
app.use('/register', regRouter)
app.use('/login', loginRouter)
app.use('/invite', inviteRouter)
app.use('/admin', adminRouter)
app.use('/dashboard', dashboardRouter)

app.use((err, req, res, next) => {
    discoIt(err.stack.toString())
    discoIt("App Has Crashed, Please Check The Logs, Trying To Restart On My Own!");
    next()
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
    discoIt("Server started on port " + PORT)
});