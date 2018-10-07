var express=require("express");
var router= express.Router();
var User=require("../models/user");
var passport=require("passport");


// Landing Page Route
router.get("/",function(req,res){
   res.render("landing");
});


//AUTH ROUTES
//=========

//register routes
router.get("/register",function(req,res){
    res.render("register", {page: 'register'});
});

router.post("/register",function(req,res){
    var newUser= new User({username:req.body.username});    
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Hello " +user.username+", welcome to Kitesurf");
            res.redirect("/kitespots");
        });
    }) ;
});

//login routes
router.get("/login",function(req,res){
   res.render("login", {page: 'login'}); 
});

router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/kitespots",
        failureRedirect:"/login"
    }),function(req,res){
    
});

//logout route
router.get("/logout",function(req,res){
   req.logout();
   req.flash("success","Successfuly logged out");
   res.redirect("/kitespots");
});
//=========




module.exports=router;