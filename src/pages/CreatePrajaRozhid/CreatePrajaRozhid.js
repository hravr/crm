import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePrajaRozhid.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { createPriagaRozhidAction } from "../../store/actions/Priaga/priagaActions";
import { getPrajaColorAction } from "../../store/actions/Praja/colorActions";
import { getPrajaTovtshinaAction } from "../../store/actions/Praja/tovtshinaActions";
import { getPrajaTypeAction } from "../../store/actions/Praja/typeActions";
import { getPrajaSurovunaAction } from "../../store/actions/Praja/surovunaActions";
import { getPrajaRozhidAction } from "../../store/actions/Praja/rozhidActions";

const CreatePrajaRozhid = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  errors,
  dilankaRozxodyId,
  typeId,
  surovunaId,
  tovtshinaId,
  colorId,
  fetchPrajaSurovuna,
  fetchPrajaType,
  fetchPrajaRozhid,
  fetchPrajaTovtshina,
  fetchPrajaColor,
}) => {
  const [vendorOptions, setVendorOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [paramsOptions, setParamsOptions] = useState([]);
  const [paramsValueOptions, setParamsValueOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const colorSelect = (colorId) => {
    setValues({ ...values, colorId: colorId.value });
  };
  const vendorSelect = (dilankaRozxodyId) => {
    setValues({ ...values, dilankaRozxodyId: dilankaRozxodyId.value });
  };

  const typeSelect = (typeId) => {
    setValues({ ...values, typeId: typeId.value });
  };
  const paramsSelect = (surovunaId) => {
    setValues({ ...values, surovunaId: surovunaId.value });
  };
  const paramsValueSelect = (tovtshinaId) => {
    setValues({ ...values, tovtshinaId: tovtshinaId.value });
  };

  useEffect(() => {
    setColorOptions(
      colorId.length &&
        colorId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [colorId]);
  useEffect(() => {
    setParamsValueOptions(
      tovtshinaId.length &&
        tovtshinaId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [tovtshinaId]);
  useEffect(() => {
    setParamsOptions(
      surovunaId.length &&
        surovunaId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [surovunaId]);
  useEffect(() => {
    setTypeOptions(
      typeId.length &&
        typeId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [typeId]);

  useEffect(() => {
    setVendorOptions(
      dilankaRozxodyId.length &&
        dilankaRozxodyId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [dilankaRozxodyId]);
  useEffect(() => {
    (async () => {
      await fetchPrajaSurovuna();
      await fetchPrajaType();
      await fetchPrajaRozhid();
      await fetchPrajaTovtshina();
      await fetchPrajaColor();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити розхід</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <div className={s.select__container}>
            <Input
              label="Дата"
              value={values.date_rozxodu}
              name="date_rozxodu"
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
            />
          </div>
          <div className={s.select__container}>
            <Input
              label="Ціна"
              value={values.price}
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
            />
          </div>

          <div className={s.select__container}>
            <Input
              label="Кількість"
              value={values.quantity}
              name="quantity"
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
            />
          </div>
        </div>
        <div className={s.left}>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Ділянка розходу</span>
            </div>
            <Select
              options={vendorOptions}
              value={values.dilankaRozxodyId.label}
              name="dilankaRozxodyId"
              onChange={vendorSelect}
              onBlur={handleBlur}
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
              onBlur={handleBlur}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Сировина</span>
            </div>
            <Select
              options={paramsOptions}
              value={values.surovunaId.label}
              name="surovunaId"
              onChange={paramsSelect}
              onBlur={handleBlur}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Товщина</span>
            </div>
            <Select
              options={paramsValueOptions}
              value={values.tovtshinaId.label}
              name="tovtshinaId"
              onChange={paramsValueSelect}
              onBlur={handleBlur}
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
              onBlur={handleBlur}
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
    date_rozxodu: "",
    price: "",
    quantity: "",
    dilankaRozxodyId: {},
    typeId: {},
    surovunaId: {},
    tovtshinaId: {},
    colorId: {},
  }),
  validate: (values) => {
    const errors = {};
    if (
      !values.price ||
      !values.quantity ||
      !values.dilankaRozxodyId ||
      !values.surovunaId ||
      !values.tovtshinaId ||
      !values.typeId ||
      !values.date_rozxodu ||
      !values.colorId
    ) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, { props: { createWorker, history } }) => {
    const workerToSubmit = {
      date_rozxodu: values.date_rozxodu,
      quantity: values.quantity,
      price: values.price,
      dilankaRozxodyId: values.dilankaRozxodyId,
      surovunaId: values.surovunaId,
      tovtshinaId: values.tovtshinaId,
      typeId: values.typeId,
      colorId: values.colorId,
    };
    const isSuccess = await createWorker(workerToSubmit);
    if (isSuccess) {
      history.push("/priaga") || alert("Створено");
    } else {
      alert("Помилка");
    }
  },
})(CreatePrajaRozhid);
const mapStateToProps = (state) => {
  return {
    surovunaId: state.prajaSurovuna.prajaSurovuna,
    typeId: state.prajaType.prajaType,
    dilankaRozxodyId: state.prajaRozhid.prajaRozhid,
    tovtshinaId: state.prajaTovtshina.prajaTovtshina,
    colorId: state.prajaColor.prajaColor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createWorker: (materials) => dispatch(createPriagaRozhidAction(materials)),
    fetchPrajaSurovuna: () => dispatch(getPrajaSurovunaAction()),
    fetchPrajaType: () => dispatch(getPrajaTypeAction()),
    fetchPrajaRozhid: () => dispatch(getPrajaRozhidAction()),
    fetchPrajaTovtshina: () => dispatch(getPrajaTovtshinaAction()),
    fetchPrajaColor: () => dispatch(getPrajaColorAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
