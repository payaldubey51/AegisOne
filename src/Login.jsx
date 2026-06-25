import { useState } from "react";
import axios from "axios";
import {
useNavigate,
Link
} from "react-router-dom";

function Login() {

const navigate=
useNavigate();

const [email,setEmail]=
useState("");

const [password,setPassword]=
useState("");

const login=
async()=>{

try{

if(
!email||
!password
){

alert(
"Fill all fields"
);

return;

}

const res=
await axios.post(
"http://localhost:5000/login",
{
email,
password
}
);

localStorage.setItem(
"token",
res.data.token
);

localStorage.setItem(
"name",
res.data.name
);

localStorage.setItem(
"role",
res.data.role
);

alert(
"Login Success"
);

navigate(
"/dashboard"
);

}

catch(err){

alert(
err.response?.data?.message
||
"Login Failed"
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

Women Safety

</h1>

<p
style={sub}
>

Login to continue

</p>

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
type="password"

placeholder="Password"

value={password}

onChange={(e)=>
setPassword(
e.target.value
)
}

style={input}
/>

<button
onClick={login}
style={button}
>

Login

</button>

<p
style={{
marginTop:"20px"
}}
>

No account?

{" "}

<Link
to="/register"
>

Register

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

width:"420px",

background:"white",

padding:"40px",

borderRadius:"24px",

boxShadow:
"0 20px 40px rgba(0,0,0,.08)"

};

const title={

fontSize:"36px",

color:"#dc2626",

marginBottom:"10px"

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

fontSize:"16px",

boxSizing:"border-box"

};

const button={

width:"100%",

padding:"16px",

background:"#dc2626",

color:"white",

border:"none",

borderRadius:"12px",

fontSize:"18px",

cursor:"pointer"

};

export default Login;