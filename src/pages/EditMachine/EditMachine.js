import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditMachine.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getMachineModelAction } from "../../store/actions/Machine/modelActions";
import { getMachineDuymuAction } from "../../store/actions/Machine/duymuActions";
import { getMachineGolkuAction } from "../../store/actions/Machine/golkuActions";
import { getMachineVyazalniAction } from "../../store/actions/Machine/vyazalniActions";
import {
  editMachineAction,
  getSingleMachineAction,
} from "../../store/actions/Machine/machineActions";
import { useParams } from "react-router-dom";

const EditMachine = ({
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
  singleMachine,
  getSingleMachine,
  editMachine,
  errors,
}) => {
  const [modelOptions, setModelOptions] = useState([]);
  const [duymuOptions, setDuymuOptions] = useState([]);
  const [golkuOptions, setGolkuOptions] = useState([]);
  const [vyazalniOptions, setVyazalniOptions] = useState([]);

  const { id } = useParams();

  const vyazalniSelect = (machineVyazalni) => {
    setValues({
      ...values,
      vyazalniId: machineVyazalni.value,
      vyazalniName: machineVyazalni.label,
    });
  };
  const golkuSelect = (machineGolku) => {
    setValues({
      ...values,
      golkuId: machineGolku.value,
      golkuName: machineGolku.label,
    });
  };
  const duymuSelect = (machineDuymu) => {
    setValues({
      ...values,
      duymuId: machineDuymu.value,
      dumuName: machineDuymu.label,
    });
  };
  const modelSelect = (machineModel) => {
    setValues({
      ...values,
      modelId: machineModel.value,
      modelName: machineModel.label,
    });
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
    const { name, modelId, golkuId, vyazalniId, duymuId, _id } = singleMachine;
    if (singleMachine._id) {
      setValues({
        ...values,
        name,
        modelId,
        modelName: modelId.name,
        golkuId,
        golkuName: golkuId.name,
        vyazalniId,
        vyazalniName: vyazalniId.name,
        duymuId,
        dumuName: duymuId.name,
        _id,
      });
    }
  }, [singleMachine]);

  useEffect(() => {
    (async () => {
      await getSingleMachine(id);
      await fetchMachineModel();
      await fetchMachineDuymu();
      await fetchMachineGolku();
      await fetchMachineVyazalni();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити машину</span>
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
              value={{ label: values.modelName, value: values.modelId }}
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
              value={{ label: values.golkuName, value: values.golkuId }}
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
              value={{ label: values.dumuName, value: values.duymuId }}
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
              value={{ label: values.vyazalniName, value: values.vyazalniId }}
              name="vyazalniId"
              onChange={vyazalniSelect}
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
    name: "",
    modelId: "",
    golkuId: "",
    vyazalniId: "",
    duymuId: "",
    _id: "",
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
  handleSubmit: async (
    values,
    { props: { editMachine, singleMachine, history }, resetForm }
  ) => {
    const machineToSubmit = {
      modelId: values.modelId,
      golkuId: values.golkuId,
      vyazalniId: values.vyazalniId,
      duymuId: values.duymuId,
      name: values.name,
    };
    const isSuccess = await editMachine(machineToSubmit, singleMachine._id);
    if (isSuccess) {
      alert("Змінено") || history.push("/equipment");
    } else {
      alert("error===");
    }
    resetForm({});
  },
})(EditMachine);
const mapStateToProps = (state) => {
  return {
    singleMachine: state.machines.single,
    machineModel: state.machineModel.machineModel,
    machineDuymu: state.machineDuymu.machineDuymu,
    machineGolku: state.machineGolku.machineGolku,
    machineVyazalni: state.machineVyazalni.machineVyazalni,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleMachine: (id) => dispatch(getSingleMachineAction(id)),
    editMachine: (machines, id) => dispatch(editMachineAction(machines, id)),
    fetchMachineModel: () => dispatch(getMachineModelAction()),
    fetchMachineDuymu: () => dispatch(getMachineDuymuAction()),
    fetchMachineGolku: () => dispatch(getMachineGolkuAction()),
    fetchMachineVyazalni: () => dispatch(getMachineVyazalniAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
