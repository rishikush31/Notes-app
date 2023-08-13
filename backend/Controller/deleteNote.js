const note = require('../model/note');

exports.deleteNote = async (req, res) => {

    //search the email id in note and find the object with given email id
    let myNotesobj = await note.findOne({ 'email': req.body.email });

    // get the index of the note to be deleted
    let index = req.body.index;

    //this is size of the myNotes array
    let size = Object.keys(myNotesobj.myNotes).length

    if (index<size) {
        
        // remove the note of index=(index) from the newly created myNoteObject
        myNotesobj.myNotes.splice(index,1);

        try {
            let response = await note.findOneAndUpdate({ 'email': req.body.email }, { $set: { myNotes: myNotesobj.myNotes } });
            res.status(200).json(
                {
                    success: true,
                    data: response,
                    message: "note deleted successfully",
                }
            );
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                data: "error in note deletion",
                message: err.message,
            })
        }
    }
    else {
        // this means that the given index is greter than the size of array hence index is wrong
        res.send({
            success: false,
            data: "invalid index (index is greter than the size)",
        })
    }
}