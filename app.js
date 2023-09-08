import express from 'express';
import chalk  from 'chalk'; 
import debug from 'debug';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import passport from 'passport'; // Passport is Express-compatible authentication middleware for Node.js
import cookieParser from 'cookie-parser'
import session from 'express-session'

import sessionsRouter from './src/routers/sessionsRouter.js';
import adminRouter from './src/routers/adminRouter.js';
import authRouter from './src/routers/authRouter.js';

import passportConfig from './src/config/passport.js';

const debugApp = debug('app')
const PORT = process.env.PORT || 4000

const app = express();

//__dirname && __filename are not available in ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//THE ORDER OF THESE MIDDLEWARE IS IMPORTANT
//morgan middleware to use with debug
app.use(morgan('tiny'))  //app.use => declares use of middleware
//look in public directory forst for any request
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json())
app.use(express.urlencoded({extended: false}));
//use to authenticate user
app.use(cookieParser())
app.use(session({secret:'globomantics'}))

const passConfig = passportConfig(app)

//app.set => set variables inside our environment app
app.set('views', './src/views') 
app.set('view engine', 'ejs') 



app.use('/sessions', sessionsRouter);//middleware to handle session
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => { //app.get => send responses for GET requests
    res.render('index', {
        title:"Globomantics",
        data: ['a', 'b', 'c']
    })
}); 


app.listen(PORT, ()=>{
    //runs only in dev mode
    //use DEBUG=* node app.js to display debug mode
    debugApp(`listening on port ${chalk.bgRed(PORT)}`);
} )