const bodyParser = require('body-parser');
const express=require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose')





//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')




mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/ecommerce',

    {
        
       
    }
)

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open",function(){
    
    console.log("database connect successfully...")
})

app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});