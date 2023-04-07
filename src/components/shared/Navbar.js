import React from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-scroll";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AudioControl from "./AudioControl";

// Navbar Component
const Navbar = () => {
  const menuItems = ["Home", "About", "Menu"];

  return (
    <AppBar
      position="sticky"
      className={styles.navbar}
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    >
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.logo}>
          Logo
        </Typography>
        <nav className={styles.menu}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={`${item.toLowerCase()}-section`}
              smooth={true}
              duration={500}
              className={styles.link}
            >
              {item}
            </Link>
          ))}
        </nav>
        <Box sx={{ flexGrow: 1 }} />
        <AudioControl />
        <IconButton edge="end" color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;