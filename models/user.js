const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registrationSchema = new Schema({
   name: {
        type: String,
        required: [true, 'Name is required'],
        match: [/^[\w\s]+$/, 'Name contains invalid characters']
    },
    username:{
        type:String,
        required:[true,"this is required!"],
        unique:true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    }
})
const register = mongoose.model('details',registrationSchema);
module.exports = register;























// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required'],
//         match: [/^[\w\s]+$/, 'Name contains invalid characters']
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         match: [/\S+@\S+\.\S+/, 'Invalid email format']
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: [6, 'Password must be at least 6 characters long']
//     },
//     phone: {
//         type: String,
//         required: [true, 'Phone number is required'],
//         match: [/^\d{10}$/, 'Phone number must be 10 digits']
//     }
// });

// const User = mongoose.model('User', userSchema);
