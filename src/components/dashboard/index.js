import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import { fetchData } from "../../action/ActionCreaters";
import "./dashboard.scss";

const Dashboard = (props) => {
  const { fetchData, allProductItems, productsLoading, productsError } = props;
  console.log("Props", props);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="dashboard">
      {productsError && <h1>Error 404!</h1>}
      {productsLoading ? (
        <h1> Loading.....</h1>
      ) : (
        <div className="productItemDiv">
          {allProductItems?.map((items) => (
            <Card
              className="productItemCard"
              key={items.id}
              onClick={() =>
                history.push(
                  `/productdetails?id=${items.id}&category=${items.category}`
                )
              }
            >
              <CardImg src={items.image} alt={items.title} />

              <CardBody>
                <CardTitle>
                  {items.title.length > 17
                    ? `${items.title.substring(0, 17)}...`
                    : items.title}
                </CardTitle>
                <CardText> ${items.price}</CardText>
              </CardBody>
            </Card>
          ))}{" "}
        </div>
      )}
    </div>
  );
};
//mapStatetoProps--> takes current state from the store and converts it into props to be used by the respective component
const mapStatetoProps = (state) => {
  return {
    allProductItems: state.productReducer.allData,
    productsLoading: state.productReducer.isLoading,
    productsError: state.productReducer.errmsg,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => {
    dispatch(fetchData());
  },
});
export default withRouter(
  connect(mapStatetoProps, mapDispatchToProps)(Dashboard)
);
