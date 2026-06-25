import { useState } from "react";

function SafetyPanel(){

const [
done,
setDone
]=useState({});

const tips=[

"Share live location",

"Keep emergency contacts updated",

"Charge phone before travel",

"Enable GPS",

"Stay in populated areas"

];

const toggle=(i)=>{

setDone({
...done,
[i]:
!done[i]
});

};

const styles={

wrap:{
marginTop:"50px"
},

title:{
fontSize:"34px",
fontWeight:"800",
color:"#dc2626"
},

grid:{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(280px,1fr))",
gap:"20px",
marginTop:"20px"
},

card:{
background:"white",
padding:"24px",
borderRadius:"20px",
boxShadow:
"0 10px 30px rgba(0,0,0,.08)"
},

check:{
marginRight:"12px",
transform:"scale(1.3)"
}

};

return(

<div style={styles.wrap}>

<h1 style={styles.title}>

🛡 Safety Checklist

</h1>

<div style={styles.grid}>

{

tips.map(

(
tip,
i
)=>(

<div
key={i}
style={styles.card}
>

<label>

<input
type="checkbox"
checked={
done[i]
||
false
}
onChange={()=>
toggle(i)
}
style={styles.check}
/>

{tip}

</label>

</div>

)

)

}

</div>

</div>

);

}

export default SafetyPanel;
