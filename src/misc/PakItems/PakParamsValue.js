import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PakItems.module.css";
import { connect } from "react-redux";
import {
  createMaterialParamsValueAction,
  deleteMaterialParamsValueAction,
  filterMaterialParamsValueAction,
  getMaterialParamsValueAction,
} from "../../store/actions/Material/paramsValueActions";
import { withFormik } from "formik";

const MaterialParamsValue = ({
  handleChange,
  handleSubmit,
  values,
  fetchMaterialParamsValue,
  materialParamsValue,
  filterMaterialParamsValue,
  filteredMaterialParamsValue,
  deleteMaterialParamsValue,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchMaterialParamsValue();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Значення параметрів</span>
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
              await filterMaterialParamsValue(dataForFilter);
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
          {!filteredMaterialParamsValue.length
            ? materialParamsValue &&
              materialParamsValue.map((materialParamsValue) => {
                return (
                  <tr>
                    <td>{materialParamsValue.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() =>
                            deleteMaterialParamsValue(materialParamsValue._id)
                          }
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredMaterialParamsValue.length &&
              filteredMaterialParamsValue.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() => deleteMaterialParamsValue(filter._id)}
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
    { props: { createMaterialParamsValue }, resetForm }
  ) => {
    const isSuccess = await createMaterialParamsValue(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(MaterialParamsValue);

const mapStateToProps = (state) => {
  return {
    materialParamsValue: state.materialParamsValue.materialParamsValue,
    filteredMaterialParamsValue: state.materialParamsValue.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaterialParamsValue: (search) =>
      dispatch(getMaterialParamsValueAction(search)),
    filterMaterialParamsValue: (data) =>
      dispatch(filterMaterialParamsValueAction(data)),
    createMaterialParamsValue: (data) =>
      dispatch(createMaterialParamsValueAction(data)),
    deleteMaterialParamsValue: (data) =>
      dispatch(deleteMaterialParamsValueAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
