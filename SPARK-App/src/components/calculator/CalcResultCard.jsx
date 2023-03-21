import * as React from 'react';
import { Card, CardContent, Grid, Typography, Paper, Divider, styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    boxShadow: 'none',
}));

const CalcResultCard = ({pointAllocated, interpretation, scoreType}) => {

    return (
        <Card>
            <CardContent sx={{ m: 1.5 }}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={3} mx={6} sx={{display: 'inline-table'}}>
                        <Item>
                            <Typography variant="h3">
                                {pointAllocated}
                            </Typography>
                            <Typography variant="subtitle" sx={{fontWeight:'bold', color: '#41ADA4'}}>
                                {scoreType} Score
                            </Typography>
                        </Item>
                    </Grid>
                    <Divider flexItem sx={{background: 'black', borderWidth: '1px'}}></Divider>
                    <Grid item xs={12} sm={5}>
                        <Item>
                            <Typography align="center" mx={3} my={2}>
                                {interpretation}
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
  );
}

export default CalcResultCard;