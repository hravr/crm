import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PakItems.module.css";
import { connect } from "react-redux";
import {
  createMaterialParamsAction,
  deleteMaterialParamsAction,
  filterMaterialParamsAction,
  getMaterialParamsAction,
} from "../../store/actions/Material/paramsActions";
import { withFormik } from "formik";
import {
  fetchSingleMaterialParams,
  patchMaterialParams,
} from "../../store/api/api";
import { getToken } from "../../utils/utils";

const MaterialParams = ({
  handleChange,
  handleSubmit,
  values,
  fetchMaterialParams,
  materialParams,
  filterMaterialParams,
  filteredMaterialParams,
  deleteMaterialParams,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const [singlePakMaterialParams, setSinglePakMaterialParams] = useState({});
  const [params, setParams] = useState([]);

  const change = (e) => {
    setSinglePakMaterialParams({
      ...singlePakMaterialParams,
      name: e.target.value,
    });
  };

  const patchSingleMaterialParams = (id) => {
    alert("Змінено");
    const token = getToken();
    patchMaterialParams(
      singlePakMaterialParams._id,
      token,
      singlePakMaterialParams
    ).then((res) => {
      res.status === 200 &&
        setParams((prevState) =>
          prevState.filter((par) =>
            par._id === singlePakMaterialParams._id
              ? (par.name = singlePakMaterialParams.name)
              : par
          )
        );
    });
  };

  const getSingleParams = (id) => {
    const token = getToken();
    fetchSingleMaterialParams(id, token).then((res) => {
      setSinglePakMaterialParams(res.data);
    });
  };

  useEffect(() => {
    setParams(materialParams);
  }, [materialParams]);

  useEffect(() => {
    (async () => {
      await fetchMaterialParams();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Параметри</span>
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
              await filterMaterialParams(dataForFilter);
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
              value={singlePakMaterialParams.name}
              name="name"
              onChange={change}
            />
            <Button
              title="Змінити"
              onClick={() => patchSingleMaterialParams()}
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
          {!filteredMaterialParams.length
            ? materialParams &&
              materialParams.map((materialParams) => {
                return (
                  <tr>
                    <td>{materialParams.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleParams(materialParams._id)}
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() =>
                            deleteMaterialParams(materialParams._id)
                          }
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredMaterialParams.length &&
              filteredMaterialParams.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleParams(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => deleteMaterialParams(filter._id)}
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
    { props: { createMaterialParams }, resetForm }
  ) => {
    const isSuccess = await createMaterialParams(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(MaterialParams);

const mapStateToProps = (state) => {
  return {
    materialParams: state.materialParams.materialParams,
    filteredMaterialParams: state.materialParams.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaterialParams: (search) => dispatch(getMaterialParamsAction(search)),
    filterMaterialParams: (data) => dispatch(filterMaterialParamsAction(data)),
    createMaterialParams: (data) => dispatch(createMaterialParamsAction(data)),
    deleteMaterialParams: (data) => dispatch(deleteMaterialParamsAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
