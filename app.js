import express from 'express';
import chalk  from 'chalk'; 
import debug from 'debug';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';

const PORT = process.env.PORT
console.log('IM listening on port' + ' '+ PORT)
const app = express();
//morgan middleware to use with debug
app.use(morgan('tiny'))  //app.use => declares use of middleware

//__dirname && __filename are not available in ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//look in public directory forst for any request
app.use(express.static(path.join(__dirname, '/public/')));

//app.set => set variables inside our environment app
app.set('views', './src/views') 
app.set('view engine', 'ejs') 

app.get('/', (req, res) => { //app.get => send responses for GET requests
    res.render('index', {title:"Globalmantics"})
}); 


app.listen(PORT, ()=>{
    //runs only in dev mode
    //use DEBUG=* node app.js to display debug mode
    debug(`listening on port ${chalk.bgRed(PORT)}`);
} )