import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

const settings = ['Profile',  'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
//   const fetchprofile = async ()=>{
// const response = await AxiosIntanse.get("/Users/profile");
// return response.data;
// }

// const { data, isLoading, error } = useQuery({
//   queryKey: ['User'],
//   queryFn: fetchprofile,
//   staleTime: 1000 * 60 * 5,
// });

// console.log("User profile data:", data); 





  return (
    <AppBar position="static" sx={{ backgroundColor: "#070e25ff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* شعار الموقع */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Onyx
          </Typography>

          {/* قائمة الجوال */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>Home</MenuItem>
              <MenuItem component={Link} to="/product" onClick={handleCloseNavMenu}>Products</MenuItem>
              <MenuItem component={Link} to="/about" onClick={handleCloseNavMenu}>About Us</MenuItem>
            </Menu>
          </Box>

          {/* شعار الجوال */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Onyx
          </Typography>

          {/* روابط الصفحات (لشاشة كبيرة) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button component={Link} to="/" sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
            <Button component={Link} to="/product" sx={{ my: 2, color: 'white', display: 'block' }}>Products</Button>
            <Button component={Link} to="/about" sx={{ my: 2, color: 'white', display: 'block' }}>About Us</Button>
                    <Button component={Link} to="/Profile" sx={{ my: 2, color: 'white', display: 'block' }}>Profile</Button>

          </Box>

          {/* السلة والأفاتار */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
