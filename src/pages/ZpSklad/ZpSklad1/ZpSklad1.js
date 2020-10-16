import React, { useEffect, useState } from "react";
import Input from "../../../misc/Input/Input";
import Button from "../../../misc/Button/Button";
import s from "../ZpSklad1.module.css";
import { connect } from "react-redux";
import {
  deleteZpSklad1Action,
  getZpSklad1Action,
  searchZpSklad1Action,
} from "../../../store/actions/zpSklad1Actions";

import { fetchWorker } from "../../../store/api/api";
import { getToken } from "../../../utils/utils";

const ZpSklad1 = ({
  getZpSklad1,
  filteredZpSklad1,
  zpsklad1,
  filetred,
  searchZpSklad1,
  deleteZpSklad1,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const arrayOfWorkers = Object.keys(zpsklad1);

  useEffect(() => {
    (async () => {
      await getZpSklad1();
    })();
  }, []);
  arrayOfWorkers.map((id) =>
    fetchWorker(id, getToken())
      .then((worker) => console.log(worker))
      .catch((e) => console.log(e))
  );

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Зарплата склад 1</span>
        <hr></hr>
      </div>
      <div className={s.filter__container}>
        <div className={s.search__container}>
          <Input
            label="Пошук працівника"
            onChange={({ target }) =>
              setDataForFilter({ ...dataForFilter, search: target.value })
            }
          />
          <Button
            title="Пошук"
            onClick={async () => {
              await searchZpSklad1(dataForFilter);
            }}
          />
        </div>

        <div className={s.create__worker}>
          <Button title="Створити працівника" />
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.name__table}>Ім'я</th>
            <th className={s.name__table}>Зарплата</th>
            <th className={s.name__table}>Кількість змін</th>
            <th className={s.name__table}>Кількість продукції</th>
          </tr>
          {!filteredZpSklad1
            ? zpsklad1 &&
              zpsklad1?.map((zpsklad) => {
                return (
                  <tr key={zpsklad._id}>
                    <td>{zpsklad.fName + " " + zpsklad.sName}</td>
                    {/* <td>{zpsklad.status}</td>
                    <td>
                      {workers.operationId}
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteWorkers(workers._id)}>
                          Видалити
                        </button>
                      </div>
                    </td> */}
                  </tr>
                );
              })
            : filteredZpSklad1.length &&
              filteredZpSklad1.map((filtered) => {
                return (
                  <tr key={zpsklad1._id}>
                    {/* <td>{filetred.fName + " " + filetred.sName}</td>
                    <td>{filetred.status}</td>
                    <td>{filetred.operationId}</td>
                    <td>
                      Germany
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteWorkers(filtered._id)}>
                          Видалити
                        </button>
                      </div>
                    </td> */}
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
    zpsklad1: state.zpsklad1.zp_sklad1,
    filteredZpSklad1: state.zpsklad1.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getZpSklad1: (searchValue) => dispatch(getZpSklad1Action(searchValue)),
    searchZpSklad1: (data) => dispatch(searchZpSklad1Action(data)),
    deleteZpSklad1: (id) => dispatch(deleteZpSklad1Action(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ZpSklad1);
