import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePrajaPruhid.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { createPriagaAction } from "../../store/actions/Priaga/priagaActions";
import { getPrajaColorAction } from "../../store/actions/Praja/colorActions";
import { getPrajaTovtshinaAction } from "../../store/actions/Praja/tovtshinaActions";
import { getPrajaVendorAction } from "../../store/actions/Praja/vendorActions";
import { getPrajaTypeAction } from "../../store/actions/Praja/typeActions";
import { getPrajaSurovunaAction } from "../../store/actions/Praja/surovunaActions";

const CreatePrajaPruhid = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  errors,
  vendorId,
  typeId,
  surovunaId,
  tovtshinaId,
  colorId,
  fetchPrajaSurovuna,
  fetchPrajaType,
  fetchPrajaVendor,
  fetchPrajaTovtshina,
  fetchPrajaRozhid,
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
  const vendorSelect = (vendorId) => {
    setValues({ ...values, vendorId: vendorId.value });
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
      vendorId.length &&
        vendorId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [vendorId]);
  useEffect(() => {
    (async () => {
      await fetchPrajaSurovuna();
      await fetchPrajaType();
      await fetchPrajaVendor();
      await fetchPrajaTovtshina();
      await fetchPrajaColor();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити прихід</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
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
              <span>Постачальник</span>
            </div>
            <Select
              options={vendorOptions}
              value={values.vendorId.label}
              name="vendorId"
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
    price: "",
    quantity: "",
    vendorId: {},
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
      !values.vendorId ||
      !values.surovunaId ||
      !values.tovtshinaId ||
      !values.typeId ||
      !values.colorId
    ) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, { props: { createWorker, history } }) => {
    const workerToSubmit = {
      quantity: values.quantity,
      price: values.price,
      vendorId: values.vendorId,
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
})(CreatePrajaPruhid);
const mapStateToProps = (state) => {
  return {
    surovunaId: state.prajaSurovuna.prajaSurovuna,
    typeId: state.prajaType.prajaType,
    vendorId: state.prajaVendor.prajaVendor,
    tovtshinaId: state.prajaTovtshina.prajaTovtshina,
    colorId: state.prajaColor.prajaColor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createWorker: (materials) => dispatch(createPriagaAction(materials)),
    fetchPrajaSurovuna: () => dispatch(getPrajaSurovunaAction()),
    fetchPrajaType: () => dispatch(getPrajaTypeAction()),
    fetchPrajaVendor: () => dispatch(getPrajaVendorAction()),
    fetchPrajaTovtshina: () => dispatch(getPrajaTovtshinaAction()),
    fetchPrajaColor: () => dispatch(getPrajaColorAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
