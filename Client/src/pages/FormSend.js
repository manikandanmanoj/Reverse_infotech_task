import React,{useEffect,useState} from 'react'
import {Row,Column,Input,Text,Card} from "../component"
import {Button} from "@material-ui/core"
import {useHistory , useParams ,useLocation} from "react-router-dom"
import axios from "axios"


const FormSend = () => {
    const user=JSON.parse(localStorage.getItem("user"))
    const[message,setMessage]=useState({
        email:"",
        description:""
    })
    // const { _id } = useParams()

  useEffect( () => {    
    // console.log(_id)   
    axios.post("http://localhost:3000/users/id",{
        _id:user.user._id
    }).then(res=>{  
        console.log(res)
      })  
  }, []);

  const handleChange=(e)=>{
    setMessage({...message,[e.target.name]:e.target.value})  
}

const logout=()=>{
    localStorage.clear();
    window.location.reload(); 
}
  
const notification=(e)=>{
e.preventDefault();
console.log(message)
window.open("mailto:"+message.email+'?cc='+user.user.email+'&body='+message.description);
}
    return (
       <Row margin={[20,0,0,0]}>           
           <Column md={3} >
           </Column>
           <Column md={6} padding={[10]}>
           {user.user.active==null?
               <Card padding={[10]}>  
               <form onSubmit={notification}>               
                   <Input label="email" name="email" value={message.email} handleChange={handleChange}/>
                   <Input label="description" name="description" value={message.description} handleChange={handleChange}/>
                   {/* <Input/>  */}
                   <Button style={{backgroundColor:"green",color:"white",fontWeight:"bold"}} type="submit">Send</Button>
                   </form>                  
               </Card>:
               <Text>Wait Admin activated</Text>}
           </Column>
           <Column md={3} padding={[20]}>
           <Button onClick={logout} style={{backgroundColor:"blue",color:"white",fontWeight:"bold"}}>Logout</Button>
           </Column>
       </Row>
    )
}

export default FormSend
