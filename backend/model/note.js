const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        email:
        {
            type: String,
            required: true
        },
        myNotes:
        {
            type: Array,
            required: true
        }
    }
);
module.exports=mongoose.model("note",noteSchema);