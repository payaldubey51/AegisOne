function ActivityTimeline({dark}){

const items=[

{
time:"Now",
msg:"System Monitoring Active",
icon:"🟢"
},

{
time:"2 min",
msg:"Location Protection Enabled",
icon:"📍"
},

{
time:"5 min",
msg:"Emergency Contacts Ready",
icon:"📞"
},

{
time:"24/7",
msg:"SOS Network Online",
icon:"🚨"
}

];

return(

<div
style={{

marginTop:"60px",

padding:"30px",

borderRadius:"26px",

background:
dark
?
"rgba(255,255,255,.06)"
:
"rgba(255,255,255,.75)",

backdropFilter:
"blur(20px)"

}}

>

<h2
style={{

fontSize:"34px",

marginBottom:"30px",

color:
dark
?
"white"
:
"#111827"

}}

>

Live Safety Activity

</h2>

{

items.map(
(i,index)=>(

<div
key={index}

style={{

display:"flex",

gap:"18px",

padding:"18px",

marginBottom:"16px",

borderRadius:"16px",

background:
dark
?
"rgba(255,255,255,.04)"
:
"#ffffff"

}}

>

<div
style={{
fontSize:"30px"
}}
>

{i.icon}

</div>

<div>

<div
style={{
fontWeight:"800"
}}
>

{i.msg}

</div>

<div
style={{
opacity:.7
}}
>

{i.time}

</div>

</div>

</div>

)

)

}

</div>

);

}

export default ActivityTimeline;
