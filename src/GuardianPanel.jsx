function GuardianPanel({dark}){

const contacts=[

{
name:"Mother",
phone:"Ready"
},

{
name:"Friend",
phone:"Ready"
},

{
name:"Emergency",
phone:"112"
}

];

return(

<div
style={{

marginTop:"60px"

}}

>

<h1
style={{

fontSize:"38px",

marginBottom:"25px",

color:
dark
?
"white"
:
"#111827"

}}

>

Trusted Guardians

</h1>

<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(260px,1fr))",

gap:"20px"

}}

>

{

contacts.map(
(c,i)=>(

<div
key={i}

style={{

padding:"28px",

borderRadius:"24px",

background:
dark
?
"rgba(255,255,255,.06)"
:
"white",

boxShadow:
"0 10px 35px rgba(0,0,0,.08)"

}}

>

<h2>
👤 {c.name}
</h2>

<p>
Status: {c.phone}
</p>

<button
style={{

padding:"12px",

width:"100%",

border:"none",

borderRadius:"14px",

background:"#dc2626",

color:"white",

marginTop:"14px",

cursor:"pointer"

}}

>

Share Live Location

</button>

</div>

)

)

}

</div>

</div>

);

}

export default GuardianPanel;
