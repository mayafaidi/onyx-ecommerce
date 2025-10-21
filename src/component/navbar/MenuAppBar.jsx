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
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next'; 
const settings = ['Profile', 'Logout'];
import AxiosIntanse from '../../AxiosIntanse';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
   const { t, i18n } = useTranslation();
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
const fetchCart = async () => {
  const token = localStorage.getItem('userToken');
  if (!token) {
    console.warn(" No token found for fetching cart");
    return [];
  }

  const response = await AxiosIntanse.get("/Customer/Carts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Cart response:", response.data);
  return response.data.data || [];
};


const { data: cart = [], isLoading } = useQuery({
  queryKey: ['cart'],
  queryFn: fetchCart,
  staleTime: 1000 * 60 * 5,
});




  return (
    
    <AppBar position="static" sx={{ backgroundColor: "#070e25ff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* شعار الموقع */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/home"
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
              <MenuItem component={Link} to="/home" onClick={handleCloseNavMenu}>{t('home')}</MenuItem>
              <MenuItem component={Link} to="/product" onClick={handleCloseNavMenu}>{t('products')}</MenuItem>
              <MenuItem component={Link} to="/About" onClick={handleCloseNavMenu}>{t('about')}</MenuItem>
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
            <Button component={Link} to="/home" sx={{ my: 2, color: 'white' }}>{t('home')}</Button>
            <Button component={Link} to="/product" sx={{ my: 2, color: 'white' }}>{t('products')}</Button>
            <Button component={Link} to="/About" sx={{ my: 2, color: 'white' }}>{t('about')}</Button>
            <Button component={Link} to="/Profile" sx={{ my: 2, color: 'white' }}>{t('profile')}</Button>
            <Button component={Link} to="/" sx={{ my: 2, color: 'white' }}>{t('logout')}</Button>
          </Box>
<Button
  variant="outlined"
  sx={{
    color: 'white',
    borderColor: 'white',
    textTransform: 'none',
    ml: 2
  }}
  onClick={() => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  }}
>
  {i18n.language === 'en' ? 'العربية' : 'English'}
</Button>

          {/* السلة والأفاتار */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit">
              <Badge badgeContent={isLoading ? 0 : cart.length} color="error">
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
    <MenuItem 
      key={setting} 
      onClick={() => {
        handleCloseUserMenu();
        if (setting === "Logout") {
          navigate('/'); 
        }
        if (setting === "Profile") {
          navigate('/Profile'); 
        }
        
      }}
    >
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
