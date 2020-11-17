import React, {useEffect, useState} from "react";
import s from "./ZpSklad2.module.css";
import {connect} from "react-redux";
import {getWorkersAction} from "../../../store/actions/workersActions";
import {getZpSklad2Action} from "../../../store/actions/zpSklad2Actions";

const ZpSklad2 = ({getZpSklad2, getWorkers, zpsklad1, workers}) => {
    const [selectedWorker, setSelectedWorker] = useState(1);

    useEffect(() => {
        (async () => {
            await getZpSklad2();
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
            if (operation.name === 'Швея') {
                return master.push(worker)
            }
            if (operation.name === "Сортувальниця") {
                return vyazal.push(worker)
            }
        })[0]
    })

    return (
        <div className={s.main}>
            <div className={s.title__container}>
                <span className={s.title}>Зарплата склад 2</span>
                <div className={s.tab_container}>
                    <h4 className={selectedWorker === 1 ? s.tabs_active : s.tabs} onClick={() => {
                        setSelectedWorker(1)
                    }}>Швея</h4>
                    <h4 className={selectedWorker === 2 ? s.tabs_active : s.tabs} onClick={() => {
                        setSelectedWorker(2)
                    }}>Сортувальниця</h4>
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
        zpsklad1: state.zpsklad2.zpsklad2.zp_sklad2,
        workers: state.workers.workers
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getZpSklad2: () => dispatch(getZpSklad2Action()),
        getWorkers: () => dispatch(getWorkersAction())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ZpSklad2);
