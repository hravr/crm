import React, { useEffect, useState } from "react";
import s from "../ZpSklad1.module.css";
import { connect } from "react-redux";
import { getZpSklad1Action } from "../../../store/actions/zpSklad1Actions";
import { getToken } from "../../../utils/utils";
import { fetchWorker, fetchWorkers } from "../../../store/api/api";

const ZpSklad1 = ({ getZpSklad1, zpsklad1, workers }) => {
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
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Ім'я</th>
            <th className={s.status__table}>Зарплата</th>
            <th className={s.status__table}>Кількість змін</th>
            <th className={s.status__table}>Кількість продукції</th>
          </tr>
          {zpsklad1.length &&
            zpsklad1.map((zp) => {
              return (
                <tr key={zp._id}>
                  <td></td>
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
    zpsklad1: state.zpsklad1.zpsklad1,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getZpSklad1: () => dispatch(getZpSklad1Action()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ZpSklad1);
