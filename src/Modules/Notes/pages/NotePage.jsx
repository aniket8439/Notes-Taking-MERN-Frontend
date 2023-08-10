import { useState } from "react";
import { Header } from "../../../Shared/Components/Header"
import { Add } from "../components/Add"
import { List } from "../components/List"
import Container from '@mui/material/Container';
import { noteOperations } from "../services/noteOperations";
import { Register } from "../../User/components/Register";
import { Users } from "../../User/components/Users";


export const NotePage = () => {
    const [notes, setNotes] = useState([]);
    const collectedData = () => {
       // console.log("Rec data from Add", noteObject);
        setNotes([...noteOperations.getNotes()]);

    }
    
    return (
        <>
            <Container maxWidth="xl">
                <Header />
                <Add fn={collectedData} />
                <List notes={notes} />
                <Register fn={collectedData}/>
                <Users/>
            </Container>

        </>

    )
}