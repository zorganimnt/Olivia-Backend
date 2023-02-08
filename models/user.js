const mongoose = require('mongoose');
const bcrypt= require ('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['customer','admin','seller'],
        default: 'customer'
    },
    contact:{
        type: String
    },
    picture: {
        type: String 
    }

});

//hash password
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

userSchema.methods ={
    authenticate: function(password){
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = mongoose.model('User', userSchema);