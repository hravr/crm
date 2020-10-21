import { connect } from "react-redux";
import React, { useEffect } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Prices.module.css";
import { getRoztsinkaAction } from "../../store/actions/roztsinkaActions";

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
        <div className={s.date__filter}>
          <Input type="date" label="Фільтрувати за датою" />
        </div>
        <div className={s.create__worker}>
          <Button title="Створити розцінку" />
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th>ID</th>
            <th>Початок</th>
            <th>Завершення</th>
            <th>Ціна</th>
            <th>Назва</th>
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
                  <td>{roztsinka._id}</td>
                  <td>{roztsinka.createdAt}</td>
                  <td>{roztsinka.deletedAt || "err==="}</td>
                  <td>{roztsinka.price}</td>
                  <td>{roztsinka.name}</td>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoztsinka: (search) => dispatch(getRoztsinkaAction(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prices);
