import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg, CardTitle } from "reactstrap";
import { deleteIcon } from "../assets/images";
import { UserContext } from "../utils/userContext";
import "./cartlist.scss";

const MyCartList = () => {
  const { cartItems, setCartItems, cartCount, setCartCount } =
    useContext(UserContext);

  const itemPrice = cartItems.map((item) => item.price);
  const totalPrice = itemPrice.reduce(
    (prevValue, currentValue) => prevValue + currentValue,
    0
  );

  const deleteItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  return (
    <div className="cartItems">
      <h2>You have {cartItems.length} Items</h2>
      <div className="cartItemlists">
        {cartItems.map((item) => (
          <Card className="cartItem">
            <CardImg src={item.image} alt={item.title} />
            <CardBody>
              <CardTitle>{item.title}</CardTitle>
            </CardBody>
            <CardBody>
              <CardTitle>$ {item.price}</CardTitle>
            </CardBody>
            <CardImg
              className="deleteIcon"
              src={deleteIcon}
              onClick={() => deleteItem(item.id)}
            />
          </Card>
        ))}
      </div>
      <div className="checkout">
        <p> Total : $ {totalPrice}</p>
        <Button>Checkout</Button>
      </div>
    </div>
  );
};
export default MyCartList;
