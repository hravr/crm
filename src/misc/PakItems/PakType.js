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
import { getToken } from "../../utils/utils";
import {
  fetchSingleMaterialType,
  patchMaterialType,
} from "../../store/api/api";

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
  const [singlePakMaterialType, setSinglePakMaterialType] = useState({});
  const [rozhid, setType] = useState([]);

  const change = (e) => {
    setSinglePakMaterialType({
      ...singlePakMaterialType,
      name: e.target.value,
    });
  };

  const patchSingleMaterialType = (id) => {
    alert("Змінено");
    const token = getToken();
    patchMaterialType(
      singlePakMaterialType._id,
      token,
      singlePakMaterialType
    ).then((res) => {
      res.status === 200 &&
        setType((prevState) =>
          prevState.filter((type) =>
            type._id === singlePakMaterialType._id
              ? (type.name = singlePakMaterialType.name)
              : type
          )
        );
    });
  };

  const getSingleType = (id) => {
    const token = getToken();
    fetchSingleMaterialType(id, token).then((res) => {
      setSinglePakMaterialType(res.data);
    });
  };

  useEffect(() => {
    setType(materialType);
  }, [materialType]);

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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singlePakMaterialType.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSingleMaterialType()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredMaterialType.length
            ? materialType &&
              materialType.map((materialType) => {
                return (
                  <tr>
                    <td>{materialType.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleType(materialType._id)}
                        >
                          Редагувати
                        </button>
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
                        <button
                          className={s.del}
                          onClick={() => getSingleType(filter._id)}
                        >
                          Редагувати
                        </button>
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
