const jwt = require('jsonwebtoken');
const jwtSecret = "MYnameisRishiKushFoodwebsiteHello";
const user = require('../model/user')

exports.SocialLogin = async (req, res) => {

    // email in req body
    let email = req.body.email;

    // find the user object 
    let userData = await user.findOne({ email });

    // if we dont find the user object that means that no such email is registered 
    if (!userData) {
      
        userData = await user.create({ name: req.body.name, email: req.body.email, location:"",myProfilePic:req.body.myProfilePic });
     
    }

    userData = await user.findOne({ email });

    const data = {
        user: {
            id: userData.id
        }
    }

    const authToken = jwt.sign(data, jwtSecret);        

    //return authentication token 
    return res.json({ 
        success: true, 
        myProfilePic:userData.myProfilePic,
        name:userData.name,
        email:userData.email,
        authToken: authToken 
    });
}