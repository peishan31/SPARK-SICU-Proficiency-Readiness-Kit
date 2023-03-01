import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MultiActionAreaCard({ chapter }) {
    const currentChapterId = chapter._id;
    const currentChapterTitle = chapter.title;
    const currentChapterIcon = chapter.chapterIcon;

    const navigate = useNavigate();
    return (
        <Card style={{ height: '150px', width: '150px' }}
        sx={{
            ':hover': {
                bgcolor: '#41ADA4',
                color: 'white'
            },
            textAlign: "center",
            borderRadius: "20px",
            bgcolor: "#F4F4F4"
          }}
        onClick={
            () => {
                localStorage.setItem("currentChapterID", currentChapterId)
                navigate(`${currentChapterId}/subchapters`,
                    {
                        state:
                        {
                            parentChapterId: currentChapterId,
                            parentChapterTitle: currentChapterTitle,
                            parentChapterIcon: currentChapterIcon
                        }
                    }
                )
            }
        }>
            <CardActionArea style={{ height: '100%', width: '100%' }}>
                <CardContent>
                    <Typography  sx={{fontSize: "35px", mb: 1}}>
                        {chapter.chapterIcon} 
                    </Typography>
                    <Typography  sx={{fontSize: "15px", fontWeight: "bold", lineHeight: 1.3}}>
                    {chapter.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}