var Kitespot=require("../models/kitespot");
var Comment=require("../models/comment");
var Review = require("../models/review");

var middlewareObj={};


middlewareObj.checkKitespotOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        
        Kitespot.findById(req.params.id, function(err,foundKitespot){
        if(err){
            req.flash("error","Kitespot not found");
            res.redirect("back");
        }else{
            if(foundKitespot.author.id.equals(req.user._id)){
               next() ;
            }else{
                req.flash("error","You dont have permission to do that");
                res.redirect("back");
            }
            
        }
      });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        
        Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            if(foundComment.author.id.equals(req.user._id)){
               next() ;
            }else{
                req.flash("error","You do not have permission to do that");
                res.redirect("back");
            }
            
        }
      });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkReviewOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Review.findById(req.params.review_id, function(err, foundReview){
            if(err || !foundReview){
                res.redirect("back");
            }  else {
                // does user own the comment?
                if(foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkReviewExistence = function (req, res, next) {
    if (req.isAuthenticated()) {
        Kitespot.findById(req.params.id).populate("reviews").exec(function (err, foundKitespot) {
            if (err || !foundKitespot) {
                req.flash("error", "Kitespot not found.");
                res.redirect("back");
            } else {
                // check if req.user._id exists in foundCampground.reviews
                var foundUserReview = foundKitespot.reviews.some(function (review) {
                    return review.author.id.equals(req.user._id);
                });
                if (foundUserReview) {
                    req.flash("error", "You already wrote a review.");
                    return res.redirect("back");
                }
                // if the review was not found, go to the next middleware
                next();
            }
        });
    } else {
        req.flash("error", "You need to login first.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
};




module.exports = middlewareObj ;