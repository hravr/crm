import React, { useEffect, useState } from "react";
import s from "./Sklad1.module.css";
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
const Sklad1 = ({
  getSklad1,
  sklad1,
  filterSklad1,
  filteredSklad1,
  deleteSklad1,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState({});
  const h = useHistory();

  useEffect(() => {
    (async () => {
      await getSklad1();
    })();
  }, []);
  return (
    <Tabs>
      <div className={s.main}>
        <div className={s.title__container}>
          <span className={s.title}>Склад 1</span>
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
                  await filterSklad1(dataForFilter);
                }}
              />
            </div>
          </div>
          <div className={s.table}>
            <table id="table-to-xls">
              <tr>
                <th className={s.status__table}>ID Мішка</th>
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
              {!filteredSklad1.length
                ? sklad1 &&
                  sklad1.map((sklad) => {
                    return (
                      <tr key={sklad1._id}>
                        <td>{sklad.mishok._id || "error==="}</td>
                        <td>{sklad.createdAt || "error==="}</td>
                        <td>{sklad?.masterId?._id || "error==="}</td>
                        <td>{sklad?.vyazalId?._id || "error==="}</td>
                        <td>{sklad?.machineId || "error==="}</td>
                        <td>{sklad?.mishok?.articleId?.name || "error==="}</td>
                        <td>{sklad?.mishok?.classId?.name || "error==="}</td>
                        <td>{sklad?.mishok?.sizeId?.name || "error==="}</td>
                        <td>{sklad?.mishok?.imageId?.name || "error==="}</td>
                        <td>{sklad?.mishok?.colorId?.name || "error==="}</td>
                        <td>
                          {sklad?.mishok?.asortumentId?.name || "error==="}
                        </td>
                        <td>{sklad?.mishok?.typeId?.name || "error==="}</td>
                        <td>{sklad.mishok.gatynok1 || "error==="}</td>
                        <td>{sklad.mishok.gatynok2 || "error==="}</td>
                        <td>{sklad.mishok.gatynok3 || "error==="}</td>
                        <td>
                          {sklad.mishok.gatynok1 +
                            sklad.mishok.gatynok2 +
                            sklad.mishok.gatynok3 || "error==="}
                        </td>
                        <td>{sklad?.changesId?.firstName || "error==="}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              className={s.del}
                              onClick={() => h.push("/edit")}
                            >
                              Редагувати
                            </button>
                            <button onClick={() => deleteSklad1(sklad._id)}>
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : filteredSklad1.length &&
                  filteredSklad1.map((filtered) => {
                    return (
                      <tr key={filtered._id}>
                        <td>{filtered.mishok._id || "errorF==="}</td>
                        <td>{filtered.createdAt || "error==="}</td>
                        <td>{filtered.masterId._id || "error==="}</td>
                        <td>{filtered.vyazalId._id || "error==="}</td>
                        <td>{filtered.machineId || "error==="}</td>
                        <td>
                          {filtered?.mishok?.articleId?.name || "error==="}
                        </td>
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
                            <button onClick={() => deleteSklad1(filtered._id)}>
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
            <div className={s.search__container}>
              <Input label="Період з:" type="date" />
            </div>
            <div className={s.search__container}>
              <Input label="до:" type="date" />
            </div>
            <div className={s.create__worker}>
              <Button title="Пошук" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.status__table}>Назва</th>
                <th className={s.status__table}>Дата</th>
                <th className={s.status__table}>ID швеї</th>
                <th className={s.status__table}>ID сортувальниці</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Alfreds Futterkiste</td>
                <td>Alfreds Futterkiste</td>
                <td>
                  Germany
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Berglunds snabbkop</td>
                <td>Berglunds snabbkop</td>
                <td>Berglunds snabbkop</td>
                <td>
                  Sweden
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Island Trading</td>
                <td>Island Trading</td>
                <td>Island Trading</td>
                <td>
                  UK
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input label="На дату" type="date" />
            </div>
            <div className={s.create__worker}>
              <Button title="Пошук" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.status__table}>ID Мішка</th>
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
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Alfreds Futterkiste</td>
                <td>Alfreds Futterkiste</td>
                <td>
                  Germany
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Berglunds snabbkop</td>
                <td>Berglunds snabbkop</td>
                <td>Berglunds snabbkop</td>
                <td>
                  Sweden
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Island Trading</td>
                <td>Island Trading</td>
                <td>Island Trading</td>
                <td>
                  UK
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};
const mapStateToProps = (state) => {
  return {
    sklad1: state.sklad1.sklad1,
    filteredSklad1: state.sklad1.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSklad1: (searchValue) => dispatch(getSklad1Action(searchValue)),
    filterSklad1: (data) => dispatch(filterSklad1Action(data)),
    deleteSklad1: (id) => dispatch(deleteSklad1Action(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sklad1);

// export default Sklad1;
