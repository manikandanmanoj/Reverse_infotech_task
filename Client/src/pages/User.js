import React,{useState} from 'react'
import {Row,Column,Input,Text,Card} from "../component"
import {Button} from "@material-ui/core" 
import {useHistory} from "react-router-dom"
import axios from "axios"

const User = () => {
    const[sign,setSign]=useState(false)
    const history=useHistory() 
    const[userLogin,setuserLogin]=useState({
        name:"",
        email:"",
        password:""
    })
    const[regLogin,setregLogin]=useState({
        
        email:"",
        password:""
    })

    const regChange=(e)=>{
        setregLogin({...regLogin,[e.target.name]:e.target.value})  
    }

    const handleChange=(e)=>{
        setuserLogin({...userLogin,[e.target.name]:e.target.value})  
    }

    const Register=(e)=>{
        e.preventDefault()   
        console.log(userLogin)
       axios.post("http://localhost:3000/users/signup", userLogin).then(res=>{
           console.log(res)       
           localStorage.setItem("user",JSON.stringify(res.data))        
           window.location.reload();       
            //  history.push({pathname:"/User"})
       })
       }

       const Login=(e)=>{
        e.preventDefault()   
        console.log(regLogin)
       axios.post("http://localhost:3000/users/signin", regLogin).then(res=>{
           console.log(res)       
           localStorage.setItem("user",JSON.stringify(res.data))        
           window.location.reload();  
        // history.push({pathname:"/FormSend/"+res.data.user._id})     
       })
       }

    return (
        <div style={{flexGrow:1}}>
           
        <Row>
          <Column md={3}></Column>
          <Column md={6} center >
          <Text style={{marginTop:50}} center middle variant="h5" component="h5">{sign?"User Register":"User Login"}</Text>
          {sign?
           <Card padding={[20]}>
           <form onSubmit={Register}>
           <Input label="name" type="text" name="name" value={userLogin.name} handleChange={handleChange}/>
          <Input label="email" type="text" name="email" value={userLogin.email} handleChange={handleChange}/>
          <Input label="password" type="password" name="password" value={userLogin.password} handleChange={handleChange}/>
          <Button style={{background:"green",color:"white",fontWeight:"bold"}} type="submit">Sign up</Button>
          </form>
          <Text right onClick={()=>setSign((prevShowPass)=>!prevShowPass)}>Dont have an account click to register</Text>
          </Card>
          :
          <Card padding={[20]}>
              <form onSubmit={Login}>
             <Input label="email" type="text" name="email" value={regLogin.email} handleChange={regChange}/>
             <Input label="password" type="password"  name="password" value={regLogin.password} handleChange={regChange}/>
             <Button style={{background:"green",color:"white",fontWeight:"bold"}} type="submit">Sign in</Button>
             </form>
             <Text right onClick={()=>setSign((prevShowPass)=>!prevShowPass)}>Dont have an account click to register</Text>
          </Card>}
          </Column>
          <Column md={3}>
              
          </Column>
        </Row> 
        </div>
    )
}

export default User
