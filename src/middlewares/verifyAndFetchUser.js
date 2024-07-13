async function verifyAndFetchUser(){
    const token =req.headers.authorization.spilt(' ')[1];
    if(!token){
        return res.status(401).json({status:false,message:'token is reqiured'})
    }
    try{
       const userData=await jwt.verify(token,process.env.JWT_SECRET)
       console.log(userData);
       req.user = userData;
       next()
    }
    catch(err){
        return res.status(401).json({status:false,message:'user authorization failed'})
    }
}
module.exports={verifyAndFetchUser}