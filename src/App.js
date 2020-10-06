import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Header from "./misc/Header/Header";
import Profile from "./pages/Profile/Profile";
import CreatePruhid from "./pages/CreatePruhid/CreatePruhid";
import Workers from "./pages/Workers/Workers";
import Products from "./pages/Products/Products";
import Prices from "./pages/Prices/Prices";
import Equipment from "./pages/Equipment/Equipment";
import Praja from "./pages/Praja/Praja";
import PakMaterials from "./pages/PakMaterials/PakMaterials";
import Sklad1 from "./pages/Sklad1/Sklad1";

function App(props) {
  return (
    <Router>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/create-pruhid" component={CreatePruhid} />
          <Route path="/workers" component={Workers} />
          <Route path="/products" component={Products} />
          <Route path="/prices" component={Prices} />
          <Route path="/equipment" component={Equipment} />
          <Route path="/praja" component={Praja} />
          <Route path="/pak_materials" component={PakMaterials} />
          <Route path="/sklad_1" component={Sklad1} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
