import React, {useEffect, useState} from "react";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./Workers.module.css";
import {deleteWorkerAction, getWorkersAction, searchWorkersAction,} from "../../store/actions/workersActions";
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";

const Workers = ({
                   getWorkers,
                   filteredWorkers,
                   workers,
                   filetred,
                   searchWorkers,
                   deleteWorkers,
                   _id,
                 }) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const h = useHistory();
  console.log(filteredWorkers);
  useEffect(() => {
    (async () => {
      await getWorkers();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.top__container}>
        <div className={s.title__container}>
          <span className={s.title}>Працівники</span>
        </div>
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Пошук працівника"
              onChange={({target}) =>
                setDataForFilter({...dataForFilter, search: target.value})
              }
            />
            <Button
              title="Пошук"
              onClick={async () => {
                await searchWorkers(dataForFilter);
              }}
            />
          </div>
        </div>
        <div>
          <Link to="create-worker" className={s.create__worker}>
            <Button title="Створити працівника"/>
          </Link>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Ім'я</th>
            <th className={s.status__table}>Статус</th>
            <th className={s.status__table}>ID операції</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredWorkers.length
            ? workers &&
            workers?.map((worker) => {
              return (
                <tr key={worker._id}>
                  <td>{worker?.fName + " " + worker?.sName}</td>
                  <td>{worker?.status === 'worked' ? "Працює":"Не працює"}</td>
                  <td>
                    {worker?.operationId?.map((q) => {
                      return q.name+", ";
                    })}
                  </td>
                  <td>
                    <div className={s.table__btn}>
                      <button
                        className={s.del}
                        onClick={() => h.push(`/edit-worker/${worker._id}`)}
                      >
                        Редагувати
                      </button>
                      <button onClick={() => deleteWorkers(worker._id)}>
                        Видалити
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
            : filteredWorkers.length &&
            filteredWorkers?.map((filtered) => {
              return (
                <tr key={filetred?._id}>
                  <td>{filetred?.fName + " " + filetred?.sName}</td>
                  <td>{filetred?.status === 'worked' ? "Працює":"Не працює"}</td>
                  {/* <td>
                      {filetred?.operationId?.map((q) => {
                        return q.name;
                      })}
                    </td> */}
                  <td>
                    <div className={s.table__btn}>
                      <button
                        className={s.del}
                        onClick={() => h.push(`/edit-worker/${filetred._id}`)}
                      >
                        Редагувати
                      </button>
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
    getWorkers: (searchValue, id) =>
      dispatch(getWorkersAction(searchValue, id)),
    searchWorkers: (data) => dispatch(searchWorkersAction(data)),
    deleteWorkers: (id) => dispatch(deleteWorkerAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Workers);
