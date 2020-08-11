const passport=require('passport');
const User = require('../models/user');
const LocalStrategy=require('passport-local').Strategy;
// Authentication Using Passport
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function(email,password,done){
        // find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            if(!user || user.password!=password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));
//  Serializing the user to decide which key is to be kept in the cookies
        passport.serializeUser(function(user,done){
            done(null,user._id);
        })

// desearilizing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> PASSPORT');
            return done(err);
        }
        return done(null, user);
    });
});

// check user is Authenticated if user is authenticated
passport.checkAuthentication=function(req,res,next){
    // if user is signed in ,then pass on the next function
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed-in
    return res.redirect('/users/sign-in');
}

passport.notAuthenticated=function(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return next();
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
// req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}


module.exports = passport;