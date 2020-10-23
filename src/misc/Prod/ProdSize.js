import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import Input from "../../misc/Input/Input";
import s from "./Prod.module.css";
import Button from "../../misc/Button/Button";
import { connect } from "react-redux";
import {
  createProdSizeAction,
  deleteProdSizeAction,
  filterProdSizeAction,
  getProdSizeAction,
} from "../../store/actions/prodTypeSizeActions";


const ProdSize = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdSize,
  prodSize,
  filteredProdSize,
  filterProdSize,
  deleteProdSize
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchProdSize();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Розмір</span>
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
              await filterProdSize(dataForFilter);
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
          {!filteredProdSize.length
            ? prodSize &&
              prodSize.map((prodSize) => {
                return (
                  <tr>
                    <td>{prodSize.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button  onClick={() => deleteProdSize(prodSize._id)}>Видалити</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredProdSize.length &&
              filteredProdSize.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteProdSize(filter._id)}>Видалити</button>
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
  handleSubmit: async (values, { props: { createProdSize }, resetForm }) => {
    const isSuccess = await createProdSize(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(ProdSize);

const mapStateToProps = (state) => {
  return {
    prodSize: state.prodSize.prodSize,
    filteredProdSize: state.prodSize.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdSize: (search) => dispatch(getProdSizeAction(search)),
    filterProdSize: (data) => dispatch(filterProdSizeAction(data)),
    createProdSize: (data) => dispatch(createProdSizeAction(data)),
    deleteProdSize: (id) => dispatch(deleteProdSizeAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
