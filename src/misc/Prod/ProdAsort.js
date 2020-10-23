import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import Input from "../../misc/Input/Input";
import s from "./Prod.module.css";
import Button from "../../misc/Button/Button";
import { connect } from "react-redux";
import {
  createProdAsortumentAction,
  deleteProdAsortumentAction,
  filterProdAsortumentAction,
  getProdAsortumentAction,
} from "../../store/actions/prodTypeAsortActions";

const ProdAsort = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdAsortument,
  prodAsortument,
  filterProdAsorument,
  filteredPprodAsortument,
  deleteProdAsortument,
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchProdAsortument();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Асортимент</span>
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
              await filterProdAsorument(dataForFilter);
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
          {!filteredPprodAsortument.length
            ? prodAsortument &&
              prodAsortument.map((prodAsortument) => {
                return (
                  <tr>
                    <td>{prodAsortument.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() =>
                            deleteProdAsortument(prodAsortument._id)
                          }
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredPprodAsortument.length &&
              filteredPprodAsortument.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() => deleteProdAsortument(filter._id)}
                        >
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
  handleSubmit: async (
    values,
    { props: { createProdAsortument }, resetForm }
  ) => {
    const isSuccess = await createProdAsortument(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(ProdAsort);

const mapStateToProps = (state) => {
  return {
    prodAsortument: state.prodAsortument.prodAsortument,
    filteredPprodAsortument: state.prodAsortument.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdAsortument: (search) => dispatch(getProdAsortumentAction(search)),
    filterProdAsorument: (data) => dispatch(filterProdAsortumentAction(data)),
    createProdAsortument: (data) => dispatch(createProdAsortumentAction(data)),
    deleteProdAsortument: (id) => dispatch(deleteProdAsortumentAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
