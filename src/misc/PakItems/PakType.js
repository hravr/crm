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
import { Link, useHistory } from "react-router-dom";

const MaterialType = ({
  fetchMaterialType,
  materialType,
  filterMaterialType,
  filteredMaterialType,
  deleteMaterialType,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const history = useHistory();
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
        <Link to="/create-paktype">
          <Button title="Створити" />
        </Link>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}>Ділянка розходу</th>
            <th className={s.status__table}>Постачальник</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredMaterialType.length
            ? materialType &&
              materialType.map((materialType) => {
                return (
                  <tr>
                    <td>{materialType.name || "Всі"}</td>
                    <td>{materialType.dilankaId?.name || "Всі"}</td>
                    <td>{materialType.vendorId?.name || "Всі"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() =>
                            history.push(`/edit-paktype/${materialType._id}`)
                          }
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
                    <td>{filter.name || "Всі"}</td>
                    <td>{filter.dilankaId?.name || "Всі"}</td>
                    <td>{filter.vendorId?.name || "Всі"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() =>
                            history.push(`/edit-paktype/${filter._id}`)
                          }
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
export default connect(mapStateToProps, mapDispatchToProps)(MaterialType);
