import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditSklad.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getProdTypeAction } from "../../store/actions/prodTypeTypeActions";
import { getProdSizeAction } from "../../store/actions/prodTypeSizeActions";
import { getProdSezonAction } from "../../store/actions/prodTypeSezonActions";
import { getProdAsortumentAction } from "../../store/actions/prodTypeAsortActions";
import { getProdClassAction } from "../../store/actions/prodTypeClassActions";
import { getProdColorAction } from "../../store/actions/prodTypeColorActions";
import { getProdImageAction } from "../../store/actions/prodTypeImageActions";
import { getMachineAction } from "../../store/actions/Machine/machineActions";
import { getProdArticleAction } from "../../store/actions/prodTypeArticleActions";
import {
  editSklad2Action,
  getSingleSklad2Action,
  getSklad2Action,
} from "../../store/actions/sklad2Actions";
import { getOperationsAction } from "../../store/actions/operationsAction";
import { getWorkersAction } from "../../store/actions/workersActions";
import { useParams } from "react-router-dom";

const EditSklad2 = ({
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
  asortument,
  fetchProdImage,
  imageId,
  fetchProdClass,
  classId,
  fetchProdColor,
  colorId,
  fetchMachine,
  machineId,
  getSklad2,
  articleId,
  fetchProdArticle,
  operations,
  workers,
  singleSklad2,
  getSingleSklad2,
}) => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [sezonOptions, setSezonOptions] = useState([]);
  const [asortumenOptions, setAsortumenOptions] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [machinesOptions, setMachinesOptions] = useState([]);
  const [articleOptions, setArticleOptions] = useState([]);

  const operationsObject = useMemo(() => {
    const temp = {};
    operations.forEach((operation) => {
      workers.forEach((worker) => {
        if (!temp[operation.name]) {
          temp[operation.name] = [worker];
          return;
        }
        temp[operation.name].push(worker);
      });
    });
    return temp;
  }, [workers, operations]);

  const operationsOptions = useMemo(() => {
    const temp = {};
    Object.entries(operationsObject).forEach(([key, value]) => {
      value.forEach((operation) => {
        const isCorrect = !!operation.operationId.find(({ name }) => {
          return name === key;
        });
        if (!isCorrect) return;
        const { name, fName, sName } = operation;
        const option = { label: `${fName} ${sName}`, value: operation._id };
        if (!temp[key]) {
          temp[key] = [option];
          return;
        }
        temp[key].push(option);
      });
    });
    return temp;
  }, [operationsObject]);

  const vyazalSelect = (shveyaId) => {
    setValues({
      ...values,
      shveyaId: shveyaId.value,
      shveyaName: shveyaId.label,
    });
  };

  const masterSelect = (sortId) => {
    setValues({ ...values, sortId: sortId.value, sortName: sortId.label });
  };

  const articleSelect = (articleId) => {
    setValues({
      ...values,
      articleId: articleId.value,
      articleName: articleId.label,
    });
  };

  const asortumentSelect = (asortument) => {
    setValues({
      ...values,
      asortument: asortument.value,
      asortumentName: asortument.label,
    });
  };

  const classSelect = (classId) => {
    setValues({ ...values, classId: classId.value, cName: classId.label });
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

  const machinesSelect = (machineId) => {
    setValues({
      ...values,
      machineId: machineId.value,
      machineName: machineId.label,
    });
  };

  useEffect(() => {
    setArticleOptions(
      articleId.length &&
        articleId.map((art) => {
          return { label: art.name, value: art._id };
        })
    );
  }, [articleId]);

  useEffect(() => {
    setMachinesOptions(
      machineId.length &&
        machineId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [machineId]);

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
    const {
      typeId,
      seasonId,
      sizeId,
      imageId,
      colorId,
      machineId,
      shveyaId,
      sortId,
      articleId,
      asortument,
      classId,
      mishok,
      _id,
    } = singleSklad2;
    if (singleSklad2._id) {
      setValues({
        ...values,
        seasonId,
        seasonName: mishok.seasonId?.name,
        typeId,
        typeName: mishok.typeId?.name,
        sizeId,
        sizeName: mishok.sizeId?.name,
        imageId,
        imageName: mishok.imageId?.name,
        colorId,
        colorName: mishok.colorId?.name,
        classId,
        cName: mishok.classId?.name,
        machineId,
        machineName: machineId?.name,
        shveyaId,
        shveyaName: shveyaId?.fName + " " + shveyaId?.sName,
        sortId,
        sortName: sortId?.fName + " " + sortId?.sName,
        articleId,
        articleName: mishok.articleId?.name,
        asortument,
        asortumentName: mishok.asortument?.name,
        gatynok1: mishok.gatynok1,
        gatynok2: mishok.gatynok2,
        gatynok3: mishok.gatynok3,
        _id,
      });
    }
  }, [singleSklad2]);

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await getSingleSklad2(id);
      await getSklad2();
      await fetchMachine();
      await fetchProdAsortument();
      await fetchProdSezon();
      await fetchProdSize();
      await fetchProdType();
      await fetchProdImage();
      await fetchProdClass();
      await fetchProdColor();
      await fetchProdArticle();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити склад 2</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input
            type="date"
            value={values.date_prixod}
            name="date_prixod"
            label="Дата"
            onChange={handleChange}
          />
          <Input
            type="number"
            value={values.gatynok1}
            name="gatynok1"
            label="Гатунок 1"
            onChange={handleChange}
          />
          <Input
            type="number"
            value={values.gatynok2}
            name="gatynok2"
            label="Гатунок 2"
            onChange={handleChange}
          />
          <Input
            type="number"
            label="Гатунок 3"
            value={values.gatynok3}
            name="gatynok3"
            onChange={handleChange}
          />
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
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Швея</span>
            </div>
            <Select
              options={operationsOptions["Швея"]}
              value={{ label: values.shveyaName, value: values.shveyaId }}
              name="shveyaId"
              onChange={vyazalSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Сортувальниця</span>
            </div>
            <Select
              options={operationsOptions["Сортувальниця"]}
              value={{ label: values.sortName, value: values.sortId }}
              name="sortId"
              onChange={masterSelect}
            />
          </div>
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
        </div>
        <div className={s.left}>
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
              value={{ label: values.cName, value: values.classId }}
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
              value={{ label: values.imageOptions, value: values.seasonId }}
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
    typeId: "",
    sizeId: "",
    seasonId: "",
    imageId: "",
    classId: "",
    colorId: "",
    machineId: "",
    sortId: "",
    shveyaId: "",
    articleId: "",
    date_prixod: "",
    gatynok1: "",
    gatynok2: "",
    gatynok3: "",
  }),
  handleSubmit: async (
    values,
    { props: { editSklad2, history, singleSklad2 } }
  ) => {
    const pruhudToSubmit = {
      asortument: values.asortument,
      typeId: values.typeId,
      sizeId: values.sizeId,
      seasonId: values.seasonId,
      classId: values.classId,
      imageId: values.imageId,
      colorId: values.colorId,
      date_prixod: values.date_prixod,
      gatynok1: values.gatynok1,
      gatynok2: values.gatynok2,
      gatynok3: values.gatynok3,
      machineId: values.machineId,
      sortId: values.sortId,
      shveyaId: values.shveyaId,
      articleId: values.articleId,
    };
    const isSuccess = await editSklad2(pruhudToSubmit, singleSklad2._id);
    if (isSuccess) {
      alert("Змінено") || history.push("/sklad_2");
    } else {
      alert("error===");
    }
  },
})(EditSklad2);
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
    sortId: state.sklad2.sklad2,
    shveyaId: state.sklad2.sklad2,
    operations: state.operations.operations,
    workers: state.workers.workers,
    singleSklad2: state.sklad2.single,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleSklad2: (id) => dispatch(getSingleSklad2Action(id)),
    editSklad2: (sklad2, id) => dispatch(editSklad2Action(sklad2, id)),
    getSklad2: () => dispatch(getSklad2Action()),
    fetchProdType: () => dispatch(getProdTypeAction()),
    fetchProdSize: () => dispatch(getProdSizeAction()),
    fetchProdSezon: () => dispatch(getProdSezonAction()),
    fetchProdAsortument: () => dispatch(getProdAsortumentAction()),
    fetchProdClass: () => dispatch(getProdClassAction()),
    fetchProdColor: () => dispatch(getProdColorAction()),
    fetchProdImage: () => dispatch(getProdImageAction()),
    fetchMachine: () => dispatch(getMachineAction()),
    fetchProdArticle: () => dispatch(getProdArticleAction()),
    getOperations: () => dispatch(getOperationsAction()),
    getWorkers: () => dispatch(getWorkersAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);