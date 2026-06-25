const mongoose=require("mongoose");

const AlertSchema=
new mongoose.Schema({

lat:Number,

lng:Number,

status:{
type:String,
default:"ACTIVE"
},

assignedTo:{
type:String,
default:null
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports=
mongoose.model(
"Alert",
AlertSchema
);