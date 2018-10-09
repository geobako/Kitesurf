var express         =require("express");
var app             = express();
var bodyParser      =require("body-parser");
var mongoose        =require("mongoose");
var Kitespot        =require("./models/kitespot");
var Review          = require("./models/review");
var seedDB          =require("./seeds");
var Comment         =require("./models/comment");
var passport        =require("passport");
var LocalStrategy   =require("passport-local");
var User            =require("./models/user");
var methodOverride  =require("method-override");
var flash           =require("connect-flash");
var moment = require("moment");


//requiring routes
var commentRoutes    =require("./routes/comments"),
    kitespotRoutes  =require("./routes/kitespots"),
    reviewRoutes     = require("./routes/review"),
    indexRoutes     =require("./routes/index");





//seedDB(); //seed the database

mongoose.connect("mongodb://localhost/kite_surf_v15",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require("moment");
//passport config
//=============================
app.use(require("express-session")({
    secret:"Heloo stalker",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//=============================

//pass currentUser and message to every route
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error =req.flash("error");
    res.locals.success =req.flash("success");
    next();
});

//config routes
app.use(indexRoutes);
app.use("/kitespots/:id/comments",commentRoutes);
app.use("/kitespots",kitespotRoutes);
app.use("/kitespots/:id/reviews", reviewRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The KiteCamp server has started!!!") ;
});