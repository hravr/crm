import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreateMachine.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getMachineModelAction } from "../../store/actions/Machine/modelActions";
import { getMachineDuymuAction } from "../../store/actions/Machine/duymuActions";
import { getMachineGolkuAction } from "../../store/actions/Machine/golkuActions";
import { getMachineVyazalniAction } from "../../store/actions/Machine/vyazalniActions";
import { createMachineAction } from "../../store/actions/Machine/machineActions";

const CreateMachine = ({
  values,
  handleChange,
  handleSubmit,
  setValues,
  fetchMachineModel,
  fetchMachineDuymu,
  fetchMachineGolku,
  fetchMachineVyazalni,
  machineModel,
  machineDuymu,
  machineGolku,
  machineVyazalni,
  errors,
}) => {
  const [modelOptions, setModelOptions] = useState([]);
  const [duymuOptions, setDuymuOptions] = useState([]);
  const [golkuOptions, setGolkuOptions] = useState([]);
  const [vyazalniOptions, setVyazalniOptions] = useState([]);

  const vyazalniSelect = (machineVyazalni) => {
    setValues({ ...values, vyazalniId: machineVyazalni.value });
  };
  const golkuSelect = (machineGolku) => {
    setValues({ ...values, golkuId: machineGolku.value });
  };
  const duymuSelect = (machineDuymu) => {
    setValues({ ...values, duymuId: machineDuymu.value });
  };
  const modelSelect = (machineModel) => {
    setValues({ ...values, modelId: machineModel.value });
  };

  useEffect(() => {
    setVyazalniOptions(
      machineVyazalni.length &&
        machineVyazalni.map((mod) => {
          return { label: mod.name, value: mod._id };
        })
    );
  }, [machineVyazalni]);
  useEffect(() => {
    setGolkuOptions(
      machineGolku.length &&
        machineGolku.map((mod) => {
          return { label: mod.name, value: mod._id };
        })
    );
  }, [machineGolku]);
  useEffect(() => {
    setDuymuOptions(
      machineDuymu.length &&
        machineDuymu.map((mod) => {
          return { label: mod.name, value: mod._id };
        })
    );
  }, [machineDuymu]);
  useEffect(() => {
    setModelOptions(
      machineModel.length &&
        machineModel.map((mod) => {
          return { label: mod.name, value: mod._id };
        })
    );
  }, [machineModel]);

  useEffect(() => {
    (async () => {
      await fetchMachineModel();
      await fetchMachineDuymu();
      await fetchMachineGolku();
      await fetchMachineVyazalni();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити машину</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input
            label="Назва"
            value={values.name}
            name="name"
            onChange={handleChange}
          />

          <div className={s.select__container}>
            <div className={s.span}>
              <span>Модель</span>
            </div>
            <Select
              options={modelOptions}
              value={values.modelId.label}
              name="modelId"
              onChange={modelSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Голка</span>
            </div>
            <Select
              options={golkuOptions}
              value={values.golkuId.label}
              name="golkuId"
              onChange={golkuSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Дюйми</span>
            </div>
            <Select
              options={duymuOptions}
              value={values.duymuId.label}
              name="duymuId"
              onChange={duymuSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Машини в'язальні</span>
            </div>
            <Select
              options={vyazalniOptions}
              value={values.vyazalniId.label}
              name="vyazalniId"
              onChange={vyazalniSelect}
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
    name: "",
    modelId: {},
    golkuId: {},
    vyazalniId: {},
    duymuId: {},
  }),
  validate: (values) => {
    const errors = {};
    if (
      !values.name ||
      !values.modelId ||
      !values.golkuId ||
      !values.vyazalniId ||
      !values.duymuId
    ) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, { props: { createMachine, history } }) => {
    const machineToSubmit = {
      modelId: values.modelId,
      golkuId: values.golkuId,
      vyazalniId: values.vyazalniId,
      duymuId: values.duymuId,
      name: values.name,
    };
    const isSuccess = await createMachine(machineToSubmit);
    if (isSuccess) {
      alert("Створено") || history.push("/equipment");
    } else {
      alert("error===");
    }
  },
})(CreateMachine);
const mapStateToProps = (state) => {
  return {
    machineModel: state.machineModel.machineModel,
    machineDuymu: state.machineDuymu.machineDuymu,
    machineGolku: state.machineGolku.machineGolku,
    machineVyazalni: state.machineVyazalni.machineVyazalni,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createMachine: (workers) => dispatch(createMachineAction(workers)),
    fetchMachineModel: () => dispatch(getMachineModelAction()),
    fetchMachineDuymu: () => dispatch(getMachineDuymuAction()),
    fetchMachineGolku: () => dispatch(getMachineGolkuAction()),
    fetchMachineVyazalni: () => dispatch(getMachineVyazalniAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
