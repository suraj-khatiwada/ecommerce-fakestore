import React, { useContext, useEffect, useState } from "react";
import { cartIcon, MainLogo, userLogo } from "../../assets/images";
import "./navbar.scss";
import { getLocalStorage } from "../../utils/storageUtils";
import { NavLink, useHistory } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown,
} from "reactstrap";
import { UserContext } from "../../utils/userContext";
import { getNameInitial } from "../../utils/commonUtilis";

const NavigationBar = () => {
  const { username, setUsername, cartItems, setCartItems } =
    useContext(UserContext);
  const history = useHistory();

  const handleUserLogout = () => {
    history.push("/");
    setCartItems([]);
  };
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
          <h2>Fake Store</h2>
        </NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="me-auto w-100" navbar>
            <NavItem
              onClick={() => {
                history.push("/mycart");
              }}
            >
              My Cart
            </NavItem>
            <NavItem className="cartItems">
              {cartItems.length > 0 && cartItems.length}
            </NavItem>

            <NavItem className="welcomeUser">Welcome, {username} </NavItem>
          </Nav>
        </Collapse>
        <div className="profile-badge">
          <UncontrolledDropdown>
            <DropdownToggle>
              {username && getNameInitial(username)}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  handleUserLogout();
                }}
              >
                Log out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
