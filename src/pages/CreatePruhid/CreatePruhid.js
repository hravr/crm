import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePruhid.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import classnames from "classnames";
import { getProdTypeAction } from "../../store/actions/prodTypeTypeActions";
import { getProdSizeAction } from "../../store/actions/prodTypeSizeActions";
import { getProdSezonAction } from "../../store/actions/prodTypeSezonActions";
import { getProdAsortumentAction } from "../../store/actions/prodTypeAsortActions";
import { getProdClassAction } from "../../store/actions/prodTypeClassActions";
import { getProdColorAction } from "../../store/actions/prodTypeColorActions";
import { getProdImageAction } from "../../store/actions/prodTypeImageActions";
import { getMachineAction } from "../../store/actions/Machine/machineActions";
import {
  createSklad1Action,
  getSklad1Action,
} from "../../store/actions/sklad1Actions";
import { getProdArticleAction } from "../../store/actions/prodTypeArticleActions";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CreatePruhid2 from "../CreatePruhid2/CreatePruhid2";
import CreatePruhid3 from "../CreatePruhid3/CreatePruhid3";
import CreatePruhid4 from "../CreatePruhid4/CreatePruhid4";
import { getOperationsAction } from "../../store/actions/operationsAction";
import { getWorkersAction } from "../../store/actions/workersActions";

const CreatePruhid = ({
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
  getSklad1,
  articleId,
  fetchProdArticle,
  getWorkers,
  getOperations,
  errors,
  operations,
  workers,
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
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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

  const articleSelect = (articleId) => {
    setValues({ ...values, articleId: articleId.value });
  };

  const vyazalSelect = (vyazalId) => {
    setValues({ ...values, vyazalId: vyazalId.value });
  };

  const masterSelect = (masterId) => {
    setValues({ ...values, masterId: masterId.value });
  };

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

  const machinesSelect = (machineId) => {
    setValues({ ...values, machineId: machineId.value });
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
    (async () => {
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

  return (
    <Tabs className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити прихід</span>
        <hr></hr>
      </div>
      <TabList className={s.tabs}>
        {["Cклад 1", "Cклад 2", "Cклад 3", "Cклад 4"].map((item, i) => (
          <Tab
            onClick={() => setActiveTabIndex(i)}
            key={item}
            className={classnames(s.tab, {
              [s.tab__active]: activeTabIndex === i,
            })}
          >
            {item}
          </Tab>
        ))}
      </TabList>
      <TabPanel>
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
                value={values.machineId.label}
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
                value={values.vyazalId.label}
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
                value={values.masterId.label}
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
                value={values.articleId.label}
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
              {/*{console.log(errors)}*/}
              <Select
                options={sizeOptions}
                value={values.sizeId.label}
                name="sizeId"
                // styles={errors.name?.length && s.error}
                style={s.error}
                required
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
      </TabPanel>
      <TabPanel>
        <CreatePruhid2 />
      </TabPanel>
      <TabPanel>
        <CreatePruhid3 />
      </TabPanel>
      <TabPanel>
        <CreatePruhid4 />
      </TabPanel>
    </Tabs>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    asortument: {},
    typeId: {},
    sizeId: {},
    seasonId: {},
    imageId: {},
    classId: {},
    colorId: {},
    machineId: {},
    masterId: {},
    vyazalId: {},
    articleId: {},
    date_prixod: "",
    gatynok1: "",
    gatynok2: "",
    gatynok3: "",
  }),
  validate: (values) => {
    const errors = {};
    if (
      !values.asortument ||
      !values.typeId ||
      !values.sizeId ||
      !values.seasonId ||
      !values.imageId ||
      !values.classId ||
      !values.colorId ||
      !values.date_prixod ||
      !values.articleId ||
      !values.machineId ||
      !values.masterId ||
      !values.vyazalId ||
      !values.gatynok1  
      // !values.gatynok2 ||
      // !values.gatynok3
    ) {
      errors.name = "Required";
    }
    return errors;
  },
  handleSubmit: async (values, { props: { createPruhid1, history } }) => {
    const pruhudToSubmit = {
      asortumentId: values.asortument,
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
      masterId: values.masterId,
      vyazalId: values.vyazalId,
      articleId: values.articleId,
    };
    const isSuccess = await createPruhid1(pruhudToSubmit);
    console.log(isSuccess);
    if (isSuccess) {
      alert("Створено") || history.push("/sklad_1");
    } else {
      alert("Помилка! Заповніть всі поля!");
    }
  },
})(CreatePruhid);
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
    masterId: state.sklad1.sklad1,
    vyazalId: state.sklad1.sklad1,
    workers: state.workers.workers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createPruhid1: (sklad1) => dispatch(createSklad1Action(sklad1)),
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
