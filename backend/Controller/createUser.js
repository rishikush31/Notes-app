const user = require('../model/user');
const userCredential = require('../model/userCredential')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {    

    //get errors array of results of body validation written in route
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success:false , 
            meaasage:"invalid entries" , 
            errors: errors.array() 
        });
    }

    // email to be registered
    const email = req.body.email;

    // check if this email is already registered
    const otheremail = await user.findOne({email});

    if(otheremail)
    {
        // if email is already regitered return response
        return res.status(404).json({ 
            success: false, 
            message: "This email is already registered ,try other email or log in to this email", 
            errors: "email already registered" 
        })
    } 

    //generate salt
    const salt = await bcrypt.genSalt(10);
    
    //generate encoded password using salt
    let secpassword = await bcrypt.hash(req.body.password, salt);

    try {
        const responseOfUserCreation = await user.create({ name: req.body.name, email: req.body.email, location: req.body.location,myProfilePic:"" });
        const responseOfUserCredentials=await userCredential.create({name: req.body.name,email:req.body.email,password:secpassword});
        res.status(200).json(
            {
                success: true,
                data: [responseOfUserCreation,responseOfUserCredentials],
                message: "user created successfully",
            }
        );
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error in user creation",
            message: err.message,
        })
    }
}