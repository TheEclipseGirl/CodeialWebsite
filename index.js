const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { Mongoose } = require('mongoose');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');


// FOR SASS
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));


// for form
app.use(express.urlencoded({ useNewUrlParser: true }));

// for cookies
app.use(cookieParser());

// ejs layouts middleware
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// assets middleware
app.use(express.static('./assets'));

//for express session using passport
app.use(session({
    name: 'codeial',
    secret: 'aamirhafiez',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect_mongoDb SetUp Ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//routing middleware
app.use('/', require('./routes'));

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`OOPs!! Error in running server: ${err}`);
        return;
    }
    console.log(`Great!! Server is up and running at: ${port}`);
});