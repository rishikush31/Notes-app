// const { default: Mynotes } = require('../../src/pages/Mynotes');
const note = require('../model/note');

exports.getMyNotes = async (req,res) => {
  try{

    //find notes object with email in body
    let myNotes=await note.findOne({'email':req.body.email});

    if(!myNotes)
    {
      // if there are no notes present
      return res.send({
        success:false,
        message:"no note entered"
      })
    }
    
    //send this myNotes object 
    res.send({
        success:true,
        data:myNotes,
        message:"fetch success",
    })
  }
  catch(err)
  {
    console.error(err.message);
    res.status(500).json({
        success: false,
        data: "error in fetching",
        message: err.message,
    })
  }
}