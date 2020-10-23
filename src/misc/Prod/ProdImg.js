import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import Input from "../../misc/Input/Input";
import s from "./Prod.module.css";
import Button from "../../misc/Button/Button";
import { connect } from "react-redux";
import {
  createProdImageAction,
  deleteProdImageAction,
  filterProdImageAction,
  getProdImageAction,
} from "../../store/actions/prodTypeImageActions";
import { deleteProdImage } from "../../store/api/api";

const ProdImage = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdImage,
  prodImage,
  filterProdImage,
  filteredProdImage,
  deleteProdImage,
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchProdImage();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Малюнок</span>
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
              await filterProdImage(dataForFilter);
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
          {!filteredProdImage.length
            ? prodImage &&
              prodImage.map((prodImage) => {
                return (
                  <tr>
                    <td>{prodImage.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteProdImage(prodImage._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredProdImage.length &&
              filteredProdImage.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteProdImage(filter._id)}>
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
  handleSubmit: async (values, { props: { createProdImage }, resetForm }) => {
    const isSuccess = await createProdImage(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(ProdImage);

const mapStateToProps = (state) => {
  return {
    prodImage: state.prodImage.prodImage,
    filteredProdImage: state.prodImage.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdImage: (search) => dispatch(getProdImageAction(search)),
    filterProdImage: (data) => dispatch(filterProdImageAction(data)),
    createProdImage: (data) => dispatch(createProdImageAction(data)),
    deleteProdImage: (id) => dispatch(deleteProdImageAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
