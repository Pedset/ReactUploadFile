const express = require('express');
const routes = require('./source/routes');


const app = express();
//app.use(express.static('public'));
app.use('/', routes);


app.listen(3000,()=>{
console.log("Server is up and running!");
});