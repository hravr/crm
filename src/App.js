import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Sklad2 from "./pages/Sklad2/Sklad2";
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
import CreateMachine from "./pages/CreateMachine/CreateMachine";
import EditMachine from "./pages/EditMachine/EditMachine";
import CreateZvitu from "./pages/CreateZvitu/CreateZvitu";
import CreateZvituRozxid from "./pages/CreateZvituRozxid/CreateZvituRozxid";
import EditZvitu from "./pages/EditZvitu/EditZvitu";
import EditZvituRozxid from "./pages/EditZvituRozxid/EditZvituRozxid";
import CreateProdArticle from "./pages/CreateProdArticle/CreateProdArticle";
import EditProdArticle from "./pages/EditProdArticle/EditProdArticle";
import CreatePakType from "./pages/CreatePakType/CreatePakType";
import CreateParamsValue from "./pages/CreateParamsValue/CreateParamsValue";
import EditPramsValue from "./pages/EditPramsValue/EditPramsValue";
import EditPakType from "./pages/EditPakType/EditPakType";
import EditSklad1 from "./pages/EditSklad/EditSklad1";
import ZpSklad2 from "./pages/ZpSklad/ZpSklad2/ZpSklad2";
import ZpSklad3 from "./pages/ZpSklad/ZpSklad3/ZpSklad3";
import ZpSklad4 from "./pages/ZpSklad/ZpSklad4/ZpSklad4";
import EditSklad2 from "./pages/EditSklad/EditSklad2";
import EditSklad3 from "./pages/EditSklad/EditSklad3";
import EditSklad4 from "./pages/EditSklad/EditSklad4";
import Sklad3 from "./pages/Sklad3/Sklad3";
import Sklad4 from "./pages/Sklad4/Sklad4";
import Materials from "./pages/Materials/Materials";
import Priaga from "./pages/Priaga/Priaga";
import CreateMaterialPruhid from "./pages/CreateMaterialPruhid/CreateMaterialPruhid";
import CreatePrajaPruhid from "./pages/CreatePrajaPruhid/CreatePrajaPruhid";
import EditPrajaPruhid from "./pages/EditPrajaPruhid/EditPrajaPruhid";
import CreatePrajaRozhid from "./pages/CreatePrajaRozhid/CreatePrajaRozhid";
import EditMaterialPruhid from "./pages/EditMaterialPruhid/EditMaterialPruhid";
import CreatePakParam from "./pages/CreatePakParam/CreatePakParam";
import createMaterialRozhid from "./pages/CreateMaterialRozhid/CreateMaterialRozhid";

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
          <Route path="/materials" component={Materials} />
          <Route path="/priaga" component={Priaga} />
          <Route path="/edit" component={Edit} />
          <Route path="/sklad_1" component={Sklad1} />
          <Route path="/sklad_2" component={Sklad2} />
          <Route path="/sklad_3" component={Sklad3} />
          <Route path="/sklad_4" component={Sklad4} />
          <Route path="/zp-sklad1" component={ZpSklad1} />
          <Route path="/zp-sklad2" component={ZpSklad2} />
          <Route path="/zp-sklad3" component={ZpSklad3} />
          <Route path="/zp-sklad4" component={ZpSklad4} />
          <Route path="/productcia" component={Productcia} />
          <Route path="/operations" component={Operations} />
          <Route path="/zvitu" component={Zvitu} />
          <Route path="/create-worker" component={CreateWorker} />
          <Route path="/create-prices" component={CreatePrices} />
          <Route path="/edit-worker/:id" component={EditWorker} />
          <Route path="/edit-price/:id" component={EditPrice} />
          <Route path="/create-machine" component={CreateMachine} />
          <Route path="/edit-machine/:id" component={EditMachine} />
          <Route path="/create-zvitu" component={CreateZvitu} />
          <Route path="/create-zvitu-rozxid" component={CreateZvituRozxid} />
          <Route path="/edit-zvitu/:id" component={EditZvitu} />
          <Route path="/edit-zvitu-rozxid/:id" component={EditZvituRozxid} />
          <Route path="/create-prod-article" component={CreateProdArticle} />
          <Route path="/edit-prod-article/:id" component={EditProdArticle} />
          <Route path="/create-paktype" component={CreatePakType} />
          <Route path="/create-pakparam" component={CreatePakParam} />
          <Route path="/create-pak-paramsvalue" component={CreateParamsValue} />
          <Route path="/edit-pak-paramsvalue/:id" component={EditPramsValue} />
          <Route path="/edit-paktype/:id" component={EditPakType} />
          <Route path="/edit-sklad1/:id" component={EditSklad1} />
          <Route path="/edit-sklad2/:id" component={EditSklad2} />
          <Route path="/edit-sklad3/:id" component={EditSklad3} />
          <Route path="/edit-sklad4/:id" component={EditSklad4} />
          <Route
            path="/сreate-materials-pruhid"
            component={CreateMaterialPruhid}
          />
          <Route path="/сreate-praja-pruhid" component={CreatePrajaPruhid} />
          <Route path="/сreate-praja-rozxid" component={CreatePrajaRozhid} />
          <Route path="/edit-praja-pruhid/:id" component={EditPrajaPruhid} />
          <Route
            path="/create-materials-rozhid"
            component={createMaterialRozhid}
          />
          <Route
            path="/edit-materials-pruhid/:id"
            component={EditMaterialPruhid}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
