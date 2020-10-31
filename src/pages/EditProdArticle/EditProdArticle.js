import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditProdArticle.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getProdTypeAction } from "../../store/actions/prodTypeTypeActions";
import { getProdSizeAction } from "../../store/actions/prodTypeSizeActions";
import { getProdSezonAction } from "../../store/actions/prodTypeSezonActions";
import { getProdAsortumentAction } from "../../store/actions/prodTypeAsortActions";
import { getProdClassAction } from "../../store/actions/prodTypeClassActions";
import { getProdColorAction } from "../../store/actions/prodTypeColorActions";
import { getProdImageAction } from "../../store/actions/prodTypeImageActions";
import { useParams } from "react-router-dom";
import {
  editProdArticleAction,
  getSingleProdArticleAction,
} from "../../store/actions/prodTypeArticleActions";

const EditProdArticle = ({
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
  getSingleArticle,
  singleProdArticle,
  errors,
}) => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [sezonOptions, setSezonOptions] = useState([]);
  const [asortumenOptions, setAsortumenOptions] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const { id } = useParams();

  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ];

  const asortumentSelect = (asortumentId) => {
    setValues({
      ...values,
      asortumentId: asortumentId.value,
      asortumentName: asortumentId.label,
    });
  };
  const classSelect = (classId) => {
    setValues({ ...values, classId: classId.value, classN: classId.label });
  };
  const colorSelect = (colorId) => {
    setValues({ ...values, colorId: colorId.value, colorName: colorId.label });
  };
  const imageSelect = (imageId) => {
    setValues({ ...values, imageId: imageId.value, imageName: imageId.label });
  };
  const sizeSelect = (sizeId) => {
    setValues({ ...values, sizeId: sizeId.value, sizeName: sizeId.label });
  };

  const sezonSelect = (seasonId) => {
    setValues({
      ...values,
      seasonId: seasonId.value,
      seasonName: seasonId.label,
    });
  };
  const typeSelect = (typeId) => {
    setValues({ ...values, typeId: typeId.value, typeName: typeId.label });
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
      await getSingleArticle(id);
      await fetchProdType();
      await fetchProdColor();
      await fetchProdClass();
      await fetchProdAsortument();
      await fetchProdImage();
      await fetchProdSezon();
      await fetchProdSize();
    })();
  }, []);

  useEffect(() => {
    const {
      asortumentId,
      typeId,
      sizeId,
      seasonId,
      imageId,
      classId,
      colorId,
      machineId,
      name,
      _id,
    } = singleProdArticle;
    if (singleProdArticle._id) {
      setValues({
        ...values,
        asortumentId,
        asortumentName: asortumentId?.name || "Всі",
        machineId,
        machineName: machineId?.name || "Всі",
        typeId,
        typeName: typeId?.name || "Всі",
        sizeId,
        sizeName: sizeId?.name || "Всі",
        seasonId,
        seasonName: seasonId?.name || "Всі",
        imageId,
        imageName: imageId?.name || "Всі",
        classId,
        classN: classId?.name || "Всі",
        colorId,
        colorName: colorId?.name || "Всі",
        name,
        _id,
      });
    }
  }, [singleProdArticle]);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити артикул</span>
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
              value={{ label: values.typeName, value: values.typeId }}
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
              value={{ label: values.colorName, value: values.colorId }}
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
              value={{ label: values.classN, value: values.classId }}
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
              value={{
                label: values.asortumentName,
                value: values.asortumentId,
              }}
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
              value={{ label: values.imageName, value: values.imageId }}
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
              value={{ label: values.seasonName, value: values.seasonId }}
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
              value={{ label: values.sizeName, value: values.sizeId }}
              name="sizeId"
              onChange={sizeSelect}
            />
          </div>
        </div>
      </div>
      <div className={s.btn__container}>
        <Button
          title="Змінити"
          onClick={handleSubmit}
          disabled={!!errors.name}
        />
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    asortumentId: "",
    typeId: "",
    sizeId: "",
    seasonId: "",
    imageId: "",
    classId: "",
    colorId: "",
    name: "",
    _id: "",
  }),

  handleSubmit: async (
    values,
    { props: { editProdArticle, singleProdArticle, history } }
  ) => {
    const articleToSubmit = {
      asortumentId: values.asortumentId,
      typeId: values.typeId,
      sizeId: values.sizeId,
      seasonId: values.seasonId,
      classId: values.classId,
      imageId: values.imageId,
      colorId: values.colorId,
      name: values.name,
    };
    const isSuccess = await editProdArticle(
      articleToSubmit,
      singleProdArticle._id
    );
    if (isSuccess) {
      alert("Змінено") || history.push("/productcia");
    } else {
      alert("error===");
    }
  },
})(EditProdArticle);
const mapStateToProps = (state) => {
  return {
    singleProdArticle: state.prod.single,
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
    getSingleArticle: (id) => dispatch(getSingleProdArticleAction(id)),
    fetchProdType: () => dispatch(getProdTypeAction()),
    fetchProdColor: () => dispatch(getProdColorAction()),
    fetchProdClass: () => dispatch(getProdClassAction()),
    fetchProdAsortument: () => dispatch(getProdAsortumentAction()),
    fetchProdImage: () => dispatch(getProdImageAction()),
    fetchProdSezon: () => dispatch(getProdSezonAction()),
    fetchProdSize: () => dispatch(getProdSizeAction()),
    editProdArticle: (prodArticle, id) =>
      dispatch(editProdArticleAction(prodArticle, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
