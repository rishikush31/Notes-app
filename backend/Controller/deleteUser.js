const note = require('../model/note');
const user = require('../model/user');

exports.deleteUser = async (req, res) => {

    await note.findOneAndDelete({'email': req.body.email });

    await user.findOneAndDelete({'email': req.body.email });

    return res.send({
        success:true,
        message : "your id deleted"
    })
}