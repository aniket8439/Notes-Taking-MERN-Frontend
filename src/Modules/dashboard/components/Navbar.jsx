import {NavLink} from 'react-router-dom';
export const Navbar = () => {
    return(
        <>
        <NavLink to="/">Home</NavLink><br/>
        <NavLink to="/add">Add Note</NavLink><br/>
        <NavLink to="/view-all">View All</NavLink><br/>
        <NavLink to="/register-user">Register User</NavLink><br/>
        <NavLink to="/view-users">View Users</NavLink><br/>
        </>
    )
}