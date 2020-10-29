import React from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePruhid.module.css";
import { connect } from "react-redux";
import { createSklad1Action } from "../../store/actions/skladActions";
import { withFormik } from "formik";

const CreatePruhid = ({
  CreatePruhid,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const options = [
    { value: "sklad1", label: "Склад 1" },
    { value: "sklad2", label: "Склад 2" },
    { value: "sklad3", label: "Склад 3" },
    { value: "sklad4", label: "Склад 4" },
  ];
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити прихід</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input
            type="date"
            label="Дата"
            value={values.date_prixod}
            name="date_prixod"
            onChange={handleChange}
          />
          <div className={s.select__container}>
            <Input
              label="В'язальниця"
              value={values.vyazalId}
              name="vyazalId"
              onChange={handleChange}
            />
          </div>

          <div className={s.select__container}>
            <Input
              label="Майстр"
              value={values.masterId}
              name="masterId"
              onChange={handleChange}
            />
          </div>
          <div className={s.select__container}>
            <Input
              label="Машина"
              value={values.machineId}
              name="machineId"
              onChange={handleChange}
            />
          </div>
          <div className={s.select__container}>
            <Input
              label="Гатунок 1"
              value={values.gatynok1}
              name="gatynok1"
              onChange={handleChange}
            />
          </div>
          <div className={s.select__container}>
            <Input
              label="Гатунок 2"
              value={values.gatynok2}
              name="gatynok2"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={s.right}>
          <div className={s.select__container}>
            <Input
              label="Гатунок 3"
              value={values.gatynok3}
              name="gatynok3"
              onChange={handleChange}
            />
          </div>
          <div className={s.select__container}>
            <Input
              label="Асортимент"
              value={values.asortumentId}
              name="asortumentId"
              onChange={handleChange}
            />
          </div>

          <div className={s.select__container}>
            <Input
              label="Зображення"
              value={values.imageId}
              name="imageId"
              onChange={handleChange}
            />
          </div>
          <div className={s.select__container}>
            <Input
              label="Колір"
              value={values.colorId}
              name="colorId"
              onChange={handleChange}
            />
          </div>
          <div className={s.select__container}>
            {/* <Select options={options} /> */}
            <Input
              label="Розмір"
              value={values.sizeId}
              name="sizeId"
              onChange={handleChange}
            />
          </div>
          <div className={s.select__container}>
            {/* <Select options={options} /> */}
            <Input
              label="Клас"
              value={values.classId}
              name="classId"
              onChange={handleChange}
            />
          </div>
          <div className={s.select__container}>
            {/* <Select options={options} /> */}
            <Input
              label="Артикуль"
              value={values.articleId}
              name="articleId"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className={s.sum__container}>
        <span className={s.sum}>Кількість гатунку разом:</span>
      </div>
      <Button title="Створити" onClick={handleSubmit} />
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    vyazalId: null,
    masterId: null,
    machineId: null,
    gatynok1: "",
    gatynok2: "",
    gatynok3: "",
    typeId: null,
    asortumentId: null,
    imageId: null,
    colorId: null,
    sizeId: null,
    classId: null,
    articleId: null,
    date_prixod: "",
  }),
  handleSubmit: async (values, { props: { CreatePruhid }, resetForm }) => {
    const isSuccess = await CreatePruhid(values);
    if (isSuccess) {
      alert("Success");
    } else {
      alert("error===");
    }
    resetForm({
      vyazalId: "",
      masterId: "",
      machineId: "",
      gatynok1: "",
      gatynok2: "",
      gatynok3: "",
      typeId: "",
      asortumentId: "",
      imageId: "",
      colorId: "",
      sizeId: "",
      classId: "",
      articleId: "",
      date_prixod: "",
    });
  },
})(CreatePruhid);
const mapStateToProps = (props) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return { CreatePruhid: (sklad1) => dispatch(createSklad1Action(sklad1)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
