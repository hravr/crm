import React from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";

import s from "./Products.module.css";

const Products = (props) => {
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Продукти</span>
        <hr></hr>
      </div>
      <div className={s.filter__container}>
        <div className={s.search__container}>
          <Input label="Пошук продукту" />
        </div>
        <div className={s.date__filter}>
          <Input type="date" label="Фільтрувати за датою" />
        </div>
        <div className={s.create__worker}>
          <Button title="Створити продукт" />
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th>Тип</th>
            <th>Колір</th>
            <th>Асортимент</th>
            <th>Клас</th>
            <th>Сезон</th>
            <th>Малюнок</th>
            <th>Розмір</th>
            <th>Артикул</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
            <td>
              50
              <div className={s.table__btn}>
                <button className={s.del}>Редагувати</button>
                <button>Видалити</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
            <td>94</td>
            <td>94</td>
            <td>94</td>
            <td>94</td>
            <td>
              94
              <div className={s.table__btn}>
                <button className={s.del}>Редагувати</button>
                <button>Видалити</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Adam</td>
            <td>Johnson</td>
            <td>67</td>
            <td>67</td>
            <td>67</td>
            <td>67</td>
            <td>67</td>
            <td>
              67
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

export default Products;
