function EmergencyActions(){

const styles={

wrap:{
marginTop:"60px"
},

title:{
fontSize:"34px",
fontWeight:"900",
color:"#dc2626",
marginBottom:"20px"
},

grid:{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
},

card:{
background:"white",
padding:"30px",
borderRadius:"22px",
textAlign:"center",
boxShadow:
"0 10px 30px rgba(0,0,0,.08)"
},

btn:{
marginTop:"18px",
padding:"12px 20px",
border:"none",
borderRadius:"12px",
background:"#dc2626",
color:"white",
cursor:"pointer",
fontWeight:"700"
}

};

return(

<div style={styles.wrap}>

<h1 style={styles.title}>

Emergency Center

</h1>

<div style={styles.grid}>

<div style={styles.card}>

<h2>📞</h2>

<h3>Emergency Call</h3>

<p>

Quick access

</p>

<button
style={styles.btn}
onClick={()=>
window.open(
"tel:112"
)
}

>

Call

</button>

</div>

<div style={styles.card}>

<h2>📍</h2>

<h3>Share Location</h3>

<p>

Send coordinates

</p>

<button
style={styles.btn}
onClick={()=>
navigator.share?.({
title:
"Location"
})
}

>

Share

</button>

</div>

<div style={styles.card}>

<h2>🚓</h2>

<h3>Find Help</h3>

<p>

Open dashboard

</p>

<button
style={styles.btn}
onClick={()=>
window.location=
"/dashboard"
}

>

Open

</button>

</div>

<div style={styles.card}>

<h2>🟢</h2>

<h3>Status</h3>

<p>

Monitoring active

</p>

</div>

</div>

</div>

);

}

export default EmergencyActions;
