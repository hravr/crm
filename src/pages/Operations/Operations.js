import React, { useEffect, useState } from "react";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./Operations.module.css";
import { withFormik } from "formik";
import {
  getOperationsAction,
  searchOperationsAction,
  deleteOperationsAction,
  createOperationsAction,
} from "../../store/actions/operationsAction";
import { connect } from "react-redux";
import { getToken } from "../../utils/utils";
import { fetchSingleOperations, patchOperations } from "../../store/api/api";

const Operations = ({
  searchOperations,
  filteredOperations,
  operations,
  deleteOperations,
  getOperations,
  handleChange,
  handleSubmit,
  values,
}) => {
  const [dataForFilter, setDataForFilter] = useState();
  const [singleOperation, setSingleOperation] = useState({});
  const [operation, setOperation] = useState([]);

  const change = (e) => {
    setSingleOperation({ ...singleOperation, name: e.target.value });
  };

  const patchSingleOperation = (id) => {
    alert("Змінено");
    const token = getToken();
    patchOperations(singleOperation._id, token, singleOperation).then((res) => {
      res.status === 200 &&
        setOperation((prevState) =>
          prevState.filter((oper) =>
            oper._id === singleOperation._id
              ? (oper.name = singleOperation.name)
              : oper
          )
        );
    });
  };

  const getSingleOperation = (id) => {
    const token = getToken();
    fetchSingleOperations(id, token).then((res) => {
      setSingleOperation(res.data);
    });
  };

  useEffect(() => {
    setOperation(operations);
  }, [operations]);
  useEffect(() => {
    (async () => {
      await getOperations();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Операції</span>
        <hr></hr>
      </div>
      <div className={s.filter__container}>
        <div className={s.search__container}>
          <Input
            label="Пошук "
            onChange={({ target }) =>
              setDataForFilter({ ...dataForFilter, search: target.value })
            }
          />
          <Button
            title="Пошук"
            onClick={async () => {
              await searchOperations(dataForFilter);
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
              value={singleOperation.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSingleOperation()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Ім'я</th>
            <th></th>
          </tr>
          {!filteredOperations.length
            ? operations.length &&
              operations?.map((oper) => {
                return (
                  <tr key={oper._id}>
                    <td>{oper?.name}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleOperation(oper._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteOperations(oper._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredOperations.length &&
              filteredOperations.map((filter) => {
                return (
                  <tr key={operations._id}>
                    <td>{filter?.name}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleOperation(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteOperations(filter._id)}>
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
  handleSubmit: async (values, { props: { createOperations }, resetForm }) => {
    const isSuccess = await createOperations(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(Operations);

const mapStateToProps = (state) => {
  console.log(state.operations);
  return {
    operations: state.operations.operations,
    filteredOperations: state.operations.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOperations: () => dispatch(getOperationsAction()),
    searchOperations: (data) => dispatch(searchOperationsAction(data)),
    createOperations: (data) => dispatch(createOperationsAction(data)),
    deleteOperations: (id) => dispatch(deleteOperationsAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
