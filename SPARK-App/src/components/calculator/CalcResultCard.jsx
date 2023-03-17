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
                    <Grid item xs={12} sm={3} mx={6}>
                        <Item>
                            <Typography variant="h1">
                                {/* 3 */}
                                {pointAllocated}
                            </Typography>
                            <Typography variant="h5" sx={{fontWeight:'bold'}}>
                                {scoreType} Score
                                {/* {result.scoreTitle} */}
                            </Typography>
                        </Item>
                    </Grid>
                    <Divider orientation="vertical" flexItem style={{background: 'black'}}></Divider>
                    <Grid item xs={12} sm={5}>
                        <Item>
                            <Typography align="left" mx={4} my={2}>
                                {/* There is a low mortality risk, if any other diseases are suspected, continue to monitor, evaluate, and initiate treatment as appropriate */}
                                {interpretation}
                                {/* {result.desc} */}
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
  );
}

export default CalcResultCard;