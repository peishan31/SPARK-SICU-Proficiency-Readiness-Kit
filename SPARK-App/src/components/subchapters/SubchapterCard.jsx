import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({ subchapter }) {
    return (
        <Card sx={{ maxWidth: 445 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="225"
                    image="../../assets/handbook1.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {subchapter.subchapterTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {subchapter.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Bookmark
                </Button>
            </CardActions>
        </Card>
    );
}