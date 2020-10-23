import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import Input from "../../misc/Input/Input";
import s from "./Prod.module.css";
import Button from "../../misc/Button/Button";
import { connect } from "react-redux";
import {
  createProdClassAction,
  deleteProdClassAction,
  filterProdClassAction,
  getProdClassAction,
} from "../../store/actions/prodTypeClassActions";


const ProdClass = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdClass,
  prodClass,
  filteredProdClass,
  filterProdClass,
  deleteProdClass
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);


  useEffect(() => {
    (async () => {
      await fetchProdClass();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Клас</span>
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
              await filterProdClass(dataForFilter);
            }}
          />
        </div>

        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Створити"
              value={values.name}
              name="name"
              onChange={handleChange}
            />
            <Button title="Створити" onClick={handleSubmit} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.name__table}>Назва</th>

            <th className={s.name__table}></th>
          </tr>
          {!filteredProdClass.length
            ? prodClass &&
              prodClass.map((prodClass) => {
                return (
                  <tr>
                    <td>{prodClass.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteProdClass(prodClass._id)}>Видалити</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredProdClass.length &&
              filteredProdClass.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteProdClass(filter._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
        </table>
      </div>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    name: "",
  }),
  handleSubmit: async (values, { props: { createProdClass }, resetForm }) => {
    const isSuccess = await createProdClass(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(ProdClass);

const mapStateToProps = (state) => {
  return {
    prodClass: state.prodClass.prodClass,
    filteredProdClass: state.prodClass.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdClass: (search) => dispatch(getProdClassAction(search)),
    filterProdClass: (data) => dispatch(filterProdClassAction(data)),
    createProdClass: (data) => dispatch(createProdClassAction(data)),
    deleteProdClass: (id) => dispatch(deleteProdClassAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
