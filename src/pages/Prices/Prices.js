import { connect } from "react-redux";
import React, { useEffect } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Prices.module.css";
import {
  createRoztsinkaAction,
  deleteRoztsinkaAction,
  filterRoztsinkaAction,
  getRoztsinkaAction,
} from "../../store/actions/roztsinkaActions";
import { Link } from "react-router-dom";

const Prices = ({ fetchRoztsinka, roztsinka }) => {
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
          <Input label="Пошук розцінки" />
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
            {/* <th>ID</th> */}
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
            <th>Обладнання ID</th>
            <th></th>
          </tr>
          {roztsinka &&
            roztsinka.map((roztsinka) => {
              return (
                <tr>
                  <td>{roztsinka.name}</td>
                  <td>{roztsinka._id}</td>
                  <td>{roztsinka.createdAt}</td>
                  <td>{roztsinka.deletedAt || "err==="}</td>
                  <td>{roztsinka.price}</td>
                  <td>{roztsinka.operationId}</td>
                  <td>{roztsinka.typeId || "err==="}</td>
                  <td>{roztsinka.colorId || "err==="}</td>
                  <td>{roztsinka.asortument || "err==="}</td>
                  <td>{roztsinka.classId || "err==="}</td>
                  <td>{roztsinka.seasonId || "err==="}</td>
                  <td>{roztsinka.imageId || "err==="}</td>
                  <td>{roztsinka.sizeId || "err==="}</td>
                  <td>{roztsinka.articleId || "err==="}</td>
                  <td>{roztsinka.gatunokId || "err==="}</td>
                  <td>{roztsinka.machineId || "err==="}</td>
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
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
    filtereRoztsinka: state.roztsinka.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoztsinka: (search) => dispatch(getRoztsinkaAction(search)),
    filterRoztsinka: (data) => dispatch(filterRoztsinkaAction(data)),
    createRoztsinka: (data) => dispatch(createRoztsinkaAction(data)),
    deleteRoztsinka: (data) => dispatch(deleteRoztsinkaAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prices);
