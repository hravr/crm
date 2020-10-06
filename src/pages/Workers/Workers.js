import React from "react";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./Workers.module.css";
import Barcode from "react-barcode";

const Workers = (props) => {
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Працівники</span>
        <hr></hr>
      </div>
      <div className={s.filter__container}>
        <div className={s.search__container}>
          <Input label="Пошук працівника" />
        </div>
        <div className={s.barcode}>
          <Barcode value="hey" />,
        </div>
        <div className={s.create__worker}>
          <Button title="Створити працівника" />
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.name__table}>Name</th>
            <th className={s.status__table}>Status</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>
              Germany
              <div className={s.table__btn}>
                <button className={s.del}>Редагувати</button>
                <button>Видалити</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Berglunds snabbkop</td>
            <td>
              Sweden
              <div className={s.table__btn}>
                <button className={s.del}>Редагувати</button>
                <button>Видалити</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>
              UK
              <div className={s.table__btn}>
                <button className={s.del}>Редагувати</button>
                <button>Видалити</button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Workers;
