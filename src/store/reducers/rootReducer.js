import { combineReducers } from "redux";
import operationsReducer from "./operationsReducer";
import duymuReducer from "./Machine/duymuReducer";
import golkuReducer from "./Machine/golkuReducer";
import modelReducer from "./Machine/modelReducer";
import vyazalniReducer from "./Machine/vyazalniReducer";
import dilankaRozhoduReducer from "./Material/dilankaRozhoduReducer";
import paramsReducer from "./Material/paramsReducer";
import paramsValueReducer from "./Material/paramsValueReducer";
import colorReducer from "./Praja/colorReducer";
import rozhidReducer from "./Praja/rozhidReducer";
import surovunaReducer from "./Praja/surovunaReducer";
import tovtshinaReducer from "./Praja/tovtshinaReducer";
import typeReducer from "./Praja/typeReducer";
import vendorReducer from "./Praja/vendorReducer";
import prodTypeAsortReducer from "./prodTypeAsortReducer";
import prodTypeClassReducer from "./prodTypeClassReducer";
import prodTypeColorReducer from "./prodTypeColorReducer";
import prodTypeImageReducer from "./prodTypeImageReducer";
import prodTypeArticleReducer from "./prodTypeArticleReducer";
import prodTypeSezonReducer from "./prodTypeSezonReducer";
import prodTypeSizeReducer from "./prodTypeSizeReducer";
import prodTypeTypeReducer from "./prodTypeTypeReducer";
import profilleReducer from "./profileReducer";
import roztsinkaReducer from "./roztsinkaReducer";
import skladReducer from "./skladReducer";
import workersReducer from "./workersReducer";
import zpSklad1Reducer from "./zpSklad1Reducer";
import zvituReducer from "./Zvitu/zvituReducer";
import zvituRozxidReducer from "./Zvitu/zvituRozxidReducer";
import typeMReducer from "./Material/typeMReducer";
import vendorMReducer from "./Material/vendorMReducer";
import machineReducer from "./Machine/machineReducer";
import zvituZalushokReducer from "./Zvitu/zvituZalushokReducer";

export default combineReducers({
  profile: profilleReducer,
  sklad1: skladReducer,
  workers: workersReducer,
  prod: prodTypeArticleReducer,
  prodAsortument: prodTypeAsortReducer,
  prodClass: prodTypeClassReducer,
  prodSize: prodTypeSizeReducer,
  prodColor: prodTypeColorReducer,
  prodImage: prodTypeImageReducer,
  prodSezon: prodTypeSezonReducer,
  prodType: prodTypeTypeReducer,
  prajaSurovuna: surovunaReducer,
  prajaType: typeReducer,
  prajaTovtshina: tovtshinaReducer,
  prajaVendor: vendorReducer,
  prajaRozhid: rozhidReducer,
  prajaColor: colorReducer,
  machines: machineReducer,
  machineModel: modelReducer,
  machineDuymu: duymuReducer,
  machineGolku: golkuReducer,
  machineVyazalni: vyazalniReducer,
  roztsinka: roztsinkaReducer,
  materialRozhid: dilankaRozhoduReducer,
  materialParams: paramsReducer,
  materialParamsValue: paramsValueReducer,
  materialType: typeMReducer,
  materialVendor: vendorMReducer,
  operations: operationsReducer,
  zvitu: zvituReducer,
  zvituRozxid: zvituRozxidReducer,
  zvituZalushok: zvituZalushokReducer,
  zpsklad1: zpSklad1Reducer,
});
