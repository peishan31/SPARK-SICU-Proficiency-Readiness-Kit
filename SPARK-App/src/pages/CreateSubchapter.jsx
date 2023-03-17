import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, TextField, MenuItem, Grid, Input, CircularProgress } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './home.css';
import './CreateSubchapter.css';

export default function CreateSubchapter() {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [subchapTitle, setSubchapTitle] = useState('');
    const [chapSelected, setChapSelected] = useState('');
    const [subchapDesc, setSubchapDesc] = useState('');
    const [chaps, setChaps] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [base64Thumbnail, setBase64Thumbnail] = useState('');

    const BASE_URL = import.meta.env.VITE_API_URL
    const USER_ID = import.meta.env.VITE_USER_ID

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(BASE_URL + '/chapters/').then((res) => {
                setChaps(res.data);
            });
        };
        fetchData();
    }, []);

    const editorRef = useRef(null);

    async function addSubchapter() {
        
        setLoading(true);
        await axios.put(
            BASE_URL + '/chapters/' + chapSelected + '/subchapters/',
            {   
                subchapterTitle: subchapTitle,
                thumbnail: base64Thumbnail,
                description: subchapDesc,
                content: editorRef.current.getContent(),
            })
        .then(() => {
            setLoading(false);
            navigate('/Chapters/');
        })
        .catch(
            (error) => {
                alert(error.response.data.message);
            }
        );
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
        const base64 = await convertToBase64(file);
        setBase64Thumbnail(base64);
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
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '200px', 
                        margin: '0 auto',
                    }}
                >
                    <CircularProgress color="info" size={40} thickness={4} />
                </Box>
                    
            ) : (
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
                                {/* <label for="upload" class="file-upload-label">Thumbnail:</label> <br/>
                                <input 
                                    className="file-upload-input"
                                    onChange={(e) =>
                                    handleFileUpload(e)
                                    } 
                                    type="file" 
                                    accept=".jpeg, .png, .jpg"/> */}
                                <Input
                                    type="file"
                                    className="inputThumbnail"
                                    inputProps={{ accept: 'image/*' }}
                                    id="file-upload"
                                    onChange={(e) =>
                                        handleFileUpload(e)
                                    }
                                    sx= {{
                                        display: 'none',
                                    }}
                                />
                                <label htmlFor="file-upload">
                                    <Button
                                        startIcon={<CloudUploadIcon />}
                                        component="span"
                                        variant="outlined"
                                        sx={{
                                            color: 'white',
                                            backgroundColor: 'white', // Set background color on hover
                                            borderColor: '#41ADA4 !important', // Set border color on hover
                                            color: '#41ADA4',
                                            '&:hover': {
                                                backgroundColor: '#41ADA4',
                                                borderColor: '#41ADA4',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        Choose Thumbnail
                                    </Button>
                                </label>
                                { thumbnail && (
                                    <span className="fileName">{thumbnail.name}</span>
                                ) }
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
                                        import.meta.env.VITE_REACT_AP_TINYMCE_API_KEY
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
                                    component="span"
                                    sx={{
                                        color: 'white',
                                        backgroundColor: '#41ADA4',
                                        borderColor: '#41ADA4',
                                        '&:hover': {
                                            backgroundColor: 'white', // Set background color on hover
                                            borderColor: '#41ADA4 !important', // Set border color on hover
                                            color: '#41ADA4',
                                        },
                                        }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Grid>
                    </div>
                </div>
            )}
        </div>
    );
}