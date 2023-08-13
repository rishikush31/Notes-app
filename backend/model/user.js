const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        myProfilePic: {
            type:String
        }
    }
);
module.exports = mongoose.model("user", userSchema);