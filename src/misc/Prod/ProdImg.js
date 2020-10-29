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
import { fetchSingleProdImage, patchProdImage } from "../../store/api/api";
import { getToken } from "../../utils/utils";

const ProdImage = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdImage,
  productciaImage,
  filterProdImage,
  filteredProdImage,
  deleteProdImage,
}) => {
  const [dataForFilter, setDataForFilter] = useState([]);
  const [singleImage, setSingleImage] = useState({});
  const [prodImage, setProdImage] = useState([]);

  const change = (e) => {
    setSingleImage({ ...singleImage, name: e.target.value });
  };

  const patchSingleProdImage = (id) => {
    alert("Змінено");
    const token = getToken();
    patchProdImage(singleImage._id, token, singleImage).then((res) => {
      res.status === 200 &&
        setProdImage((prevState) =>
          prevState.filter((img) =>
            img._id === singleImage._id ? (img.name = singleImage.name) : img
          )
        );
    });
  };

  const getSingleProdImage = (id) => {
    const token = getToken();
    fetchSingleProdImage(id, token).then((res) => {
      setSingleImage(res.data);
    });
  };

  useEffect(() => {
    setProdImage(productciaImage);
  }, [productciaImage]);

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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singleImage.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSingleProdImage()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredProdImage.length
            ? prodImage &&
              prodImage.map((prodImage) => {
                return (
                  <tr>
                    <td>{prodImage.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSingleProdImage(prodImage._id)}
                        >
                          Редагувати
                        </button>
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
                        <button
                          className={s.del}
                          onClick={() => getSingleProdImage(filter._id)}
                        >
                          Редагувати
                        </button>
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
    productciaImage: state.prodImage.prodImage,
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
