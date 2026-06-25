import {
useState,
useEffect
} from "react";

function EmergencyContacts(){

const [
contacts,
setContacts
]=useState([]);

const [
name,
setName
]=useState("");

const [
phone,
setPhone
]=useState("");

useEffect(()=>{

const saved=
JSON.parse(
localStorage.getItem(
"contacts"
)
||
"[]"
);

setContacts(
saved
);

},[]);

const add=()=>{

if(
!name
||
!phone
){

alert(
"Fill fields"
);

return;

}

const updated=[
...contacts,
{
name,
phone
}
];

setContacts(
updated
);

localStorage.setItem(
"contacts",
JSON.stringify(
updated
)
);

setName("");

setPhone("");

};

const styles={

box:{
background:"white",
padding:"30px",
borderRadius:"24px",
marginTop:"50px"
},

input:{
width:"100%",
padding:"14px",
marginBottom:"12px",
borderRadius:"12px",
border:"1px solid #ddd"
},

btn:{
padding:"14px",
width:"100%",
background:"#dc2626",
color:"white",
border:"none",
borderRadius:"12px",
cursor:"pointer"
},

card:{
padding:"16px",
marginTop:"14px",
background:"#fff1f2",
borderRadius:"16px"
}

};

return(

<div style={styles.box}>

<h2>

📞 Emergency Contacts

</h2>

<input
placeholder="Name"
value={name}
onChange={(e)=>
setName(
e.target.value
)}
style={styles.input}
/>

<input
placeholder="Phone"
value={phone}
onChange={(e)=>
setPhone(
e.target.value
)}
style={styles.input}
/>

<button
style={styles.btn}
onClick={add}

>

Add Contact

</button>

{

contacts.map(

(
c,
i
)=>(

<div
key={i}
style={styles.card}
>

<h3>

{c.name}

</h3>

<a
href={`tel:${c.phone}`}

>

📞
{c.phone}

</a>

</div>

)

)

}

</div>

);

}

export default EmergencyContacts;
