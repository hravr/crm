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
            <th>ID працівника</th>
            <th></th>
          </tr>
          {!filteredRoztsinka.length
            ? roztsinka &&
              roztsinka.map((roztsinka) => {
                return (
                  <tr key={roztsinka._id}>
                    <td>{roztsinka.name}</td>
                    <td>{roztsinka.startDate?.slice(0, 10)}</td>
                    <td>{roztsinka.endDate?.slice(0, 10)}</td>
                    <td>{roztsinka.price}</td>
                    <td>{roztsinka.machineId?.name || "err==="}</td>
                    <td>{roztsinka.operationId?.name}</td>
                    <td>{roztsinka.typeId?.name || "err==="}</td>
                    <td>{roztsinka.colorId?.name || "err==="}</td>
                    <td>{roztsinka.asortument?.name || "err==="}</td>
                    <td>{roztsinka.classId?.name || "err==="}</td>
                    <td>{roztsinka.seasonId?.name || "err==="}</td>
                    <td>{roztsinka.imageId?.name || "err==="}</td>
                    <td>{roztsinka.sizeId?.name || "err==="}</td>
                    <td>{roztsinka.articleId?.name || "err==="}</td>
                    <td>{roztsinka.gatynok || "err==="}</td>
                    <td>{roztsinka.changesId?.firstName || "err==="}</td>
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
                    <td>{filter.startDate?.slice(0, 10)}</td>
                    <td>{filter.endDate?.slice(0, 10)}</td>
                    <td>{filter.price}</td>
                    <td>{filter.machineId?.name || "err==="}</td>
                    <td>{filter.operationId?.name}</td>
                    <td>{filter.typeId?.name || "err==="}</td>
                    <td>{filter.colorId?.name || "err==="}</td>
                    <td>{filter.asortument?.name || "err==="}</td>
                    <td>{filter.classId?.name || "err==="}</td>
                    <td>{filter.seasonId?.name || "err==="}</td>
                    <td>{filter.imageId?.name || "err==="}</td>
                    <td>{filter.sizeId?.name || "err==="}</td>
                    <td>{filter.articleId?.name || "err==="}</td>
                    <td>{filter.gatynok || "err==="}</td>
                    <td>{filter.changesId.fName?.name || "err==="}</td>

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
