import React,{useState} from 'react'
import {Row,Column,Input,Text,Card} from "../component"
import {Button} from "@material-ui/core" 
import {useHistory} from "react-router-dom"
import axios from "axios"

const Admin = () => {
    const history=useHistory() 
    const [adminForm,setadminForm]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setadminForm({...adminForm,[e.target.name]:e.target.value})  
    }

    const submit=(e)=>{
     e.preventDefault()   
    axios.post("http://localhost:3000/admin/signin", adminForm).then(res=>{
        console.log(res)       
        localStorage.setItem("auth",JSON.stringify(res.data))        
        window.location.reload();       
    })
    }


    return (
        <div style={{flexGrow:1}}>           
        <Row>
          <Column md={3}></Column>
          <Column md={6} center >
          <Text style={{marginTop:50}} center middle variant="h5" component="h5">Admin Login</Text>
          <Card padding={[20]}>
              <form onSubmit={submit}>
             <Input label="email" type="text" value={adminForm.email} name="email" handleChange={handleChange}/>
             <Input label="password" value={adminForm.password} name="password" type="password" handleChange={handleChange}/>
             <Button style={{background:"green",color:"white",fontWeight:"bold"}} type="submit">Sign in</Button>
             </form>
             </Card>
          </Column>
          <Column md={3}>
              <Button style={{background:"#7a357a",color:"white",fontWeight:"bold",marginTop:10}}
              onClick={()=>history.push({pathname:"/User"})}>User Registration</Button>
          </Column>
        </Row> 
        </div>
    )
}

export default Admin
