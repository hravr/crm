import React, { useState, useEffect } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Machine.module.css";
import { connect } from "react-redux";
import {
  deleteMachineAction,
  getMachineAction,
  searchMachineAction,
} from "../../store/actions/Machine/machineActions";
import { Link, useHistory } from "react-router-dom";

const Machines = ({
  filterMachine,
  filteredMachine,
  fetchMachine,
  machines,
  deleteMachine,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const h = useHistory();
  useEffect(() => {
    (async () => {
      await fetchMachine();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Машини</span>
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
              await filterMachine(dataForFilter);
            }}
          />
        </div>
        <div>
          <Link to="create-machine" className={s.create__worker}>
            <Button title="Створити машину" />
          </Link>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}>Модель</th>
            <th className={s.status__table}>Голка</th>
            <th className={s.status__table}>Дюйми</th>
            <th className={s.status__table}>Машини в'язальні</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredMachine.length
            ? machines &&
              machines.map((machines) => {
                return (
                  <tr>
                    <td>{machines?.name || "err"}</td>
                    <td>{machines?.golkuId?.name || "err"}</td>
                    <td>{machines?.modelId?.name || "err"}</td>
                    <td>{machines?.duymuId?.name || "err"}</td>
                    <td>{machines?.vyazalniId?.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() =>
                            h.push(`/edit-machine/${machines._id}`)
                          }
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteMachine(machines._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredMachine.length &&
              filteredMachine.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>{filter?.golkuId?.name || "err"}</td>
                    <td>{filter?.modelId?.name || "err"}</td>
                    <td>{filter?.duymuId?.name || "err"}</td>
                    <td>{filter?.vyazalniId?.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => h.push(`/edit-machine/${filter._id}`)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteMachine(filter._id)}>
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
    machines: state.machines.machines,
    filteredMachine: state.machines.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMachine: (search) => dispatch(getMachineAction(search)),
    filterMachine: (data) => dispatch(searchMachineAction(data)),
    deleteMachine: (data) => dispatch(deleteMachineAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Machines);
