import React from 'react'
import {TextField,Grid,InputAdornment,IconButton} from "@material-ui/core"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Input({name,handleChange,label,autoFocus,type,handleShowPassword,half}) {
  return (
   <Grid item xs={12} sm={half?6:12}>
   <TextField
   name = {name}
   onChange={handleChange}
   variant ="outlined"
   required
   label={label}
   autoFocus={autoFocus}
   type={type}
  style ={!half?{width: '100%'}:null}
   InputProps={type==='password'||type==='text'?{
       endAdornment:(
           <InputAdornment position='end'>
            <IconButton onClick={handleShowPassword} >
                {type==='text'?<VisibilityOffIcon />:null}
                {type==='password'?<VisibilityIcon />:null}
            </IconButton>
           </InputAdornment>
       )
   }:null}
    />
   </Grid>
  )
}

export default Input