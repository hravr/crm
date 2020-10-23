import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePrices.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getProdArticleAction } from "../../store/actions/prodTypeArticleActions";
import { createRoztsinkaAction } from "../../store/actions/roztsinkaActions";
import { getProdTypeAction } from "../../store/actions/prodTypeTypeActions";
import { getProdSizeAction } from "../../store/actions/prodTypeSizeActions";
import { getProdSezonAction } from "../../store/actions/prodTypeSezonActions";
import { getProdAsortumentAction } from "../../store/actions/prodTypeAsortActions";
import { getProdClassAction } from "../../store/actions/prodTypeClassActions";
import { getProdColorAction } from "../../store/actions/prodTypeColorActions";
import { getProdImageAction } from "../../store/actions/prodTypeImageActions";

const CreatePrices = ({
  values,
  handleChange,
  handleSubmit,
  setValues,
  fetchProdArticle,
  articleId,
  fetchProdType,
  typeId,
  fetchProdSize,
  sizeId,
  fetchProdSezon,
  seasonId,
  fetchProdAsortument,
  asortument,
  fetchProdImage,
  imageId,
  fetchProdClass,
  classId,
  fetchProdColor,
  colorId,
}) => {
  const [articleOptions, setArticleOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [sezonOptions, setSezonOptions] = useState([]);
  const [asortumenOptions, setAsortumenOptions] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const asortumentSelect = (asortument) => {
    setValues({ ...values, asortument: asortument.value });
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

  const articleSelect = (articleId) => {
    setValues({ ...values, articleId: articleId.value });
  };

  useEffect(() => {
    setAsortumenOptions(
      asortument.length &&
        asortument.map((asort) => {
          return { label: asort.name, value: asort._id };
        })
    );
  }, [asortument]);

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
    setArticleOptions(
      articleId.length &&
        articleId.map((art) => {
          return { label: art.name, value: art._id };
        })
    );
  }, [articleId]);
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
      await fetchProdArticle();
      await fetchProdType();
      await fetchProdImage();
      await fetchProdClass();
      await fetchProdColor();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити розцінку</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input
            type="date"
            value={values.startDate}
            name="startDate"
            label="Початок"
            onChange={handleChange}
          />
          <Input
            type="date"
            value={values.endDate}
            name="endDate"
            label="Завершення"
            onChange={handleChange}
          />
          <Input
            type="number"
            value={values.price}
            name="price"
            label="Ціна"
            onChange={handleChange}
          />
          <Input
            label="Назва"
            value={values.name}
            name="name"
            onChange={handleChange}
          />
          {/* <div className={s.select__container}>
            <div className={s.span}>
              <span>Обладнання</span>
            </div>
            <Select
              options={operationsOptions}
              value={values.machineId.label}
              name="operationId"
              onChange={operationSelect}
            />
          </div> */}
          <Input
            type="number"
            label="ID Обладнання!!!!!!!!!!!!!!!!!!!"
            value={values.machineId}
            name="machineId"
            onChange={handleChange}
          />
          <div className={s.select__container}>
            <Input
              type="number"
              label="Гатунок"
              value={values.gatynok}
              name="gatynok"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={s.left}>
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
              <span>Артикуль</span>
            </div>
            <Select
              options={articleOptions}
              value={values.articleId.label}
              name="articleId"
              onChange={articleSelect}
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
              value={values.asortument.label}
              name="asortument"
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
        <Button title="Створити" onClick={handleSubmit} />
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    asortument: {},
    articleId: {},
    typeId: {},
    sizeId: {},
    seasonId: {},
    imageId: {},
    classId: {},
    colorId: {},
    startDate: "",
    endDate: "",
    price: "",
    name: "",
    // gatynok: "",
  }),
  handleSubmit: async (values, { props: { createPrices }, resetForm }) => {
    const pricesToSubmit = {
      asortument: values.asortument,
      typeId: values.typeId,
      articleId: values.articleId,
      sizeId: values.sizeId,
      seasonId: values.seasonId,
      classId: values.classId,
      imageId: values.imageId,
      colorId: values.colorId,
      startDate: values.startDate,
      endDate: values.endDate,
      price: values.price,
      name: values.name,
      gatynok: values.gatynok,
    };
    console.log("pezda");
    const isSuccess = await createPrices(pricesToSubmit);
    if (isSuccess) {
      alert("Success");
    } else {
      alert("error===");
    }
    // resetForm({ fatherName: "", fName: "", sName: "" });
  },
})(CreatePrices);
const mapStateToProps = (state) => {
  return {
    operations: state.operations.operations,
    articleId: state.prod.prodArticle,
    typeId: state.prodType.prodType,
    sizeId: state.prodSize.prodSize,
    seasonId: state.prodSezon.prodSezon,
    asortument: state.prodAsortument.prodAsortument,
    classId: state.prodClass.prodClass,
    colorId: state.prodColor.prodColor,
    imageId: state.prodImage.prodImage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createPrices: (roztsinka) => dispatch(createRoztsinkaAction(roztsinka)),
    fetchProdType: () => dispatch(getProdTypeAction()),
    fetchProdArticle: () => dispatch(getProdArticleAction()),
    fetchProdSize: () => dispatch(getProdSizeAction()),
    fetchProdSezon: () => dispatch(getProdSezonAction()),
    fetchProdAsortument: () => dispatch(getProdAsortumentAction()),
    fetchProdClass: () => dispatch(getProdClassAction()),
    fetchProdColor: () => dispatch(getProdColorAction()),
    fetchProdImage: () => dispatch(getProdImageAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
