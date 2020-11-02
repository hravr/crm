import React, {useEffect} from "react";
import s from "./ZpSklad3.module.css";
import {connect} from "react-redux";
import {getWorkersAction} from "../../../store/actions/workersActions";
import {getZpSklad3Action} from "../../../store/actions/zpSklad3Actions";

const ZpSklad3 = ({getZpSklad3, getWorkers, zpsklad1, workers}) => {
    const arrayOfWorkers = zpsklad1 && Object.keys(zpsklad1);

    useEffect(() => {
        (async () => {
            await getZpSklad3();
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
                <span className={s.title}>Зарплата склад 3</span>
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
                                <td>{info.fName + ' ' + info.sName}</td>
                                <td>{zpsklad1[info._id].zp}</td>
                                <td>{zpsklad1[info._id].zminu}</td>
                                <td>{zpsklad1[info._id].prod_quantity}</td>
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
    console.log(state)
    return {
        zpsklad1: state.zpsklad3.zpsklad3.zp_sklad3,
        workers: state.workers.workers
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getZpSklad3: () => dispatch(getZpSklad3Action()),
        getWorkers: () => dispatch(getWorkersAction())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ZpSklad3);
