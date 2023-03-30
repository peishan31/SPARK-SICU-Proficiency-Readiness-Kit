import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FlareIcon from '@mui/icons-material/Flare';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { ExitToApp } from '@material-ui/icons';

// react-router-dom
import { Navigate, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'

// state management
import { useAppState, useActions } from '../../overmind';
import { useState, useRef, useEffect } from 'react';

// pages
import Home from '../../pages/Home'
import Chapters from '../../pages/Chapters'
import EditChapter from '../../pages/EditChapter';
import Subchapters from '../../pages/Subchapters'
import ViewCalculators from '../../pages/viewCalculator/ViewCalculators'
import Bookmarks from '../../pages/Bookmarks'
import SubchapterContent from '../../pages/subchapterContent/SubchapterContent';
import CreateSubchapter from '../../pages/CreateSubchapter';
import EditSubchapter from '../../pages/EditSubchapter';
import Login from "../../pages/login/Login";
import UpdateAdmin from '../../pages/updateAdmin/UpdateAdmin';
import CreateChapter from '../../pages/CreateChapter';
import ApacheIIScore from '../../pages/viewCalculator/viewApacheIIScoreCalculator'
import SimplifiedPesi from '../../pages/viewCalculator/SimplifiedPesiCalculator'
import RoxIndex from '../../pages/viewCalculator/RoxIndexCalculator'
import SofaScore from '../../pages/viewCalculator/SofaScoreCalculator'
import CandidaScore from '../../pages/viewCalculator/CandidaScoreCalculator'
import ParklandFormula from '../../pages/viewCalculator/ParklandFormulaCalculator'
import CamIcu from '../../pages/viewCalculator/CamIcuCalculator'
import Error404 from '../../pages/error/Error404';
import Error500 from '../../pages/error/Error500';
import OtherErrors from '../../pages/error/OtherErrors';
import FlashcardList from '../../pages/flashcardList/FlashcardList';
import CreateFlashcards from '../../pages/createFlashcards/CreateFlashcards';
import EditFlashcards from '../../pages/editFlashcards/EditFlashcards';// BlackOverlay when navbar is open
import BlackOverlay from './BlackOverlay';

const drawerWidth = 240;
const menuId = 'primary-search-account-menu';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: "#41ADA4",
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    width: '80%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '50%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
}));

export default function PersistentDrawer({admin, clearUser}) {
    const path = useLocation().pathname
    const theme = useTheme();
    
    const subchapterState = useAppState().subchapters
    const subchapterActions = useActions().subchapters

    const chapterState = useAppState().chapters
    const chapterActions = useActions().chapters

    const userState = useAppState().user
    const userActions = useActions().user

    const [data, setData] = useState('');

    // for navbar
    const [open, setOpen] = useState(false);
    const navbarRef = useRef();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        chapterActions.setChapterSearchInput(event.currentTarget.value)
        subchapterActions.setSubchapterSearchInput(event.currentTarget.value)
    };

    function toTwemoji(string) {
        return twemoji.parse(string)
    };

    const handleSignOut = event => {
        clearUser();
        userActions.updateUser(null);
    }

    useEffect(() => {
        function handleClickOutside(event) {
          if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setOpen(false);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Unbind the event listener on cleanup
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navbarRef]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="navbarBrand">
                        <FlareIcon className="navbarBrandIcon"/>
                        <Typography className="navbarBrandText" fontWeight="bold" letterSpacing={-1} sx={{ fontSize: "25px", display: {xs: 'none', sm: 'flex', md: 'flex', ld: 'flex'}}}>
                            spark
                        </Typography>
                    </div>

                    <React.Fragment>
                        {
                            ["/Bookmarks", "/Chapters", "/Chapters/" + sessionStorage.getItem("currentChapterId") + "/subchapters"].includes(path) ?
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase fullWidth
                                        placeholder={subchapterState.subchapterSearchInput === "" ? "Search…" : subchapterState.subchapterSearchInput}
                                        inputProps={{ 'aria-label': 'search' }}
                                        value={subchapterState.subchapterSearchInput}
                                        onChange={handleChange}
                                    />
                                </Search>
                                : null
                        }
                    </React.Fragment>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex', ld: 'end' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <img referrerPolicy="no-referrer" className="profilePicture" src={userState.currentUser.picture}></img>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                ref ={navbarRef}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Chapters', 'Bookmarks', 'Calculators', 'Flashcards'].map((text, index) => (
                        <Link key={text} to={text} style={{ textDecoration: 'none'}}>
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        {
                                            (() => {
                                                switch (text) {
                                                    // case 'Home':
                                                    //     return <span className="icon">&#127968;</span>;
                                                    case 'Bookmarks':
                                                        return <span dangerouslySetInnerHTML={{ __html: toTwemoji("🔖") }}></span>
                                                    case 'Calculators':
                                                        return <span dangerouslySetInnerHTML={{ __html: toTwemoji("🧮") }}></span>
                                                    case 'Chapters':
                                                        return <span dangerouslySetInnerHTML={{ __html: toTwemoji("📖") }}></span>
                                                    case 'Flashcards':
                                                        return <span dangerouslySetInnerHTML={{ __html: toTwemoji("📚") }}></span>
                                                    default:
                                                        return null;
                                                }
                                            })()
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}

                    {
                        admin &&
                        <Link to={"/updateAdmin"} style={{ textDecoration: 'none' }}>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}>
                                        <span dangerouslySetInnerHTML={{ __html: toTwemoji("👥") }}></span>
                                    </ListItemIcon>
                                    <ListItemText primary={"Manage Admins"} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    }

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}

                            onClick={(e) => handleSignOut(e)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                {/* <span className="icon">&#128104;&#8205;&#9877;&#65039;</span> */}
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary="Sign Out" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Main open={open}>
                        <DrawerHeader />
                        {open ?  //if the navbar is open, show blackoverlay
                        <BlackOverlay>
                            <Routes>
                                <Route path="/" element={<Navigate to={"/Chapters"} />} />
                                <Route path="/Bookmarks" element={<Bookmarks searchInput={subchapterState.subchapterSearchInput} />} />
                                <Route path="/Calculators" element={<ViewCalculators />} />
                                <Route path="/Chapters" element={<Chapters searchInput={chapterState.chapterSearchInput} />} />
                                <Route path="/subchapterContent" element={<SubchapterContent />} />
                                <Route path="/Chapters/:chapterId/subchapters/:subchapterId/subchapterContent" element={<SubchapterContent />} />
                                <Route path="/Chapters/:chapterId/subchapters" element={<Subchapters searchInput={subchapterState.subchapterSearchInput} />} />
                                <Route path="/Chapters/:chapterId/subchapters/:subchapterId/EditSubchapter" element={<EditSubchapter/>}/>
                                <Route path="/CreateSubchapter" element={<CreateSubchapter />} />
                                <Route path="/CreateChapter" element={<CreateChapter />} />
                                <Route path="/Chapters/:chapterId/EditChapter" element={<EditChapter/>}/>
                                <Route path="/login" element={<Login />} />
                                <Route path="/updateAdmin" element={<UpdateAdmin />} />
                                <Route path="/Calculators/apache-ii-score" element={<ApacheIIScore />} />
                                <Route path="/Calculators/simplified-pesi" element={<SimplifiedPesi />} />
                                <Route path="/Calculators/rox-index" element={<RoxIndex />} />
                                <Route path="/Calculators/sofa-score" element={<SofaScore />} />
                                <Route path="/Calculators/candida-score" element={<CandidaScore />} />
                                <Route path="/Calculators/parkland-formula" element={<ParklandFormula />} />
                                <Route path="/Calculators/cam-icu" element={<CamIcu />} />
                                <Route path="/Sign Out" element={<Navigate to={"/"} />} />
                                <Route path='*' element={<Error404 />}/>
                                <Route path='/500' element={<Error500 />}/>
                                <Route path='/other-errors' element={<OtherErrors />}/>
                            </Routes>
                        </BlackOverlay>
                        : //if navbar is not open
                            <Routes>
                                <Route path="/" element={<Navigate to={"/Chapters"} />} />
                                <Route path="/Bookmarks" element={<Bookmarks searchInput={subchapterState.subchapterSearchInput} />} />
                                <Route path="/Calculators" element={<ViewCalculators />} />
                                <Route path="/Chapters" element={<Chapters searchInput={chapterState.chapterSearchInput} />} />
                                <Route path="/subchapterContent" element={<SubchapterContent />} />
                                <Route path="/Chapters/:chapterId/subchapters/:subchapterId/subchapterContent" element={<SubchapterContent />} />
                                <Route path="/Chapters/:chapterId/subchapters" element={<Subchapters searchInput={subchapterState.subchapterSearchInput} />} />
                                <Route path="/Chapters/:chapterId/subchapters/:subchapterId/EditSubchapter" element={<EditSubchapter/>}/>
                                <Route path="/CreateSubchapter" element={<CreateSubchapter />} />
                                <Route path="/CreateChapter" element={<CreateChapter />} />
                                <Route path="/Chapters/:chapterId/EditChapter" element={<EditChapter/>}/>
                                <Route path="/login" element={<Login />} />
                                <Route path="/updateAdmin" element={<UpdateAdmin />} />
                                <Route path="/Calculators/apache-ii-score" element={<ApacheIIScore />} />
                                <Route path="/Calculators/simplified-pesi" element={<SimplifiedPesi />} />
                                <Route path="/Calculators/rox-index" element={<RoxIndex />} />
                                <Route path="/Calculators/sofa-score" element={<SofaScore />} />
                                <Route path="/Calculators/candida-score" element={<CandidaScore />} />
                                <Route path="/Calculators/parkland-formula" element={<ParklandFormula />} />
                                <Route path="/Calculators/cam-icu" element={<CamIcu />} />
                                <Route path="/Sign Out" element={<Navigate to={"/"} />} />
                                <Route path='*' element={<Error404 />}/>
                                <Route path='/500' element={<Error500 />}/>
                                <Route path='/other-errors' element={<OtherErrors />}/>
                                <Route path="/Flashcards" element={<FlashcardList />} />
                                <Route path="/Flashcards/createFlashcards" element={<CreateFlashcards />} />
                                <Route path="/Flashcards/:flashcardId" element={<EditFlashcards />} />
                            </Routes>
                        }
                    </Main>
                </Box>
        </Box>
    );
}