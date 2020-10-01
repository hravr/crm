import React from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePruhid.module.css";

const CreatePruhid = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити прихід</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input type="date" label="Дата" />
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
          </div>
        </div>
        <div className={s.right}>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
          </div>

          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дата</span>
            </div>
            <Select options={options} />
            <Input label="Кількість гатунку" type="number" />
          </div>
        </div>
      </div>
      <div className={s.sum__container}>
        <span className={s.sum}>Кількість гатунку разом:</span>
      </div>
      <Button title="Створити" />
    </div>
  );
};

export default CreatePruhid;
