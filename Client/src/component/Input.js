import React from 'react'
import {Button,IconButton,Typography,InputAdornment,Grid, Container, Avatar, TextField} from "@material-ui/core"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

const input = ({name,handleChange,label,half,autoFocus,type,handleShowPassword}) => {
    return (
       <Grid xs={12} sm={half?6:12}>
         <TextField
         style={{margin:4}}
         name={name}
         onChange={ handleChange}
         variant="outlined"
         required
         fullWidth
         label={label}
         autoFocus={autoFocus}
         type={type}
         inputProps={name==="password"&&{
             endAdornment:(
                 <InputAdornment position="end">
                     <IconButton onClick={handleShowPassword}>
                         {type==="password"?<Visibility/>:<VisibilityOff/>}
                     </IconButton>
                 </InputAdornment>
             ),
         }}
         />  
       </Grid>
    )
}

export default input
