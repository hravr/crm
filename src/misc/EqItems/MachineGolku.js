import React, { useState, useEffect } from "react";
import { withFormik } from "formik";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Machine.module.css";
import { connect } from "react-redux";

import { filterMachineGolkuAction } from "../../store/actions/Machine/golkuActions";
import {
  createMachineGolkuAction,
  deleteMachineGolkuAction,
  getMachineGolkuAction,
} from "../../store/actions/Machine/golkuActions";
import { getToken } from "../../utils/utils";
import {
  fetchSingleMachineGolku,
  patchMachineGolku,
} from "../../store/api/api";

const MachineGolku = ({
  handleChange,
  handleSubmit,
  values,
  fetchMachineGolku,
  machineGolku,
  filteredMachineGolku,
  filterMachineGolku,
  deleteMachineGolku,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const [singleMachineGolku, setsingleMachineGolku] = useState({});
  const [golku, setGolku] = useState([]);

  const change = (e) => {
    setsingleMachineGolku({
      ...singleMachineGolku,
      name: e.target.value,
    });
  };

  const patchSingleMachineGolku = (id) => {
    alert("Змінено");
    const token = getToken();
    patchMachineGolku(singleMachineGolku._id, token, singleMachineGolku).then(
      (res) => {
        res.status === 200 &&
          setGolku((prevState) =>
            prevState.filter((golku) =>
              golku._id === singleMachineGolku._id
                ? (golku.name = singleMachineGolku.name)
                : golku
            )
          );
      }
    );
  };

  const getSingleGolku = (id) => {
    const token = getToken();
    fetchSingleMachineGolku(id, token).then((res) => {
      setsingleMachineGolku(res.data);
    });
  };

  useEffect(() => {
    setGolku(machineGolku);
  }, [machineGolku]);

  useEffect(() => {
    (async () => {
      await fetchMachineGolku();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Голки</span>
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
              await filterMachineGolku(dataForFilter);
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
              value={singleMachineGolku.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSingleMachineGolku()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredMachineGolku.length
            ? machineGolku &&
              machineGolku.map((machineGolku) => {
                return (
                  <tr>
                    <td>{machineGolku.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleGolku(machineGolku._id)}
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => deleteMachineGolku(machineGolku._id)}
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredMachineGolku.length &&
              filteredMachineGolku.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleGolku(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteMachineGolku(filter._id)}>
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
    { props: { createMachineGolku }, resetForm }
  ) => {
    const isSuccess = await createMachineGolku(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(MachineGolku);

const mapStateToProps = (state) => {
  return {
    machineGolku: state.machineGolku.machineGolku,
    filteredMachineGolku: state.machineGolku.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMachineGolku: (search) => dispatch(getMachineGolkuAction(search)),
    filterMachineGolku: (data) => dispatch(filterMachineGolkuAction(data)),
    createMachineGolku: (data) => dispatch(createMachineGolkuAction(data)),
    deleteMachineGolku: (data) => dispatch(deleteMachineGolkuAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
