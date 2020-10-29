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
import { getToken } from "../../utils/utils";
import {
  fetchSingleProdAsortument,
  patchProdAsortument,
} from "../../store/api/api";

const ProdAsort = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdAsortument,
  productciaAsortument,
  filterProdAsorument,
  filteredProdAsortument,
  deleteProdAsortument,
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);
  const [singleAsortument, setsingleAsortument] = useState({});
  const [prodAsort, setProdAsort] = useState([]);

  const change = (e) => {
    setsingleAsortument({ ...singleAsortument, name: e.target.value });
  };

  const patchSingleProdAsortument = (id) => {
    alert("Змінено");
    const token = getToken();
    patchProdAsortument(singleAsortument._id, token, singleAsortument).then(
      (res) => {
        res.status === 200 &&
          setProdAsort((prevState) =>
            prevState.filter((asortument) =>
              asortument._id === singleAsortument._id
                ? (asortument.name = singleAsortument.name)
                : asortument
            )
          );
      }
    );
  };

  const getSingleProdAsort = (id) => {
    const token = getToken();
    fetchSingleProdAsortument(id, token).then((res) => {
      setsingleAsortument(res.data);
    });
  };

  useEffect(() => {
    setProdAsort(productciaAsortument);
  }, [productciaAsortument]);

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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singleAsortument.name}
              name="name"
              onChange={change}
            />
            <Button
              title="Змінити"
              onClick={() => patchSingleProdAsortument()}
            />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredProdAsortument.length
            ? productciaAsortument &&
              productciaAsortument.map((prodA) => {
                return (
                  <tr>
                    <td>{prodA.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleProdAsort(prodA._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deleteProdAsortument(prodA._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredProdAsortument.length &&
              filteredProdAsortument.map((filter) => {
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
    productciaAsortument: state.prodAsortument.prodAsortument,
    filteredProdAsortument: state.prodAsortument.filtered,
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
