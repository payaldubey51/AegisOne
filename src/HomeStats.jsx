function HomeStats({dark}){

const card={

padding:"26px",

borderRadius:"22px",

background:
dark
?
"rgba(255,255,255,.06)"
:
"rgba(255,255,255,.8)",

backdropFilter:
"blur(20px)",

textAlign:"center",

boxShadow:
"0 10px 35px rgba(0,0,0,.08)"
};

const grid={

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

marginTop:"60px"

};

return(

<div style={grid}>

<div style={card}>
<h1>🚨</h1>
<h2>24/7</h2>
<p>Emergency Monitoring</p>
</div>

<div style={card}>
<h1>⚡</h1>
<h2>3 sec</h2>
<p>Average Response</p>
</div>

<div style={card}>
<h1>📍</h1>
<h2>Live</h2>
<p>Location Tracking</p>
</div>

<div style={card}>
<h1>🛡</h1>
<h2>Safe</h2>
<p>Protected Network</p>
</div>

</div>

);

}

export default HomeStats;
