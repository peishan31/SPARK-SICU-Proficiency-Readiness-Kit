import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
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
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FlareIcon from '@mui/icons-material/Flare';
import { ExitToApp } from '@material-ui/icons';
// react-router-dom
import { Navigate, Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom'
// state management
import { useAppState, useActions } from '../../overmind';
import { useState } from 'react';
import "./MiniDrawer.css"


// pages
import Home from '../../pages/Home'
import Chapters from '../../pages/Chapters'
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

const drawerWidth = 240;
const menuId = 'primary-search-account-menu';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
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
        })
    }),
);

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

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0,1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#41ADA4",
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({admin, clearUser}) {
    const path = useLocation().pathname
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const subchapterState = useAppState().subchapters
    const subchapterActions = useActions().subchapters

    const chapterState = useAppState().chapters
    const chapterActions = useActions().chapters

    const userState = useAppState().user
    const userActions = useActions().user

    const [data, setData] = useState('');
    const isMenuOpen = Boolean(anchorEl);

    localStorage.setItem('searchInput', data);

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
        // console.log("reached here!");
        // setData(event.currentTarget.value);
        chapterActions.setChapterSearchInput(event.currentTarget.value)
        subchapterActions.setSubchapterSearchInput(event.currentTarget.value)
        // localStorage.setItem('searchInput', event.currentTarget.value);
        // setData(localStorage.getItem('searchInput'));
    };

    const navigate = useNavigate();

    const handleSignOut = event => {
        // localStorage.clear();
        clearUser();
        userActions.updateUser(null);
        // navigate(0);

        // console.log("Logout: clear local storage and state, refresh")

        // setLoggedInUser(null);
    }

    function toTwemoji(string) {
        return twemoji.parse(string)
    };

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 3.5,
                            ...(open && { display: 'none' }),
                        }}
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
                    ["/Bookmarks", "/Chapters", "/Chapters/"+sessionStorage.getItem("currentChapterId")+"/subchapters"].includes(path) ? 
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
                        :null}
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
                    {/* <SearchOutlinedIcon />
                    <input type="text" placeholder="Search chapter or subchapter..." /> */}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Chapters', 'Bookmarks', 'Calculators'].map((text, index) => (
                        <Link key={text} to={text} style={{ textDecoration: 'none' }}>
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
                                        {
                                            (() => {
                                                switch (text) {
                                                    // case 'Home':
                                                    //     return <span className="icon">&#127968;</span>;
                                                    case 'Bookmarks':
                                                        return <span dangerouslySetInnerHTML={{__html: toTwemoji("🔖")}}></span>
                                                    case 'Calculators':
                                                        return <span dangerouslySetInnerHTML={{__html: toTwemoji("🧮")}}></span>
                                                    case 'Chapters':
                                                        return <span dangerouslySetInnerHTML={{__html: toTwemoji("📖")}}></span>
                                                    default:
                                                        return null;
                                                }
                                            })()
                                        }
                                        {/* {index % 2 === 0 ? <HomeIcon /> : <BookmarksIcon />} */}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}

                    <Link to={"/flashcards"} style={{ textDecoration: 'none' }}>
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
                                    <span dangerouslySetInnerHTML={{__html: toTwemoji("⚡")}}></span>
                                </ListItemIcon>
                                <ListItemText primary={"Flashcards"} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

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
                                        <span dangerouslySetInnerHTML={{__html: toTwemoji("👥")}}></span>
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

                            onClick={ (e) => handleSignOut(e) }
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
            <Box component="main" sx={{flexGrow: 1}}>
                <DrawerHeader />
                <Routes>
                    {/* <Route path="/Home" element={<Home/>}/> */}
                    <Route path="/" element={<Navigate to={"/Chapters"}/>}/>
                    <Route path="/Bookmarks" element={<Bookmarks searchInput={subchapterState.subchapterSearchInput}/>}/>
                    <Route path="/Calculators" element={<ViewCalculators/>}/>
                    <Route path="/Chapters" element={<Chapters searchInput={chapterState.chapterSearchInput}/>}/>
                    <Route path="/subchapterContent" element={<SubchapterContent/>}/>
                    <Route path="/Chapters/:chapterId/subchapters/:subchapterId/subchapterContent" element={<SubchapterContent/>}/>
                    <Route path="/Chapters/:chapterId/subchapters" element={<Subchapters searchInput={subchapterState.subchapterSearchInput}/>}/>
                    <Route path="/Chapters/:chapterId/subchapters/:subchapterId/EditSubchapter" element={<EditSubchapter/>}/>
                    <Route path="/CreateSubchapter" element={<CreateSubchapter/>}/>
                    <Route path="/CreateChapter" element={<CreateChapter/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/updateAdmin" element={<UpdateAdmin/>}/>
                    <Route path="/Calculators/apache-ii-score" element={<ApacheIIScore/>}/>
                    <Route path="/Calculators/simplified-pesi" element={<SimplifiedPesi/>}/>
                    <Route path="/Calculators/rox-index" element={<RoxIndex/>}/>
                    <Route path="/Calculators/sofa-score" element={<SofaScore/>}/>
                    <Route path="/Calculators/candida-score" element={<CandidaScore/>}/>
                    <Route path="/Calculators/parkland-formula" element={<ParklandFormula/>}/>
                    <Route path="/Calculators/cam-icu" element={<CamIcu/>}/>
                    <Route path="/flashcards" element={<FlashcardList/>}/>
                    <Route path="/Sign Out" element={<Navigate to={"/"}/>}/>
                    <Route path='*' element={<Error404 />}/>
                    <Route path='/500' element={<Error500 />}/>
                    <Route path='/other-errors' element={<OtherErrors />}/>
                </Routes>
            </Box>
        </Box>
    );
}