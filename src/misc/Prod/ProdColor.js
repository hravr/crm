import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import Input from "../../misc/Input/Input";
import s from "./Prod.module.css";
import Button from "../../misc/Button/Button";
import { connect } from "react-redux";
import {
  createProdColorAction,
  deleteProdColorAction,
  filterProdColorAction,
  getProdColorAction,
} from "../../store/actions/prodTypeColorActions";
import { fetchSingleProdColor, patchProdColor } from "../../store/api/api";
import { getToken } from "../../utils/utils";

const ProdColor = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdColor,
  filteredProdColor,
  filterProdColor,
  deleteProdColor,
  productciaColor,
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);
  const [singleColor, setSingleColor] = useState({});
  const [prodColor, setProdColor] = useState([]);

  const change = (e) => {
    setSingleColor({ ...singleColor, name: e.target.value });
  };

  const patchSingleProdColor = (id) => {
    alert("Змінено");
    const token = getToken();
    patchProdColor(singleColor._id, token, singleColor).then((res) => {
      res.status === 200 &&
        setProdColor((prevState) =>
          prevState.filter((color) =>
            color._id === singleColor._id
              ? (color.name = singleColor.name)
              : color
          )
        );
    });
  };

  const getSingleProdColor = (id) => {
    const token = getToken();
    fetchSingleProdColor(id, token).then((res) => {
      setSingleColor(res.data);
    });
  };

  useEffect(() => {
    setProdColor(productciaColor);
  }, [productciaColor]);

  useEffect(() => {
    (async () => {
      await fetchProdColor();
    })();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Колір</span>
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
              await filterProdColor(dataForFilter);
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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singleColor.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSingleProdColor()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredProdColor.length
            ? prodColor &&
              prodColor.map((prodColor) => {
                return (
                  <tr>
                    <td>{prodColor.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleProdColor(prodColor._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteProdColor(prodColor._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredProdColor.length &&
              filteredProdColor.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleProdColor(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteProdColor(filter._id)}>
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
  handleSubmit: async (values, { props: { createProdColor }, resetForm }) => {
    const isSuccess = await createProdColor(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(ProdColor);

const mapStateToProps = (state) => {
  return {
    productciaColor: state.prodColor.prodColor,
    filteredProdColor: state.prodColor.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdColor: (search) => dispatch(getProdColorAction(search)),
    filterProdColor: (data) => dispatch(filterProdColorAction(data)),
    createProdColor: (data) => dispatch(createProdColorAction(data)),
    deleteProdColor: (id) => dispatch(deleteProdColorAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
