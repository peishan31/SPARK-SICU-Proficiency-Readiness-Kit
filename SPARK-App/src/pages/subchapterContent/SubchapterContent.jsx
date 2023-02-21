import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import "./subchapterContent.css";
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const SubchapterContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [subchapter, setSubchapter] = useState([]);
    
    const API_URL = "http://localhost:8080/chapters"
    const chapterId = location.state.parentChapterId
    const subchapterId = location.state.parentSubchapterId
    const bookmarkId = location.state.bookmarkId
    const [isBookmarked, setIsBookmarked] = useState(location.state.bookmarkStatus);

    console.log(location.state.bookmarkStatus)

    const getSubchapterContent = async (chapterId, subchapterId) => {
        axios.get(`${API_URL}/${chapterId}/subchapters/${subchapterId}`)
        .then(res => {
            setSubchapter(res.data)

            console.log(res.data)

        })
    }

    async function addBookmark() {
        console.log("add")
        await axios.put(
            'http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/',
            {
                subchapterId: subchapterId,
                chapterId: chapterId
            }
        ).then(
            res => {
                return 200
            }
        ).catch(
            err => {
                return 500
            }
        )
    }

    async function removeBookmark(bookmarkId) {
        console.log("remove")
        await axios.delete(
            `http://localhost:8080/user/63e87a7780b6c0bcb29d15d0/bookmarks/${bookmarkId}`
        ).then(
            res => {
                return 200
            }
        ).catch(
            err => {
                return 500
            }
        )}

    async function bookmarkHandler() {
        if(isBookmarked) {
            await removeBookmark(bookmarkId)
            setIsBookmarked(false)          
        }
        else{
            await addBookmark()
            setIsBookmarked(true)
        }
    }
    
    useEffect(() => {
        getSubchapterContent(chapterId, subchapterId)
    }, [])

    return (
        <div className="subchapterContent">
            <div className="subchapterContentContainer">
                <ArrowBackIcon className="backButton" onClick={(e) => { navigate(-1) }}/>
                <div className="subchapterContentTop">
                    <img className="headerImage" src={`../${subchapter.thumbnail}`} alt="headerImage"/>
                    <div className="subchapterIcon">
                        {subchapter.chapterIcon}
                    </div>
                    <div className="subchapterActions">
                        <div className="subchapterAction">
                            <Tooltip title="Edit" placement="top">
                                <EditIcon className="subchapterActionIcon"/>
                            </Tooltip>
                        </div>
                        <div className="subchapterAction">
                            <Tooltip title="Bookmark" placement="top">
                                {/* <BookmarkBorderIcon className="subchapterActionIcon"/> */}
                                {
                                    isBookmarked ? 
                                        <BookmarkIcon margin={"4"} color="primary" onClick={e => { bookmarkHandler() }} /> : <BookmarkBorderIcon color="primary" margin={"4"} onClick={e => { bookmarkHandler() }} />
                                }
                            </Tooltip>
                        </div>
                    </div>
                    <div className="subchapterText">
                        <h1 className="subchapterTitle">
                            {subchapter.subchapterTitle}
                        </h1>
                        <div className="subchapterCategory">
                            {subchapter.chapterTitle}
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
