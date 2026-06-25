import { useEffect, useState } from "react";
import axios from "axios";

function HomeExtras(){

const [
alerts,
setAlerts
]=useState([]);

const user=
localStorage.getItem(
"name"
)
||
"Guest";

const load=
async()=>{

try{

const res=
await axios.get(
"http://localhost:5000/alerts"
);

setAlerts(
res.data
);

}

catch{}

};

useEffect(()=>{

load();

const timer=
setInterval(
load,
5000
);

return()=>
clearInterval(
timer
);

},[]);

return(

<div>

<div style={header}>

<div>

<h2>

👋 Welcome,
{user}

</h2>

<p>

Stay aware and stay safe

</p>

</div>

<div style={bell}>

🔔

{

alerts.length>0

&&

<span style={badge}>

{alerts.length}

</span>

}

</div>

</div>

<div style={feed}>

<h2>

Recent Activity

</h2>

{

alerts.length===0

?

<p>

No alerts yet

</p>

:

alerts
.slice(
0,
3
)

.map(

(a)=>(

<div
key={a._id}
style={card}
>

<h3>

🚨
{a.status}

</h3>

<p>

Lat:
{
Number(
a.lat
)
.toFixed(2)
}

</p>

<p>

Lng:
{
Number(
a.lng
)
.toFixed(2)
}

</p>

</div>

)

)

}

</div>

</div>

);

}

const header={

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginTop:"60px"

};

const bell={

position:"relative",

fontSize:"38px"

};

const badge={

position:"absolute",

top:"-8px",

right:"-8px",

background:"#dc2626",

color:"white",

width:"24px",

height:"24px",

borderRadius:"50%",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"12px"

};

const feed={

marginTop:"30px",

display:"grid",

gap:"20px"

};

const card={

background:"white",

padding:"25px",

borderRadius:"18px",

boxShadow:
"0 10px 25px rgba(0,0,0,.08)"

};

export default HomeExtras;
