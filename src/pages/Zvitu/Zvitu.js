import React, { useEffect, useState } from "react";
import s from "./Zvitu.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactToExcel from "react-html-table-to-excel";
import {
  deleteZvituAction,
  filterZvituAction,
  getZvituAction,
} from "../../store/actions/Zvitu/zvituActions";
import {
  deleteZvituRozxidAction,
  filterZvituRozxidAction,
  getZvituRozxidAction,
} from "../../store/actions/Zvitu/zvituRozhidActions";
import {
  filterZvituZalushokAction,
  getZvituZalushokAction,
} from "../../store/actions/Zvitu/zvituZalushokActions";
import { getOperationsAction } from "../../store/actions/operationsAction";
import Select from "react-select";

const Zvitu = ({
  getZvitu,
  filterZvitu,
  deleteZvitu,
  filteredZvitu,
  getZvituRozxid,
  zvitu,
  operations,
  zvituRozxid,
  filterZvituRozxid,
  filteredZvituRozxid,
  deleteZvituRozxid,
  getZvituZalushok,
  filterZvituZalushok,
  filteredZvituZalushok,
  zvituZalushok,
  getOperations,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState([]);
  const h = useHistory();
  const operationsSelect = operations.map((operation) => {
    return { label: operation.name, value: operation._id };
  });
  console.log(dataForFilter);

  useEffect(() => {
    (async () => {
      await getZvitu();
      await getZvituRozxid();
      await getZvituZalushok();
      await getOperations();
    })();
  }, []);
  return (
    <Tabs>
      <div className={s.main}>
        <div className={s.title__container}>
          <span className={s.title}>Звіти</span>
          <hr></hr>
        </div>
        <TabList className={s.tabs}>
          {["Прихід", "Розхід", "Залишок"].map((item, i) => (
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
          <div className={s.filter__container}>
            {/* <div className={s.barcode}>
              <Barcode value="hey" />,
            </div> */}
            <div className={s.search__container}>
              <Select
                options={operationsSelect}
                name="operationId"
                defaultValue={dataForFilter.operationLabel}
                onChange={(e) => {
                  setDataForFilter({
                    ...dataForFilter,
                    operationId: e.value,
                    operationLabel: e.label,
                  });
                }}
              />
            </div>
            <div className={s.search__container}>
              <Input
                label="Період з:"
                type="date"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, from: target.value })
                }
              />
            </div>
            <div className={s.search__container}>
              <Input
                label="до:"
                type="date"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, to: target.value })
                }
              />
            </div>
            <div className={s.create__worker}>
              <div className={s.exel__wrapper}>
                <ReactToExcel
                  table="table-to-xls"
                  filename="Zvitu"
                  sheet="sheet 1"
                  buttonText="EXPORT"
                  className="exel"
                />
              </div>
              <Button
                title="Пошук"
                onClick={async () => {
                  await filterZvitu(dataForFilter);
                }}
              />
            </div>
          </div>
          <div className={s.table}>
            <table id="table-to-xls">
              <tr>
                <th className={s.status__table}>ID Операції</th>
                <th className={s.status__table}>Гатунок 1</th>
                <th className={s.status__table}>Гатунок 2</th>
                <th className={s.status__table}>Гатунок 3</th>
                <th className={s.status__table}>ID працівника</th>
                <th className={s.status__table}>Дата</th>
                <th className={s.status__table}>Змінено</th>
                <th className={s.status__table}></th>
                <th></th>
              </tr>
              {!filteredZvitu.length
                ? zvitu &&
                  zvitu.map((zvit) => {
                    return (
                      <tr key={zvit._id}>
                        <td>{zvit.operationId?.name}</td>
                        <td>{zvit.gatynok1}</td>
                        <td>{zvit.gatynok2}</td>
                        <td>{zvit.gatynok3}</td>
                        <td>
                          {zvit.workerId?.fName + " " + zvit.workerId?.sName}
                        </td>
                        <td>{zvit.date_prixodu?.slice(0, 10)}</td>
                        <td>
                          {zvit.changesId?.firstName +
                            " " +
                            zvit.changesId?.lastName}
                        </td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              className={s.del}
                              onClick={() => h.push(`/edit-zvitu/${zvit._id}`)}
                            >
                              Редагувати
                            </button>
                            <button onClick={() => deleteZvitu(zvit._id)}>
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : filteredZvitu.length &&
                  filteredZvitu.map((filter) => {
                    return (
                      <tr key={filter._id}>
                        <td>{filter.operationId?.name}</td>
                        <td>{filter.gatynok1}</td>
                        <td>{filter.gatynok2}</td>
                        <td>{filter.gatynok3}</td>
                        <td>
                          {filter.workerId?.fName +
                            " " +
                            filter.workerId?.sName}
                        </td>
                        <td>{filter.date_prixodu?.slice(0, 10)}</td>
                        <td>
                          {filter.changesId?.firstName +
                            " " +
                            filter.changesId?.lastName}
                        </td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              className={s.del}
                              onClick={() =>
                                h.push(`/edit-zvitu/${filter._id}`)
                              }
                            >
                              Редагувати
                            </button>
                            <button onClick={() => deleteZvitu(filter._id)}>
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.filter__container}>
            {/* <div className={s.barcode}>
              <Barcode value="hey" />,
            </div> */}

            <div className={s.search__container}>
              <Select
                options={operationsSelect}
                name="operationId"
                defaultValue={dataForFilter.operationLabel}
                onChange={(e) => {
                  setDataForFilter({
                    ...dataForFilter,
                    operationId: e.value,
                    operationLabel: e.label,
                  });
                }}
              />
            </div>
            <div className={s.search__container}>
              <Input
                label="Період з:"
                type="date"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, from: target.value })
                }
              />
            </div>
            <div className={s.search__container}>
              <Input
                label="до:"
                type="date"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, to: target.value })
                }
              />
            </div>
            <div className={s.create__worker}>
              <div className={s.exel__wrapper}>
                <ReactToExcel
                  table="table-to-xls"
                  filename="Zvitu"
                  sheet="sheet 1"
                  buttonText="EXPORT"
                  className="exel"
                />
              </div>
              <Button
                title="Пошук"
                onClick={async () => {
                  console.log("click here");
                  await filterZvituRozxid(dataForFilter);
                }}
              />
            </div>
          </div>
          <div className={s.table}>
            <table id="table-to-xls">
              <tr>
                <th className={s.status__table}>ID Операції</th>
                <th className={s.status__table}>Гатунок 1</th>
                <th className={s.status__table}>Гатунок 2</th>
                <th className={s.status__table}>Гатунок 3</th>
                <th className={s.status__table}>ID працівника</th>
                <th className={s.status__table}>Дата</th>
                <th className={s.status__table}>Змінено</th>
                <th></th>
              </tr>
              {!filteredZvituRozxid.length
                ? zvituRozxid &&
                  zvituRozxid.map((zvitRozxid) => {
                    return (
                      <tr key={zvitRozxid._id}>
                        <td>{zvitRozxid.operationId?.name}</td>
                        <td>{zvitRozxid.gatynok1}</td>
                        <td>{zvitRozxid.gatynok2}</td>
                        <td>{zvitRozxid.gatynok3}</td>
                        <td>
                          {zvitRozxid.workerId?.fName +
                            " " +
                            zvitRozxid.workerId?.sName}
                        </td>
                        <td>{zvitRozxid.date_rozxodu?.slice(0, 10)}</td>
                        <td>
                          {zvitRozxid.changesId?.firstName +
                            " " +
                            zvitRozxid.changesId?.lastName}
                        </td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              onClick={() => deleteZvituRozxid(zvitRozxid._id)}
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : filteredZvituRozxid.length &&
                  filteredZvituRozxid.map((filter) => {
                    return (
                      <tr key={filter._id}>
                        <td>{filter.operationId?.name}</td>
                        <td>{filter.gatynok1}</td>
                        <td>{filter.gatynok2}</td>
                        <td>{filter.gatynok3}</td>
                        <td>
                          {filter.workerId?.fName +
                            " " +
                            filter.workerId?.sName}
                        </td>
                        <td>{filter.date_rozxodu?.slice(0, 10)}</td>
                        <td>
                          {filter.changesId?.firstName +
                            " " +
                            filter.changesId?.lastName}
                        </td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              className={s.del}
                              onClick={() =>
                                h.push(`/edit-zvitu-rozxid/${filter._id}`)
                              }
                            >
                              Редагувати
                            </button>
                            <button
                              onClick={() => deleteZvituRozxid(filter._id)}
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.filter__container}>
            {/* <div className={s.barcode}>
              <Barcode value="hey" />,
            </div> */}

            <div className={s.search__container}>
              <Select
                options={operationsSelect}
                name="operationId"
                defaultValue={dataForFilter.operationLabel}
                onChange={(e) => {
                  setDataForFilter({
                    ...dataForFilter,
                    operationId: e.value,
                    operationLabel: e.label,
                  });
                }}
              />
            </div>
            <div className={s.search__container}>
              {/*<Input*/}
              {/*    label="Період з:"*/}
              {/*    type="date"*/}
              {/*    onChange={({target}) =>*/}
              {/*        setDataForFilter({...dataForFilter, from: target.value})*/}
              {/*    }*/}
              {/*/>*/}
            </div>
            <div className={s.search__container}>
              <Input
                label="На таку-то дату:"
                type="date"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, day: target.value })
                }
              />
            </div>
            <div className={s.create__worker}>
              <div className={s.exel__wrapper}>
                <ReactToExcel
                  table="table-to-xls"
                  filename="Zvitu"
                  sheet="sheet 1"
                  buttonText="EXPORT"
                  className="exel"
                />
              </div>
              <Button
                title="Пошук"
                onClick={async () => {
                  await filterZvituZalushok(dataForFilter);
                }}
              />
            </div>
          </div>
          <div className={s.table}>
            <table id="table-to-xls">
              <tr>
                <th className={s.status__table}>ID Операції</th>
                <th className={s.status__table}>Гатунок 1</th>
                <th className={s.status__table}>Гатунок 2</th>
                <th className={s.status__table}>Гатунок 3</th>
                <th className={s.status__table}>ID працівника</th>
                <th className={s.status__table}>Дата</th>
                <th className={s.status__table}>Змінено</th>
                <th></th>
              </tr>
              {!filteredZvituZalushok.length
                ? zvituZalushok &&
                  zvituZalushok.map((zvitz) => {
                    return (
                      <tr key={zvitz._id}>
                        <td>{zvitz.operationId?.name}</td>
                        <td>{zvitz.gatynok1}</td>
                        <td>{zvitz.gatynok2}</td>
                        <td>{zvitz.gatynok3}</td>
                        <td>
                          {zvitz.workerId?.fName + " " + zvitz.workerId?.sName}
                        </td>
                        <td>{zvitz.date_rozxodu?.slice(0, 10)}</td>
                        <td>
                          {zvitz.changesId?.firstName +
                            " " +
                            zvitz.changesId?.lastName}
                        </td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              onClick={() => deleteZvituRozxid(zvitz._id)}
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : filteredZvituZalushok.length &&
                  filteredZvituZalushok.map((filter) => {
                    return (
                      <tr key={filter._id}>
                        <td>{filter.operationId?.name}</td>
                        <td>{filter.gatynok1}</td>
                        <td>{filter.gatynok2}</td>
                        <td>{filter.gatynok3}</td>
                        <td>
                          {filter.workerId?.fName +
                            " " +
                            filter.workerId?.sName}
                        </td>
                        <td>{filter.date_rozxodu?.slice(0, 10)}</td>
                        <td>
                          {filter.changesId?.firstName +
                            " " +
                            filter.changesId?.lastName}
                        </td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              onClick={() => deleteZvituRozxid(filter._id)}
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </table>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};
const mapStateToProps = (state) => {
  return {
    zvitu: state.zvitu.zvitu,
    operations: state.operations.operations,
    filteredZvitu: state.zvitu.filtered,
    zvituRozxid: state.zvituRozxid.zvituRozxid,
    filteredZvituRozxid: state.zvituRozxid.filtered,
    zvituZalushok: state.zvituZalushok.zvituZalushok,
    filteredZvituZalushok: state.zvituZalushok.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getZvitu: () => dispatch(getZvituAction()),
    getOperations: () => dispatch(getOperationsAction()),
    filterZvitu: (data) => dispatch(filterZvituAction(data)),
    deleteZvitu: (id) => dispatch(deleteZvituAction(id)),
    getZvituRozxid: () => dispatch(getZvituRozxidAction()),
    filterZvituRozxid: (data) => dispatch(filterZvituRozxidAction(data)),
    deleteZvituRozxid: (id) => dispatch(deleteZvituRozxidAction(id)),
    getZvituZalushok: (data) => dispatch(getZvituZalushokAction(data)),
    filterZvituZalushok: (data) => dispatch(filterZvituZalushokAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Zvitu);
