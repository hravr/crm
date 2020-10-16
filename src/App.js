import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Header from "./misc/Header/Header";
import Profile from "./pages/Profile/Profile";
import CreatePruhid from "./pages/CreatePruhid/CreatePruhid";
import Workers from "./pages/Workers/Workers";
// import Products from "./pages/Products/Products";
import Prices from "./pages/Prices/Prices";
import Equipment from "./pages/Equipment/Equipment";
import Praja from "./pages/Praja/Praja";
import PakMaterials from "./pages/PakMaterials/PakMaterials";
import Sklad1 from "./pages/Sklad1/Sklad1";
import Edit from "./pages/Edit/Edit";
import ProdType from "./pages/Prod/ProdType/ProdType";
import ProdSize from "./pages/Prod/ProdSize/ProdSize";
import ProdSezon from "./pages/Prod/ProdSezon/ProdSezon";
import ProdImage from "./pages/Prod/ProdImage/ProdImage";
import ProdColor from "./pages/Prod/ProdColor/ProdColor";
import ProdClass from "./pages/Prod/ProdClass/ProdClass";
import ProdAsortument from "./pages/Prod/ProdAsortument/ProdAsortument";
import ProdArticle from "./pages/Prod/ProdArticle/ProdArticle";
import { getToken } from "./utils/utils";
import ZpSklad1 from "./pages/ZpSklad/ZpSklad1/ZpSklad1";
import Productcia from "./pages/Productcia/Productcia";

function App(props) {
  const PrivateRoute = ({
    redirectTo,
    component: Component,
    condition,
    state = {},
    ...rest
  }) => (
    <Route {...rest}>
      {condition ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: redirectTo, state }} />
      )}
    </Route>
  );
  const token = getToken();
  return (
    <Router>
      <Header />
      <div style={{ padding: 10 }}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/profile"
            component={Profile}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/create-pruhid"
            component={CreatePruhid}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/workers"
            component={Workers}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/prices"
            component={Prices}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/equipment"
            component={Equipment}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/praja"
            component={Praja}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/pak_materials"
            component={PakMaterials}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/edit"
            component={Edit}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/sklad_1"
            component={Sklad1}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/zp-sklad1"
            component={ZpSklad1}
          />
          <PrivateRoute
            redirectTo="/login"
            condition={token}
            path="/productcia"
            component={Productcia}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
