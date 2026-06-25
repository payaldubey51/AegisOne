import {
useEffect,
useState
} from "react";

import axios from "axios";

function SOSNotifications(){

const [
alerts,
setAlerts
]=useState([]);

const [
popup,
setPopup
]=useState(false);

const load=
async()=>{

try{

const res=
await axios.get(
"http://localhost:5000/alerts"
);

if(
alerts.length &&
res.data.length>
alerts.length
){

setPopup(
true
);

const audio=
new Audio(
"https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
);

audio.play();

setTimeout(
()=>{

setPopup(
false
);

},
4000
);

}

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
3000
);

return()=>
clearInterval(
timer);

});

const styles={

popup:{

position:"fixed",

top:"25px",

right:"25px",

background:
"#dc2626",

color:"white",

padding:
"20px 30px",

borderRadius:
"18px",

fontWeight:
"bold",

fontSize:
"18px",

zIndex:999,

boxShadow:
"0 20px 60px rgba(220,38,38,.35)"
},

counter:{

position:"fixed",

left:"25px",

bottom:"25px",

width:"80px",

height:"80px",

borderRadius:"50%",

background:"#111827",

color:"white",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"26px",

fontWeight:"bold"

}

};

return(

<>

{

popup

&&

<div
style={
styles.popup
}
>

🚨 New SOS Alert

</div>

}

<div
style={
styles.counter
}
>

{alerts.length}

</div>

</>

);

}

export default SOSNotifications;
