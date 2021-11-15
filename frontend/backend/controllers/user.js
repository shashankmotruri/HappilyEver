const UserSchema = require('../models/UserModel');
const path = require("path");
const fs = require('fs');
const util = require("util"); 
const formidable = require('formidable');



exports.SignupUser = function(req,res,next){

    if( !req.body.username || !req.body.password ){
        return res.status(401).send({ msg : "Enter All Fields" })
    }
    else{
        
        UserSchema.findOne({username : req.body.username},function(err,user){
            if(user){
                return res.status(401).send({ msg : "User already exists" });
            }
            else{
                let currUser = new UserSchema({username: req.body.username, password: req.body.password});

                currUser.save(function (err) {
                    if (err) { 
                      return res.status(500).send({msg:err.message});
                    }
                    else{
                        return res.status(200).send({msg : "User Saved Successfully" , currUser})
                    }
                })
            }
        })
    
  
    }
}

exports.LoginUser = async function(req,res,next){

    if( !req.body.username || !req.body.password ){
        return res.status(401).send({ msg : "Enter All Fields" })
    }
    else{
        UserSchema.findOne({username : req.body.username,password:req.body.password},function(err,user){
            if(err){
                return res.status(404).send({ msg : "User Not Found" })
            }
            else{
                if(!user){
                    return res.status(404).send({ msg : "User Not Found" })
                }
                if(user.password !== req.body.password){
                    return res.status(401).send({ msg : "password does not match"})
                }
                if(user.username !== req.body.username){
                    return res.status(401).send({ msg : "username does not match"})
                }

                let currUser = {
                    "_id": user._id,
                    "username": user.username,
                    "createdAt": user.createdAt,
                    "updatedAt": user.updatedAt,
                }
                return res.status(200).send({msg : "Successfully Logged in",currUser});
            }
            
        });
    }
}


exports.UpdateUser = async function(req,res){
    let userId = req.params.id;
    //console.log(req.file);

    if(!req.file || !req.body.name || !req.body.religion || !req.body.dob || !req.body.height){
        return res.status(401).send({msg : "Enter all Fields"});
    }
    else{
        try{
            let user = await UserSchema.findByIdAndUpdate
            (
                userId,
                {
                name : req.body.name,
                religion : req.body.religion,
                dob: req.body.dob,
                height : req.body.height,
                img: {
                    data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
                }
                },
                {
                    new: true,
                    runValidators: true,
                }
            )
            if(user) {
                return res.status(200).json({msg : "User Updated Sycessfull"})
            }
        } 
        catch (err) {
            console.log(err)
        return res.status(400).json({msg : "Failed to Update User"});
        }

    }

}


exports.DeleteUser = function(req,res,next){
    UserSchema.findByIdAndRemove(req.params.id, function(err,data)
    {
        if(!err){
           return res.status(200).json({msg: "Deleted Successfully"});
        }
        else{
            return res.status(500).send({msg : err.message});
        }
    });
}

exports.GetAllUsers = function(req,res,next){

    UserSchema.find({user_id:req.params.id},function(err,users){
     
        let AllUsers = {};

        users.forEach(function(user){
            AllUsers[user._id] = user
        })
        if(err){
            return res.status(500).send({msg: err.message});
        }
        else if(!users){
            return res.status(401).send({msg : "Nothing Found..."})
        }
        else{
            return res.status(200).json(AllUsers)
        }
    })
}


exports.GetUserById = function(req,res,next){

    UserSchema.findOne({_id:req.params.id},function(err,user){
        if(err){
            return res.status(500).send({msg: err.message});
        }
        else if(!user){
            return res.status(401).send({msg : "Nothing Found Please try again..."})
        }
        else{
            return res.status(200).json(user)
        }
    })
}

