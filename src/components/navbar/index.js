import React, { useContext, useEffect, useState } from "react";
import { cartIcon, MainLogo, userLogo } from "../../assets/images";
import "./navbar.scss";
import { getLocalStorage } from "../../utils/storageUtils";
import { NavLink, useHistory } from "react-router-dom";
import {
  Collapse,
  Input,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { UserContext } from "../../utils/userContext";

const NavigationBar = () => {
  const { username, setUsername, cartItems } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!getLocalStorage("username")) {
      history.replace("/");
    } else {
      setUsername(getLocalStorage("username"));
    }
  }, [getLocalStorage("username")]);

  return (
    <div className="dashboard">
      <Navbar expand="md" navbar className="navbar">
        <NavbarBrand
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          <img src={MainLogo} />
        </NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="me-auto w-100" navbar>
            <NavItem>
              <NavLink to="#" />
              Add New Product
            </NavItem>
            <NavItem
              onClick={() => {
                history.push("/mycart");
              }}
            >
              My Cart
            </NavItem>
            <NavItem className="cartItems">{cartItems.length}</NavItem>

            <NavItem className="welcomeUser">Welcome, {username} </NavItem>
          </Nav>
        </Collapse>
        <img style={{ marginLeft: "0px" }} src={userLogo} />
      </Navbar>
    </div>
  );
};

export default NavigationBar;
