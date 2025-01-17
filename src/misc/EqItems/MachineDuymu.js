import React, { useState, useEffect } from "react";
import { withFormik } from "formik";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Machine.module.css";
import { connect } from "react-redux";
import {
  createMachineDuymuAction,
  deleteMachineDuymuAction,
  getMachineDuymuAction,
} from "../../store/actions/Machine/duymuActions";
import { filterMachineDuymuAction } from "../../store/actions/Machine/duymuActions";
import {
  fetchSingleMachineDuymu,
  patchMachineDuymu,
} from "../../store/api/api";
import { getToken } from "../../utils/utils";

const MachineDuymu = ({
  handleChange,
  handleSubmit,
  values,
  fetchMachineDuymu,
  machineDuymu,
  filteredMachineDuymu,
  filterMachineDuymu,
  deleteMachineDuymu,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const [singleMachineDuymu, setsingleMachineDuymu] = useState({});
  const [duymu, setDuymu] = useState([]);

  const change = (e) => {
    setsingleMachineDuymu({
      ...singleMachineDuymu,
      name: e.target.value,
    });
  };

  const patchSingleMachineDuymu = (id) => {
    alert("Змінено");
    const token = getToken();
    patchMachineDuymu(singleMachineDuymu._id, token, singleMachineDuymu).then(
      (res) => {
        res.status === 200 &&
          setDuymu((prevState) =>
            prevState.filter((golku) =>
              golku._id === singleMachineDuymu._id
                ? (golku.name = singleMachineDuymu.name)
                : golku
            )
          );
      }
    );
  };

  const getSingleDuymu = (id) => {
    const token = getToken();
    fetchSingleMachineDuymu(id, token).then((res) => {
      setsingleMachineDuymu(res.data);
    });
  };

  useEffect(() => {
    setDuymu(machineDuymu);
  }, [machineDuymu]);

  useEffect(() => {
    (async () => {
      await fetchMachineDuymu();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Дюйми</span>
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
              await filterMachineDuymu(dataForFilter);
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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singleMachineDuymu.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSingleMachineDuymu()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredMachineDuymu.length
            ? machineDuymu &&
              machineDuymu.map((machineDuymu) => {
                return (
                  <tr>
                    <td>{machineDuymu.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleDuymu(machineDuymu._id)}
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => deleteMachineDuymu(machineDuymu._id)}
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredMachineDuymu.length &&
              filteredMachineDuymu.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleDuymu(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteMachineDuymu(filter._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
        </table>
      </div>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    name: "",
  }),
  handleSubmit: async (
    values,
    { props: { createMachineDuymu }, resetForm }
  ) => {
    const isSuccess = await createMachineDuymu(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(MachineDuymu);

const mapStateToProps = (state) => {
  return {
    machineDuymu: state.machineDuymu.machineDuymu,
    filteredMachineDuymu: state.machineDuymu.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMachineDuymu: (search) => dispatch(getMachineDuymuAction(search)),
    filterMachineDuymu: (data) => dispatch(filterMachineDuymuAction(data)),
    createMachineDuymu: (data) => dispatch(createMachineDuymuAction(data)),
    deleteMachineDuymu: (data) => dispatch(deleteMachineDuymuAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
