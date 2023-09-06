import express from 'express';
import chalk  from 'chalk'; 
import debug from 'debug';


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
}); 


let port= 4000;
app.listen(port, ()=>{
    //runs only in dev mode
    //use DEBUG=* node app.js to display debug mode
    debug(`listening on port ${chalk.green(port)}`);
} )