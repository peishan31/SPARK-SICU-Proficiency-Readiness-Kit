import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./IconCard.scss"
import {Link} from "react-router-dom";

export default function IconCard(props) {
  return (
    <Link to="/" class="text-decoration-none">
        <Card sx={{ maxWidth: 345 }} class="bg-darker-light card-rounded h-100 card-text-wrap">
            <CardContent>
                <Typography class="text-center fs-2 card-text-color" gutterBottom variant="h5" component="div">
                    {props.chapterIcon}
                </Typography>
                <Typography class="text-center card-text-color" gutterBottom variant="h5" component="div">
                    {props.chapterName}
                </Typography>
            </CardContent>
        </Card>   
    </Link>
    
  );
}