import { Container } from '@mui/material';
import {Header} from '../../../Shared/Components/Header'
import { Main } from '../components/Main'
import { Navbar } from '../components/Navbar'
import Grid from '@mui/material/Grid';

export const Dashboard = () => {
    return(

    <Container maxWidth="xxl">
        <Header/>
        <Grid container spacing={2}>
        <Grid item xs={4}>
          <Navbar/>
        </Grid>
        <Grid item xs={8}>
          <Main/>
    
</Grid>
</Grid>

</Container>

    )
}