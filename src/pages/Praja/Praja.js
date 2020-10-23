import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Praja.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { connect } from "react-redux";
import {
  createPrajaSurovunaAction,
  deletePrajaSurovunaAction,
  filterPrajaSurovunaAction,
  getPrajaSurovunaAction,
} from "../../store/actions/Praja/surovunaActions";
import { withFormik } from "formik";
import PrajaType from "../../misc/PrajaItems/PrajaType";
import PrajaTovtshina from "../../misc/PrajaItems/PrajaTovtshina";
import PrajaVendor from "../../misc/PrajaItems/PrajaVendor";
import PrajaRozhid from "../../misc/PrajaItems/PrajaRozhid";
import PrajaColor from "../../misc/PrajaItems/PrajaColor";

const Praja = ({
  handleChange,
  handleSubmit,
  values,
  fetchPrajaSurovuna,
  prajaSurovuna,
  filterPrajaSurovuna,
  filteredPrajaSurovuna,
  deletePrajaSurovuna,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchPrajaSurovuna();
    })();
  }, []);

  return (
    <Tabs>
      <div className={s.main}>
        <TabList className={s.tabs}>
          {[
            "Назва сировини",
            "Тип пряжі",
            "Товщина пряжі",
            "Постачальники",
            "Ділянки розходу",
            "Католожні кольори",
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
                label="Пошук"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                onClick={async () => {
                  await filterPrajaSurovuna(dataForFilter);
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
              {!filteredPrajaSurovuna.length
                ? prajaSurovuna &&
                  prajaSurovuna.map((prajaSurovuna) => {
                    return (
                      <tr>
                        <td>{prajaSurovuna.name || "err"}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
                            <button
                              onClick={() =>
                                deletePrajaSurovuna(prajaSurovuna._id)
                              }
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : filteredPrajaSurovuna.length &&
                  filteredPrajaSurovuna.map((filter) => {
                    return (
                      <tr>
                        <td>{filter.name || "err"}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
                            <button
                              onClick={() => deletePrajaSurovuna(filter._id)}
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
          <PrajaType />
        </TabPanel>
        <TabPanel>
          <PrajaTovtshina />
        </TabPanel>
        <TabPanel>
          <PrajaVendor />
        </TabPanel>
        <TabPanel>
          <PrajaRozhid />
        </TabPanel>
        <TabPanel>
          <PrajaColor />
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
    { props: { createPrajaSurovuna }, resetForm }
  ) => {
    const isSuccess = await createPrajaSurovuna(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(Praja);

const mapStateToProps = (state) => {
  return {
    prajaSurovuna: state.prajaSurovuna.prajaSurovuna,
    filteredPrajaSurovuna: state.prajaSurovuna.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrajaSurovuna: (search) => dispatch(getPrajaSurovunaAction(search)),
    filterPrajaSurovuna: (data) => dispatch(filterPrajaSurovunaAction(data)),
    createPrajaSurovuna: (data) => dispatch(createPrajaSurovunaAction(data)),
    deletePrajaSurovuna: (data) => dispatch(deletePrajaSurovunaAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
