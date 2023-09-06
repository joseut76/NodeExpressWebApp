import express from 'express';
import chalk  from 'chalk'; 

const app = express();



app.get('/', (req, res) => {
    res.send('Hello World')
}) 

let port= 4000
app.listen(port, ()=>{
    console.log('listening on port ' + chalk.green(port));
} )