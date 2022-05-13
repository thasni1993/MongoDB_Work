const mongoose = require("mongoose");

const workSchema = mongoose.Schema({
    name: {
        type : String,
        required: true
    }
});
module.exports=mongoose.model('User',workSchema);