import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Volunteer from "./Volunteer";
import Admin from "./Admin";

import ProtectedRoute from "./ProtectedRoute";

function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Home/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/profile"
element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}
/>

<Route
path="/volunteer"
element={
<ProtectedRoute>
<Volunteer/>
</ProtectedRoute>
}
/>

<Route
path="/admin"
element={
<ProtectedRoute>
<Admin/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;