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
// react-router-dom
import { Navigate, Routes, Route, Link, useLocation} from 'react-router-dom'

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
import Login from "../../pages/login/Login";

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
    }),
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

export default function MiniDrawer() {
    const path = useLocation().pathname
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [data, setData] = useState('');
    const isMenuOpen = Boolean(anchorEl);

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
        console.log(location.pathname)
        const currentChapterId = localStorage.getItem("currentChapterID")
        console.log(window.location.pathname == "/Chapters/" + currentChapterId+ "/subchapters")
        setData(event.currentTarget.value);
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
                    ["/Bookmarks", "/Chapters/"+localStorage.getItem("currentChapterID")+"/subchapters"].includes(path) ? 
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase fullWidth
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
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
                            <AccountCircle />
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
                    {['Chapters', 'Bookmarks', 'Calculators', 'Sign In'].map((text, index) => (
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
                                                        return <span className="icon">&#128278;</span>;
                                                    case 'Calculators':
                                                        return <span className="icon">&#129518;</span>
                                                    case 'Sign In':
                                                        return <span className="icon">&#128104;&#8205;&#9877;&#65039;</span>
                                                    case 'Chapters':
                                                        return <span className="icon">&#128214;</span>
                                                    case 'Subchapters':
                                                        return <span className="icon">&#128218;</span>
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
                </List>
                <Divider />
            </Drawer>
            <Box component="main" sx={{flexGrow: 1}}>
                <DrawerHeader />
                <Routes>
                    {/* <Route path="/Home" element={<Home/>}/> */}
                    <Route path="/" element={<Navigate to={"/Chapters"}/>}/>
                    <Route path="/Bookmarks" element={<Bookmarks searchInput={data}/>}/>
                    <Route path="/Calculators" element={<ViewCalculators/>}/>
                    <Route path="/Chapters" element={<Chapters/>}/>
                    <Route path="/subchapterContent" element={<SubchapterContent/>}/>
                    <Route path="/Chapters/:chapterId/subchapters/:subchapterId/subchapterContent" element={<SubchapterContent/>}/>
                    <Route path="/Chapters/:chapterId/subchapters" element={<Subchapters searchInput={data}/>}/>
                    <Route path="/CreateSubchapter" element={<CreateSubchapter/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>

            </Box>
        </Box>
    );
}