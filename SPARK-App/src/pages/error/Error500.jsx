import { Box, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Error500() {

    const navigate = useNavigate();

    function navigateHome() {
      navigate("/");
    }

    return (
        <div style={{marginLeft:'10%', marginRight:'10%'}}>
        <Grid container mt={5} spacing={3} alignItems="center">
            <Grid item xs={12} sm={7}>
                <Typography sx={{ typography: { sm: 'h2', xs: 'h4' } }} align="center" color='#41ADA4' my={2} >500 - Internal Server Error</Typography>
                <Typography my={2} sx={{ typography: { sm: 'h6'} }} align="center" >Please refresh this page or try again later.</Typography>
                <div style={{textAlignLast:"center"}}>
                    <Button variant="contained" sx={{my: 1, backgroundColor: '#41ADA4'}}  onClick={navigateHome}> 
                        Back Home
                    </Button>
                </div>
            </Grid>
            <Grid item xs={12} sm={5}>
            <div style={{textAlignLast:"center"}}>
                <Box
                    component="img"
                    sx={{height: 250, width: 250}}
                    alt="Error 500"
                    src="https://res.cloudinary.com/dckx3nboq/image/upload/v1679764369/500error_mwoqh6.png"
                />
            </div>
            </Grid>
        </Grid>
        </div>
    )
}