import React, { useEffect, useState } from "react";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./Workers.module.css";
import {
  deleteWorkerAction,
  getWorkersAction,
  searchWorkersAction,
} from "../../store/actions/workersActions";
import { connect } from "react-redux";

const Workers = ({
  getWorkers,
  filteredWorkers,
  workers,
  filetred,
  searchWorkers,
  deleteWorkers,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  useEffect(() => {
    (async () => {
      await getWorkers();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Працівники</span>
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
              await searchWorkers(dataForFilter);
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
            <th className={s.status__table}>Статус</th>
            <th className={s.status__table}>ID операції</th>
          </tr>
          {!filteredWorkers
            ? workers &&
              workers?.map((workers) => {
                return (
                  <tr key={workers._id}>
                    <td>{workers.fName + " " + workers.sName}</td>
                    <td>{workers.status}</td>
                    <td>
                      {workers.operationId}
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteWorkers(workers._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredWorkers.length &&
              filteredWorkers.map((filtered) => {
                return (
                  <tr key={workers._id}>
                    <td>{filetred.fName + " " + filetred.sName}</td>
                    <td>{filetred.status}</td>
                    <td>{filetred.operationId}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteWorkers(filtered._id)}>
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
    workers: state.workers.workers,
    filteredWorkers: state.workers.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWorkers: (searchValue) => dispatch(getWorkersAction(searchValue)),
    searchWorkers: (data) => dispatch(searchWorkersAction(data)),
    deleteWorkers: (id) => dispatch(deleteWorkerAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Workers);
