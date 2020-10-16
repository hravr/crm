import React from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Edit.module.css";

const Edit = (props) => {
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Редагування</span>
        <hr></hr>
      </div>
      <div className={s.edit__container}>
        <div className={s.left}>
          <Input label="ID Мішка" />
          <Input label="Дата" type="date" />
          <Input label="Майстер" />
          <Input label="Вязальниця" />
          <Input label="Обладнання" />
          <Input label="Артикул" />
          <Input label="Клас" />
          <Input label="Розмір" />
          <Input label="Маюнок" />
        </div>
        <div className={s.right}>
          <Input label="Колір" />
          <Input label="Асортимент" />
          <Input label="Тип" />
          <Input label="Гатунок 1" />
          <Input label="Гатунок 2" />
          <Input label="Гатунок 3" />
          <Input label="Гатунок разом" />
          <Input label="ID юзера" />
        </div>
      </div>
      <div className={s.btn__container}>
        <Button title="Змінити" />
      </div>
    </div>
  );
};
// const formikHOC = withFormik({
//   mapPropsToValues: () => ({
//     title: "",
//     desc: "",
//     gallery: "",
//     galleryFile: {},
//     _id: "",
//   }),
//   handleSubmit: async (values, { props: { editNews, showAlert } }) => {
//     const { title, desc, gallery, galleryFile, _id } = values;
//     const imageFormData = new FormData();

//     imageFormData.append("gallery", galleryFile);

//     const isNewsCreated = await editNews({ title, desc }, _id, imageFormData);

//     if (isNewsCreated) {
//       showAlert("Новину створено успішно!", "success");
//     } else {
//       showAlert("Сталась помилка!", "error");
//     }
//   },
// })(Edit);

// const mapStateToProps = (state) => {
//   return {
//     singleNews: state.news.single,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getSklad1: (id) => dispatch(getSklad1Action(searchValue)),
//     getSingleNews: (id) => dispatch(getSingleNewsAction(id)),
//     editNews: (news, id, image) => dispatch(editNewsAction(news, id, image)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);

export default Edit;
