const express = require('express');
const {urlencoded, json} = require('express');
const cors = require('cors');
const router = require('./routes/tiquetes.routes.js');
const app = express();
const client= require ('./db/database.js');




app.use(urlencoded({extended: true}))
app.use(json())
app.use(cors())
app.use('/v1/tiquetes', router);

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})

