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
import { useAppState, useActions } from '../../overmind';
import { map, trim,join, isNull } from 'lodash';
import Subchapters from '../Subchapters';
import CircularProgress from '@mui/material/CircularProgress';
import ScrollUpButton from '../../components/scrollUpBtn/ScrollUpButton';
import Fab from '@mui/material/Fab';

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

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkId, setBookmarkId] = useState('');
    const [lastEditedBool, setLastEditedBool] = useState(false);
    const [lastEditedByTime, setLastEditedByTime] = useState("");

    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        axios.get(BASE_URL + `/user/` + userId + `/bookmarks/chapters/` + chapterId)
            .then(res => {
                const array = res.data[1].subchapters
                const result = array.find(obj => obj._id === subchapterId)
                setIsBookmarked(result.isBookmarked)
                if(result.bookmarkId != null) {
                    setBookmarkId(result.bookmarkId)
                } else {
                    setBookmarkId(null)
                }
            })
            .catch(err => {
                console.log(err)
                if(err.response.status == 500) {
                    navigate("/500");
                } else if(err.response.status == 404) {
                    navigate("/404");
                } else {
                    navigate("/other-errors");
                }
            });
        const handleScroll = () => {
          if (window.scrollY > 100) {
            setShowScrollButton(true);
          } else {
            setShowScrollButton(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, [])


    const getSubchapterContent = async (chapterId, subchapterId) => {
        axios.get(`${API_URL}/${chapterId}/subchapters/${subchapterId}`)
        .then(res => {
            setLastEditedBool(false)
            setSubchapter(res.data)

            if (res.data.lastModifiedUsername != "") {

                setLastEditedBool(true)
                const timestamp = res.data.lastModifiedDateTime;
                const date = new Date(timestamp);

                // format the date and time as a string
                const options = {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short"
                  };
                
                  const formattedDate = date.toLocaleDateString("en-US", options);
                setLastEditedByTime(formattedDate);
            }
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
                // subchapterActions.setBookmarkId(res.data.bookmarkId)
                setBookmarkId(res.data.bookmarkId)
                // subchapterActions.setIsBookmarked(true)
                return 200
            }
        ).catch(
            err => {
                return 500
            }
        )
    }

    async function removeBookmark(bookmarkId) {
        if (!bookmarkId) {
            console.log("Invalid bookmarkId: ", bookmarkId);
            return;
        }
        try {
            await axios.delete(
                BASE_URL + `/user/` + userId +`/bookmarks/${bookmarkId}`
            );
            // subchapterActions.setBookmarkId(null);
            // subchapterActions.setIsBookmarked(false);
            // setBookmarkId(null);
            // setIsBookmarked(false);
        } catch (error) {
            console.error("Error removing bookmark: ", error);
        }
    }

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
                {showScrollButton && <ScrollUpButton />}
                <div className="subchapterContentContainer">
                    <div className="backButtonContainer">
                        <Fab style={{
                                backgroundColor:"#41ADA4"   
                            }}
                            onClick={(e) => { navigate(-1) }}
                        >
                            <ArrowBackIcon className="backButton"/>
                        </Fab>
                    </div>
                    <div className="subchapterContentTop">
                        <img className="headerImage" src={`${subchapter.thumbnail}`} alt="headerImage"/>
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
                                    {
                                        isBookmarked ? 
                                            <BookmarkIcon className="bookmark" margin={4} onClick={e => { bookmarkHandler() }} /> : <BookmarkBorderIcon className="bookmarkOutline" margin={4} onClick={e => { bookmarkHandler() }} />
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
