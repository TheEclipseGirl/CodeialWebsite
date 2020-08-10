const User=require('../models/user');
// Profile Function
module.exports.profile=function(req,res){
  
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


// Create User Function for Sign In
module.exports.createSession=function(req,res){
    // Find THe User
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing in');
            return
        }
        // Handle User Found
        if(user){
            // handle Password which doesn't match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            // Handle Session Creation
            else{
                res.cookie('user_id',user._id);
              return res.redirect('/users/profile');
            }

        }
        // Handle User Not Found
        else{
            return res.redirect('back');
        }
    })
}
