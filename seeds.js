var mongoose    =require("mongoose");
var Kitespot    =require("./models/kitespot");
var Comment   = require("./models/comment");

var data=[
    {
        name:"Loutsa's Agios Nikolaos beach",
        image:"https://images.unsplash.com/photo-1534548745320-bd2c9ed314ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4687ae370825a04f7b49ac2fb95bf957&auto=format&fit=crop&w=1950&q=80",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod ullamcorper enim, at iaculis ante pulvinar euismod. Etiam aliquet lorem at sem tempor, quis bibendum sem pharetra. Nullam vel commodo erat, eu vehicula elit. Nam laoreet tortor id urna condimentum porttitor. Ut ac porttitor leo. Vivamus eu tristique lectus. Nunc feugiat urna ac justo dictum sagittis. Sed id massa scelerisque, vulputate velit id, mollis elit. Vestibulum feugiat accumsan ligula, quis dignissim risus consectetur eu. Donec eget venenatis erat. Pellentesque volutpat orci sit amet odio consectetur volutpat."
    },
     {
        name:"Lefkada",
        image:"https://images.unsplash.com/photo-1530091731612-0b2d7278ca14?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6f00c5ecd487b177db40b49fa6df5035&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod ullamcorper enim, at iaculis ante pulvinar euismod. Etiam aliquet lorem at sem tempor, quis bibendum sem pharetra. Nullam vel commodo erat, eu vehicula elit. Nam laoreet tortor id urna condimentum porttitor. Ut ac porttitor leo. Vivamus eu tristique lectus. Nunc feugiat urna ac justo dictum sagittis. Sed id massa scelerisque, vulputate velit id, mollis elit. Vestibulum feugiat accumsan ligula, quis dignissim risus consectetur eu. Donec eget venenatis erat. Pellentesque volutpat orci sit amet odio consectetur volutpat."
    },
     {
        name:"Rhodes",
        image:"https://images.unsplash.com/photo-1526932214254-c630abc1a424?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d958d0678bdeb28564b412b9f994bad&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod ullamcorper enim, at iaculis ante pulvinar euismod. Etiam aliquet lorem at sem tempor, quis bibendum sem pharetra. Nullam vel commodo erat, eu vehicula elit. Nam laoreet tortor id urna condimentum porttitor. Ut ac porttitor leo. Vivamus eu tristique lectus. Nunc feugiat urna ac justo dictum sagittis. Sed id massa scelerisque, vulputate velit id, mollis elit. Vestibulum feugiat accumsan ligula, quis dignissim risus consectetur eu. Donec eget venenatis erat. Pellentesque volutpat orci sit amet odio consectetur volutpat."
    },
     {
        name:"Drepano Village",
        image:"https://images.unsplash.com/photo-1526050168840-5baf342fdb2f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8b514b8385bcdaf8ef02440ef4d92f47&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod ullamcorper enim, at iaculis ante pulvinar euismod. Etiam aliquet lorem at sem tempor, quis bibendum sem pharetra. Nullam vel commodo erat, eu vehicula elit. Nam laoreet tortor id urna condimentum porttitor. Ut ac porttitor leo. Vivamus eu tristique lectus. Nunc feugiat urna ac justo dictum sagittis. Sed id massa scelerisque, vulputate velit id, mollis elit. Vestibulum feugiat accumsan ligula, quis dignissim risus consectetur eu. Donec eget venenatis erat. Pellentesque volutpat orci sit amet odio consectetur volutpat."
    }
];

function seedDB(){
    //Remove all kitespots
    Kitespot.remove({},function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed kitespots");
        // Comment.remove({},function(err){
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
        //     data.forEach(function(seed){
        //         Kitespot.create(seed,function(err,kitespot){
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 console.log("added kitespot");
        //                 //create comment
        //                 Comment.create(
        //                     {
        //                         text:"This is a great spot...very windy",
        //                         author:"Kostas"
        //                     },function(err,comment){
        //                         if(err){
        //                             console.log(err);
        //                         }else{
        //                             kitespot.comments.push(comment);
        //                             kitespot.save();
        //                             console.log("New comment created");
        //                         }
        //                     });
        //             }
        //         });
        //     });
        // });
    });
        
}


module.exports= seedDB;