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
import {
  editSklad1ction,
  getSingleSklad1Action,
  getSklad1Action,
} from "../../store/actions/sklad1Actions";
import { getProdArticleAction } from "../../store/actions/prodTypeArticleActions";
import { getOperationsAction } from "../../store/actions/operationsAction";
import { getWorkersAction } from "../../store/actions/workersActions";
import { useParams } from "react-router-dom";

const EditSklad1 = ({
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
  fetchMachine,
  machineId,
  getSklad1,
  articleId,
  fetchProdArticle,
  getWorkers,
  getOperations,
  operations,
  workers,
  singleSklad1,
  getSingleSklad1,
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
  const { id } = useParams();
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

  const vyazalSelect = (vyazalId) => {
    setValues({
      ...values,
      vyazalId: vyazalId.value,
      vyazalName: vyazalId.label,
    });
  };

  const masterSelect = (masterId) => {
    setValues({
      ...values,
      masterId: masterId.value,
      masterName: masterId.label,
    });
  };

  const articleSelect = (articleId) => {
    setValues({
      ...values,
      articleId: articleId.value,
      articleName: articleId.label,
    });
  };

  const asortumentSelect = (asortumentId) => {
    setValues({
      ...values,
      asortumentId: asortumentId.value,
      asortumentName: asortumentId.label,
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
      await getSingleSklad1(id);
      await getSklad1();
      await fetchMachine();
      await fetchProdAsortument();
      await fetchProdSezon();
      await fetchProdSize();
      await fetchProdType();
      await fetchProdImage();
      await fetchProdClass();
      await fetchProdColor();
      await fetchProdArticle();
      await getWorkers();
      await getOperations();
    })();
  }, []);
  useEffect(() => {
    const {
      typeId,
      seasonId,
      sizeId,
      imageId,
      colorId,
      machineId,
      masterId,
      vyazalId,
      articleId,
      asortumentId,
      classId,
      mishok,
      _id,
    } = singleSklad1;
    if (singleSklad1._id) {
      setValues({
        ...values,
        seasonId,
        seasonName: mishok.seasonId?.name || "Всі",
        typeId,
        typeName: mishok.typeId?.name || "Всі",
        sizeId,
        sizeName: mishok.sizeId?.name || "Всі",
        imageId,
        imageName: mishok.imageId?.name || "Всі",
        colorId,
        colorName: mishok.colorId?.name || "Всі",
        classId,
        cName: mishok.classId?.name || "Всі",
        machineId,
        machineName: machineId?.name || "Всі",
        masterId,
        masterName: masterId?.fName + " " + masterId?.sName,
        vyazalId,
        vyazalName: vyazalId?.fName + " " + vyazalId?.sName,
        articleId,
        articleName: mishok.articleId?.name || "Всі",
        asortumentId,
        asortumentName: mishok.asortumentId?.name || "Всі",
        gatynok1: mishok.gatynok1,
        gatynok2: mishok.gatynok2,
        gatynok3: mishok.gatynok3,
        _id,
      });
    }
  }, [singleSklad1]);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити склад 1</span>
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
              <span>В'язальниця</span>
            </div>
            <Select
              options={operationsOptions["В'язальниця"]}
              value={{ label: values.vyazalName, value: values.vyazalId }}
              name="vyazalId"
              onChange={vyazalSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Майстер</span>
            </div>
            <Select
              options={operationsOptions["Майстер"]}
              value={{ label: values.masterName, value: values.masterId }}
              name="masterId"
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
        <Button title="Змінити" onClick={handleSubmit} />
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
    machineId: "",
    masterId: "",
    vyazalId: "",
    articleId: "",
    date_prixod: "",
    gatynok1: "",
    gatynok2: "",
    gatynok3: "",
    _id: "",
  }),
  handleSubmit: async (
    values,
    { props: { editSklad1, history, singleSklad1 } }
  ) => {
    const pruhudToSubmit = {
      asortumentId: values.asortumentId,
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
      masterId: values.masterId._id,
      vyazalId: values.vyazalId._id,
      articleId: values.articleId,
    };
    const isSuccess = await editSklad1(pruhudToSubmit, singleSklad1._id);
    if (isSuccess) {
      alert("Змінено") || history.push("/sklad_1");
    } else {
      alert("error===");
    }
  },
})(EditSklad1);
const mapStateToProps = (state) => {
  return {
    operations: state.operations.operations,
    articleId: state.prod.prodArticle,
    typeId: state.prodType.prodType,
    sizeId: state.prodSize.prodSize,
    seasonId: state.prodSezon.prodSezon,
    asortumentId: state.prodAsortument.prodAsortument,
    classId: state.prodClass.prodClass,
    colorId: state.prodColor.prodColor,
    imageId: state.prodImage.prodImage,
    machineId: state.machines.machines,
    masterId: state.sklad1.sklad1,
    vyazalId: state.sklad1.sklad1,
    operations: state.operations.operations,
    workers: state.workers.workers,
    singleSklad1: state.sklad1.single,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSklad1: () => dispatch(getSklad1Action()),
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
    getSingleSklad1: (id) => dispatch(getSingleSklad1Action(id)),
    editSklad1: (sklad1, id) => dispatch(editSklad1ction(sklad1, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
