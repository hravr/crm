import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PrajaItems.module.css";
import { connect } from "react-redux";
import {
  createPrajaColorAction,
  deletePrajaColorAction,
  filterPrajaColorAction,
  getPrajaColorAction,
} from "../../store/actions/Praja/colorActions";
import { withFormik } from "formik";

const PrajaColor = ({
  handleChange,
  handleSubmit,
  values,
  fetchPrajaColor,
  prajaColor,
  filterPrajaColor,
  filteredPrajaColor,
  deletePrajaColor,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchPrajaColor();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Католожні кольори</span>
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
              await filterPrajaColor(dataForFilter);
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
          {!filteredPrajaColor.length
            ? prajaColor &&
              prajaColor.map((prajaColor) => {
                return (
                  <tr>
                    <td>{prajaColor.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() => deletePrajaColor(prajaColor._id)}
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredPrajaColor.length &&
              filteredPrajaColor.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deletePrajaColor(filter._id)}>
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
  handleSubmit: async (values, { props: { createPrajaColor }, resetForm }) => {
    const isSuccess = await createPrajaColor(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(PrajaColor);

const mapStateToProps = (state) => {
  return {
    prajaColor: state.prajaColor.prajaColor,
    filteredPrajaColor: state.prajaColor.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrajaColor: (search) => dispatch(getPrajaColorAction(search)),
    filterPrajaColor: (data) => dispatch(filterPrajaColorAction(data)),
    createPrajaColor: (data) => dispatch(createPrajaColorAction(data)),
    deletePrajaColor: (data) => dispatch(deletePrajaColorAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
