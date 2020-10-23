import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PakItems.module.css";
import { connect } from "react-redux";
import {
  createMaterialTypeAction,
  deleteMaterialTypeAction,
  filterMaterialTypeAction,
  getMaterialTypeAction,
} from "../../store/actions/Material/typeActions";
import { withFormik } from "formik";

const MaterialType = ({
  handleChange,
  handleSubmit,
  values,
  fetchMaterialType,
  materialType,
  filterMaterialType,
  filteredMaterialType,
  deleteMaterialType,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchMaterialType();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Тип</span>
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
              await filterMaterialType(dataForFilter);
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
          {!filteredMaterialType.length
            ? materialType &&
              materialType.map((materialType) => {
                return (
                  <tr>
                    <td>{materialType.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() => deleteMaterialType(materialType._id)}
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredMaterialType.length &&
              filteredMaterialType.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteMaterialType(filter._id)}>
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
    { props: { createMaterialType }, resetForm }
  ) => {
    const isSuccess = await createMaterialType(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(MaterialType);

const mapStateToProps = (state) => {
  return {
    materialType: state.materialType.materialType,
    filteredMaterialType: state.materialType.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaterialType: (search) => dispatch(getMaterialTypeAction(search)),
    filterMaterialType: (data) => dispatch(filterMaterialTypeAction(data)),
    createMaterialType: (data) => dispatch(createMaterialTypeAction(data)),
    deleteMaterialType: (data) => dispatch(deleteMaterialTypeAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
