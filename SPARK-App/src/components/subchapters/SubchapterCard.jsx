import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton, Box, Grid } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';

export default function MultiActionAreaCard({ subchapter }) {
    const [clicked, setClicked] = useState(false)
    return (
        <Card sx={{ maxWidth: 445 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="225"
                    image="../../src/handbook1.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Grid pb={1} display="flex" alignItems="center">
                    <Typography display="contents" gutterBottom variant="h5" component="div">
                        {subchapter.title}
                    </Typography>
                    <Box ml="auto">
                    <IconButton color="primary" onClick={e => {setClicked(!clicked)}}>
                        {clicked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
                    </IconButton>
                    </Box>
                    </Grid>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}