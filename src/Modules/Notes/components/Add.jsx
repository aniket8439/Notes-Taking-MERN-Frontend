import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DescriptionIcon from '@mui/icons-material/Description';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import  dayjs  from 'dayjs';
import { MuiColorInput } from 'mui-color-input'
import Box from '@mui/material/Box';
import { useRef} from 'react'; 
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

//import { noteOperations } from '../services/noteOperations';
import { addNote, postObject  } from '../redux/note-slice';
import { Note } from '../models/Note';
import {useDispatch} from 'react-redux';
import { NewNote } from '../models/NewNote';
export const Add = ()=>{
    const id = useRef();
    const title = useRef();
    const description = useRef();
    const [date,setDate] = useState(null);
    const[color, setColor] = useState('#000000')
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
    
   // const [value, setValue] = React.useState<Dayjs | null>(null);
    const TakeNote = () => {
        console.log("add note is called");
        const idValue = id.current.value;
        const titleValue = title.current.value;
        const descValue = description.current.value;
        const dateValue = date ? dayjs(date).format('MM/DD/YYYY'):'';
        //noteOperations.addNote(idValue,titleValue,descValue,dateValue,color)
        const noteObject = new Note(idValue,titleValue,descValue,dateValue,color);
        const newNoteObject = new NewNote(titleValue,descValue,dateValue,color);
        dispatch(postObject(newNoteObject));
        dispatch(addNote(newNoteObject));
        //sortDispatch(sort());
        //props.fn();
        setOpen(true);
    }
    return (<>
        
        <Box sx={{
        margin:5, flexDirection:'column', display:'flex'
       
      }}>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note Added"
        action={action}
      />
         <TextField
        id="note-id"
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
        id="note-title"
        label="Title"
        inputRef={title}
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
        id="note-desc"
        inputRef={description}
        label="Description"
        multiline
        maxRows={4}
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={date} onChange={(selectedDate) => setDate(selectedDate)} />
    </LocalizationProvider>
    <MuiColorInput value={color} onChange={(selectedColor) => setColor(selectedColor)} />
      <Button onClick={TakeNote} variant="contained" color='warning'>Add</Button>
      </Box>
      </>
      )
      }