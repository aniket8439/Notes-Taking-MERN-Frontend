import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {  useDispatch, useSelector } from 'react-redux';
 import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import  { fetchUsers, getTotalRecords, searchUser, sortUser } from '../redux/user-slice';


export const Users = () => {

    const [sort, setSort] = useState('');
    const dispatch = useDispatch();
    const takeSearchValue = (event) => {
      const searchValue = event.target.value;
      const searchData = {search:searchValue};
      dispatch(searchUser(searchData))
    }
    const sortIt =(event)=>{
        const sortBy = event.target.value;
        setSort(sortBy);
        dispatch(sortUser({sortBy}));
      }
    const userObject = useSelector(state=>{
        console.log("********* State is ", state.userSlice.isLoading);
        return {
            'users':state.userSlice.users,
            'total':state.userSlice.total,
            'result':state.userSlice['search-result'],
            'isLoading':state.userSlice.isLoading
        }
    })
    useEffect(()=> {
      console.log("*****MOunted");
      dispatch(getTotalRecords());
      dispatch(fetchUsers());
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
            <h1>Total Records : {userObject.total}</h1>
            {userObject.isLoading?<p>Loading....</p>:<p> Data Comes...</p>}
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
          <MenuItem value="title">By name</MenuItem>
          <MenuItem value="descr">By phone</MenuItem>
        </Select>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Id</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Phone No.</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="right">Password</StyledTableCell>
            <StyledTableCell align="right">Operations</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userObject.result.length>0 && userObject.result.map(user=>{
            return (<TableRow>
              <TableCell align="right">{user._id}</TableCell>
              <TableCell align="left">{user.name}</TableCell>
              <TableCell align="left">{user.phone}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="right">{user.password}</TableCell>
              {/* <TableCell align="right"><i class="fa-solid fa-trash"></i> <i class="fa-solid fa-pen-to-square"></i></TableCell> */}
              <TableCell align='right'><i className="fa-solid fa-trash"></i><i className="fa-solid fa-pen-to-square"></i></TableCell>
          </TableRow>);
          })}
            {userObject.result.length == 0 && userObject.users.map(user=> {
                return(
                    <TableRow>
                        <TableCell>{user._id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell align='right'>{user.password}</TableCell>
                        <TableCell align='right'><i className="fa-solid fa-trash"></i><i className="fa-solid fa-pen-to-square"></i></TableCell>
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