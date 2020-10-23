import React, { useState, useEffect } from "react";
import { withFormik } from "formik";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Equipment.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { connect } from "react-redux";
import {
  createMachineModelAction,
  deleteMachineModelAction,
  filterMachineModelAction,
  getMachineModelAction,
} from "../../store/actions/Machine/modelActions";
import MachineDuymu from "../../misc/EqItems/MachineDuymu";
import MachineGolku from "../../misc/EqItems/MachineGolku";
import MachineVyazalni from "../../misc/EqItems/MachineVyazalni";

const Equipment = ({
  handleChange,
  handleSubmit,
  values,
  fetchMachineModel,
  machineModel,
  filteredMachineModel,
  filterMachineModel,
  deleteMachineModel,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchMachineModel();
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
            <span className={s.title}>Моделі</span>
            <hr></hr>
          </div>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                onClick={async () => {
                  await filterMachineModel(dataForFilter);
                }}
              />
            </div>
            <div className={s.filter__container}>
              <div className={s.search__container}>
                <Input
                  label="Створити"
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                />
                <Button title="Створити" onClick={handleSubmit} />
              </div>
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.name__table}></th>
              </tr>
              {!filteredMachineModel.length
                ? machineModel &&
                  machineModel.map((machineModel) => {
                    return (
                      <tr>
                        <td>{machineModel.name || "err"}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
                            <button
                              onClick={() =>
                                deleteMachineModel(machineModel._id)
                              }
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : filteredMachineModel.length &&
                  filteredMachineModel.map((filter) => {
                    return (
                      <tr>
                        <td>{filter.name || "err"}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
                            <button
                              onClick={() => deleteMachineModel(filter._id)}
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <MachineGolku />
        </TabPanel>
        <TabPanel>
          <MachineDuymu />
        </TabPanel>
        <TabPanel>
          <MachineVyazalni />
        </TabPanel>
      </div>
    </Tabs>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    name: "",
  }),
  handleSubmit: async (
    values,
    { props: { createMachineModel }, resetForm }
  ) => {
    const isSuccess = await createMachineModel(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(Equipment);

const mapStateToProps = (state) => {
  return {
    machineModel: state.machineModel.machineModel,
    filteredMachineModel: state.machineModel.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMachineModel: (search) => dispatch(getMachineModelAction(search)),
    filterMachineModel: (data) => dispatch(filterMachineModelAction(data)),
    createMachineModel: (data) => dispatch(createMachineModelAction(data)),
    deleteMachineModel: (data) => dispatch(deleteMachineModelAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
