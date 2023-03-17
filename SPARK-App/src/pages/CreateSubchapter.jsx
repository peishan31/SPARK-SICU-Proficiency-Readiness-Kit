import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, TextField, MenuItem, Grid } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import './home.css';
import "./CreateSubchapter.css";

export default function CreateSubchapter() {
    let navigate = useNavigate();

    const [subchapTitle, setSubchapTitle] = useState('');
    const [chapSelected, setChapSelected] = useState('');
    const [subchapDesc, setSubchapDesc] = useState('');
    const [chaps, setChaps] = useState([]);
    const [file, setFile] = useState();
    const [postImage, setPostImage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('http://localhost:8080/chapters/').then((res) => {
                setChaps(res.data);
            });
        };
        fetchData();
    }, []);

    const editorRef = useRef(null);

    async function addSubchapter() {
        console.log("file: " , postImage);
        await axios.put(
            'http://localhost:8080/chapters/' + chapSelected + '/subchapters/',
            {   
                subchapterTitle: subchapTitle,
                // thumbnail: "../../../assets/subchapters/neurology/raisedicp.jpg",
                thumbnail: postImage,
                description: subchapDesc,
                content: editorRef.current.getContent(),
            }
        );
        navigate('/Chapters/');
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage(base64);
        // console.log("file", base64);
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    return (
        <div className='home'>
            <div className='homeContainer'>
                <div>
                    <div className="pageTitle">
                        <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Add Subchapters</h1>
                    </div>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Box
                            component='form'
                            sx={{
                                '& .MuiTextField-root': {
                                    width: '101ch',
                                    marginTop: '2ch',
                                },
                            }}
                        >
                            <TextField
                                label='Title'
                                variant='outlined'
                                value={subchapTitle}
                                onChange={(event) =>
                                    setSubchapTitle(
                                        event.target.value
                                    )
                                }
                            ></TextField>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Box
                            sx={{
                                marginTop: '2ch',
                            }}
                        >
                            <label for="upload" class="file-upload-label">Thumbnail:</label> <br/>
                            <input 
                                className="file-upload-input"
                                onChange={(e) =>
                                handleFileUpload(e)
                                } 
                                type="file" 
                                accept=".jpeg, .png, .jpg"/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Box
                            component='form'
                            sx={{
                                '& .MuiTextField-root': {
                                    width: '25ch',
                                    marginTop: '2ch',
                                },
                            }}
                        >
                            <TextField
                                value={chapSelected}
                                onChange={(event) =>
                                    setChapSelected(
                                        event.target.value
                                    )
                                }
                                select
                                label='Parent chapter'
                            >
                                {chaps.map((option) => (
                                    <MenuItem
                                        key={option._id}
                                        value={option._id}
                                    >
                                        {option.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Box
                            component='form'
                            sx={{
                                '& .MuiTextField-root': {
                                    width: '50ch',
                                    marginTop: '2ch',
                                },
                            }}
                        >
                            <TextField
                                label='Description'
                                variant='outlined'
                                value={subchapDesc}
                                multiline
                                maxRows={4}
                                onChange={(event) =>
                                    setSubchapDesc(
                                        event.target.value
                                    )
                                }
                            ></TextField>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Box
                            sx={{
                                marginTop: '2ch',
                            }}
                        >
                            <Editor
                                apiKey={
                                    import.meta.env
                                        .VITE_REACT_APP_TINYMCE_API_KEY
                                }
                                onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                }
                                initialValue=''
                                init={{
                                    height: 500,
                                    width: 900,
                                    menubar: 'insert',
                                    file_picker_types: 'image',
                                    plugins:
                                        'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount tableofcontents',
                                    toolbar:
                                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    content_style:
                                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Box
                            sx={{
                                marginTop: '5ch',
                            }}
                        >
                            <Button
                                variant='outlined'
                                onClick={() => {
                                    addSubchapter();
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </div>
            </div>
        </div>
    );
}