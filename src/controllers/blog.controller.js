const Blog = require('../models/blog.models');
const User=require('../models/user.models')

async function createBlog(req, res){
    res.send('working')
    const userid =req.user._id;
    const{title ,description,tag,imageUrl} = req.body;
    const documentObject ={}
    if(tag) documentObject.tag=tag;
    if(imageUrl) documentObject.imageUrl =imageUrl;
     try{

        const user=await  User.findByTd(userId);
        if(!user){
            return res.status(400).json({
                status:false,
                message:'Something went wrong',
                error:'Something went wrong',
                
                
            })
        }
     }

}
module.exports = {createBlog}