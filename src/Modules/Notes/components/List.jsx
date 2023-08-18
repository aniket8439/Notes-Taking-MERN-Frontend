import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
//import { noteOperations } from '../services/noteOperations';
import {  useDispatch, useSelector } from 'react-redux';
 import { useEffect, useState } from 'react';
 import { deleteNote, fetchNotes, getTotalRecords, sortNote } from '../redux/note-slice';
import TextField from '@mui/material/TextField';
import { searchNote } from '../redux/note-slice';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


export const List = () => {
  const [sort, setSort] = useState('');
  const dispatch = useDispatch();
  const takeSearchValue = (event) => {
    const searchValue = event.target.value;
    const searchData = {search:searchValue};
    dispatch(searchNote(searchData))
  }

  const handleDelete = (noteTitle) => {
    dispatch(deleteNote(noteTitle));
    window.location.reload();
  };

  const sortIt =(event)=>{
      const sortBy = event.target.value;
      setSort(sortBy);
      dispatch(sortNote({sortBy}));
    }
  const noteObject = useSelector(state=>{
    console.log('*********** State is ', state.noteSlice.isLoading);
    return {'notes':state.noteSlice.notes,'total':state.noteSlice.total,'result':state.noteSlice['search-result'], 'isLoading':state.noteSlice.isLoading}
  });
  useEffect(()=> {
    console.log("*****MOunted");
    dispatch(getTotalRecords());
    dispatch(fetchNotes());
 },[dispatch]);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
    return(
        <div>
            <h1>Total Records : {noteObject.total}</h1>
            {noteObject.isLoading?<p>Loading....</p>:<p> Data Comes...</p>}
            <TextField onChange={takeSearchValue} id="outlined-basic" label="Search" variant="outlined" /><br/>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={sortIt}
        >
          <MenuItem value="id">By id</MenuItem>
          <MenuItem value="title">By title</MenuItem>
          <MenuItem value="descr">By descr</MenuItem>
        </Select>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Id</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Completion Date</StyledTableCell>
            <StyledTableCell align="right">Importance</StyledTableCell>
            <StyledTableCell align="right">Operations</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {noteObject.result.length>0 && noteObject.result.map(note=>{
            return (<TableRow>
              <TableCell align="right">{note._id}</TableCell>
              <TableCell align="left">{note.title}</TableCell>
              <TableCell align="left">{note.descr}</TableCell>
              <TableCell align="left">{note.cdate}</TableCell>
              <TableCell align="right">{note.importance}</TableCell>
              {/* <TableCell align="right"><i class="fa-solid fa-trash"></i> <i class="fa-solid fa-pen-to-square"></i></TableCell> */}
              <TableCell align='right'><i className="fa-solid fa-trash" onClick={() => handleDelete(note.title)}></i><i className="fa-solid fa-pen-to-square"></i></TableCell>
          </TableRow>);
          })}
            {noteObject.result.length == 0 && noteObject.notes.map(note=> {
                return(
                    <TableRow>
                        <TableCell>{note._id}</TableCell>
                        <TableCell>{note.title}</TableCell>
                        <TableCell>{note.descr}</TableCell>
                        <TableCell>{note.cdate}</TableCell>
                        <TableCell align='right'>{note.importance}</TableCell>
                        <TableCell align='right'><i className="fa-solid fa-trash" onClick={() => handleDelete(note.title)}></i><i className="fa-solid fa-pen-to-square"></i></TableCell>
                    </TableRow>
                )
            }
                
                )}
        </TableBody>
        </Table>
        </TableContainer>
            
        </div>
    )
}