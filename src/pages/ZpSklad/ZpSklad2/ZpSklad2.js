import React, {useEffect} from "react";
import s from "./ZpSklad2.module.css";
import {connect} from "react-redux";
import {getWorkersAction} from "../../../store/actions/workersActions";
import {getZpSklad2Action} from "../../../store/actions/zpSklad2Actions";

const ZpSklad2 = ({getZpSklad2, getWorkers, zpsklad1, workers}) => {
    const arrayOfWorkers = zpsklad1 && Object.keys(zpsklad1);

    useEffect(() => {
        (async () => {
            await getZpSklad2();
            await getWorkers();
        })();
    }, []);
    const filteredWorker = workers?.filter(id =>
        arrayOfWorkers?.filter(worker =>
            worker._id === id
        )
    )
    return (
        <div className={s.main}>
            <div className={s.title__container}>
                <span className={s.title}>Зарплата склад 2</span>
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
                        if (zpsklad1[info._id]) {
                            return (
                                <tr key={info._id}>
                                    <td>{info.fName + ' ' + info.sName}</td>
                                    <td>{zpsklad1[info._id].zp}</td>
                                    <td>{zpsklad1[info._id].zminu}</td>
                                    <td>{zpsklad1[info._id].prod_quantity}</td>
                                </tr>
                            );
                        }
                    })}
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
