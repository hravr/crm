import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreateProdArticle.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { createProdArticleAction } from "../../store/actions/prodTypeArticleActions";
import { getProdTypeAction } from "../../store/actions/prodTypeTypeActions";
import { getProdSizeAction } from "../../store/actions/prodTypeSizeActions";
import { getProdSezonAction } from "../../store/actions/prodTypeSezonActions";
import { getProdAsortumentAction } from "../../store/actions/prodTypeAsortActions";
import { getProdClassAction } from "../../store/actions/prodTypeClassActions";
import { getProdColorAction } from "../../store/actions/prodTypeColorActions";
import { getProdImageAction } from "../../store/actions/prodTypeImageActions";

const CreateProdArticle = ({
  values,
  handleChange,
  handleSubmit,
  setValues,
  fetchProdType,
  typeId,
  fetchProdSize,
  sizeId,
  fetchProdSezon,
  seasonId,
  fetchProdAsortument,
  asortumentId,
  fetchProdImage,
  imageId,
  fetchProdClass,
  classId,
  fetchProdColor,
  colorId,
  errors,
}) => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [sezonOptions, setSezonOptions] = useState([]);
  const [asortumenOptions, setAsortumenOptions] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ];

  const asortumentSelect = (asortumentId) => {
    setValues({ ...values, asortumentId: asortumentId.value });
  };
  const classSelect = (classId) => {
    setValues({ ...values, classId: classId.value });
  };
  const colorSelect = (colorId) => {
    setValues({ ...values, colorId: colorId.value });
  };
  const imageSelect = (imageId) => {
    setValues({ ...values, imageId: imageId.value });
  };
  const sizeSelect = (sizeId) => {
    setValues({ ...values, sizeId: sizeId.value });
  };

  const sezonSelect = (seasonId) => {
    setValues({ ...values, seasonId: seasonId.value });
  };
  const typeSelect = (typeId) => {
    setValues({ ...values, typeId: typeId.value });
  };

  useEffect(() => {
    setAsortumenOptions(
      asortumentId.length &&
        asortumentId.map((asort) => {
          return { label: asort.name, value: asort._id };
        })
    );
  }, [asortumentId]);

  useEffect(() => {
    setClassOptions(
      classId.length &&
        classId.map((cls) => {
          return { label: cls.name, value: cls._id };
        })
    );
  }, [classId]);
  useEffect(() => {
    setColorOptions(
      colorId.length &&
        colorId.map((col) => {
          return { label: col.name, value: col._id };
        })
    );
  }, [colorId]);
  useEffect(() => {
    setImageOptions(
      imageId.length &&
        imageId.map((img) => {
          return { label: img.name, value: img._id };
        })
    );
  }, [imageId]);

  useEffect(() => {
    setSizeOptions(
      sizeId.length &&
        sizeId.map((size) => {
          return { label: size.name, value: size._id };
        })
    );
  }, [sizeId]);

  useEffect(() => {
    setSezonOptions(
      seasonId.length &&
        seasonId.map((sez) => {
          return { label: sez.name, value: sez._id };
        })
    );
  }, [seasonId]);

  useEffect(() => {
    setTypeOptions(
      typeId.length &&
        typeId.map((type) => {
          return { label: type.name, value: type._id };
        })
    );
  }, [typeId]);

  useEffect(() => {
    (async () => {
      await fetchProdAsortument();
      await fetchProdSezon();
      await fetchProdSize();
      await fetchProdType();
      await fetchProdImage();
      await fetchProdClass();
      await fetchProdColor();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити артикул</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input
            label="Назва"
            value={values.name}
            name="name"
            onChange={handleChange}
          />
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Тип</span>
            </div>
            <Select
              options={typeOptions}
              value={values.typeId.label}
              name="typeId"
              onChange={typeSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Колір</span>
            </div>
            <Select
              options={colorOptions}
              value={values.colorId.label}
              name="colorId"
              onChange={colorSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Клас</span>
            </div>
            <Select
              options={classOptions}
              value={values.classId.label}
              name="classId"
              onChange={classSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Асортимент</span>
            </div>
            <Select
              options={asortumenOptions}
              value={values.asortumentId.label}
              name="asortumentId"
              onChange={asortumentSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Малюнок</span>
            </div>
            <Select
              options={imageOptions}
              value={values.imageId.label}
              name="imageId"
              onChange={imageSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Сезон</span>
            </div>
            <Select
              options={sezonOptions}
              value={values.seasonId.label}
              name="seasonId"
              onChange={sezonSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Розмір</span>
            </div>
            <Select
              options={sizeOptions}
              value={values.sizeId.label}
              name="sizeId"
              onChange={sizeSelect}
            />
          </div>
        </div>
      </div>
      <div className={s.btn__container}>
        <Button
          title="Створити"
          onClick={handleSubmit}
          disabled={!!errors.name}
        />
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    asortumentId: {},
    typeId: {},
    sizeId: {},
    seasonId: {},
    imageId: {},
    classId: {},
    colorId: {},
    name: "",
  }),
  validate: (values) => {
    const errors = {};
    if (
      !values.asortumentId ||
      !values.typeId ||
      !values.sizeId ||
      !values.seasonId ||
      !values.imageId ||
      !values.classId ||
      !values.colorId ||
      !values.name
    ) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, { props: { createArticle, history } }) => {
    const pricesToSubmit = {
      asortumentId: values.asortumentId,
      typeId: values.typeId,
      sizeId: values.sizeId,
      seasonId: values.seasonId,
      classId: values.classId,
      imageId: values.imageId,
      colorId: values.colorId,
      name: values.name,
    };
    const isSuccess = await createArticle(pricesToSubmit);
    if (isSuccess) {
      alert("Створено") || history.push("/productcia");
    } else {
      alert("error===");
    }
  },
})(CreateProdArticle);
const mapStateToProps = (state) => {
  return {
    typeId: state.prodType.prodType,
    sizeId: state.prodSize.prodSize,
    seasonId: state.prodSezon.prodSezon,
    asortumentId: state.prodAsortument.prodAsortument,
    classId: state.prodClass.prodClass,
    colorId: state.prodColor.prodColor,
    imageId: state.prodImage.prodImage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createArticle: (prodArticle) =>
      dispatch(createProdArticleAction(prodArticle)),
    fetchProdType: () => dispatch(getProdTypeAction()),
    fetchProdSize: () => dispatch(getProdSizeAction()),
    fetchProdSezon: () => dispatch(getProdSezonAction()),
    fetchProdAsortument: () => dispatch(getProdAsortumentAction()),
    fetchProdClass: () => dispatch(getProdClassAction()),
    fetchProdColor: () => dispatch(getProdColorAction()),
    fetchProdImage: () => dispatch(getProdImageAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
