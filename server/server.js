require('dotenv').config()
// console.log(process.env.SERVERPORT) 
const express = require('express');
const cors = require('cors');
const app = express();

require('./config/mongoose.config')

app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));
require('./routes/food.routes')(app);





app.listen(process.env.SERVERPORT, () => console.log(`Listing on port: ${process.env.SERVERPORT}`));
