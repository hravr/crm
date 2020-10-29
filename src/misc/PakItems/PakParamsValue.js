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
import { getToken } from "../../utils/utils";
import {
  fetchSingleMaterialParamsValue,
  patchMaterialParamsValue,
} from "../../store/api/api";

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
  const [
    singlePakMaterialParamsValue,
    setSinglePakMaterialParamsValue,
  ] = useState({});
  const [paramsValue, setParamsValue] = useState([]);

  const change = (e) => {
    setSinglePakMaterialParamsValue({
      ...singlePakMaterialParamsValue,
      name: e.target.value,
    });
  };

  const patchSingleMaterialParamsValue = (id) => {
    alert("Змінено");
    const token = getToken();
    patchMaterialParamsValue(
      singlePakMaterialParamsValue._id,
      token,
      singlePakMaterialParamsValue
    ).then((res) => {
      res.status === 200 &&
        setParamsValue((prevState) =>
          prevState.filter((parVal) =>
            parVal._id === singlePakMaterialParamsValue._id
              ? (parVal.name = singlePakMaterialParamsValue.name)
              : parVal
          )
        );
    });
  };

  const getSingleParamsValue = (id) => {
    const token = getToken();
    fetchSingleMaterialParamsValue(id, token).then((res) => {
      setSinglePakMaterialParamsValue(res.data);
    });
  };

  useEffect(() => {
    setParamsValue(materialParamsValue);
  }, [materialParamsValue]);

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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singlePakMaterialParamsValue.name}
              name="name"
              onChange={change}
            />
            <Button
              title="Змінити"
              onClick={() => patchSingleMaterialParamsValue()}
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
          {!filteredMaterialParamsValue.length
            ? materialParamsValue &&
              materialParamsValue.map((materialParamsValue) => {
                return (
                  <tr>
                    <td>{materialParamsValue.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() =>
                            getSingleParamsValue(materialParamsValue._id)
                          }
                        >
                          Редагувати
                        </button>
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
                        <button
                          className={s.del}
                          onClick={() => getSingleParamsValue(filter._id)}
                        >
                          Редагувати
                        </button>
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
