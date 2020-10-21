import React, { useEffect, useState } from "react";
import s from "./Zvitu.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import {
  deleteSklad1Action,
  filterSklad1Action,
  getSklad1Action,
} from "../../store/actions/skladActions.js";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactToExcel from "react-html-table-to-excel";
import Barcode from "react-barcode";
import {
  deleteZvituAction,
  filterZvituAction,
  getZvituAction,
} from "../../store/actions/Zvitu/zvituActions";
import {
  deleteZvituRoxidAction,
  filterZvituRoxidAction,
  getZvituRozxidAction,
} from "../../store/actions/Zvitu/zvituRozhid";

const Zvitu = ({
  getZvitu,
  filterZvitu,
  deleteZvitu,
  filteredZvitu,
  getZvituRozxid,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState([]);
  const h = useHistory();

  useEffect(() => {
    (async () => {
      await getZvitu();
      await getZvituRozxid();
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
          {["Прихід", "Розхід"].map((item, i) => (
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
            <div className={s.barcode}>
              <Barcode value="hey" />,
            </div>
            <div className={s.search__container}>
              <Input
                label="Пошук продукту"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
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
                  filename="Sklad-1"
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
                <th className={s.name__table}>ID Мішка</th>
                <th className={s.status__table}>Дата</th>
                <th className={s.status__table}>Майстер </th>
                <th className={s.status__table}>Вязальниця</th>
                <th className={s.status__table}>Обладнання</th>
                <th className={s.status__table}>Артикул</th>
                <th className={s.status__table}>Клас</th>
                <th className={s.status__table}>Розмір</th>
                <th className={s.status__table}>Маюнок</th>
                <th className={s.status__table}>Колір</th>
                <th className={s.status__table}>Асортимент</th>
                <th className={s.status__table}>Тип</th>
                <th className={s.status__table}>Гатунок 1</th>
                <th className={s.status__table}>Гатунок 2 </th>
                <th className={s.status__table}>Гатунок 3</th>
                <th className={s.status__table}>Гатунок разом</th>
                <th className={s.status__table}> ID юзера</th>
                <th className={s.status__table}> Операції</th>
              </tr>
              {filteredZvitu.length &&
                filteredZvitu.map((filtered) => {
                  return (
                    <tr key={filtered._id}>
                      <td>{filtered.mishok._id || "errorF==="}</td>
                      <td>{filtered.createdAt || "error==="}</td>
                      <td>{filtered.masterId._id || "error==="}</td>
                      <td>{filtered.vyazalId._id || "error==="}</td>
                      <td>{filtered.machineId || "error==="}</td>
                      <td>{filtered?.mishok?.articleId?.name || "error==="}</td>
                      <td>{filtered?.mishok?.classId?.name || "error==="}</td>
                      <td>{filtered?.mishok?.sizeId?.name || "error==="}</td>
                      <td>{filtered?.mishok?.imageId?.name || "error==="}</td>
                      <td>{filtered?.mishok?.colorId?.name || "error==="}</td>
                      <td>
                        {filtered?.mishok?.asortumentId?.name || "error==="}
                      </td>
                      <td>{filtered?.mishok?.typeId?.name || "error==="}</td>
                      <td>{filtered.mishok.gatynok1 || "error==="}</td>
                      <td>{filtered.mishok.gatynok2 || "error==="}</td>
                      <td>{filtered.mishok.gatynok3 || "error==="}</td>
                      <td>
                        {filtered.mishok.gatynok1 +
                          filtered.mishok.gatynok2 +
                          filtered.mishok.gatynok3 || "error==="}
                      </td>
                      <td>{filtered?.changesId?.firstName || "error==="}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button
                            className={s.del}
                            onClick={() => h.push("/edit")}
                          >
                            Редагувати
                          </button>
                          <button onClick={() => deleteZvitu(filtered._id)}>
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
    filteredZvitu: state.zvitu.filtered,
    zvituRozxid: state.zvituRozxid.zvituRozxid,
    filteredZvituRozxid: state.zvituRozxid.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getZvitu: () => dispatch(getZvituAction()),
    filterZvitu: (data) => dispatch(filterZvituAction(data)),
    deleteZvitu: (id) => dispatch(deleteZvituAction(id)),
    getZvituRozxid: () => dispatch(getZvituRozxidAction()),
    filterZvituRozxid: (data) => dispatch(filterZvituRoxidAction(data)),
    deleteZvituRozxid: (id) => dispatch(deleteZvituRoxidAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Zvitu);
