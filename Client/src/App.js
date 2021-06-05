import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import FormSend from "./pages/FormSend"
import {Container} from "@material-ui/core"
import {BrowserRouter,Switch,Route,useLocation} from "react-router-dom";
import Admin from "./pages/Admin"
import User from "./pages/User"
import Home from "./pages/Home"



const App=()=>{
 const [admin,setAdmin]=useState(JSON.parse(localStorage.getItem("auth")))
 const user=JSON.parse(localStorage.getItem("user"))

  return(
    <BrowserRouter>
  <Container maxWidth="lg">
     {/* <Navbar/> */}
     {admin?<Route path="/" exact component={Home}/> :
     <Route path="/" exact component={Admin}/> }   
     {!user&&<Route path="/User" exact component={User}/> }
     {user&&<Route path="/User" exact component={FormSend}/>}     
  </Container>
  </BrowserRouter>
  )
}


export default App;
