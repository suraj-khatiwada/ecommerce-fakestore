import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";

import "./dashboard.scss";

import { fetchData, fetchSpecificCategory } from "../../action/ActionCreaters";

import BounceLoader from "react-spinners/BounceLoader";
import { GridLoader } from "react-spinners";
import ErrorComponent from "../../common/Error Component";

const Dashboard = (props) => {
  const {
    fetchData,
    allProductItems,
    productsLoading,
    productsError,
    fetchSpecificCategory,
  } = props;

  const history = useHistory();
  const [duplicateArray, setDuplicateArray] = useState([]);
  const [mulitpleProductItems, setMultipleProductItems] = useState([]);

  const categoryList = [
    { value: "all", label: "All" },
    { value: `men's clothing`, label: `Men's Clothing` },
    { value: `jewelery`, label: `Jewelery` },
    { value: `electronics`, label: `Electronics` },
    { value: `women's clothing`, label: `Women's clothing` },
  ];

  useEffect(() => {
    if (allProductItems.length > 0) {
      setDuplicateArray([...allProductItems]);
      setMultipleProductItems(allProductItems.concat(duplicateArray));
    }
  }, [productsLoading]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="select-category">
        <Select
          id="specificCategory"
          placeholder="Select Category"
          className="react-select"
          classNamePrefix={"react-select"}
          options={categoryList.map((category) => {
            return {
              value: category.value,
              label: category.label,
            };
          })}
          onChange={(item) => {
            if (item.value === "all") {
              fetchData();
            } else {
              fetchSpecificCategory(item.value);
            }
          }}
        />
      </div>
      {productsError && <ErrorComponent reloadFunction={fetchData} />}
      {productsLoading ? (
        <div className="dashboard-loader">
          <GridLoader
            color={"#FF735C"}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
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
        </>
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
  fetchSpecificCategory: (category) => {
    dispatch(fetchSpecificCategory(category));
  },
});

export default withRouter(
  connect(mapStatetoProps, mapDispatchToProps)(Dashboard)
);
