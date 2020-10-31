import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditPrice.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getProdArticleAction } from "../../store/actions/prodTypeArticleActions";
import {
  editRoztsinkaAction,
  getSingleRoztsinkaAction,
} from "../../store/actions/roztsinkaActions";
import { getProdTypeAction } from "../../store/actions/prodTypeTypeActions";
import { getProdSizeAction } from "../../store/actions/prodTypeSizeActions";
import { getProdSezonAction } from "../../store/actions/prodTypeSezonActions";
import { getProdAsortumentAction } from "../../store/actions/prodTypeAsortActions";
import { getProdClassAction } from "../../store/actions/prodTypeClassActions";
import { getProdColorAction } from "../../store/actions/prodTypeColorActions";
import { getProdImageAction } from "../../store/actions/prodTypeImageActions";
import { getMachineAction } from "../../store/actions/Machine/machineActions";
import { getOperationsAction } from "../../store/actions/operationsAction";
import { useParams } from "react-router-dom";

const EditPrice = ({
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
  fetchMachine,
  machineId,
  getOperations,
  operations,
  getSingleRoztsinka,
  singleRoztsinka,
}) => {
  const [articleOptions, setArticleOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [sezonOptions, setSezonOptions] = useState([]);
  const [asortumenOptions, setAsortumenOptions] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [operationsOptions, setOperationsOptions] = useState([]);
  const [machinesOptions, setMachinesOptions] = useState([]);
  const { id } = useParams();

  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ];

  const gatynokSelect = (options) => {
    setValues({ ...values, gatynok: options.value });
  };

  const asortumentSelect = (asortument) => {
    setValues({
      ...values,
      asortument: asortument.value,
      asortumentName: asortument.label,
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

  const articleSelect = (articleId) => {
    setValues({
      ...values,
      articleId: articleId.value,
      articleName: articleId.label,
    });
  };

  const operationSelect = (operations) => {
    setValues({
      ...values,
      operationId: operations.value,
      operationName: operations.label,
    });
  };
  const machinesSelect = (machineId) => {
    setValues({
      ...values,
      machineId: machineId.value,
      machineName: machineId.label,
    });
  };

  useEffect(() => {
    setMachinesOptions(
      machineId.length &&
        machineId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [machineId]);
  useEffect(() => {
    setOperationsOptions(
      operations.map((opt) => {
        return { label: opt.name, value: opt._id };
      })
    );
  }, [operations]);

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
      await getSingleRoztsinka(id);
      await getOperations();
      await fetchProdType();
      await fetchProdArticle();
      await fetchProdColor();
      await fetchProdClass();
      await fetchProdAsortument();
      await fetchProdImage();
      await fetchProdSezon();
      await fetchProdSize();
      await fetchMachine();
    })();
  }, []);

  useEffect(() => {
    const {
      asortument,
      articleId,
      typeId,
      sizeId,
      seasonId,
      imageId,
      classId,
      colorId,
      operationId,
      machineId,
      startDate,
      endDate,
      price,
      name,
      gatynok,
      _id,
    } = singleRoztsinka;
    if (singleRoztsinka._id) {
      setValues({
        ...values,
        asortument,
        asortumentName: asortument?.name || "Всі",
        machineId,
        machineName: machineId?.name || "Всі",
        articleId,
        articleName: articleId?.name || "Всі",
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
        operationId,
        operationName: operationId?.name || "Всі",
        startDate,
        endDate,
        price,
        name,
        gatynok,
        _id,
      });
    }
  }, [singleRoztsinka]);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити розцінку</span>
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
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Артикул</span>
            </div>
            <Select
              options={articleOptions}
              value={{ label: values.articleName, value: values.articleId }}
              name="articleId"
              onChange={articleSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Гатунок</span>
            </div>
            <Select
              options={options}
              value={{ label: values.gatynok, value: values.gatynok }}
              name="gatynok"
              onChange={gatynokSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Обладнання</span>
            </div>
            <Select
              options={machinesOptions}
              value={{ label: values.machineName, value: values.machineId }}
              name="machineId"
              onChange={machinesSelect}
            />
          </div>
        </div>
        <div className={s.left}>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Операція</span>
            </div>
            <Select
              options={operationsOptions}
              value={{ label: values.operationName, value: values.operationId }}
              name="operationId"
              onChange={operationSelect}
            />
          </div>
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
              value={{ label: values.asortumentName, value: values.asortument }}
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
        <Button title="Змінити" onClick={handleSubmit} />
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    asortument: "",
    articleId: "",
    typeId: "",
    sizeId: "",
    seasonId: "",
    imageId: "",
    classId: "",
    colorId: "",
    operationId: "",
    startDate: "",
    endDate: "",
    price: "",
    name: "",
    gatynok: "",
    machineId: "",
    _id: "",
  }),

  handleSubmit: async (
    values,
    { props: { editRoztsinka, singleRoztsinka, history } }
  ) => {
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
      operationId: values.operationId,
      machineId: values.machineId,
    };
    const isSuccess = await editRoztsinka(pricesToSubmit, singleRoztsinka._id);
    if (isSuccess) {
      alert("Змінено") || history.push("/prices");
    } else {
      alert("error===");
    }
  },
})(EditPrice);
const mapStateToProps = (state) => {
  return {
    singleRoztsinka: state.roztsinka.single,
    operations: state.operations.operations,
    articleId: state.prod.prodArticle,
    typeId: state.prodType.prodType,
    sizeId: state.prodSize.prodSize,
    seasonId: state.prodSezon.prodSezon,
    asortument: state.prodAsortument.prodAsortument,
    classId: state.prodClass.prodClass,
    colorId: state.prodColor.prodColor,
    imageId: state.prodImage.prodImage,
    machineId: state.machines.machines,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleRoztsinka: (id) => dispatch(getSingleRoztsinkaAction(id)),
    getOperations: () => dispatch(getOperationsAction()),
    fetchProdType: () => dispatch(getProdTypeAction()),
    fetchProdArticle: () => dispatch(getProdArticleAction()),
    fetchProdColor: () => dispatch(getProdColorAction()),
    fetchProdClass: () => dispatch(getProdClassAction()),
    fetchProdAsortument: () => dispatch(getProdAsortumentAction()),
    fetchProdImage: () => dispatch(getProdImageAction()),
    fetchProdSezon: () => dispatch(getProdSezonAction()),
    fetchProdSize: () => dispatch(getProdSizeAction()),
    fetchMachine: () => dispatch(getMachineAction()),
    editRoztsinka: (roztsinka, id) =>
      dispatch(editRoztsinkaAction(roztsinka, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
