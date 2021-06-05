import React,{useState,useEffect} from 'react'
import {Row,Column,Input,Text,Card} from "../component"
import {Button} from "@material-ui/core"
import axios from "axios"

const Home = () => {
    const[data,setData]=useState([])

    const Logout=()=>{
        localStorage.clear();
        window.location.reload(); 
    }

    useEffect( () => {
        axios.get("http://localhost:3000/users/get").then(res=>{  
            console.log(res)  
          setData(res.data)  
          })   
      }, []);
      console.log(data) 

      const process=(val)=>{
        var option=window.confirm(`are you activate ${val.name}`)
        if(option){
            axios.put("http://localhost:3000/users/activate",{
                _id:val._id,
                active:true 
            }).then(res=>{
                console.log(res)
            })
        }
         window.location.reload();   
      }

      const deprocess=(val)=>{
        var option=window.confirm(`are you deactivate ${val.name}`)
        if(option){
            axios.put("http://localhost:3000/users/deactivate",{
                _id:val._id,
                active:false 
            }).then(res=>{
                console.log(res)
            })
        }
         window.location.reload();   
      }
      

    return (
        <div style={{flexGrow:1}}>
            <Row margin={[20,0,0,0]}>
                <Column md={10} padding={[10]}>                    
                 {data.map((val,index)=>
                 <CardComponet name={val.name} email={val.email} value={val} activate={()=>process(val)} deactivate={()=>deprocess(val)}/>)}
                </Column>
                <Column md={2} padding={[10]}>
                    <Button style={{backgroundColor:"blue",color:"white",fontWeight:"bold"}}
                    onClick={Logout}>Logout</Button>
                </Column>
            </Row>
        </div>
    )
}


const CardComponet=({name,email,deactivate,activate,value})=>{
    return(
        <Column md={12} margin={[10,0,0,0]}>
            <Card padding={[5]}>
                <Row>
                    <Column md={3} padding={[10]}>
                      <Text>{name}</Text>
                    </Column>
                    <Column md={3} padding={[10]}>
                      <Text>{email}</Text>
                    </Column>
                    <Column md={3} padding={[10]}>
                        {value.active==null && <Button style={{backgroundColor:"#a2a250",color:"white",fontWeight:"bold"}}
                       onClick={activate}>activate</Button>                      
                     }
                     {value.active == true && <span style={{fontSize:"25px",color:"green"}}>Admin accepted</span>}
                    </Column>
                    <Column md={3} padding={[10]}>
                    {value.active==null&&<Button style={{backgroundColor:"red",color:"white",fontWeight:"bold"}}
                    onClick={deactivate}>deactivate</Button>
                    }
                    {value.active == false && <span style={{fontSize:"25px",color:"red"}}>Admin accepted</span>}
                    </Column>
                </Row>
            </Card>
        </Column>
    )
}

export default Home
