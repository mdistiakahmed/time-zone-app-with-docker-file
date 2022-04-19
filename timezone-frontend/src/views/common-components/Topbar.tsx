import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../../context/AppContext';
import { AppReducerActionKind } from '../../hooks/useAppReducer';
import { useAuth } from '../../hooks/useAuth';

const UserMenuOptions = [{ name: 'Home', value: '/' }];

const AdminMenuOptions = [{ name: 'Users', value: '/users' }];

const Topbar = () => {
    const { isAdmin } = useAuth();
    let MenuOptions: { name: string; value: string }[] = UserMenuOptions;
    if (isAdmin) {
        MenuOptions = UserMenuOptions.concat(AdminMenuOptions);
    }

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    // for navigate to signin page upon logout
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { dispatch } = useContext(ApplicationContext);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        dispatch({ type: AppReducerActionKind.REMOVE_TOKEN, payload: {} });
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* when screen is less then medium  */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        TimeZone
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {MenuOptions.map(({ name, value }) => {
                                return (
                                    <MenuItem
                                        key={name}
                                        onClick={() => {
                                            navigate(value);
                                        }}
                                        sx={{
                                            backgroundColor:
                                                pathname === value
                                                    ? '#090d0573'
                                                    : 'transparent',
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            {name}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Box>
                    {/* when screen is greater then medium  */}
                    <Typography
                        color="common.white"
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        TimeZone Converter
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {MenuOptions.map(({ name, value }) => {
                            return (
                                <Button
                                    key={name}
                                    onClick={() => navigate(value)}
                                    sx={{
                                        my: 2,
                                        marginRight: 2,
                                        color: 'white',
                                        display: 'block',
                                        ':hover': {
                                            bgcolor: '#b2bda873',
                                            color: 'white',
                                        },
                                        backgroundColor:
                                            pathname === value
                                                ? '#090d0573'
                                                : 'transparent',
                                    }}
                                >
                                    {name}
                                </Button>
                            );
                        })}
                    </Box>

                    {/* Right side user settings*/}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar alt="User" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Topbar;
