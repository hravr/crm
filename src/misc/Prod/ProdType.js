import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import Input from "../../misc/Input/Input";
import s from "./Prod.module.css";
import Button from "../../misc/Button/Button";
import { connect } from "react-redux";
import {
  createProdTypeAction,
  deleteProdTypeAction,
  filterProdTypeAction,
  getProdTypeAction,
} from "../../store/actions/prodTypeTypeActions";

const ProdType = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdType,
  prodType,
  filteredProdType,
  filterProdType,
  deleteProdType,
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchProdType();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Тип</span>
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
              await filterProdType(dataForFilter);
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
          {!filteredProdType.length
            ? prodType &&
              prodType.map((prodType) => {
                return (
                  <tr>
                    <td>{prodType.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteProdType(prodType._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredProdType.length &&
              filteredProdType.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteProdType(filter._id)}>
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
  handleSubmit: async (values, { props: { createProdType }, resetForm }) => {
    const isSuccess = await createProdType(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(ProdType);

const mapStateToProps = (state) => {
  return {
    prodType: state.prodType.prodType,
    filteredProdType: state.prodType.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdType: (search) => dispatch(getProdTypeAction(search)),
    filterProdType: (data) => dispatch(filterProdTypeAction(data)),
    createProdType: (data) => dispatch(createProdTypeAction(data)),
    deleteProdType: (id) => dispatch(deleteProdTypeAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
