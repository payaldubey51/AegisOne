import { useState } from "react";
import axios from "axios";
import {
Link,
useNavigate
}
from "react-router-dom";

function Register(){

const navigate=
useNavigate();

const [
name,
setName
]=useState("");

const [
email,
setEmail
]=useState("");

const [
password,
setPassword
]=useState("");

const [
confirm,
setConfirm
]=useState("");

const [
show,
setShow
]=useState(false);

const strength=
password.length>=8
?
"Strong"
:
password.length>=5
?
"Medium"
:
"Weak";

const register=
async()=>{

try{

if(
!name||
!email||
!password||
!confirm
){

return alert(
"Fill all fields"
);

}

if(
password!==confirm
){

return alert(
"Passwords do not match"
);

}

await axios.post(

"http://localhost:5000/register",

{
name,
email,
password
}

);

alert(
"Registration Success"
);

navigate(
"/login"
);

}

catch(err){

alert(
err.response?.data?.message
||
"Registration Failed"
);

}

};

return(

<div
style={page}
>

<div
style={card}
>

<h1
style={title}
>

Create Account

</h1>

<p
style={sub}
>

Join Women Safety

</p>

<input
placeholder="Full Name"

value={name}

onChange={(e)=>
setName(
e.target.value
)
}

style={input}
/>

<input
placeholder="Email"

value={email}

onChange={(e)=>
setEmail(
e.target.value
)
}

style={input}
/>

<input
type={
show
?
"text"
:
"password"
}

placeholder="Password"

value={password}

onChange={(e)=>
setPassword(
e.target.value
)
}

style={input}
/>

<div
style={{
marginBottom:"10px",
color:
strength==="Strong"
?
"green"
:
strength==="Medium"
?
"orange"
:
"red"
}}
>

Strength:
{strength}

</div>

<input
type={
show
?
"text"
:
"password"
}

placeholder="Confirm Password"

value={confirm}

onChange={(e)=>
setConfirm(
e.target.value
)
}

style={input}
/>

<label>

<input
type="checkbox"

onChange={()=>
setShow(
!show
)
}
/>

Show Password

</label>

<button
onClick={register}
style={button}

>

Register

</button>

<p
style={{
marginTop:"20px"
}}
>

Already registered?

{" "}

<Link
to="/login"
>

Login

</Link>

</p>

</div>

</div>

);

}

const page={

minHeight:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:
"linear-gradient(135deg,#fff1f2,#ffe4e6)"

};

const card={

width:"440px",

background:"white",

padding:"40px",

borderRadius:"24px",

boxShadow:
"0 20px 40px rgba(0,0,0,.08)"

};

const title={

color:"#dc2626",

fontSize:"40px"

};

const sub={

color:"#6b7280",

marginBottom:"25px"

};

const input={

width:"100%",

padding:"16px",

marginBottom:"15px",

borderRadius:"12px",

border:"1px solid #ddd",

boxSizing:"border-box"

};

const button={

width:"100%",

padding:"16px",

background:"#dc2626",

color:"white",

border:"none",

borderRadius:"12px",

marginTop:"15px",

fontSize:"18px",

cursor:"pointer"

};

export default Register;
