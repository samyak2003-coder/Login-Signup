const mongoose= require('mongoose');
mongoose.connect("mongodb://localhost:27017/myDB")
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((e) => {
    console.log(e)
})

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }
})

const collection = mongoose.model("users", UserSchema)
module.exports= collection