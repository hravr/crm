import React, { useEffect, useState } from "react";
import s from "./PakMaterials.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import { connect } from "react-redux";
import { getMaterialRozhidAction } from "../../store/actions/Material/dilankaRozhoduActions";
import { getMaterialVendorAction } from "../../store/actions/Material/vendorActions";
import { getMaterialTypeAction } from "../../store/actions/Material/typeActions";
import { getMaterialParamsAction } from "../../store/actions/Material/paramsActions";
import { getMaterialParamsValueAction } from "../../store/actions/Material/paramsValueActions";

const PakMaterials = ({
  fetchMaterialRozhid,
  materialRozhid,
  fetchMaterialParams,
  fetchMaterialParamsValue,
  fetchMaterialType,
  fetchMaterialVendor,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchMaterialRozhid();
      await fetchMaterialVendor();
      await fetchMaterialType();
      await fetchMaterialParams();
      await fetchMaterialParamsValue();
    })();
  }, []);

  return (
    <Tabs>
      <div className={s.main}>
        <TabList className={s.tabs}>
          {[
            "Постачальники",
            "Ділянки розходу",
            "Тип",
            "Параметри",
            "Значення параметрів",
          ].map((item, i) => (
            <Tab
              onClick={() => setActiveTabIndex(i)}
              key={item}
              className={classnames(s.tab, {
                [s.tab__active]: activeTabIndex === i,
              })}
            >
              {item}
            </Tab>
          ))}
        </TabList>
        <TabPanel>
          <div className={s.title__container}>
            <span className={s.title}>Назва сировини</span>
            <hr></hr>
          </div>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук працівника"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                // onClick={async () => {
                //   await filterProdArticle(dataForFilter);
                // }}
              />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.name__table}>ID</th>
                <th className={s.name__table}></th>
              </tr>
              {materialRozhid &&
                materialRozhid.map((materialRozhid) => {
                  return (
                    <tr>
                      <td>{materialRozhid.name || "err"}</td>
                      <td>{materialRozhid._id || "err"}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button className={s.del}>Редагувати</button>
                          <button>Видалити</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

const mapStateToProps = (state) => {
  return {
    materialRozhid: state.materialRozhid.materialRozhid,
    materialVendor: state.materialVendor.materialVendor,
    materialType: state.materialType.materialType,
    materialParams: state.materialParams.materialParams,
    materialParamsValue: state.materialParamsValue.materialParamsValue,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaterialRozhid: (search) => dispatch(getMaterialRozhidAction(search)),
    fetchMaterialVendor: (search) => dispatch(getMaterialVendorAction(search)),
    fetchMaterialType: (search) => dispatch(getMaterialTypeAction(search)),
    fetchMaterialParams: (search) => dispatch(getMaterialParamsAction(search)),
    fetchMaterialParamsValue: (search) =>
      dispatch(getMaterialParamsValueAction(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PakMaterials);
