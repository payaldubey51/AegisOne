const mongoose=
require("mongoose");

const schema=
new mongoose.Schema({

name:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

relation:{
type:String,
required:true
},

primary:{
type:Boolean,
default:false
}

},
{
timestamps:true
});

module.exports=
mongoose.model(
"Contact",
schema
);