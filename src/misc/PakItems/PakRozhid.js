import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PakItems.module.css";
import { connect } from "react-redux";
import {
  createMaterialRozhidAction,
  deleteMaterialRozhidAction,
  filterMaterialRozhidAction,
  getMaterialRozhidAction,
} from "../../store/actions/Material/dilankaRozhoduActions";
import { withFormik } from "formik";

const MaterialRozhid = ({
  handleChange,
  handleSubmit,
  values,
  fetchMaterialRozhid,
  materialRozhid,
  filterMaterialRozhid,
  filteredMaterialRozhid,
  deleteMaterialRozhid,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchMaterialRozhid();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Ділянки розходу</span>
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
              await filterMaterialRozhid(dataForFilter);
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
          {!filteredMaterialRozhid.length
            ? materialRozhid &&
              materialRozhid.map((materialRozhid) => {
                return (
                  <tr>
                    <td>{materialRozhid.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() =>
                            deleteMaterialRozhid(materialRozhid._id)
                          }
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredMaterialRozhid.length &&
              filteredMaterialRozhid.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() => deleteMaterialRozhid(filter._id)}
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
    { props: { createMaterialRozhid }, resetForm }
  ) => {
    const isSuccess = await createMaterialRozhid(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(MaterialRozhid);

const mapStateToProps = (state) => {
  return {
    materialRozhid: state.materialRozhid.materialRozhid,
    filteredMaterialRozhid: state.materialRozhid.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaterialRozhid: (search) => dispatch(getMaterialRozhidAction(search)),
    filterMaterialRozhid: (data) => dispatch(filterMaterialRozhidAction(data)),
    createMaterialRozhid: (data) => dispatch(createMaterialRozhidAction(data)),
    deleteMaterialRozhid: (data) => dispatch(deleteMaterialRozhidAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
