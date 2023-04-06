import React from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-scroll";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import { styled, alpha } from "@mui/system";

//Searchbar Styling from MaterialUI Example
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
        <Box className={styles.searchAndCart} sx={{ flexGrow: 1 }} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <IconButton edge="end" color="inherit" aria-label="shopping-cart">
          <ShoppingBasketRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
