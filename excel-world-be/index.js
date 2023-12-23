import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { connectionDB } from './config/db.js'
import { signUpWithGoogle, signUpWithTwitter } from './controllers/auth.js'
import authRouter from './routers/auth.js'
import adminRouter from './routers/admin.js'
import aboutRouter from './routers/about.js'
import contactRouter from './routers/contact.js'
import blogRouter from './routers/blog.js'
import userRouter from './routers/user.js'
import homeYoutubeRouter from './routers/homeYoutube.js'
import pastInPicRouter from './routers/pastInPic.js'
import paymentRoute from './stripe/index.js'
import resourceRouter from './routers/resource.js'
import usefulLinkRouter from './routers/usefulLink.js'


dotenv.config()
const app = express()
connectionDB()
const PORT = process.env.PORT || 5050

//google oauth
signUpWithGoogle()
//twitter oauth
signUpWithTwitter()

//AuthMiddleWare

app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors({ origin: ["http://localhost:3000", "https://excel-world.vercel.app"] }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static('public'))


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

// passport

app.use(passport.initialize());
app.use(passport.session());


//Routers

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/about', aboutRouter)
app.use('/contact-create', contactRouter)
app.use('/blogs', blogRouter)
app.use('/user', userRouter)
app.use('/home_youtubeLink', homeYoutubeRouter)
app.use('/past_In_Picture', pastInPicRouter)
app.use('/payment', paymentRoute)
app.use('/resource', resourceRouter)
app.use('/useful_Links', usefulLinkRouter)


app.listen(PORT, () => console.log(`Port ${PORT} server is up ....`))

