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
} from "../../store/actions/sklad1Actions.js";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactToExcel from "react-html-table-to-excel";
import Modal from "../../misc/Modal/Modal";

const Sklad1 = ({
  getSklad1,
  sklad1,
  filterSklad1,
  filteredSklad1,
  deleteSklad1,
  sklad1to2,
  getSklad1to2,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [skladToModal, setSklad] = useState();

  const h = useHistory();

  useEffect(() => {
    (async () => {
      await getSklad1();
      // await getSklad1to2();
    })();
  }, []);
  return (
    <Tabs>
      <Modal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        modalData={modalData}
        sklad1={skladToModal}
      />
      <div className={s.main}>
        <div className={s.title__container}>
          <span className={s.title}>Склад 1</span>
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
        </div>
        <hr></hr>
        <TabPanel>
          <div className={s.filter__container}>
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
                <div className={s.table__column}>
                  <th className={s.status__table}>Майстер</th>
                  <th className={s.status__table}>Вязальниця</th>
                </div>
                <th className={s.status__table}>Обладнання</th>
                <th className={s.status__table}>Артикул</th>
                <th className={s.status__table}>Клас</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Розмір</th>
                  <th className={s.status__table}>Маюнок</th>
                </div>
                <th className={s.status__table}>Колір</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Асортимент</th>
                  <th className={s.status__table}>Тип</th>
                </div>
                <th className={s.status__table}>Гатунок разом</th>
                <th className={s.status__table}>Гатунок 1/2/3</th>
                <th className={s.status__table}> ID юзера</th>
                <th></th>
              </tr>
              {!filteredSklad1.length
                ? sklad1 &&
                  sklad1.map((sklad) => {
                    return (
                      <tr key={sklad._id}>
                        <td
                          onClick={() => {
                            setIsVisible(!isVisible);
                            setModalData(sklad.mishok._id);
                            setSklad(sklad._id);
                            //todo here modal
                            console.log("work");
                          }}
                        >
                          {sklad.mishok._id || "Всі"}
                        </td>
                        <td>{sklad?.date_prixod?.slice(0, 10) || "Всі"}</td>
                        <div className={s.gatynok}>
                          <td>
                            {sklad?.masterId?.fName +
                              " " +
                              sklad?.masterId?.sName || "Всі"}
                          </td>
                          <hr />
                          <td>
                            {sklad?.vyazalId?.fName +
                              " " +
                              sklad?.vyazalId?.sName || "Всі"}
                          </td>
                        </div>
                        <td>{sklad?.machineId?.name || "Всі"}</td>
                        <td>{sklad?.mishok?.articleId?.name || "Всі"}</td>
                        <td>{sklad?.mishok?.classId?.name || "Всі"}</td>
                        <div className={s.gatynok}>
                          <td>{sklad?.mishok?.sizeId?.name || "Всі"}</td>
                          <hr />
                          <td>{sklad?.mishok?.imageId?.name || "Всі"}</td>
                        </div>
                        <td>{sklad?.mishok?.colorId?.name || "Всі"}</td>
                        <div className={s.gatynok}>
                          <td>{sklad?.mishok?.asortumentId?.name || "Всі"}</td>
                          <hr />
                          <td>{sklad?.mishok?.typeId?.name || "Всі"}</td>
                        </div>
                        <td>
                          {sklad.mishok.gatynok1 +
                            sklad.mishok.gatynok2 +
                            sklad.mishok.gatynok3 || "Всі"}
                        </td>
                        <div className={s.gatynok}>
                          <td>{sklad.mishok.gatynok1 || "Всі"}</td>
                          <td>{sklad.mishok.gatynok2 || "Всі"}</td>
                          <td>{sklad.mishok.gatynok3 || "Всі"}</td>
                        </div>
                        <td>{sklad?.changesId?.firstName || "Всі"}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              className={s.del}
                              onClick={() =>
                                h.push(`/edit-sklad1/${sklad._id}`)
                              }
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
                        <td>{filtered.mishok._id || "Всі"}</td>
                        <td>{filtered.createdAt.slice(0, 10) || "Всі"}</td>
                        <div className={s.gatynok}>
                          <td>
                            {filtered?.masterId?.fName +
                              " " +
                              filtered?.masterId?.sName || "Всі"}
                          </td>
                          <hr />
                          <td>
                            {filtered?.vyazalId?.fName +
                              " " +
                              filtered?.vyazalId?.sName || "Всі"}
                          </td>
                        </div>
                        <td>{filtered?.machineId || "Всі"}</td>
                        <td>{filtered?.mishok?.articleId?.name || "Всі"}</td>
                        <td>{filtered?.mishok?.classId?.name || "Всі"}</td>
                        <div className={s.gatynok}>
                          <td>{filtered?.mishok?.sizeId?.name || "Всі"}</td>
                          <hr />
                          <td>{filtered?.mishok?.imageId?.name || "Всі"}</td>
                        </div>
                        <td>{filtered?.mishok?.colorId?.name || "Всі"}</td>
                        <div className={s.gatynok}>
                          <td>
                            {filtered?.mishok?.asortumentId?.name || "Всі"}
                          </td>
                          <hr />
                          <td>{filtered?.mishok?.typeId?.name || "Всі"}</td>
                        </div>
                        <td>
                          {filtered.mishok.gatynok1 +
                            filtered.mishok.gatynok2 +
                            filtered.mishok.gatynok3 || "Всі"}
                        </td>
                        <div className={s.gatynok}>
                          <td>{filtered.mishok.gatynok1 || "Всі"}</td>
                          <td>{filtered.mishok.gatynok2 || "Всі"}</td>
                          <td>{filtered.mishok.gatynok3 || "Всі"}</td>
                        </div>
                        <td>{filtered?.changesId?.firstName || "Всі"}</td>
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
                <th className={s.status__table}>Майстер</th>
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
                <th className={s.status__table}>Гатунок 2</th>
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
    sklad1to2: state.sklad1.sklad1to2,
    filteredSklad1: state.sklad1.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSklad1: (searchValue) => dispatch(getSklad1Action(searchValue)),
    // getSklad1to2: () => dispatch(getSklad1to2Action()),
    filterSklad1: (data) => dispatch(filterSklad1Action(data)),
    deleteSklad1: (id) => dispatch(deleteSklad1Action(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sklad1);
