 import { useRef, useState, useEffect } from 'react'
import axios from 'axios'

import Sidebar from "../components/sidebar/Sidebar"
import Widget from "../components/widget/Widget"
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import "./home.css"


export default function CreateChapter() {  
    
    const [chapTitle, setChapTitle] = useState('');
    const [chapIcon, setChapIcon] = useState('');

    async function addChapter() {
      await axios.post("http://localhost:8080/api/addChapter", {"chapterTitle": chapTitle, "chapterIcon": chapIcon})
    //   navigate("/chapterData");
    }
  
    return (
        <div className="home">
            <div className="homeContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-7">
                            <div class="m-5">
                                <p class="fs-1 fw-bold">Add Chapter</p>
                                <div class="form-group">
                                    <div class="mt-3">
                                        <label for="chapTitle">Title</label>
                                        <input type="text" class="form-control" id="chapTitle" value={chapTitle} onChange={event => setChapTitle(event.target.value)}></input>
                                    </div>
                                    <div class="mt-3">
                                        <label for="chapIcon">Icon</label>
                                        <input type="text" class="form-control" id="chapIcon" value={chapIcon} onChange={event => setChapIcon(event.target.value)}></input>
                                    </div>
                                </div>
                                <Button className="mt-5" variant="outlined" onClick={() => { addChapter(); }} >Add</Button>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
  }
  