import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { withFormik } from "formik";
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

const Productcia = ({
  handleChange,
  handleSubmit,
  values,
  fetchProdArticle,
  filteredProdArticle,
  prodArticle,
  filterProdArticle,
  deleteProdArticle,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState([]);

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
            <div className={s.filter__container}>
              <div className={s.search__container}>
                <Input
                  label="Створити"
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                />
                <Button title="Створити" onClick={handleSubmit} />
              </div>
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.name__table}></th>
              </tr>
              {!filteredProdArticle.length
                ? prodArticle &&
                  prodArticle.map((prodArt) => {
                    return (
                      <tr>
                        <td>{prodArt?.name}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
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
                        <td>{filtered.name}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
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

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    name: "",
  }),
  handleSubmit: async (values, { props: { createProdArticle }, resetForm }) => {
    const isSuccess = await createProdArticle(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(Productcia);

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
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
