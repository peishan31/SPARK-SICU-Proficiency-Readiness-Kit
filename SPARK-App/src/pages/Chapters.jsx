import { useRef, useState, useEffect } from 'react'
import axios from 'axios'

import Sidebar from "../components/sidebar/Sidebar"
import Widget from "../components/widget/Widget"
import { Button, Icon } from '@mui/material';
import IconCard from "../components/iconcard/IconCard"
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import "./home.css"
import {Link} from "react-router-dom";


export default function CreateChapter() {  
    
    const [chapters, setChapters] = useState([])

    useEffect(() => {
      async function getChapters() {
        const result = await axios.get("http://localhost:8080/api/chapters")
        console.log(result.data);
        setChapters(result.data)
      }
      getChapters()
    }, [])
    
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <div className="widgets">
                    <h2 className="fw-bold">Chapters</h2>
                    <div className="buttons">
                        <Link to="/createChapter" class="text-decoration-none">
                            <Button variant="outlined">
                                <AddIcon />
                                    Create new chapter
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="container">
                    <div className="row mx-2">
                        {chapters.map(chapter => (
                            <div className="col-6 col-md-4 col-lg-2 mb-4">
                                <IconCard chapterName={chapter.chapterTitle} chapterIcon={chapter.chapterIcon}></IconCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
  }
  