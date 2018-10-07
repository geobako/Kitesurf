var Kitespot=require("../models/kitespot");
var Comment=require("../models/comment");

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

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
};

// middlewareObj.checkUserKitespot= function(req, res, next){
//     Kitespot.findById(req.params.id, function(err, foundKitespot){
//       if(err || !foundKitespot){
//           console.log(err);
//           req.flash('error', 'Sorry, that kitespot does not exist!');
//           res.redirect('/kitespots');
//       } else if(foundKitespot.author.id.equals(req.user._id) || req.user.isAdmin){
//           req.kitespot = foundKitespot;
//           next();
//       } else {
//           req.flash('error', 'You don\'t have permission to do that!');
//           res.redirect('/kitespots/' + req.params.id);
//       }
//     });
//  };

// middlewareObj.checkUserComment = function(req, res, next){
//     Comment.findById(req.params.commentId, function(err, foundComment){
//       if(err || !foundComment){
//           console.log(err);
//           req.flash('error', 'Sorry, that comment does not exist!');
//           res.redirect('/kitespots');
//       } else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
//             req.comment = foundComment;
//             next();
//       } else {
//           req.flash('error', 'You don\'t have permission to do that!');
//           res.redirect('/kitespots/' + req.params.id);
//       }
//     });
//   },


module.exports = middlewareObj ;