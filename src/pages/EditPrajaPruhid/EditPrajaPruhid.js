import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditPrajaPruhid.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import {
  editPriagaAction,
  getSinglePriagaAction,
} from "../../store/actions/Priaga/priagaActions";
import { getPrajaColorAction } from "../../store/actions/Praja/colorActions";
import { getPrajaTovtshinaAction } from "../../store/actions/Praja/tovtshinaActions";
import { getPrajaVendorAction } from "../../store/actions/Praja/vendorActions";
import { getPrajaTypeAction } from "../../store/actions/Praja/typeActions";
import { getPrajaSurovunaAction } from "../../store/actions/Praja/surovunaActions";
import { useParams } from "react-router-dom";

const EditPrajaPruhid = ({
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
  fetchPrajaColor,
  getSinglePraja,
  singlePraja,
}) => {
  const [vendorOptions, setVendorOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [paramsOptions, setParamsOptions] = useState([]);
  const [paramsValueOptions, setParamsValueOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const colorSelect = (colorId) => {
    setValues({ ...values, colorId: colorId.value, colorName: colorId.label });
  };
  const vendorSelect = (vendorId) => {
    setValues({
      ...values,
      vendorId: vendorId.value,
      vendorName: vendorId.label,
    });
  };

  const typeSelect = (typeId) => {
    setValues({ ...values, typeId: typeId.value, typeName: typeId.label });
  };
  const paramsSelect = (surovunaId) => {
    setValues({
      ...values,
      surovunaId: surovunaId.value,
      surovunaName: surovunaId.label,
    });
  };
  const paramsValueSelect = (tovtshinaId) => {
    setValues({
      ...values,
      tovtshinaId: tovtshinaId.value,
      tovtshinaName: tovtshinaId.label,
    });
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
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await getSinglePraja(id);
      await fetchPrajaSurovuna();
      await fetchPrajaType();
      await fetchPrajaVendor();
      await fetchPrajaTovtshina();
      await fetchPrajaColor();
    })();
  }, []);

  useEffect(() => {
    const {
      vendorId,
      price,
      quantity,
      typeId,
      tovtshinaId,
      colorId,
      surovunaId,
      _id,
    } = singlePraja;
    if (singlePraja._id) {
      setValues({
        ...values,
        vendorId,
        vendorName: vendorId?.name,
        price,
        quantity,
        typeId,
        typeName: typeId?.name,
        tovtshinaId,
        tovtshinaName: tovtshinaId?.name,
        colorId,
        colorName: colorId?.name,
        surovunaId,
        surovunaName: surovunaId?.name,
        _id,
      });
    }
  }, [singlePraja]);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити прихід</span>
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
              value={{ label: values.vendorName, value: values.vendorId }}
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
              value={{ label: values.typeName, value: values.typeId }}
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
              value={{ label: values.surovunaName, value: values.surovunaId }}
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
              value={{ label: values.tovtshinaName, value: values.tovtshinaId }}
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
              value={{ label: values.colorName, value: values.colorId }}
              name="colorId"
              onChange={colorSelect}
              onBlur={handleBlur}
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
    price: "",
    quantity: "",
    vendorId: "",
    typeId: "",
    surovunaId: "",
    tovtshinaId: "",
    colorId: "",
  }),

  handleSubmit: async (
    values,
    { props: { editPraja, history, singlePraja } }
  ) => {
    const workerToSubmit = {
      quantity: values.quantity,
      price: values.price,
      vendorId: values.vendorId,
      surovunaId: values.surovunaId,
      tovtshinaId: values.tovtshinaId,
      typeId: values.typeId,
      colorId: values.colorId,
    };
    const isSuccess = await editPraja(workerToSubmit, singlePraja._id);
    if (isSuccess) {
      history.push("/priaga") || alert("Змінено");
    } else {
      alert("Помилка");
    }
  },
})(EditPrajaPruhid);
const mapStateToProps = (state) => {
  return {
    surovunaId: state.prajaSurovuna.prajaSurovuna,
    typeId: state.prajaType.prajaType,
    vendorId: state.prajaVendor.prajaVendor,
    tovtshinaId: state.prajaTovtshina.prajaTovtshina,
    colorId: state.prajaColor.prajaColor,
    singlePraja: state.priaga.single,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePraja: (id) => dispatch(getSinglePriagaAction(id)),
    editPraja: (priaja, id) => dispatch(editPriagaAction(priaja, id)),
    fetchPrajaSurovuna: () => dispatch(getPrajaSurovunaAction()),
    fetchPrajaType: () => dispatch(getPrajaTypeAction()),
    fetchPrajaVendor: () => dispatch(getPrajaVendorAction()),
    fetchPrajaTovtshina: () => dispatch(getPrajaTovtshinaAction()),
    fetchPrajaColor: () => dispatch(getPrajaColorAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
