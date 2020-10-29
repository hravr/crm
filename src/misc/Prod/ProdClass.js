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
import { fetchSingleProdClass, patchProdClass } from "../../store/api/api";
import { getToken } from "../../utils/utils";

const ProdClass = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdClass,
  productciaClass,
  filteredProdClass,
  filterProdClass,
  deleteProdClass,
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);
  const [singleClass, setSingleClass] = useState({});
  const [prodClass, setProdClass] = useState([]);

  const change = (e) => {
    setSingleClass({ ...singleClass, name: e.target.value });
  };

  const patchSingleProdClass = (id) => {
    alert("Змінено");
    const token = getToken();
    patchProdClass(singleClass._id, token, singleClass).then((res) => {
      res.status === 200 &&
        setProdClass((prevState) =>
          prevState.filter((clas) =>
            clas._id === singleClass._id ? (clas.name = singleClass.name) : clas
          )
        );
    });
  };

  const getSingleProdClass = (id) => {
    const token = getToken();
    fetchSingleProdClass(id, token).then((res) => {
      setSingleClass(res.data);
    });
  };

  useEffect(() => {
    setProdClass(productciaClass);
  }, [productciaClass]);

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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singleClass.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSingleProdClass()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>

            <th className={s.status__table}></th>
          </tr>
          {!filteredProdClass.length
            ? prodClass &&
              prodClass.map((prodClass) => {
                return (
                  <tr>
                    <td>{prodClass.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleProdClass(prodClass._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteProdClass(prodClass._id)}>
                          Видалити
                        </button>
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
    productciaClass: state.prodClass.prodClass,
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
