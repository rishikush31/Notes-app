const user = require('../model/user');

exports.uploadProfilePic = async (req, res) => {

    try
    {
        await user.findOneAndUpdate({email:req.body.email},{ $set: { myProfilePic: req.body.myProfilePic }}); res.status(200).json(
            {
                success: true,
                message: "Profile Picture updated successfully",
            }
        );
    }
    catch (err) {
        // console.error(err);
        res.status(500).json({
            success: false,
            data: "error in Profile Pic Updation",
            message: err.message,
        })
        console.log(err.message);
    }
}
