import {
useEffect,
useState
} from "react";

import axios from "axios";

function LiveAlerts(){

const [
alerts,
setAlerts
]=useState([]);

const load=
async()=>{

try{

const res=
await axios.get(
"http://localhost:5000/alerts"
);

setAlerts(
res.data.slice(0,5)
);

}

catch{}

};

useEffect(()=>{

load();

const timer=
setInterval(
load,
3000
);

return()=>
clearInterval(
timer);

},[]);

const styles={

wrap:{
marginTop:"70px"
},

title:{
fontSize:"34px",
fontWeight:"800",
color:"#dc2626",
marginBottom:"20px"
},

grid:{
display:"grid",
gap:"18px"
},

card:{
background:"white",
padding:"24px",
borderRadius:"22px",
boxShadow:
"0 10px 30px rgba(0,0,0,.08)",

animation:
"fade .4s ease"
},

status:{
color:"#dc2626",
fontWeight:"bold"
}

};

return(

<div style={styles.wrap}>

<h1 style={styles.title}>

🚨 Live Emergency Feed

</h1>

<div style={styles.grid}>

{

alerts.length===0

?

<p>

No active alerts

</p>

:

alerts.map(

(
a,
i
)=>(

<div
key={i}
style={styles.card}
>

<h3>

Alert
#{i+1}

</h3>

<p>

📍

{
Number(
a.lat
).toFixed(4)
}

,

{
Number(
a.lng
).toFixed(4)
}

</p>

<p
style={
styles.status
}
>

Status:
{
a.status
}

</p>

<p>

🕒

{

new Date(
a.createdAt
).toLocaleString()

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

export default LiveAlerts;
