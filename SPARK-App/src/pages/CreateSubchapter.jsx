import { useRef, useState, useEffect } from 'react'
import axios from 'axios'

import Sidebar from "../components/sidebar/Sidebar"
import { Button, Box, TextField, MenuItem } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import "./home.css"


export default function CreateSubchapter() {  

    const [subchapTitle, setSubchapTitle] = useState('');
    const [subchapIcon, setSubchapIcon] = useState('');
    const [chapSelected, setChapSelected] = useState('');

    const chapters = [ // temporarily hardcoding the chapters, will be fetched from the database
        {
            value: 'Chapter 1',
            label: 'Chapter 1',
        },
        {
            value: 'Chapter 2',
            label: 'Chapter 2',
        },
        {
            value: 'Chapter 3',
            label: 'Chapter 3',
        }
    ];

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    
    async function addSubchapter() {
        //await axios.post("http://localhost:8080/api/addChapter", {"chapterTitle": chapTitle, "chapterIcon": chapIcon})
    //   navigate("/chapterData");
    }

    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-7">
                            <div className="m-12">
                                <p className="fs-1 fw-bold">Add Subchapter</p>
                                <div className="form-group">
                                    {/* <div class="mt-3">
                                        <label for="chapTitle">Title</label>
                                        <input type="text" class="form-control" id="chapTitle" value={chapTitle} onChange={event => setChapTitle(event.target.value)}></input>
                                    </div>
                                    <div class="mt-3">
                                        <label for="chapIcon">Icon</label>
                                        <input type="text" class="form-control" id="chapIcon" value={chapIcon} onChange={event => setChapIcon(event.target.value)}></input>
                                    </div> */}
                                    <div className="mt-3">
                                        <Box
                                            component="form"
                                            sx={{
                                                '& .MuiTextField-root': { width: '101ch' },
                                            }}
                                            >
                                            <TextField label="Title" variant="outlined" value={subchapTitle} onChange={event => setSubchapTitle(event.target.value)}></TextField>
                                        </Box>
                                    </div>
                                    <div className="mt-3">
                                        <Box
                                            component="form"
                                            sx={{
                                                '& .MuiTextField-root': { width: '50ch' },
                                            }}
                                            >
                                            <TextField label="Icon" variant="outlined" value={subchapIcon} onChange={event => setSubchapIcon(event.target.value)}></TextField>
                                        </Box>
                                    </div>
                                    <div className='mt-3'>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& .MuiTextField-root': { width: '25ch' },
                                            }}
                                            >
                                            <TextField 
                                                value={chapSelected}
                                                onChange={event => setChapSelected(event.target.value)}
                                                select label='Parent chapter'>
                                                {chapters.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Box>
                                    </div>
                                    <div className='mt-3'>
                                    <Editor
                                        apiKey='7hglqjmbm4wjep3794fyp7l8epmqo4b2mw1243mzkab2tluw'
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue="<p>This is the initial content of the editor.</p>"
                                        init={{
                                            height: 500,
                                            width: 900,
                                            menubar: 'insert',
                                            
                                            images_upload_url: 'postAcceptor.php',
                                            /* we override default upload handler to simulate successful upload*/
                                            images_upload_handler: function (blobInfo, success, failure) {
                                                setTimeout(function () {
                                                /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                                success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
                                                }, 2000);
                                            },
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor image | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                    />
                                    </div>
                                    <div className='mt-3'>
                                        <Button className="mt-5" variant="outlined" onClick={() => { addSubchapter(); }} >Save</Button> &nbsp;
                                        <Button className="mt-5" variant="outlined" onClick={log}>Log editor content</Button>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>

            </div>
        </div>
    )
  }