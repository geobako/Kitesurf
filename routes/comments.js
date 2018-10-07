var express=require("express");
var router= express.Router({mergeParams:true});
var Kitespot=require("../models/kitespot");
var Comment=require("../models/comment");
var middleware=require("../middleware");


//comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
    Kitespot.findById(req.params.id,function(err,kitespot){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{kitespot:kitespot});
        }
    });
});

//comments create
router.post("/",middleware.isLoggedIn,function(req,res){
    Kitespot.findById(req.params.id,function(err,kitespot){
        if(err){
            req.flash("error","Something went wrong");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    kitespot.comments.push(comment);
                    kitespot.save();
                    req.flash("success","Comment added succesfully");
                    res.redirect("/kitespots/"+ kitespot._id);
                }
            });
        }
    });
});


//edit comment
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{kitespot_id:req.params.id,comment:foundComment});
        }
    });
});

//update route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/kitespots/"+req.params.id);
        }
    });
});

//destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment successfully deleted");
            res.redirect("/kitespots/"+req.params.id);
        }
    })
});










module.exports=router;