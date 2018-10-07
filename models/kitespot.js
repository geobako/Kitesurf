var mongoose    =require("mongoose");


//schema set up
var kitespotSchema = new mongoose.Schema({
    name: String,
    wind: String,
    image: String,
    description: String,
    author:{
        id:{
           type:mongoose.Schema.Types.ObjectId, 
           ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports=mongoose.model("Kitespot",kitespotSchema);