import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import "./subchapterContent.css";
import { Tooltip } from '@mui/material';
import axios from 'axios';

const API_URL = "http://localhost:8080/chapters"

const SubchapterContent = () => {

    const [subchapter, setSubchapter] = useState([]);
    const [chapter, setChapter] = useState([]);

    const getChapterContent = async (chapterId) => {
        axios.get(`${API_URL}/${chapterId}`)
        .then(res => {
            setChapter(res.data)
        })
    }

    const getSubchapterContent = async (chapterId, subchapterId) => {
        axios.get(`${API_URL}/${chapterId}/subchapters/${subchapterId}`)
        .then(res => {
            setSubchapter(res.data)
        })
    }

    useEffect(() => {
        getSubchapterContent('63ea35d26c0ef100ca017647', 2)
        getChapterContent('63ea35d26c0ef100ca017647')
    }, [])

    return (
        <div className="subchapterContent">
            <div className="subchapterContentContainer">
            <ArrowBackIcon className="backButton"/>
                <div className="subchapterContentTop">
                    <img className="headerImage" src="../../../assets/subchapters/barbituratecoma.jpg" alt="coma"/>
                    <div className="subchapterIcon">
                        {chapter.chapterIcon}
                    </div>
                    <div className="subchapterActions">
                        <div className="subchapterAction">
                            <Tooltip title="Edit" placement="top">
                                <EditIcon className="subchapterActionIcon"/>
                            </Tooltip>
                        </div>
                        <div className="subchapterAction">
                            <Tooltip title="Bookmark" placement="top">
                                <BookmarkBorderIcon className="subchapterActionIcon"/>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="subchapterText">
                        <h1 className="subchapterTitle">
                            {subchapter.subchapterTitle}
                        </h1>
                        <div className="subchapterCategory">
                            {chapter.title}
                        </div>
                        <div className="subchapterDescription">
                            {subchapter.description}
                        </div>
                    </div>
                </div>
                <div className="subchapterContentBottom">
                    <div className="subchapterContentBody" dangerouslySetInnerHTML={{__html: subchapter.content}}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubchapterContent;
