var express=require("express");
var router= express.Router();
var Kitespot=require("../models/kitespot");
var Comment=require("../models/comment");
var middleware=require("../middleware");





// Kitespotss Route
router.get("/",function(req,res){
    
    // Get kitespots from db
    Kitespot.find({},function(err,allkitespots){
        if(err){
            console.log(err);
        }else{
             res.render("kitespots/index",{kitespots:allkitespots, page: 'kitespots'});
        }
    });
   
});

//add a kitespot
router.post("/", middleware.isLoggedIn ,function(req,res){
    //get data from the form
     var name=req.body.name;
     var wind=req.body.wind;
     var image=req.body.image;
     var desc = req.body.description;
     var author={
         id:req.user._id,
         username: req.user.username
     };
     var newKitespot={name:name,wind:wind,image:image,description:desc, author:author};
     
     //Create new kitespot and save to db
     Kitespot.create(newKitespot,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to kitespots
            res.redirect("/kitespots");
        }
     });
     
     
     
});
//The form to add new kitespots
router.get("/new", middleware.isLoggedIn ,function(req,res){
    res.render("kitespots/new");
});

// SHOW ROUTE
router.get("/:id",function(req,res){
    Kitespot.findById(req.params.id).populate("comments").exec(function(err,foundSpot){
        if(err || !foundSpot){
            console.log(err);
            req.flash('error', 'Sorry, that kitespot does not exist!');
            return res.redirect("/kitespots");
        }
        res.render("kitespots/show",{kitespot:foundSpot}) ;
        
    });      
    
});

//edit route
router.get("/:id/edit",middleware.checkKitespotOwnership, function(req,res){
    Kitespot.findById(req.params.id, function(err,foundKitespot){
        if (err){
            req.flash("error","Kitespot not found");
        }else{
        res.render("kitespots/edit",{kitespot:foundKitespot}) ;
        }  
      });
});

//update route
router.put("/:id",middleware.checkKitespotOwnership,function(req,res){
    
   Kitespot.findByIdAndUpdate(req.params.id,req.body.kitespot,function(err,updatedKitspot){
       if(err){
           res.redirect("/kitespots");
       }else{
           res.redirect("/kitespots/" + req.params.id);
       }
   }) ;
});


//destroy kitespot route
router.delete("/:id",middleware.checkKitespotOwnership, function(req,res){
    Kitespot.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/kitespots");
        }else{
            res.redirect("/kitespots");
        }
    });
});









module.exports=router;