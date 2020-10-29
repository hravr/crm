import React, { useState, useEffect } from "react";
import { withFormik } from "formik";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Machine.module.css";
import { connect } from "react-redux";
import {
  createMachineVyazalniAction,
  deleteMachineVyazalniAction,
  getMachineVyazalniAction,
} from "../../store/actions/Machine/vyazalniActions";
import { filterMachineVyazalniAction } from "../../store/actions/Machine/vyazalniActions";
import {
  fetchSingleMachineVyazalni,
  patchMachineVyazalni,
} from "../../store/api/api";
import { getToken } from "../../utils/utils";

const MachineVyazalni = ({
  handleChange,
  handleSubmit,
  values,
  fetchMachineVyazalni,
  machineVyazalni,
  filteredMachineVyazalni,
  filterMachineVyazalni,
  deleteMachineVyazalni,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const [singleMachineVyazalni, setsingleMachineVyazalni] = useState({});
  const [vyazalni, setVyazalni] = useState([]);

  const change = (e) => {
    setsingleMachineVyazalni({
      ...singleMachineVyazalni,
      name: e.target.value,
    });
  };

  const patchSingleMachineVyazalni = (id) => {
    alert("Змінено");
    const token = getToken();
    patchMachineVyazalni(
      singleMachineVyazalni._id,
      token,
      singleMachineVyazalni
    ).then((res) => {
      res.status === 200 &&
        setVyazalni((prevState) =>
          prevState.filter((golku) =>
            golku._id === singleMachineVyazalni._id
              ? (golku.name = singleMachineVyazalni.name)
              : golku
          )
        );
    });
  };

  const getSingleVyazalni = (id) => {
    const token = getToken();
    fetchSingleMachineVyazalni(id, token).then((res) => {
      setsingleMachineVyazalni(res.data);
    });
  };

  useEffect(() => {
    setVyazalni(machineVyazalni);
  }, [machineVyazalni]);

  useEffect(() => {
    (async () => {
      await fetchMachineVyazalni();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Машини в'язальні</span>
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
              await filterMachineVyazalni(dataForFilter);
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
              value={singleMachineVyazalni.name}
              name="name"
              onChange={change}
            />
            <Button
              title="Змінити"
              onClick={() => patchSingleMachineVyazalni()}
            />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredMachineVyazalni.length
            ? machineVyazalni &&
              machineVyazalni.map((machineVyazalni) => {
                return (
                  <tr>
                    <td>{machineVyazalni.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleVyazalni(machineVyazalni._id)}
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() =>
                            deleteMachineVyazalni(machineVyazalni._id)
                          }
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredMachineVyazalni.length &&
              filteredMachineVyazalni.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleVyazalni(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => deleteMachineVyazalni(filter._id)}
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
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    name: "",
  }),
  handleSubmit: async (
    values,
    { props: { createMachineVyazalni }, resetForm }
  ) => {
    const isSuccess = await createMachineVyazalni(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(MachineVyazalni);

const mapStateToProps = (state) => {
  return {
    machineVyazalni: state.machineVyazalni.machineVyazalni,
    filteredMachineVyazalni: state.machineVyazalni.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMachineVyazalni: (search) =>
      dispatch(getMachineVyazalniAction(search)),
    filterMachineVyazalni: (data) =>
      dispatch(filterMachineVyazalniAction(data)),
    createMachineVyazalni: (data) =>
      dispatch(createMachineVyazalniAction(data)),
    deleteMachineVyazalni: (data) =>
      dispatch(deleteMachineVyazalniAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
