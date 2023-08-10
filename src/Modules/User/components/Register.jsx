import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DescriptionIcon from '@mui/icons-material/Description';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import { useRef} from 'react'; 
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {useDispatch} from 'react-redux';
import { User } from '../models/User';
import { addUser } from '../redux/user-slice';

export const Register = () =>{
    const id = useRef();
    const name = useRef();
    const phone = useRef();
    const email = useRef();
    const password = useRef();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    //const sortDispatch = useDispatch()
    const handleClose = ()=>setOpen(false);
    const action =
     <>
    <IconButton
    size="small"
    aria-label="close"
    color="inherit"
    onClick={handleClose}
  >
    <CloseIcon fontSize="small" />
  </IconButton>
  </>

  const RegisterUser = () => {
    console.log("register user is called");
    const idValue = id.current.value;
    const nameValue = name.current.value;
    const phoneValue = phone.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const userObject = new User(idValue,nameValue,phoneValue,emailValue,passwordValue);
    dispatch(addUser(userObject));
    setOpen(true);

  }

    return(
        <>
        
        <Box sx={{
        margin:5, flexDirection:'column', display:'flex'
       
      }}>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="User Added"
        action={action}
      />
         <TextField
        id="user-id"
        inputRef={id}
        label="Id"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        id="user-name"
        label="Name"
        inputRef={name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SpatialAudioOffIcon/>
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
       <TextField
        id="user-phone"
        inputRef={phone}
        label="Phone No."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SpatialAudioOffIcon/>
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      {/*<DatePicker value={value} onChange={(newValue) => setValue(newValue)} />*/}
      <TextField
        id="user-email"
        inputRef={email}
        label="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SpatialAudioOffIcon/>
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        id="user-password"
        inputRef={password}
        label="Password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SpatialAudioOffIcon/>
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <Button onClick={RegisterUser} variant="contained" color='warning'>Register</Button>
      </Box>
      </>
      )
}