module.exports.home=function(req,res){
    // return res.end('<h1> Express is up for codeial </h1>');
     console.log(req.cookies);
    return res.render("home",{
        title:"Codeial | Home"
    });
    // or
    // return res.render('home',{title:"Home"});
}