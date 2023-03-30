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

    // Chapter card styling
    const styles = {
        card: {
            height: '150px',
            width: '150px',
            padding: '4px',
            ':hover': {
                bgcolor: '#41ADA4',
                color: 'white',
            },
            textAlign: 'center',
            borderRadius: '20px',
            bgcolor: '#F4F4F4',
            '@media (max-width: 390px)': {
                height: '135px',
                width: '135px',
                fontSize: '12px',
            },
        },
        emoji: {
          fontSize: '35px',
          mb: 1,
        },
        title: {
          fontSize: '15px',
          fontWeight: 'bold',
          lineHeight: 1.3,
        },
    };
    
    function toTwemoji(string) {
        return twemoji.parse(string)
    };
      
    return (
        <Card
        sx={styles.card}
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
                <CardContent style={{padding: 0}}>
                    <Typography sx={styles.emoji}>
                        <span dangerouslySetInnerHTML={{__html: toTwemoji(currentChapterIcon)}}></span>
                    </Typography>
                    <Typography sx={styles.title}>
                    {currentChapterTitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}