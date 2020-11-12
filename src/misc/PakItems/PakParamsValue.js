import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PakItems.module.css";
import { connect } from "react-redux";
import {
  deleteMaterialParamsValueAction,
  filterMaterialParamsValueAction,
  getMaterialParamsValueAction,
} from "../../store/actions/Material/paramsValueActions";

import { Link, useHistory } from "react-router-dom";

const MaterialParamsValue = ({
  fetchMaterialParamsValue,
  materialParamsValue,
  filterMaterialParamsValue,
  filteredMaterialParamsValue,
  deleteMaterialParamsValue,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const history = useHistory();

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
          <Link to="/create-pak-paramsvalue" className={s.search__container}>
            <Button title="Створити" />
          </Link>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}>Параметер</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredMaterialParamsValue.length
            ? materialParamsValue &&
              materialParamsValue.map((materialParamsValue) => {
                return (
                  <tr>
                    <td>{materialParamsValue.name || "Всі"}</td>
                    <td>{materialParamsValue?.paramId?.name || "Всі"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() =>
                            history.push(
                              `/edit-pak-paramsvalue/${materialParamsValue._id}`
                            )
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
                    <td>{filter.name || "Всі"}</td>
                    <td>{filter?.paramId?.name || "Всі"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() =>
                            history.push(`/edit-pak-paramsvalue/${filter._id}`)
                          }
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
    deleteMaterialParamsValue: (data) =>
      dispatch(deleteMaterialParamsValueAction(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialParamsValue);
