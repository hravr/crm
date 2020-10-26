import { connect } from "react-redux";
import React, { useEffect } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Prices.module.css";
import {
  deleteRoztsinkaAction,
  filterRoztsinkaAction,
  getRoztsinkaAction,
} from "../../store/actions/roztsinkaActions";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const Prices = ({
  fetchRoztsinka,
  roztsinka,
  filterRoztsinka,
  filteredRoztsinka,
  deleteRoztsinka,
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);
  const h = useHistory();
  useEffect(() => {
    (async () => {
      await fetchRoztsinka();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Розцінка</span>
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
              await filterRoztsinka(dataForFilter);
            }}
          />
        </div>
        <div className={s.create__worker}>
          <Link to="create-prices" className={s.create__worker}>
            <Button title="Створити розцінку" />
          </Link>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th>Назва</th>
            <th>Початок</th>
            <th>Завершення</th>
            <th>Ціна</th>
            <th>ID Обладнання</th>
            <th>ID операції</th>
            <th>Тип</th>
            <th>Колір</th>
            <th>Асортимент</th>
            <th>Клас</th>
            <th>Сезон</th>
            <th>Малюнок</th>
            <th>Розмір</th>
            <th>Артикул</th>
            <th>Гатунок</th>
            <th></th>
          </tr>
          {!filteredRoztsinka.length
            ? roztsinka &&
              roztsinka.map((roztsinka) => {
                return (
                  <tr key={roztsinka._id}>
                    <td>{roztsinka.name}</td>
                    <td>{roztsinka.startDate}</td>
                    <td>{roztsinka.endDate}</td>
                    <td>{roztsinka.price}</td>
                    <td>{roztsinka.machineId || "err==="}</td>
                    <td>{roztsinka.operationId}</td>
                    <td>{roztsinka.typeId || "err==="}</td>
                    <td>{roztsinka.colorId || "err==="}</td>
                    <td>{roztsinka.asortument || "err==="}</td>
                    <td>{roztsinka.classId || "err==="}</td>
                    <td>{roztsinka.seasonId || "err==="}</td>
                    <td>{roztsinka.imageId || "err==="}</td>
                    <td>{roztsinka.sizeId || "err==="}</td>
                    <td>{roztsinka.articleId || "err==="}</td>
                    <td>{roztsinka.gatynok || "err==="}</td>
                    <div className={s.table__btn}>
                      <button
                        className={s.del}
                        onClick={() => h.push(`/edit-price/${roztsinka._id}`)}
                      >
                        Редагувати
                      </button>
                      <button onClick={() => deleteRoztsinka(roztsinka._id)}>
                        Видалити
                      </button>
                    </div>
                  </tr>
                );
              })
            : filteredRoztsinka.length &&
              filteredRoztsinka.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name}</td>
                    <td>{filter.startDate}</td>
                    <td>{filter.endDate}</td>
                    <td>{filter.price}</td>
                    <td>{filter.machineId || "err==="}</td>
                    <td>{filter.operationId}</td>
                    <td>{filter.typeId || "err==="}</td>
                    <td>{filter.colorId || "err==="}</td>
                    <td>{filter.asortument || "err==="}</td>
                    <td>{filter.classId || "err==="}</td>
                    <td>{filter.seasonId || "err==="}</td>
                    <td>{filter.imageId || "err==="}</td>
                    <td>{filter.sizeId || "err==="}</td>
                    <td>{filter.articleId || "err==="}</td>
                    <td>{filter.gatynok || "err==="}</td>
                    <div className={s.table__btn}>
                      <button
                        className={s.del}
                        onClick={() => h.push(`/edit-price/${filter._id}`)}
                      >
                        Редагувати
                      </button>
                      <button onClick={() => deleteRoztsinka(filter._id)}>
                        Видалити
                      </button>
                    </div>
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
    roztsinka: state.roztsinka.roztsinka,
    filteredRoztsinka: state.roztsinka.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoztsinka: (search) => dispatch(getRoztsinkaAction(search)),
    filterRoztsinka: (data) => dispatch(filterRoztsinkaAction(data)),
    deleteRoztsinka: (data) => dispatch(deleteRoztsinkaAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prices);
