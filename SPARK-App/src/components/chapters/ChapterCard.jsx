import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppState, useActions } from '../../overmind';

export default function ChapterCard({ chapter }) {
    // overmind chapter state and actions
    const chapterState = useAppState().chapters;
    const chapterActions = useActions().chapters;
    
    // extract and save chapter data
    const currentChapterId = chapter._id;
    const currentChapterTitle = chapter.title;
    const currentChapterIcon = chapter.chapterIcon;

    // use naviate hook to navigate to subchapters route
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
                // set current chapter id in overmind chapter state
                let selectedChapter = { 
                                    currentChapterId, 
                                    currentChapterTitle, 
                                    currentChapterIcon 
                                }
                
                
                chapterActions.setSelectedChapter(selectedChapter);
                sessionStorage.setItem("currentChapterId", currentChapterId)
                sessionStorage.setItem('selectedChapter', JSON.stringify(selectedChapter));


                navigate(`${currentChapterId}/subchapters`)
                // navigate(`${currentChapterId}/subchapters`,
                //     {
                //         state:
                //         {
                //             parentChapterId: currentChapterId,
                //             parentChapterTitle: currentChapterTitle,
                //             parentChapterIcon: currentChapterIcon
                //         }
                //     }
                // )
            }
        }>
            <CardActionArea style={{ height: '100%', width: '100%' }}>
                <CardContent>
                    <Typography  sx={{fontSize: "35px", mb: 1}}>
                        {currentChapterIcon} 
                    </Typography>
                    <Typography  sx={{fontSize: "15px", fontWeight: "bold", lineHeight: 1.3}}>
                    {currentChapterTitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}