import React, { useEffect } from "react";
import s from "./ZpSklad1.module.css";
import { connect } from "react-redux";
import { getZpSklad1Action } from "../../../store/actions/zpSklad1Actions";
import { getWorkersAction } from "../../../store/actions/workersActions";

const ZpSklad1 = ({ getZpSklad1, getWorkers, zpsklad1, workers }) => {
  const arrayOfWorkers = zpsklad1 && Object.keys(zpsklad1);

  useEffect(() => {
    (async () => {
      await getZpSklad1();
      await getWorkers();
    })();
  }, []);
  const filteredWorker = workers?.filter((id) =>
    arrayOfWorkers?.filter((worker) => worker._id === id)
  );

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Зарплата склад 1</span>
        <hr></hr>
      </div>
      <div className={s.table}>
        <table>
          <thead>
            <tr>
              <th className={s.status__table}>Ім'я</th>
              <th className={s.status__table}>Зарплата</th>
              <th className={s.status__table}>Кількість змін</th>
              <th className={s.status__table}>Кількість продукції</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorker?.map((info) => {
              return (
                <tr key={info._id}>
                  <td>{info.fName + " " + info.sName}</td>
                  <td>{zpsklad1[info._id]?.zp}</td>
                  <td>{zpsklad1[info._id]?.zminu}</td>
                  <td>{zpsklad1[info._id]?.prod_quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    zpsklad1: state.zpsklad1.zpsklad1.zp_sklad1,
    workers: state.workers.workers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getZpSklad1: () => dispatch(getZpSklad1Action()),
    getWorkers: () => dispatch(getWorkersAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ZpSklad1);
