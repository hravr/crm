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

import { useHistory } from "react-router-dom";

const MaterialParams = ({
  fetchMaterialParams,
  materialParams,
  filterMaterialParams,
  filteredMaterialParams,
  deleteMaterialParams,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});

  const h = useHistory();

  const handleCreate = () => {
    h.push("/create-pakparam");
  };

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
            onClick={() => {
              filterMaterialParams(dataForFilter);
            }}
          />
        </div>
        <div className={s.filter__container}>
          <div className={s.search__container}>
            {/*<Input*/}
            {/*  label="Створити"*/}
            {/*  value={values.name}*/}
            {/*  name="name"*/}
            {/*  onChange={handleChange}*/}
            {/*/>*/}
            <Button
              title="Створити"
              onClick={() => h.push("/create-pakparam")}
            />
          </div>
        </div>
        {/* <div className={s.filter__container}>
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
        </div> */}
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}>Тип</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredMaterialParams.length
            ? materialParams &&
              materialParams.map((materialParams) => {
                return (
                  <tr>
                    <td>{materialParams?.name || "Всі"}</td>
                    <td>{materialParams?.typeId?.name || "Всі"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() =>
                            h.push(`/edit-pak-params/${materialParams._id}`)
                          }
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
                    <td>{filter?.name || "Всі"}</td>
                    <td>{filter?.typeId?.name || "Всі"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() =>
                            h.push(`/edit-pak-params/${filter._id}`)
                          }
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
export default connect(mapStateToProps, mapDispatchToProps)(MaterialParams);
