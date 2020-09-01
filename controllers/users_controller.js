const User=require('../models/user');
const { request } = require('express');
// Profile Function
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:"Codeial Profile",
            profile_user:user
        });
    });
  
}

// Sign Up Function
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial Sign Up"
    });
}

// Sign In Function
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial Sign In"
    });
}
// Create User Function for Sign Up
module.exports.create=function(req,res){
    
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    // Find email
    User.findOne({email:req.body.email}, function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user in signing up');
                    return
                }
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}


// createSession User Function for Sign In
module.exports.createSession=function(req,res){
    return res.redirect('/');

}

// For Sign_out
module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
      return  res.status(401,sent('unauthorized'));

    }
}