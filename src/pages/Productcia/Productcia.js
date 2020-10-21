import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Input from "../../misc/Input/Input";
import s from "./Productcia.module.css";
import Button from "../../misc/Button/Button";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import {
  deleteProdArticleAction,
  filterProdArticleAction,
  getProdArticleAction,
} from "../../store/actions/prodTypeArticleActions";
import { connect } from "react-redux";
import { getProdAsortumentAction } from "../../store/actions/prodTypeAsortActions";
import { getProdClassAction } from "../../store/actions/prodTypeClassActions";
import { getProdColorAction } from "../../store/actions/prodTypeColorActions";
import { getProdImageAction } from "../../store/actions/prodTypeImageActions";
import { getProdSizeAction } from "../../store/actions/prodTypeSizeActions";
import { getProdSezonAction } from "../../store/actions/prodTypeSezonActions";
import { getProdTypeAction } from "../../store/actions/prodTypeTypeActions";

const Productcia = ({
  fetchProdArticle,
  filteredProdArticle,
  prodArticle,
  filterProdArticle,
  fetchProdAsortument,
  prodAsortument,
  fetchProdClass,
  prodClass,
  fetchProdColor,
  prodColor,
  fetchProdImage,
  prodImage,
  fetchProdSezon,
  prodSezon,
  fetchProdSize,
  prodSize,
  fetchProdType,
  prodType,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState([]);
  const h = useHistory();

  useEffect(() => {
    (async () => {
      await fetchProdArticle();
      await fetchProdAsortument();
      await fetchProdClass();
      await fetchProdColor();
      await fetchProdSezon();
      await fetchProdSize();
      await fetchProdType();
      await fetchProdImage();
    })();
  }, []);
  return (
    <Tabs>
      <div className={s.main}>
        <TabList className={s.tabs}>
          {[
            "Артикуль",
            "Асортимент",
            "Клас",
            "Колір",
            "Малюнок",
            "Сезон",
            "Розмір",
            "Тип",
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
            <span className={s.title}>Артикуль</span>
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
                onClick={async () => {
                  await filterProdArticle(dataForFilter);
                }}
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
              {!filteredProdArticle.length
                ? prodArticle &&
                  prodArticle.map((prodArt) => {
                    return (
                      <tr>
                        <td>{prodArt.name}</td>
                        <td>{prodArt._id}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
                            <button>Видалити</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : filteredProdArticle.length &&
                  filteredProdArticle.map((filtered) => {
                    return (
                      <tr>
                        <td>{filtered.name}</td>
                        <td>{filtered._id}</td>
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
            <span className={s.title}>Асортимент</span>
            <hr></hr>
          </div>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
              <Button
                title="Пошук"
                onClick={async () => {
                  await filterProdArticle(dataForFilter);
                }}
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
              {prodAsortument &&
                prodAsortument.map((prodAsortument) => {
                  return (
                    <tr>
                      <td>{prodAsortument.name || "err"}</td>
                      <td>{prodAsortument._id || "err"}</td>
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
            <span className={s.title}>Клас</span>
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
                onClick={async () => {
                  await filterProdArticle(dataForFilter);
                }}
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
              {prodClass &&
                prodClass.map((prodClass) => {
                  return (
                    <tr>
                      <td>{prodClass.name || "err"}</td>
                      <td>{prodClass._id || "err"}</td>

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
                onClick={async () => {
                  await filterProdArticle(dataForFilter);
                }}
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
              {prodColor &&
                prodColor.map((prodColor) => {
                  return (
                    <tr>
                      <td>{prodColor.name || "err"}</td>
                      <td>{prodColor._id || "err"}</td>
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
            <span className={s.title}>Малюнок</span>
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
                onClick={async () => {
                  await filterProdArticle(dataForFilter);
                }}
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
              {prodImage &&
                prodImage.map((prodImage) => {
                  return (
                    <tr>
                      <td>{prodImage.name || "err"}</td>
                      <td>{prodImage._id || "err"}</td>
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
            <span className={s.title}>Сезон</span>
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
                onClick={async () => {
                  await filterProdArticle(dataForFilter);
                }}
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
              {prodSezon &&
                prodSezon.map((prodSezon) => {
                  return (
                    <tr>
                      <td>{prodSezon.name || "err"}</td>
                      <td>{prodSezon._id || "err"}</td>
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
            <span className={s.title}>Розмір</span>
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
                onClick={async () => {
                  await filterProdArticle(dataForFilter);
                }}
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
              {prodSize &&
                prodSize.map((prodSize) => {
                  return (
                    <tr>
                      <td>{prodSize.name || "err"}</td>
                      <td>{prodSize._id || "err"}</td>
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
                onClick={async () => {
                  await filterProdArticle(dataForFilter);
                }}
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
              {prodType &&
                prodType.map((prodType) => {
                  return (
                    <tr>
                      <td>{prodType.name || "err"}</td>
                      <td>{prodType._id || "err"}</td>
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
    prodArticle: state.prod.prodArticle,
    prodAsortument: state.prodAsortument.prodAsortument,
    prodClass: state.prodClass.prodClass,
    prodImage: state.prodImage.prodImage,
    prodColor: state.prodColor.prodColor,
    prodSize: state.prodSize.prodSize,
    prodSezon: state.prodSezon.prodSezon,
    prodType: state.prodType.prodType,
    filteredProdArticle: state.prod.filtered,
    filteredPprodAsortument: state.prodAsortument.filtered,
    filteredProdClass: state.prod.filtered,
    filteredProdImage: state.prod.filtered,
    filteredProdColor: state.prod.filtered,
    filteredProdSize: state.prod.filtered,
    filteredProdSezon: state.prod.filtered,
    filteredProdType: state.prod.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdArticle: (search) => dispatch(getProdArticleAction(search)),
    fetchProdAsortument: (search) => dispatch(getProdAsortumentAction(search)),
    fetchProdClass: (search) => dispatch(getProdClassAction(search)),
    fetchProdColor: (search) => dispatch(getProdColorAction(search)),
    fetchProdImage: (search) => dispatch(getProdImageAction(search)),
    fetchProdSize: (search) => dispatch(getProdSizeAction(search)),
    fetchProdSezon: (search) => dispatch(getProdSezonAction(search)),
    fetchProdType: (search) => dispatch(getProdTypeAction(search)),
    filterProdArticle: (data) => dispatch(filterProdArticleAction(data)),
    deleteProdArticle: (id) => dispatch(deleteProdArticleAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Productcia);
