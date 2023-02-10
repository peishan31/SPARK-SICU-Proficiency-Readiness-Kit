import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from "../components/sidebar/Sidebar"
import { Button, Box, TextField, MenuItem } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import "./home.css"


export default function CreateSubchapter() {  

    let navigate = useNavigate();

    const [subchapTitle, setSubchapTitle] = useState('');
    const [chapSelected, setChapSelected] = useState('');
    const [subchapDesc, setSubchapDesc] = useState('');

    const chapters = [ // temporarily hardcoding the chapters, will be fetched from the database
        {
            value: '63e307d7266ca6dcada956b6',
            label: 'Chapter 1',
        },
        {
            value: '63e3116a198b25f34a282faf',
            label: 'Chapter 2',
        }
    ];

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    
    async function addSubchapter() {
        await axios.put("http://localhost:8080/chapters/"+chapSelected+"/subchapters/",
            {
                subchapterTitle: subchapTitle, 
                description: subchapDesc,
                content: editorRef.current.getContent()
            }
        )
        navigate("/Subchapters");
        // console.log("result:",
        // {
        //     "subchapterTitle": subchapTitle, 
        //     "description": subchapDesc,
        //     "content": editorRef.current.getContent(),
        //     "chapSelected": chapSelected
        // }
        // )
    }

    return (
        <div className="home">
            <div className="homeContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-7">
                            <div className="m-12">
                                <p className="fs-1 fw-bold">Add Subchapter</p>
                                <div className="form-group">
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
                                    <div className="mt-3">
                                        <Box
                                            component="form"
                                            sx={{
                                                '& .MuiTextField-root': { width: '50ch' },
                                            }}
                                            >
                                            <TextField 
                                                label="Description" 
                                                variant="outlined" 
                                                value={subchapDesc}
                                                multiline
                                                maxRows={4}
                                                onChange={event => setSubchapDesc(event.target.value)}></TextField>
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
                                            file_picker_types: 'image',
                                            // images_upload_url: 'http://localhost:8080/api/posts',
                                            // automatic_uploads: true,
                                            /* we override default upload handler to simulate successful upload*/
                                            // images_upload_handler: function (blobInfo, success, failure) {
                                            //     setTimeout(function () {
                                            //     /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                            //     success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
                                            //     }, 2000);
                                            // },
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
                                        <Button className="mt-5" variant="outlined" onClick={() => { addSubchapter(); }} >Save</Button>
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