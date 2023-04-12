import React from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-scroll";
import { NavLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AudioControl from "./AudioControl";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Navbar = () => {
  const menuItems = ["Home", "About", "Menu"];
  const location = useLocation();

  const renderMenuItems = (item, index) => {
    if (item === "Menu") {
      return (
        <NavLink
          key={index}
          to={`/${item.toLowerCase()}`}
          className={styles.link}
        >
          {item}
        </NavLink>
      );
    } else if (location.pathname === "/menu") {
      return (
        <NavLink
          key={index}
          to={{
            pathname: "/",
            hash: `${item.toLowerCase()}-section`,
          }}
          className={styles.link}
        >
          {item}
        </NavLink>
      );
    } else {
      return (
        <Link
          key={index}
          to={`${item.toLowerCase()}-section`}
          smooth={true}
          duration={500}
          className={styles.link}
        >
          {item}
        </Link>
      );
    }
  };

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
        <nav className={styles.menu}>{menuItems.map(renderMenuItems)}</nav>
        <Box sx={{ flexGrow: 1 }} />
        <AudioControl />
        <Box sx={{ minWidth: 50 }} />
        <ClickAwayListener onClickAway={() => {}}>
          <ShoppingCartIcon
            edge="end"
            color="inherit"
            sx={{ cursor: "pointer" }}
          />
        </ClickAwayListener>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
