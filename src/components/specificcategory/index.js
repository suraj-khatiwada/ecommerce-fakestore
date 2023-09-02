import React, { useEffect, useState } from "react";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import "./category.scss";
import { connect } from "react-redux";

function SpecificCategory(props) {
  const { productId, category } = props;
  const history = useHistory();

  return (
    <div className="mainDiv">
      <h2> Similar Products</h2>
      <div className="similarProducts">
        {category
          .filter((item) => item.id !== productId)
          .map((products) => (
            <Card
              key={products.id}
              onClick={() =>
                history.push(
                  `/productdetails?id=${products.id}&category=${products.category}`
                )
              }
            >
              <CardImg src={products.image} alt={products.title} />
              <CardBody>
                <CardTitle>
                  {products.title.length > 17
                    ? `${products.title.substring(0, 17)}...`
                    : products.title}
                </CardTitle>
                <CardText>$ {products.price}</CardText>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}
export default SpecificCategory;

// const mapStatetoProps = (state) => {
//   return {
//     specificCategory: state.productReducer.allData,
//     productsLoading: state.productReducer.isLoading,
//     productsError: state.productReducer.errmsg,
//   };
// };
// const mapDispatchtoProps = (dispatch) => {
//   fetchSpecificCategory: (category) => {
//     dispatch(fetchSpecificCategory(category));
//   };
// };
// export default withRouter(
//   connect(mapStatetoProps, mapDispatchtoProps)(SpecificCategory)
// );
