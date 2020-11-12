import React, {useEffect, useState} from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePrices.module.css";
import {connect} from "react-redux";
import {withFormik} from "formik";
import {getProdArticleAction} from "../../store/actions/prodTypeArticleActions";
import {createRoztsinkaAction} from "../../store/actions/roztsinkaActions";
import {getProdTypeAction} from "../../store/actions/prodTypeTypeActions";
import {getProdSizeAction} from "../../store/actions/prodTypeSizeActions";
import {getProdSezonAction} from "../../store/actions/prodTypeSezonActions";
import {getProdAsortumentAction} from "../../store/actions/prodTypeAsortActions";
import {getProdClassAction} from "../../store/actions/prodTypeClassActions";
import {getProdColorAction} from "../../store/actions/prodTypeColorActions";
import {getProdImageAction} from "../../store/actions/prodTypeImageActions";
import {getMachineAction} from "../../store/actions/Machine/machineActions";
import {getOperationsAction} from "../../store/actions/operationsAction";

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
                        fetchMachine,
                        machineId,
                        getOperations,
                        operations,
                        errors,
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

  const options = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
  ];

  const gatynokSelect = (options) => {
    setValues({...values, gatynok: options.value});
  };

  const asortumentSelect = (asortument) => {
    setValues({...values, asortument: asortument.value});
  };
  const classSelect = (classId) => {
    setValues({...values, classId: classId.value});
  };
  const colorSelect = (colorId) => {
    setValues({...values, colorId: colorId.value});
  };
  const imageSelect = (imageId) => {
    setValues({...values, imageId: imageId.value});
  };
  const sizeSelect = (sizeId) => {
    setValues({...values, sizeId: sizeId.value});
  };

  const sezonSelect = (seasonId) => {
    setValues({...values, seasonId: seasonId.value});
  };
  const typeSelect = (typeId) => {
    setValues({...values, typeId: typeId.value});
  };

  const articleSelect = (articleId) => {
    setValues({...values, articleId: articleId.value});
  };

  const operationSelect = (operations) => {
    setValues({...values, operationId: operations.value});
  };

  const machinesSelect = (machineId) => {
    setValues({...values, machineId: machineId.value});
  };

  useEffect(() => {
    setMachinesOptions(
      machineId.length &&
      machineId.map((opt) => {
        return {label: opt.name, value: opt._id};
      })
    );
  }, [machineId]);

  useEffect(() => {
    setOperationsOptions(
      operations.map((opt) => {
        return {label: opt.name, value: opt._id};
      })
    );
  }, [operations]);

  useEffect(() => {
    setAsortumenOptions(
      asortument.length &&
      asortument.map((asort) => {
        return {label: asort.name, value: asort._id};
      })
    );
  }, [asortument]);

  useEffect(() => {
    setClassOptions(
      classId.length &&
      classId.map((cls) => {
        return {label: cls.name, value: cls._id};
      })
    );
  }, [classId]);
  useEffect(() => {
    setColorOptions(
      colorId.length &&
      colorId.map((col) => {
        return {label: col.name, value: col._id};
      })
    );
  }, [colorId]);
  useEffect(() => {
    setImageOptions(
      imageId.length &&
      imageId.map((img) => {
        return {label: img.name, value: img._id};
      })
    );
  }, [imageId]);

  useEffect(() => {
    setSizeOptions(
      sizeId.length &&
      sizeId.map((size) => {
        return {label: size.name, value: size._id};
      })
    );
  }, [sizeId]);

  useEffect(() => {
    setArticleOptions(
      articleId.length &&
      articleId.map((art) => {
        return {label: art.name, value: art._id};
      })
    );
  }, [articleId]);
  useEffect(() => {
    setSezonOptions(
      seasonId.length &&
      seasonId.map((sez) => {
        return {label: sez.name, value: sez._id};
      })
    );
  }, [seasonId]);

  useEffect(() => {
    setTypeOptions(
      typeId.length &&
      typeId.map((type) => {
        return {label: type.name, value: type._id};
      })
    );
  }, [typeId]);

  useEffect(() => {
    (async () => {
      await fetchMachine();
      await getOperations();
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
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Гатунок</span>
            </div>
            <Select
              options={options}
              value={values.gatynok.label}
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
              value={values.machineId.label}
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
              value={values.operationId.label}
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
              value={values.typeId.label}
              name="typeId"
              onChange={typeSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Артикул</span>
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
    gatynok: '',
    asortument: '',
    articleId: '',
    typeId: '',
    sizeId: '',
    seasonId: '',
    imageId: '',
    classId: '',
    colorId: '',
    operationId: '',
    machineId: '',
    startDate: "",
    endDate: "",
    price: "",
    name: "",
  }),
  validate: (values) => {
    const errors = {};
    if (
      // !values.asortument ||
      // !values.articleId ||
      // !values.typeId ||
      // !values.sizeId ||
      // !values.seasonId ||
      // !values.imageId ||
      // !values.classId ||
      // !values.colorId ||
      !values.operationId ||
      !values.startDate ||
      !values.machineId ||
      !values.endDate ||
      !values.price ||
      !values.name
    ) {
      errors.name = "Required";
    }
    return errors;
  },

  handleSubmit: async (values, {props: {createPrices, history}}) => {

    const pricesToSubmit = {
      gatynok: values.gatynok,
      asortument: !!values.asortument ? values.asortument : null,
      articleId: !!values.articleId ? values.articleId : null,
      typeId: !!values.typeId ? values.typeId : null,
      sizeId: !!values.sizeId ? values.sizeId : null,
      seasonId: !!values.seasonId ? values.seasonId : null,
      classId: !!values.classId ? values.classId : null,
      imageId: !!values.imageId ? values.imageId : null,
      colorId: !!values.colorId ? values.colorId : null,
      startDate: values.startDate,
      endDate: values.endDate,
      price: values.price,
      name: values.name,
      operationId: values.operationId,
      machineId: values.machineId,
    };
    const isSuccess = await createPrices(pricesToSubmit);
    if (isSuccess) {
      alert("Створено") || history.push("/prices");
    } else {
      alert("error===");
    }
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
    machineId: state.machines.machines,
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
    fetchMachine: () => dispatch(getMachineAction()),
    getOperations: () => dispatch(getOperationsAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
