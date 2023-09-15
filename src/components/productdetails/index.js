import React, { useContext, useEffect, useState } from "react";
// import {
//   fetchSelectedProduct,
//   fetchSpecificCategory,
// } from "../../services/productServices";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import "./productdetails.scss";
import SpecificCategory from "../specificcategory";
import { useLocation, withRouter } from "react-router-dom";
import { UserContext } from "../../utils/userContext";
import { connect } from "react-redux";
import {
  fetchSingleProduct,
  fetchSpecificCategory,
} from "../../action/ActionCreaters";
import { GridLoader } from "react-spinners";

const ProductDetails = (props) => {
  const {
    fetchSingleProduct,
    singleProduct,
    fetchSpecificCategory,
    specificCategory,
    productLoading,
    productError,
  } = props;
  let params = new URLSearchParams(useLocation().search);
  const [category, setCategory] = useState(params.get("category"));
  const [productId, setProductId] = useState(parseInt(params.get("id")));
  const { cartItems, setCartItems } = useContext(UserContext);

  useEffect(() => {
    setProductId(parseInt(params.get("id")));
  }, [params.get("id")]);

  useEffect(() => {
    setCategory(params.get("category"));
  }, [params.get("category")]);

  useEffect(() => {
    fetchSingleProduct(productId);
    fetchSpecificCategory(category);
  }, [productId]);

  const addtoCart = (wishItem) => {
    const checkID = wishItem.id;
    setCartItems((prevState) => {
      let similarItem = prevState.find((item) => item.id === checkID);
      if (similarItem) {
        similarItem.count = similarItem.count + 1;

        return [
          ...prevState.filter((item) => item.id !== checkID),
          similarItem,
        ];
      } else {
        const newItem = {};
        newItem.count = 1;
        newItem.id = wishItem.id;
        newItem.image = wishItem.image;
        newItem.title = wishItem.title;
        newItem.price = wishItem.price;
        return [...prevState, newItem];
      }
    });
  };

  if (singleProduct?.title) {
    return (
      <div className="productDetails">
        <Card className="productDetailsCard">
          <Card className="productImage">
            <CardImg src={singleProduct.image} alt={singleProduct.title} />
          </Card>
          <Card className="productDescription">
            <CardBody>
              <CardTitle>{singleProduct.title}</CardTitle>
              <CardText>{singleProduct.description}</CardText>
              <CardText>$ {singleProduct.price}</CardText>
              <Button onClick={() => addtoCart(singleProduct)}>
                Add to Cart
              </Button>
            </CardBody>
          </Card>
        </Card>
        {category && (
          <SpecificCategory
            productId={productId}
            category={specificCategory}
            addtoCart={addtoCart}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="detail-product-loader">
        <GridLoader
          color={"#FF735C"}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
};

const mapStatetoProps = (state) => {
  return {
    singleProduct: state.productReducer.singleProduct,

    productLoading: state.productReducer.singleProductLoading,
    productError: state.productReducer.singleProductErr,
    specificCategory: state.productReducer.allData,
    productsLoading: state.productReducer.isLoading,
    productsError: state.productReducer.errmsg,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  fetchSingleProduct: (id) => {
    dispatch(fetchSingleProduct(id));
  },
  fetchSpecificCategory: (category) => {
    dispatch(fetchSpecificCategory(category));
  },
});

export default withRouter(
  connect(mapStatetoProps, mapDispatchtoProps)(ProductDetails)
);
