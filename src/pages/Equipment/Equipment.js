import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Equipment.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { connect } from "react-redux";
import { getMachineModelAction } from "../../store/actions/Machine/modelActions";
import { getMachineDuymuAction } from "../../store/actions/Machine/duymuActions";
import { getMachineGolkuAction } from "../../store/actions/Machine/golkuActions";
import { getMachineVyazalniAction } from "../../store/actions/Machine/vyazalniActions";

const Equipment = ({
  fetchMachineModel,
  machineModel,
  fetchMachineDuymu,
  fetchMachineGolku,
  fetchMachineVyazalni,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchMachineModel();
      await fetchMachineDuymu();
      await fetchMachineGolku();
      await fetchMachineVyazalni();
    })();
  }, []);
  return (
    <Tabs>
      <div className={s.main}>
        <TabList className={s.tabs}>
          {["Моделі", "Голки", "Дюйми", "Машини в'язальні"].map((item, i) => (
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
              {machineModel &&
                machineModel.map((machineModel) => {
                  return (
                    <tr>
                      <td>{machineModel.name || "err"}</td>
                      <td>{machineModel._id || "err"}</td>
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
        <TabPanel></TabPanel>
      </div>
    </Tabs>
  );
};

const mapStateToProps = (state) => {
  return {
    machineModel: state.machineModel.machineModel,
    machineDuymu: state.machineDuymu.machineDuymu,
    machineGolku: state.machineGolku.machineGolku,
    machineVyazalni: state.machineVyazalni.machineVyazalni,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMachineModel: (search) => dispatch(getMachineModelAction(search)),
    fetchMachineDuymu: (search) => dispatch(getMachineDuymuAction(search)),
    fetchMachineGolku: (search) => dispatch(getMachineGolkuAction(search)),
    fetchMachineVyazalni: (search) =>
      dispatch(getMachineVyazalniAction(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Equipment);
