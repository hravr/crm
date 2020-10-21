import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Praja.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { connect } from "react-redux";
import { getPrajaSurovunaAction } from "../../store/actions/Praja/surovunaActions";
import { getPrajaTypeAction } from "../../store/actions/Praja/typeActions";
import { getPrajaTovtshinaAction } from "../../store/actions/Praja/tovtshinaActions";
import { getPrajaVendorAction } from "../../store/actions/Praja/vendorActions";
import { getPrajaRozhidAction } from "../../store/actions/Praja/rozhidActions";
import { getPrajaColorAction } from "../../store/actions/Praja/colorActions";

const Praja = ({
  fetchPrajaSurovuna,
  prajaSurovuna,
  fetchPrajaType,
  prajaType,
  prajaTovtshina,
  fetchPrajaTovtshina,
  fetchPrajaVendor,
  prajaVendor,
  fetchPrajaRozhid,
  prajaRozhid,
  fetchPrajaColor,
  prajaColor,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchPrajaSurovuna();
      await fetchPrajaType();
      await fetchPrajaTovtshina();
      await fetchPrajaVendor();
      await fetchPrajaRozhid();
      await fetchPrajaColor();
    })();
  }, []);

  return (
    <Tabs>
      <div className={s.main}>
        <TabList className={s.tabs}>
          {[
            "Назва сировини",
            "Тип пряжі",
            "Товщина пряжі",
            "Постачальники",
            "Ділянки розходу",
            "Католожні кольори",
          ].map((item, i) => (
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
          <div className={s.title__container}>
            <span className={s.title}>Назва сировини</span>
            <hr></hr>
          </div>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук працівника"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                // onClick={async () => {
                //   await filterProdArticle(dataForFilter);
                // }}
              />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.name__table}>ID</th>
                <th className={s.name__table}></th>
              </tr>
              {prajaSurovuna &&
                prajaSurovuna.map((prajaSurovuna) => {
                  return (
                    <tr>
                      <td>{prajaSurovuna.name || "err"}</td>
                      <td>{prajaSurovuna._id || "err"}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button className={s.del}>Редагувати</button>
                          <button>Видалити</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.title__container}>
            <span className={s.title}>Тип</span>
            <hr></hr>
          </div>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук працівника"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                // onClick={async () => {
                //   await filterProdArticle(dataForFilter);
                // }}
              />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.name__table}>ID</th>
                <th className={s.name__table}></th>
              </tr>
              {prajaType &&
                prajaType.map((prajaType) => {
                  return (
                    <tr>
                      <td>{prajaType.name || "err"}</td>
                      <td>{prajaType._id || "err"}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button className={s.del}>Редагувати</button>
                          <button>Видалити</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.title__container}>
            <span className={s.title}>Товщина пряжі</span>
            <hr></hr>
          </div>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук працівника"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                // onClick={async () => {
                //   await filterProdArticle(dataForFilter);
                // }}
              />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.name__table}>ID</th>
                <th className={s.name__table}></th>
              </tr>
              {prajaTovtshina &&
                prajaTovtshina.map((prajaTovtshina) => {
                  return (
                    <tr>
                      <td>{prajaTovtshina.name || "err"}</td>
                      <td>{prajaTovtshina._id || "err"}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button className={s.del}>Редагувати</button>
                          <button>Видалити</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.title__container}>
            <span className={s.title}>Постачальники</span>
            <hr></hr>
          </div>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук працівника"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                // onClick={async () => {
                //   await filterProdArticle(dataForFilter);
                // }}
              />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.name__table}>ID</th>
                <th className={s.name__table}></th>
              </tr>
              {prajaVendor &&
                prajaVendor.map((prajaVendor) => {
                  return (
                    <tr>
                      <td>{prajaVendor.name || "err"}</td>
                      <td>{prajaVendor._id || "err"}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button className={s.del}>Редагувати</button>
                          <button>Видалити</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.title__container}>
            <span className={s.title}>Розхід</span>
            <hr></hr>
          </div>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук працівника"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                // onClick={async () => {
                //   await filterProdArticle(dataForFilter);
                // }}
              />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.name__table}>ID</th>
                <th className={s.name__table}></th>
              </tr>
              {prajaRozhid &&
                prajaRozhid.map((prajaRozhid) => {
                  return (
                    <tr>
                      <td>{prajaRozhid.name || "err"}</td>
                      <td>{prajaRozhid._id || "err"}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button className={s.del}>Редагувати</button>
                          <button>Видалити</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.title__container}>
            <span className={s.title}>Колір</span>
            <hr></hr>
          </div>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук працівника"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                // onClick={async () => {
                //   await filterProdArticle(dataForFilter);
                // }}
              />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.name__table}>ID</th>
                <th className={s.name__table}></th>
              </tr>
              {prajaColor &&
                prajaColor.map((prajaColor) => {
                  return (
                    <tr>
                      <td>{prajaColor.name || "err"}</td>
                      <td>{prajaColor._id || "err"}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button className={s.del}>Редагувати</button>
                          <button>Видалити</button>
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
    prajaSurovuna: state.prajaSurovuna.prajaSurovuna,
    prajaType: state.prajaType.prajaType,
    prajaTovtshina: state.prajaTovtshina.prajaTovtshina,
    prajaVendor: state.prajaVendor.prajaVendor,
    prajaRozhid: state.prajaRozhid.prajaRozhid,
    prajaColor: state.prajaColor.prajaColor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrajaSurovuna: (search) => dispatch(getPrajaSurovunaAction(search)),
    fetchPrajaType: (search) => dispatch(getPrajaTypeAction(search)),
    fetchPrajaTovtshina: (search) => dispatch(getPrajaTovtshinaAction(search)),
    fetchPrajaVendor: (search) => dispatch(getPrajaVendorAction(search)),
    fetchPrajaRozhid: (search) => dispatch(getPrajaRozhidAction(search)),
    fetchPrajaColor: (search) => dispatch(getPrajaColorAction(search)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Praja);
