import React, { useEffect, useState } from "react";
import s from "./PakMaterials.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import { connect } from "react-redux";
import {
  createMaterialVendorAction,
  deleteMaterialVendorAction,
  filterMaterialVendorAction,
  getMaterialVendorAction,
} from "../../store/actions/Material/vendorActions";
import { withFormik } from "formik";
import PakRozhid from "../../misc/PakItems/PakRozhid";
import PakParams from "../../misc/PakItems/PakParams";
import PakParamsValue from "../../misc/PakItems/PakParamsValue";
import PakType from "../../misc/PakItems/PakType";

const PakMaterials = ({
  handleChange,
  handleSubmit,
  values,
  materialVendor,
  fetchMaterialVendor,
  filterMaterialVendor,
  filteredMaterialVendor,
  deleteMaterialVendor,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchMaterialVendor();
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
            <span className={s.title}>Постачальники</span>
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
                  await filterMaterialVendor(dataForFilter);
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
              {!filteredMaterialVendor.length
                ? materialVendor &&
                  materialVendor.map((materialVendor) => {
                    return (
                      <tr>
                        <td>{materialVendor.name || "err"}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
                            <button
                              onClick={() =>
                                deleteMaterialVendor(materialVendor._id)
                              }
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : filteredMaterialVendor.length &&
                  filteredMaterialVendor.map((filter) => {
                    return (
                      <tr>
                        <td>{filter.name || "err"}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
                            <button
                              onClick={() => deleteMaterialVendor(filter._id)}
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
          <PakRozhid />
        </TabPanel>
        <TabPanel>
          <PakType />
        </TabPanel>
        <TabPanel>
          <PakParams />
        </TabPanel>
        <TabPanel>
          <PakParamsValue />
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
    { props: { createMaterialVendor }, resetForm }
  ) => {
    const isSuccess = await createMaterialVendor(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(PakMaterials);

const mapStateToProps = (state) => {
  return {
    materialVendor: state.materialVendor.materialVendor,
    filteredMaterialVendor: state.materialVendor.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaterialVendor: (search) => dispatch(getMaterialVendorAction(search)),
    filterMaterialVendor: (data) => dispatch(filterMaterialVendorAction(data)),
    createMaterialVendor: (data) => dispatch(createMaterialVendorAction(data)),
    deleteMaterialVendor: (data) => dispatch(deleteMaterialVendorAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
