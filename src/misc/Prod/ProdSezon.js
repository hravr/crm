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
import { fetchSingleProdSezon, patchProdSezon } from "../../store/api/api";
import { getToken } from "../../utils/utils";

const ProdSezon = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdSezon,
  productciaSezon,
  filteredProdSezon,
  filterProdSezon,
  deleteProdSezon,
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);
  const [singleSezon, setSingleSezon] = useState({});
  const [prodSezon, setProdSezon] = useState([]);

  const change = (e) => {
    setSingleSezon({ ...singleSezon, name: e.target.value });
  };

  const patchSingleProdSezon = (id) => {
    alert("Змінено");
    const token = getToken();
    patchProdSezon(singleSezon._id, token, singleSezon).then((res) => {
      res.status === 200 &&
        setProdSezon((prevState) =>
          prevState.filter((sezon) =>
            sezon._id === singleSezon._id
              ? (sezon.name = singleSezon.name)
              : sezon
          )
        );
    });
  };

  const getSingleProdSezon = (id) => {
    const token = getToken();
    fetchSingleProdSezon(id, token).then((res) => {
      setSingleSezon(res.data);
    });
  };

  useEffect(() => {
    setProdSezon(productciaSezon);
  }, [productciaSezon]);

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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singleSezon.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSingleProdSezon()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredProdSezon.length
            ? prodSezon &&
              prodSezon.map((prodSezon) => {
                return (
                  <tr>
                    <td>{prodSezon.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleProdSezon(prodSezon._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteProdSezon(prodSezon._id)}>
                          Видалити
                        </button>
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
                        <button
                          className={s.del}
                          onClick={() => getSingleProdSezon(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteProdSezon(filter._id)}>
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
    productciaSezon: state.prodSezon.prodSezon,
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
