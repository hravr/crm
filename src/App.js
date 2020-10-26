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
import { getToken } from "./utils/utils";
import ZpSklad1 from "./pages/ZpSklad/ZpSklad1/ZpSklad1";
import Productcia from "./pages/Productcia/Productcia";
import Operations from "./pages/Operations/Operations";
import Zvitu from "./pages/Zvitu/Zvitu";
import CreateWorker from "./pages/CreateWorker/CreateWorker";
import CreatePrices from "./pages/CreatePrices/CreatePrices";
import EditWorker from "./pages/EditWorker/EditWorker";
import EditPrice from "./pages/EditPrice/EditPrice";

function App(props) {
  // const Route = ({
  //   redirectTo,
  //   component: Component,
  //   condition,
  //   state = {},
  //   ...rest
  // }) => (
  //   <Route {...rest}>
  //     {condition ? (
  //       <Component />
  //     ) : (
  //       <Redirect to={{ pathname: redirectTo, state }} />
  //     )}
  //   </Route>
  // );
  const token = getToken();
  return (
    <Router>
      <Header />
      <div style={{ padding: 10 }}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/create-pruhid" component={CreatePruhid} />
          <Route path="/workers" component={Workers} />
          <Route path="/prices" component={Prices} />
          <Route path="/equipment" component={Equipment} />
          <Route path="/praja" component={Praja} />
          <Route path="/pak_materials" component={PakMaterials} />
          <Route path="/edit" component={Edit} />
          <Route path="/sklad_1" component={Sklad1} />
          <Route path="/zp-sklad1" component={ZpSklad1} />
          <Route path="/productcia" component={Productcia} />
          <Route path="/operations" component={Operations} />
          <Route path="/zvitu" component={Zvitu} />
          <Route path="/create-worker" component={CreateWorker} />
          <Route path="/create-prices" component={CreatePrices} />
          <Route path="/edit-worker/:id" component={EditWorker} />
          <Route path="/edit-price/:id" component={EditPrice} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
