import {Route, Routes } from "react-router-dom"
import { Add } from "../../Notes/components/Add"
import { List } from "../../Notes/components/List"
import {Home} from "../../Notes/components/Home"
import { Register } from "../../User/components/Register"
import { Users } from "../../User/components/Users"



export const Main = () => {
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/view-all" element={<List/>}/>
            <Route path="/register-user" element={<Register/>}/>
            <Route path="/view-users" element={<Users/>}/>
        </Routes>
        </>
    )
}