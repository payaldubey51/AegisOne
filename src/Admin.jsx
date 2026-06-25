import {
useEffect,
useState
}
from "react";

import axios
from "axios";

function Admin(){

const[
data,

setData
]=
useState(null);

useEffect(()=>{

load();

},[]);

const load=
async()=>{

try{

const res =
await axios.get(

"http://localhost:5000/analytics"

);

setData(
res.data
);

}

catch(err){

console.log(
err
);

}

};

if(!data){

return(

<h2>

Loading...

</h2>

);

}

return(

<div
style={{

padding:"40px",

background:
"#f5f7fb",

minHeight:
"100vh"

}}
>

<h1
style={{

fontSize:"42px",

marginBottom:"30px"

}}
>

Admin Dashboard

</h1>


<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(3,1fr)",

gap:"20px"

}}
>

<Card
title="Total Alerts"
value={data.totalAlerts}
/>

<Card
title="Active"
value={data.activeAlerts}
/>

<Card
title="Resolved"
value={data.resolvedAlerts}
/>

</div>


<h2
style={{

marginTop:"50px"

}}
>

Recent Activity

</h2>


{

data.recent.map(

(a)=>(

<div

key={a._id}

style={{

background:"white",

padding:"20px",

marginTop:"15px",

borderRadius:"15px"

}}

>

🚨 SOS

<br/>

Lat:

{a.lat}

<br/>

Lng:

{a.lng}

</div>

)

)

}

</div>

);

}

function Card({

title,

value

}){

return(

<div
style={{

background:"white",

padding:"35px",

borderRadius:"20px",

boxShadow:
"0 10px 30px rgba(0,0,0,.1)"

}}
>

<h2>

{title}

</h2>

<h1>

{value}

</h1>

</div>

);

}

export default Admin;