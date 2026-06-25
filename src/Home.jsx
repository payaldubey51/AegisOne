import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
useState,
useEffect,
useCallback
} from "react";

import HomeExtras from "./HomeExtras";
import EmergencyContacts from "./EmergencyContacts";
import SafetyPanel from "./SafetyPanel";
import LiveAlerts from "./LiveAlerts";
import EmergencyActions from "./EmergencyActions";
import SOSNotifications from "./SOSNotifications";
import VoiceSOS from "./VoiceSOS";
import ShakeSOS from "./ShakeSOS";
import Navbar from "./components/Navbar";
import HomeStats from "./HomeStats";
import ActivityTimeline from "./ActivityTimeline";
import GuardianPanel from "./GuardianPanel";
import QuickActions from "./QuickActions";





function Home(){

const navigate=useNavigate();

const [dark,setDark]=useState(false);
const [count,setCount]=useState(null);
const [success,setSuccess]=useState(false);

const notifyContacts=async()=>{

try{

const res=
await axios.get(
"http://localhost:5000/contacts"
);

if(res.data?.length){

alert(
`Emergency shared with ${res.data.length} contacts`
);

}

}catch{}

};

const sendSOS=
useCallback(
async()=>{

navigator.geolocation.getCurrentPosition(

async(pos)=>{

try{

await axios.post(
"http://localhost:5000/sos",
{
lat:pos.coords.latitude,
lng:pos.coords.longitude
}
);

await notifyContacts();

setSuccess(true);

setCount(null);

setTimeout(()=>{

setSuccess(false);

navigate("/profile");

},2500);

}

catch{

setCount(null);

alert(
"Failed to send alert"
);

}

},

()=>{

setCount(null);

alert(
"Location permission required"
);

}

);

},
[navigate]
);

useEffect(()=>{

if(count===null)
return;

if(count===0){

sendSOS();

return;

}

const timer=
setTimeout(()=>{

setCount(
v=>v-1
);

},1000);

return()=>clearTimeout(
timer
);

},
[count,sendSOS]
);

const styles={

page:{
minHeight:"100vh",
padding:"30px",
background:
dark
?
"linear-gradient(135deg,#0f172a,#1e293b)"
:
"linear-gradient(135deg,#fff1f2,#ffe4e6,#fff)"
},

nav:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"20px",
borderRadius:"24px",
background:
"rgba(255,255,255,.25)",
backdropFilter:
"blur(18px)"
},

logo:{
fontSize:"42px",
fontWeight:"900",
color:"#dc2626"
},

right:{
display:"flex",
gap:"10px",
flexWrap:"wrap"
},

btn:{
padding:"12px 18px",
border:"none",
borderRadius:"14px",
background:"#dc2626",
color:"white",
cursor:"pointer",
fontWeight:"700"
},

hero:{
textAlign:"center",
marginTop:"70px"
},

title:{
fontSize:"72px",
fontWeight:"900",
color:
dark
?
"white"
:
"#111827"
},

subtitle:{
fontSize:"22px",
color:
dark
?
"#ddd"
:
"#6b7280"
},

sos:{
width:"240px",
height:"240px",
borderRadius:"50%",
border:"none",
marginTop:"40px",
fontSize:"62px",
color:"white",
cursor:"pointer",
background:
"linear-gradient(135deg,#dc2626,#fb7185)",

boxShadow:
"0 25px 80px rgba(220,38,38,.4)"
},

cancel:{
marginTop:"20px",
padding:"14px 22px",
border:"none",
borderRadius:"14px"
},

floating:{
position:"fixed",
right:"30px",
bottom:"30px",
width:"90px",
height:"90px",
borderRadius:"50%",
background:"#dc2626",
color:"white",
border:"none",
fontSize:"38px",
cursor:"pointer"
}

};

return(

<div style={styles.page}>

<div style={styles.nav}>

<div style={styles.logo}>
AegisOne
</div>

<div style={styles.right}>

<Link to="/login">
<button style={styles.btn}>
Login
</button>
</Link>

<Link to="/register">
<button style={styles.btn}>
Register
</button>
</Link>

<Link to="/dashboard">
<button style={styles.btn}>
Dashboard
</button>
</Link>

<Link to="/profile">
<button style={styles.btn}>
Profile
</button>
</Link>

<button
style={{
...styles.btn,
background:
dark
?
"#f43f5e"
:
"#111827"
}}
onClick={()=>
setDark(
!dark
)
}

>

{dark ? "🌅" : "🩷"}

</button>

</div>

</div>

<div style={styles.hero}>

<h1 style={styles.title}>
Emergency Safety Platform
</h1>

<p style={styles.subtitle}>
Fast, reliable emergency response with real-time safety monitoring and instant protection.
</p>

{

count===null

?

<button
style={styles.sos}
onClick={()=>
setCount(5)
}

>

SOS

</button>

:

<div>

<button
style={{
...styles.sos,
fontSize:"90px"
}}

>

{count}

</button>

<br/>

<button
style={styles.cancel}
onClick={()=>
setCount(null)
}

>

Cancel

</button>

</div>

}

</div>

<VoiceSOS
onSOS={()=>
setCount(1)
}
/>

<ShakeSOS
onSOS={()=>
setCount(1)
}
/>

<HomeExtras />
<HomeStats
dark={dark}
/>
<ActivityTimeline
dark={dark}
/>



<EmergencyContacts />

<SafetyPanel />

<LiveAlerts />

<EmergencyActions />

<SOSNotifications />

{

success

&&

<div
style={{

position:"fixed",

top:"30px",

left:"50%",

transform:
"translateX(-50%)",

background:"#dc2626",

padding:"18px 30px",

borderRadius:"18px",

color:"white"

}}

>

🚨 SOS Sent Successfully

</div>

}

<button
style={styles.floating}
onClick={()=>
setCount(5)
}

>

🚨

</button>

</div>

);

}

export default Home;
