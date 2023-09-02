import Login from "./components/login";
import Registration from "./components/register";
import Dashboard from "./components/dashboard";
import "./assets/css/common.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from "./components/productdetails";
import NavigationBar from "./components/navbar";
import MyCartList from "./mycartlist";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"}>
            <Login />
          </Route>
          <Route exact path={"/registration"}>
            <Registration />
          </Route>
          <Route exact path={"/dashboard"}>
            <NavigationBar />
            <Dashboard />
          </Route>
          <Route exact path={"/productdetails"}>
            <NavigationBar />
            <ProductDetails />
          </Route>
          <Route exact path={"/mycart"}>
            <NavigationBar />
            <MyCartList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
