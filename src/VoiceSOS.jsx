import {
useState
} from "react";

function VoiceSOS({
onSOS
}){

const [
listening,
setListening
]=useState(false);

const start=()=>{

const SpeechRecognition=
window.SpeechRecognition
||
window.webkitSpeechRecognition;

if(
!SpeechRecognition
){
alert(
"Voice recognition not supported"
);
return;
}

const recognition=
new SpeechRecognition();

recognition.lang=
"en-US";

recognition.start();

setListening(
true
);

recognition.onresult=
(
e
)=>{

const text=
e.results[0][0]
.transcript
.toLowerCase();

if(
text.includes(
"help me"
)
||
text.includes(
"emergency"
)
||
text.includes(
"save me"
)
){

onSOS();

}

setListening(
false
);

};

recognition.onerror=
()=>{

setListening(
false
);

};

recognition.onend=
()=>{

setListening(
false
);

};

};

const styles={

wrap:{
marginTop:"50px",
textAlign:"center"
},

btn:{
padding:"18px 30px",
border:"none",
borderRadius:"18px",
background:
listening
?
"#dc2626"
:
"#111827",

color:"white",

fontSize:"18px",

cursor:"pointer"
}

};

return(

<div style={styles.wrap}>

<button
style={styles.btn}
onClick={start}

>

{

listening

?

"🎙️ Listening..."

:

"🎤 Voice SOS"

}

</button>

</div>

);

}

export default VoiceSOS;
