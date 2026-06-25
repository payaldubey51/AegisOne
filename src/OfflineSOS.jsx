import {
useEffect,
useState
} from "react";

import axios from "axios";

function OfflineSOS(){

const [
online,
setOnline
]=useState(
navigator.onLine
);

const sendQueued=
async()=>{

const queue=
JSON.parse(
localStorage.getItem(
"sosQueue"
)
||
"[]"
);

if(
queue.length===0
)
return;

try{

for(
const item
of queue
){

await axios.post(
"http://localhost:5000/sos",
item
);

}

localStorage.removeItem(
"sosQueue"
);

alert(
"Queued SOS sent"
);

}

catch{}

};

useEffect(()=>{

const onOnline=
()=>{

setOnline(
true
);

sendQueued();

};

const onOffline=
()=>{

setOnline(
false
);

};

window.addEventListener(
"online",
onOnline
);

window.addEventListener(
"offline",
onOffline
);

return()=>{

window.removeEventListener(
"online",
onOnline
);

window.removeEventListener(
"offline",
onOffline
);

};

},[]);

const saveOffline=
(
data
)=>{

const queue=
JSON.parse(
localStorage.getItem(
"sosQueue"
)
||
"[]"
);

queue.push(
data
);

localStorage.setItem(
"sosQueue",
JSON.stringify(
queue
)
);

};

return{

online,

saveOffline

};

}

export default OfflineSOS;
