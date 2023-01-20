import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography,Button} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from 'framer-motion';


const PrimarySearchAppBar = ({ totalItems }) => {
  const { loginWithRedirect,isAuthenticated, user} = useAuth0();
  const { logout } = useAuth0();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const location = useLocation();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="primary">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    
    <>
     
      <AppBar position="fixed" className={classes.appBar} color="inherit" >
        <Toolbar>
        <motion.div
        initial={{ y: -250}}
        animate={{ y: -10 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}>
          <Typography component={Link} to="/" variant="h5" className={classes.title} >
            <img src={'https://cdn.auth0.com/styleguide/components/1.0.8/media/logos/img/badge.png'} alt="commerce.js" height="30px" className={classes.image} /> Shopify
          </Typography>
          </motion.div>
          <div className={classes.grow} />
          {location.pathname === '/' && (
          <motion.div className={classes.button}
           initial={{ y: -250}}
           animate={{ y: -10 }}
           transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}>
         <div className={classes.loginDetails}>
            {isAuthenticated &&  <li >
             <IconButton component={Link} to="/cart" aria-label="Show cart items">
              <Badge badgeContent={totalItems} color = "secondary" >
                <ShoppingCart/>
              </Badge>
            </IconButton>
            </li> }
             
           { isAuthenticated && (<li>
               <img height="35px" className={classes.image}src={user.picture} alt={user.name} />
             </li> ||
              <li>
               <p>{user.email}</p>
             </li> ) 
           }
             <li>
             {
                isAuthenticated? <Button className={classes.logInOut} onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </Button>:
            <Button className={classes.logInOut} variant="contained" onClick={() => loginWithRedirect()}>Log In</Button>
              }
             </li>
            </div>
            </motion.div>
           )}
          {/* </div> */}
         {/* ) } */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    
    </>
  
  );
};

export default PrimarySearchAppBar;
