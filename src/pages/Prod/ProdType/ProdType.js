import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../misc/Button/Button";
import Input from "../../../misc/Input/Input";
import ReactToExcel from "react-html-table-to-excel";

// import {
//   deleteProdAction,
//   filterProdAction,
//   getProdAction,
// } from "../../store/actions/prodActions";

import s from "../Prod.module.css";

const ProdType = ({ getProd }) => {
  //   useState(() => {
  //     (async () => {
  //       await getProd();
  //     })();
  //   }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Тип</span>
        <hr></hr>
      </div>
      <div className={s.filter__container}>
        <div className={s.search__container}>
          <Input label="Пошук типу" />
        </div>
        {/* <div className={s.date__filter}>
          <Input type="date" label="Фільтрувати за датою" />
        </div> */}
        <div className={s.create__worker}>
          <Button title="Пошук" />
        </div>
        <div className={s.create__worker}>
          <ReactToExcel
            table="table-to-xls"
            filename="Type"
            sheet="sheet 1"
            buttonText="EXPORT"
            className="exel"
          />
        </div>
      </div>
      <div className={s.table}>
        <table id="table-to-xls">
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

// const mapStateToProps = (state) => {
//   return {
//     prod: state.prod.prod,
//     filteredProd: state.prod.filtered,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getProd: (searchValue) => dispatch(getProdAction(searchValue)),
//     filterProd: (data) => dispatch(filterProdAction(data)),
//     deleteProd: (id) => dispatch(deleteProdAction(id)),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Products);
export default ProdType;
