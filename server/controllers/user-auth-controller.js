const User=require('../models/user');

exports.getAuthentication=function(req,res){
    let username=req.body.username;
    let foundUser=User.findUsername(username);
    if(foundUser)
        {   
            let password=req.body.password;
            if(password==foundUser.password){
            res.status(200).json({"username": username, "password": password});}
            else
            {
                res.status(401).json( "password does not match");  
            }
        }
    else{
        res.status(401).json( "User does not exist");
    }

    
}

