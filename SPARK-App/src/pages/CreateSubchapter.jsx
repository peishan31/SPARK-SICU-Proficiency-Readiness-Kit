import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    Box,
    TextField,
    MenuItem,
    Grid,
    Input,
    CircularProgress,
    IconButton,
    Typography
} from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DOMPurify from 'dompurify';
import { useAppState } from '../overmind';

export default function CreateSubchapter() {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [subchapTitle, setSubchapTitle] = useState('');
    const [chapSelected, setChapSelected] = useState('');
    const [chaps, setChaps] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [base64Thumbnail, setBase64Thumbnail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [content, setContent] = useState('');
    const [untouched, setUntouched] = useState(true);

    const BASE_URL = import.meta.env.VITE_API_URL;

    const userState = useAppState().user;
    const userId = userState.currentUser.googleId;

    useEffect(() => {

        if ( userState.currentUser.userType != "senior" ) {
            navigate("/");
        }

        const fetchData = async () => {
            await axios.get(BASE_URL + '/chapters/').then((res) => {
                setChaps(res.data);
            });
        };
        fetchData();
    }, []);

    async function addSubchapter() {
        console.log(DOMPurify.sanitize(content));
        setErrorMessage(""); // initialize error message
        setLoading(true);
        if (chapSelected == undefined || chapSelected == '' || chapSelected == null) {
            setLoading(false);
            setErrorMessage("Fields cannot be empty");
            return;
        }
        await axios
            .put(BASE_URL + '/chapters/' + chapSelected + '/subchapters/', {
                subchapterTitle: subchapTitle,
                thumbnail: base64Thumbnail,
                content: DOMPurify.sanitize(content),
                lastModifiedUserID: userId
            })
            .then(() => {
                setLoading(false);
                navigate(-1);
            })
            .catch((error) => {
                setLoading(false);
                console.log("error",error);

                if (error.response.status == 401) {
                    setErrorMessage("You are not authorized to perform this action.")
                    return;
                }
                
                if (error.response.status == 404) {
                    setErrorMessage(error.response.data.msg);
                    return;
                }
                setErrorMessage(error.response.data.msg);
            });
    }

    const handleEditorChange = (content, editor) => {
        setContent(content);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        // convert file to base64 string
        const base64String = await convertToBase64(file);

        // check image size is less than 1~2mb
        // convert base64 string to Blob object
        const byteString = atob(base64String.split(',')[1]);
        const mimeType = base64String.split(",")[0].split(":")[1].split(";")[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: mimeType });
        
        // Check if Blob size is bigger than 2MB
        if (blob.size / 1024 / 1024 > 2) {
            alert("The image size exceeds 2MB. Please upload an image with a size smaller than 2MB.");
            return;
        } 

        // Image size is less than 2MB
        setThumbnail(file);
        setBase64Thumbnail(base64String);
    };

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
    };

    
    return (
        <Box margin={4}>
            
            {loading ? (
                <Grid pb={2} display="flex" alignItems="center" mb={1}>
                    <CircularProgress color='info' size={40} thickness={4} />  
                </Grid>
            ) : (
                <Grid pb={2} alignItems="center" mb={1}>
                    <Grid item xs={12} display="flex" sx={{marginBottom: "35px"}}>
                        <IconButton onClick={
                            () => { navigate(-1) }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography style={{fontSize: '25px', fontWeight: 'bold'}}>
                            Add Subchapter
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item className="errorMessage" style={{marginBottom: '20px'}}>
                                {errorMessage}
                            </Grid>  
                            <Grid item xs={12} >
                                <Grid container>
                                    <Grid item xs={12} md={9} lg={9}>
                                        <TextField sx={{marginBottom: "2ch"}}
                                            fullWidth
                                            label='Title'
                                            variant='outlined'
                                            value={subchapTitle}
                                            onChange={(event) =>{
                                                setSubchapTitle(event.target.value)
                                                setUntouched(false)
                                            }}
                                            error={subchapTitle.length < 1 && !untouched}
                                            helperText={subchapTitle.length < 1 && !untouched ? 'Title cannot be empty' : ''}
                                        ></TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={9} lg={9} style={{marginBottom: "2ch"}}>
                                <Input
                                    type='file'
                                    className='inputThumbnail'
                                    inputProps={{ accept: 'image/*' }}
                                    id='file-upload'
                                    onChange={(e) => handleFileUpload(e)}
                                    sx={{
                                        display: 'none',
                                        
                                    }}
                                />
                                <label htmlFor='file-upload'>
                                    <Button
                                        startIcon={<CloudUploadIcon />}
                                        component='span'
                                        variant='outlined'
                                        sx={{
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
                                {thumbnail && (
                                    <span className='fileName'>
                                        {thumbnail.name}
                                    </span>
                                )}
                            </Grid>
                            <Grid item xs={12} >
                                <Grid container>
                                    <Grid item xs={12} md={9} lg={9}>
                                        <TextField sx={{marginBottom: "2ch"}}
                                            fullWidth
                                            value={chapSelected}
                                            onChange={(event) =>{
                                                setUntouched(false)
                                                setChapSelected(event.target.value)
                                            }}
                                            select
                                            label='Parent chapter'
                                            error={chapSelected.length < 1 && !untouched}
                                            helperText={chapSelected.length < 1 && !untouched ? 'Parent chapter cannot be empty' : ''}
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
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container>
                            <Grid item xs={12} md={9} lg={9}>
                                <Editor
                                    apiKey={
                                        import.meta.env
                                            .VITE_REACT_AP_TINYMCE_API_KEY
                                    }
                                    value={content}
                                    init={{
                                        height: 500,
                                        width: "100%",
                                        menubar: 'insert',
                                        file_picker_types: 'image',
                                        plugins:
                                            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                        toolbar:
                                            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                        content_style:
                                            'body { font-family:Arial,Helvetica,sans-serif; font-size:14px }',
                                    }}
                                    onEditorChange={handleEditorChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Button
                            variant='outlined'
                            onClick={() => {
                                addSubchapter();
                            }}
                            component='span'
                            sx={{
                                marginTop: '5ch',
                                color: 'white',
                                backgroundColor: '#41ADA4',
                                borderColor: '#41ADA4',
                                '&:hover': {
                                    backgroundColor: 'white', // Set background color on hover
                                    borderColor: '#41ADA4 !important', // Set border color on hover
                                    color: '#41ADA4',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#98d8d3',
                                    color: 'white',
                                    borderColor: '#98d8d3',
                                }
                            }}
                            disabled={
                                subchapTitle.length < 1 ||
                                chapSelected.length < 1
                            }
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Box>
    )

}
