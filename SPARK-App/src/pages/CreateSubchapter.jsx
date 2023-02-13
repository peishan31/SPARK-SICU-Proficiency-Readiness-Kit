import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, TextField, MenuItem } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import './home.css';

export default function CreateSubchapter() {
    let navigate = useNavigate();

    const [subchapTitle, setSubchapTitle] = useState('');
    const [chapSelected, setChapSelected] = useState('');
    const [subchapDesc, setSubchapDesc] = useState('');
    const [chaps, setChaps] = useState([]);

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
        await axios.put(
            'http://localhost:8080/chapters/' + chapSelected + '/subchapters/',
            {
                subchapterTitle: subchapTitle,
                description: subchapDesc,
                content: editorRef.current.getContent(),
            }
        );
        navigate('/Subchapters');
    }

    return (
        <div className='home'>
            <div className='homeContainer'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-7'>
                            <div className='m-12'>
                                <p className='fs-1 fw-bold'>Add Subchapter</p>
                                <div className='form-group'>
                                    <div className='mt-3'>
                                        <Box
                                            component='form'
                                            sx={{
                                                '& .MuiTextField-root': {
                                                    width: '101ch',
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
                                    </div>
                                    <div className='mt-3'>
                                        <Box
                                            component='form'
                                            sx={{
                                                '& .MuiTextField-root': {
                                                    width: '25ch',
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
                                    </div>
                                    <div className='mt-3'>
                                        <Box
                                            component='form'
                                            sx={{
                                                '& .MuiTextField-root': {
                                                    width: '50ch',
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
                                    </div>
                                    <div className='mt-3'>
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
                                                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss',
                                                toolbar:
                                                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                content_style:
                                                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            }}
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        <Button
                                            className='mt-5'
                                            variant='outlined'
                                            onClick={() => {
                                                addSubchapter();
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
