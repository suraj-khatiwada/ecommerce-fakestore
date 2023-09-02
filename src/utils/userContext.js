import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = (props) => {
  const [username, setUsername] = useState();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const state = { username, cartCount, cartItems };
  return (
    <UserContext.Provider
      {...props}
      value={{
        ...state,
        setUsername: setUsername,
        setCartCount: setCartCount,
        setCartItems: setCartItems,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export { UserContext };
