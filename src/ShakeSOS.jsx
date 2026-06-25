import {
useEffect,
useState
} from "react";

function ShakeSOS({
onSOS
}){

const [
enabled,
setEnabled
]=useState(false);

useEffect(()=>{

if(
!enabled
)
return;

let last=0;

const detect=
(
e
)=>{

const a=
e.accelerationIncludingGravity;

if(
!a
)
return;

const total=
Math.abs(a.x)
+
Math.abs(a.y)
+
Math.abs(a.z);

if(
total>35
){

const now=
Date.now();

if(
now-last>4000
){

last=
now;

onSOS();

}

}

};

window.addEventListener(
"devicemotion",
detect
);

return()=>{

window.removeEventListener(
"devicemotion",
detect
);

};

},
[
enabled,
onSOS
]);

const styles={

wrap:{
marginTop:"40px",
textAlign:"center"
},

btn:{
padding:"18px 26px",

border:"none",

borderRadius:"18px",

background:
enabled
?
"#dc2626"
:
"#111827",

color:"white",

cursor:"pointer",

fontSize:"18px"
}

};

return(

<div style={styles.wrap}>

<button
style={styles.btn}
onClick={()=>
setEnabled(
!enabled
)}

>

{

enabled

?

"📳 Shake SOS ON"

:

"📱 Enable Shake SOS"

}

</button>

</div>

);

}

export default ShakeSOS;
