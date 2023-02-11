//const bodyParser = require('body-parser');
const express=require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose')





//------------------Routes----------------------//
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');


//-----------------Db coonection------------------//
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



app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoute);
app.use('/api', productRoute);


// ==============================================
// START THE SERVER
// ==============================================
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});