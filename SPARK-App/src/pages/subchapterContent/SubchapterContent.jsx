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
import { map, trim,join } from 'lodash';
import Subchapters from '../Subchapters';
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
    const [lastEditedBool, setLastEditedBool] = useState(false);
    const [lastEditedByTime, setLastEditedByTime] = useState("");

    // console.log(location.state.bookmarkStatus)

    const getSubchapterContent = async (chapterId, subchapterId) => {
        axios.get(`${API_URL}/${chapterId}/subchapters/${subchapterId}`)
        .then(res => {
            setLastEditedBool(false)
            setSubchapter(res.data)
            console.log(res.data)
            if (res.data.lastModifiedUsername != "") {

                setLastEditedBool(true)
                const timestamp = res.data.lastModifiedDateTime;
                const date = new Date(timestamp);

                // convert to Singapore time
                date.setHours(date.getHours() + 8);

                // format the date and time as a string
                const options = { 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric", 
                    hour: "numeric", 
                    minute: "numeric", 
                    second: "numeric", 
                    hour12: false,
                    timeZone: "Asia/Singapore" // set the timezone to Singapore
                };
                const singaporeTime = date.toLocaleString("en-SG", options);
                setLastEditedByTime(singaporeTime);
            }
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
                // return 500
                if(err.response.status == 500) {
                    navigate("/500");
                } else if(err.response.status == 404) {
                    navigate("/404");
                } else {
                    navigate("/other-errors");
                }
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
                // return 500
                if(err.response.status == 500) {
                    navigate("/500");
                } else if(err.response.status == 404) {
                    navigate("/404");
                } else {
                    navigate("/other-errors");
                }
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
                    // return 500
                    else if(err.response.status == 500) {
                        navigate("/500");
                    } else if(err.response.status == 404) {
                        navigate("/404");
                    } else {
                        navigate("/other-errors");
                    }
                }
            )}
    }

    function toTwemoji(string) {
        return twemoji.parse(string)
    };
        
    useEffect(() => {
        getSubchapterContent(chapterId, subchapterId)
    }, [])

    const searchInput = useAppState().subchapters.subchapterSearchInput


    
    function getHighlightedText(text,subchapterSearchInput) {
        // for HTML strings with tags and text 
        if(subchapterSearchInput=="" || text ==undefined){
            return text;
        }else{

            let rgx = "?![^<>]*>";
            const regex = new RegExp(`(${trim(subchapterSearchInput)})(${rgx})`, 'gi');
            let listToReplace = text.match(regex)
            let count = 0
            // text = text.replace(regex, 0);
            // "<span style=\"background-color:#e8bb49\">" + subchapterSearchInput + "</span>"
            for(let i = 0;i < listToReplace.length;i++){
                listToReplace[i] = "<span style=\"background-color:#e8bb49\">" + listToReplace[i] + "</span>"
            }

            return text.replace(regex, function($0){
                if(count ===listToReplace.length) count = 0;
                return listToReplace[count++]
            })

        }
      }

      function HighlightText(text) {
        // for plain text highlighting
        if(searchInput=="" || text ==undefined){
            return text;
        }
        // Split text on higlight term, include term itself into parts, ignore case
       
        var parts = text.split(new RegExp(`(${searchInput})`, "gi"));
        return parts.map((part, index) => (
          <React.Fragment key={index}>
            {part.toLowerCase() === searchInput.toLowerCase() ? (
              <b style={{ backgroundColor: "#e8bb49" }}>{part}</b>
            ) : (
              part
            )}
          </React.Fragment>
        ));
      }
    
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
                                    <EditIcon className="subchapterActionIcon" 
                                        onClick={
                                            () => {
                                                navigate(`/Chapters/${chapterId}/Subchapters/${subchapterId}/editSubchapter`,
                                                    {
                                                        state: {
                                                            parentChapterId: chapterId,
                                                            parentSubchapterId: subchapterId
                                                        }
                                                    })
                                            }
                                        }
                                    />
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
                                {HighlightText(subchapter.subchapterTitle)}
                            </h1>
                            <div className="subchapterCategory">
                                {HighlightText(subchapter.chapterTitle)}
                            </div>
                            <div className="subchapterDescription">
                                {HighlightText(subchapter.description)}
                            </div>
                            <div className="subchapterLastEditedBy">
                                {
                                    lastEditedBool ? (
                                        <div className="subchapterLastEditedBy">
                                            Last Edited by <b>{subchapter.lastModifiedUsername}</b> on {lastEditedByTime}
                                        </div>
                                    ):(
                                        <div></div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="subchapterContentBottom">
                    <div className="subchapterContentBody" dangerouslySetInnerHTML={{__html: toTwemoji(DOMPurify.sanitize(getHighlightedText(subchapter.content,searchInput)))}}>
                    </div>
                </div>
            </div>
        )
}

export default SubchapterContent;
