const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
}) 

let port= 4000
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
} )