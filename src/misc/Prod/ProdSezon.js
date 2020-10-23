import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import Input from "../../misc/Input/Input";
import s from "./Prod.module.css";
import Button from "../../misc/Button/Button";
import { connect } from "react-redux";
import {
  createProdSezonAction,
  deleteProdSezonAction,
  filterProdSezonAction,
  getProdSezonAction,
} from "../../store/actions/prodTypeSezonActions";

const ProdSezon = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdSezon,
  prodSezon,
  filteredProdSezon,
  filterProdSezon,
  deleteProdSezon
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchProdSezon();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Сезон</span>
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
              await filterProdSezon(dataForFilter);
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
          {!filteredProdSezon.length
            ? prodSezon &&
              prodSezon.map((prodSezon) => {
                return (
                  <tr>
                    <td>{prodSezon.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button  onClick={() => deleteProdSezon(prodSezon._id)}>Видалити</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredProdSezon.length &&
              filteredProdSezon.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button  onClick={() => deleteProdSezon(filter._id)}>Видалити</button>
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
  handleSubmit: async (values, { props: { createProdSezon }, resetForm }) => {
    const isSuccess = await createProdSezon(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(ProdSezon);

const mapStateToProps = (state) => {
  return {
    prodSezon: state.prodSezon.prodSezon,
    filteredProdSezon: state.prodSezon.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdSezon: (search) => dispatch(getProdSezonAction(search)),
    filterProdSezon: (data) => dispatch(filterProdSezonAction(data)),
    createProdSezon: (data) => dispatch(createProdSezonAction(data)),
    deleteProdSezon: (id) => dispatch(deleteProdSezonAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
