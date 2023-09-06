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
app.use(morgan('tiny'))

//__dirname && __filename are not available in ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//look in public directory forst for any request
app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req, res) => {
    res.send('Hello World')
}); 


app.listen(PORT, ()=>{
    //runs only in dev mode
    //use DEBUG=* node app.js to display debug mode
    debug(`listening on port ${chalk.bgRed(PORT)}`);
} )