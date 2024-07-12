const User = require('../models/user.models');
const bcrypt=reqiure('bcrypt');
const jwt=reqiure('jsonwebtoken');
const saltRounds=10;

async function signup(req, res){
    const{username,password,email}=req.body;
    try{
        const isUserPresent=await User.findOne({email});
        if(isUserPresent){
            return res.status(400).json({
                status:false ,
                message:'User already exists with the current Email',
                error:'User already exists with the current Email',

            })
        }
        
        const cyptedPassword =await bcrypt.hash(password,saltRounds)
        const newUser=await User.create({username,password : cryptedPassword,email});
        return res.status(200).json({
            status:true ,
            message:'User signedup succesfully',
            data: newUser

        })
        

    }
    catch(err){
        console.error(err.message);
        return res.status(500).json({
            status:false ,
            message:'User could not be created, please try again later',
            error:err.message,
        })
    }
}

async function login(req, res){
    const {email,password,username}=req.body;

    try{
        const user=await User.findOne({
            $or: [{username}, {email}]

        })
        if(!user){
            return res.status(400).json({
                status:false ,
                message:'password email combination is not correct',
                error:'password email combination is not correct',

            })
        }
        
        const ispasswordCorrect =await bcrypt.compare(password, user.password)
        if(ispasswordCorrect){
            return res.status(400).json({
                status:false ,
                message:'password email combination is not correct',
                error:'password email combination is not correct',
            })

        }  
        const authorizationToken = await jwt.sign({_id:user._id, email:user.email, username:user.username}) 
        return res.status(200).json({
            status:true ,
            message:'User login succesfull',
            token:authorizationToken,
            data: user

        })
        

    }
    catch(err){
        console.error(err.message);
        return res.status(500).json({
            status:false ,
            message:'User login failed, please try again later',
            error:err.message,
        })
       
    }
    

}

async function getUserDetails(req, res){
    const userId=req.params.userId;

    try{
        const user=await User.findOne(userId).select("-password");
        if(!user){
            return res.status(400).json({
                status:false,
                message:'No user found with the user id',
                error:'No user found with the user id',
            })
        }
        return res.status(200).json({
            status:true ,
            message:'User details fetched  succesfull',
            data: user

        })
    }
    catch(err){
        console.error(err.message);
        return res.status(500).json({
            status:false ,
            message:'could not fetch user details, please try again later',
            error:err.message,
        })

    }         
}

module.exports = {signup, login, getUserDetails}