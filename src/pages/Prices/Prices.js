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
            <div className={s.table__flex}>
              <th>Початок</th>
              <th>Завершення</th>
            </div>
            <th>Ціна</th>
            <th>ID Обладнання</th>
            <th>ID операції</th>
            <div className={s.table__flex}>
              <th>Тип</th>
              <th>Колір</th>
            </div>
            <th>Асортимент</th>
            <th>Клас</th>
            <th>Сезон</th>
            <th>Малюнок</th>
            <th>Розмір</th>
            <th>Артикул</th>
            <th>Гатунок</th>
            {/* <th>ID працівника</th> */}
            <th></th>
          </tr>
          {!filteredRoztsinka.length
            ? roztsinka &&
              roztsinka.map((roztsinka) => {
                return (
                  <tr key={roztsinka._id}>
                    <td>{roztsinka.name}</td>
                    <div className={s.table__fl}>
                      <td>{roztsinka.startDate?.slice(0, 10)}</td>
                      <td>{roztsinka.endDate?.slice(0, 10)}</td>
                    </div>
                    <td>{roztsinka.price}</td>
                    <td>{roztsinka.machineId?.name || "Всі"}</td>
                    <td>{roztsinka.operationId?.name || "Всі"}</td>
                    <div className={s.table__fl}>
                      <td>{roztsinka.typeId?.name || "Всі"}</td>
                      <td>{roztsinka.colorId?.name || "Всі"}</td>
                    </div>
                    <td>{roztsinka.asortument?.name || "Всі"}</td>
                    <td>{roztsinka.classId?.name || "Всі"}</td>
                    <td>{roztsinka.seasonId?.name || "Всі"}</td>
                    <td>{roztsinka.imageId?.name || "Всі"}</td>
                    <td>{roztsinka.sizeId?.name || "Всі"}</td>
                    <td>{roztsinka.articleId?.name || "Всі"}</td>
                    <td>{roztsinka.gatynok || "Всі"}</td>
                    {/* <td>{roztsinka.changesId?.firstName || "Всі"}</td> */}
                    <div className={s.table__fl}>
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
                    <div className={s.table__fl}>
                      <td>{filter.startDate?.slice(0, 10)}</td>
                      <td>{filter.endDate?.slice(0, 10)}</td>
                    </div>
                    <td>{filter.price}</td>
                    <td>{filter.machineId?.name || "Всі"}</td>
                    <td>{filter.operationId?.name}</td>
                    <div className={s.table__fl}>
                      <td>{filter.typeId?.name || "Всі"}</td>
                      <td>{filter.colorId?.name || "Всі"}</td>
                    </div>
                    <td>{filter.asortument?.name || "Всі"}</td>
                    <td>{filter.classId?.name || "Всі"}</td>
                    <td>{filter.seasonId?.name || "Всі"}</td>
                    <td>{filter.imageId?.name || "Всі"}</td>
                    <td>{filter.sizeId?.name || "Всі"}</td>
                    <td>{filter.articleId?.name || "Всі"}</td>
                    <td>{filter.gatynok || "Всі"}</td>
                    {/* <td>{filter.changesId.fName?.name || "Всі"}</td> */}
                    <div className={s.table__fl}>
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
