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
  const [dataForFilter, setDataForFilter] = useState([]);
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
      </div>

      <div className={s.table}>
        <table>
          <tr>
            <th className={s.name__table}>Ім'я</th>
            {/* <th className={s.status__table}>ID </th> */}
            <th></th>
          </tr>
          {filteredOperations.length &&
            filteredOperations?.map((filtered) => {
              return (
                <tr key={operations._id}>
                  <td>{filtered?.name}</td>
                  {/* <td>{filtered._id}</td> */}
                  <td>
                    <div className={s.table__btn}>
                      <button className={s.del}>Редагувати</button>
                      <button onClick={() => deleteOperations(filtered._id)}>
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
