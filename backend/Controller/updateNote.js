const note = require('../model/note');

exports.updateNote = async (req, res) => {

    // get the notes object with given email
    let myNotesobj = await note.findOne({ 'email': req.body.email });

    // get the index of the note to be updated
    let index = req.body.index;

    // get the size of myNotes array
    let size = Object.keys(myNotesobj.myNotes).length

    if (index<size) {

        //replace the desired indexed note to newNote 
        myNotesobj.myNotes[index] = req.body.newNote[0];

        try {
            let response = await note.findOneAndUpdate({ 'email': req.body.email }, { $set: { myNotes: myNotesobj.myNotes } });
            res.status(200).json(
                {
                    success: true,
                    data: response,
                    message: "note updated successfully",
                }
            );
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                data: "error note updation",
                message: err.message,
            })
        }
    }
    else {
        res.send({
            success: false,
            data: "invalid index (index greater the size of myNotes object)",
            message: "invalid index (index greater the size of myNotes object)",
        })
    }
}