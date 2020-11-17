import React, {useEffect, useState} from "react";
import s from "./ZpSklad1.module.css";
import {connect} from "react-redux";
import {getZpSklad1Action} from "../../../store/actions/zpSklad1Actions";
import {getWorkersAction} from "../../../store/actions/workersActions";

const ZpSklad1 = ({getZpSklad1, getWorkers, zpsklad1, workers}) => {
  const [selectedWorker, setSelectedWorker] = useState(1);

  useEffect(() => {
    (async () => {
      await getZpSklad1();
      await getWorkers();
    })();
  }, []);

  const filteredWorker = zpsklad1 && workers.filter(worker => {
    if (zpsklad1[worker._id]) {
      return worker
    }
  })
  const vyazal = []
  const master = []

  const workersForTabs = filteredWorker && filteredWorker.map(worker => {
    return worker.operationId.map(operation => {
      if (operation.name === 'Майстер') {
        return master.push(worker)
      }
      if (operation.name === "В'язальниця") {
        return vyazal.push(worker)
      }
    })[0]
  })

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Зарплата склад 1</span>
        <div className={s.tab_container}>
          <h4 className={selectedWorker === 1 ? s.tabs_active : s.tabs} onClick={() => {
            setSelectedWorker(1)
          }}>Майстер</h4>
          <h4 className={selectedWorker === 2 ? s.tabs_active : s.tabs} onClick={() => {
            setSelectedWorker(2)
          }}>Вязальниця</h4>
        </div>
      </div>
      <hr></hr>
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
          {
            selectedWorker === 1 && master && master.map(masterWorker => {
              return (
                <tr key={masterWorker._id}>
                  <td>{masterWorker.fName + ' ' + masterWorker.sName}</td>
                  <td>{zpsklad1[masterWorker._id].zp}</td>
                  <td>{zpsklad1[masterWorker._id].zminu}</td>
                  <td>{zpsklad1[masterWorker._id].prod_quantity}</td>
                </tr>
              )
            })
          }
          {
            selectedWorker === 2 && vyazal && vyazal.map(vyazalWorker => {
              return (
                <tr key={vyazalWorker._id}>
                  <td>{vyazalWorker.fName + ' ' + vyazalWorker.sName}</td>
                  <td>{zpsklad1[vyazalWorker._id].zp}</td>
                  <td>{zpsklad1[vyazalWorker._id].zminu}</td>
                  <td>{zpsklad1[vyazalWorker._id].prod_quantity}</td>
                </tr>
              )
            })
          }
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
