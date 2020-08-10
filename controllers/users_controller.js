// Profile Function
module.exports.profile=function(req,res){
    return res.render("profile",{
        title:"Codeial | Profile"
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

}

// Create User Function for Sign In
module.exports.createSession=function(req,res){

}


// localhost:8000
// localhost:8000/users/profile
