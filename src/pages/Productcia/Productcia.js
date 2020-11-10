import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Input from "../../misc/Input/Input";
import s from "./Productcia.module.css";
import Button from "../../misc/Button/Button";
import classnames from "classnames";
import {
  createProdArticleAction,
  deleteProdArticleAction,
  filterProdArticleAction,
  getProdArticleAction,
} from "../../store/actions/prodTypeArticleActions";
import { connect } from "react-redux";
import ProdAsort from "../../misc/Prod/ProdAsort";
import ProdClass from "../../misc/Prod/ProdClass";
import ProdColor from "../../misc/Prod/ProdColor";
import ProdImg from "../../misc/Prod/ProdImg";
import ProdSezon from "../../misc/Prod/ProdSezon";
import ProdSize from "../../misc/Prod/ProdSize";
import ProdType from "../../misc/Prod/ProdType";
import { Link, useHistory } from "react-router-dom";

const Productcia = ({
  fetchProdArticle,
  filteredProdArticle,
  filterProdArticle,
  deleteProdArticle,
  prodArticle,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await fetchProdArticle();
    })();
  }, []);

  return (
    <Tabs>
      <div className={s.main}>
        <TabList className={s.tabs}>
          {[
            "Артикул",
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
          <div className={s.top__container}></div>
          <div className={s.title__container}>
            <span className={s.title}>Артикул</span>
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
            <div className={s.filter__container}>
              <Link to="/create-prod-article">
                <Button title="Створити" />
              </Link>
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.status__table}>Назва</th>
                <th className={s.status__table}>Асортимент</th>
                <th className={s.status__table}>Клас</th>
                <th className={s.status__table}>Колір</th>
                <th className={s.status__table}>Малюнок</th>
                <th className={s.status__table}>Сезон</th>
                <th className={s.status__table}>Розмір</th>
                <th className={s.status__table}>Тип</th>
                <th className={s.status__table}></th>
              </tr>
              {!filteredProdArticle.length
                ? prodArticle &&
                  prodArticle.map((prodArt) => {
                    return (
                      <tr>
                        <td>{prodArt?.name}</td>
                        <td>{prodArt?.asortumentId?.name}</td>
                        <td>{prodArt?.classId?.name}</td>
                        <td>{prodArt?.colorId?.name}</td>
                        <td>{prodArt?.imageId?.name}</td>
                        <td>{prodArt?.seasonId?.name}</td>
                        <td>{prodArt?.sizeId?.name}</td>
                        <td>{prodArt?.typeId?.name}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              onClick={() =>
                                history.push(
                                  `/edit-prod-article/${prodArt._id}`
                                )
                              }
                            >
                              Редагувати
                            </button>
                            <button
                              onClick={() => deleteProdArticle(prodArt._id)}
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : filteredProdArticle.length &&
                  filteredProdArticle.map((filtered) => {
                    return (
                      <tr>
                        <td>{filtered?.name}</td>
                        <td>{filtered?.asortumentId?.name}</td>
                        <td>{filtered?.classId?.name}</td>
                        <td>{filtered?.colorId?.name}</td>
                        <td>{filtered?.imageId?.name}</td>
                        <td>{filtered?.seasonId?.name}</td>
                        <td>{filtered?.sizeId?.name}</td>
                        <td>{filtered?.typeId?.name}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              onClick={() =>
                                history.push(
                                  `/edit-prod-article/${filtered._id}`
                                )
                              }
                            >
                              Редагувати
                            </button>
                            <button
                              onClick={() => deleteProdArticle(filtered._id)}
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
          <ProdAsort />
        </TabPanel>
        <TabPanel>
          <ProdClass />
        </TabPanel>
        <TabPanel>
          <ProdColor />
        </TabPanel>
        <TabPanel>
          <ProdImg />
        </TabPanel>
        <TabPanel>
          <ProdSezon />
        </TabPanel>
        <TabPanel>
          <ProdSize />
        </TabPanel>
        <TabPanel>
          <ProdType />
        </TabPanel>
      </div>
    </Tabs>
  );
};

const mapStateToProps = (state) => {
  return {
    prodArticle: state.prod.prodArticle,
    filteredProdArticle: state.prod.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdArticle: (search) => dispatch(getProdArticleAction(search)),
    filterProdArticle: (data) => dispatch(filterProdArticleAction(data)),
    createProdArticle: (data) => dispatch(createProdArticleAction(data)),
    deleteProdArticle: (id) => dispatch(deleteProdArticleAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Productcia);
