import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id:{
        required:true,
        type: String,
    },
    email:{
        required: true,
        type: String
    },
    name: String,
    addressLine1: String,
    city: String,
    country: String
},{timestamps:{}})

const User = mongoose.model('User', userSchema);

export default User;