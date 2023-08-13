const note = require('../model/note');

exports.createNote = async (req, res) => {

    //get email id from request
    let emailId = await note.findOne({ 'email': req.body.email })

    if (emailId === null) {

        //if email id is null that means new object with this email and note id is to be created  

        try {
            const response = await note.create({ email: req.body.email, myNotes: req.body.myNotes });
            res.status(200).json(
                {
                    success: true,
                    data: response,
                    message: "note created successfully",
                }
            );
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                data: "error in note creation",
                message: err.message,
            })
        }
    }
    else {

        //if email id is present ,it means that new note is to be added to the object with this email id
        
        try {
            const response = await note.findOneAndUpdate({ email: req.body.email },{ $push: {myNotes:req.body.myNotes[0]}});
            res.status(200).json(
                {
                    success: true,
                    data: response,
                    message: "note added successfully",
                }
            );
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                data: "error in adding new note",
                message: err.message,
            })
        }
    }
}