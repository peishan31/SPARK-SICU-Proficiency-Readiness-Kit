import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import "./subchapterContent.css";
import { Box, Tooltip } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Sanitizes HTML;  a tool that removes any potentially malicious code from HTML text;
import { useAppState } from '../../overmind';
import CircularProgress from '@mui/material/CircularProgress';

const SubchapterContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [subchapter, setSubchapter] = useState([]);
    const BASE_URL = import.meta.env.VITE_API_URL

    const userState = useAppState().user;
    const userId = userState.currentUser.googleId;
    
    const API_URL = BASE_URL + "/chapters"
    const chapterId = location.state.parentChapterId
    const subchapterId = location.state.parentSubchapterId
    const bookmarkId = location.state.bookmarkId
    const [isBookmarked, setIsBookmarked] = useState(location.state.bookmarkStatus);

    // console.log(location.state.bookmarkStatus)

    const getSubchapterContent = async (chapterId, subchapterId) => {
        axios.get(`${API_URL}/${chapterId}/subchapters/${subchapterId}`)
        .then(res => {
            setSubchapter(res.data)

            // console.log(res.data)

        })
    }

    async function addBookmark() {

        await axios.put(
            BASE_URL + '/user/' + userId + '/bookmarks/',
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

        await axios.delete(
            BASE_URL + `/user/` + userId +`/bookmarks/${bookmarkId}`
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

    async function deleteSubchapter() {

        if (confirm("Are you sure you want to delete this subchapter?")) {
            await axios.delete(
                BASE_URL + `/chapters/` + chapterId +`/subchapters/${subchapterId}`, {
                    withCredentials: true
                }
            ).then(
                res => {
                    alert("Subchapter deleted successfully!")
                    navigate(-1);
                    //return 200
                }
            ).catch(
                err => {
                    if (err.response.status == 401) {
                        alert("You are not authorized to perform this action")
                    }
                    return 500
                }
            )}
    }

    function toTwemoji(string) {
        return twemoji.parse(string)
    };
        
    useEffect(() => {
        getSubchapterContent(chapterId, subchapterId)
    }, [])

    if ( subchapter.length == 0 ) {
        return (
            <div
                style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}
                >
                    <CircularProgress color='info' size={40} thickness={4} />
            </div>
        )
    }

    return (

            <div className="subchapterContent" style={{paddingBottom: "100px"}}>
                <div className="subchapterContentContainer">
                    <ArrowBackIcon className="backButton" onClick={(e) => { navigate(-1) }}/>
                    <div className="subchapterContentTop">
                        <img className="headerImage" src={`${subchapter.thumbnail}`} alt="headerImage"/>
                        {/* <img className="headerImage" src={"../../../../assets/subchapters/neurology/severetbi.jpg"} alt="headerImage"/> */}
                        <div className="subchapterIcon">
                            <span dangerouslySetInnerHTML={{__html: toTwemoji(subchapter.chapterIcon)}}></span>
                        </div>
                        <div className="subchapterActions">
                            <div className="subchapterAction">
                                <Tooltip title="Edit" placement="top">
                                    <EditIcon className="subchapterActionIcon"/>
                                </Tooltip>
                                &nbsp; &nbsp;
                                <Tooltip title="Delete" placement="top">
                                    <DeleteIcon className="subchapterActionIcon" onClick={ e => { deleteSubchapter() }}/> 
                                </Tooltip>
                            </div>
                            <div className="subchapterAction">
                                <Tooltip title="Bookmark" placement="top">
                                    {/* <BookmarkBorderIcon className="subchapterActionIcon"/> */}
                                    {
                                        isBookmarked ? 
                                            <BookmarkIcon margin={"4"} sx={{color: "#41ADA4"}} onClick={e => { bookmarkHandler() }} /> : <BookmarkBorderIcon sx={{color: "#41ADA4"}} margin={"4"} onClick={e => { bookmarkHandler() }} />
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
                        <div className="subchapterContentBody" dangerouslySetInnerHTML={{__html: toTwemoji(DOMPurify.sanitize(subchapter.content))}}>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default SubchapterContent;
