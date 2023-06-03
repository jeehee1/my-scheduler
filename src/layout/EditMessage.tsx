import classes from "./EditMessage.module.css";

const EditMessage = () => {
  return (
    <div style={{ position: "relative", height: '7rem' }}>
      <p className={classes["edit-btn"]}>▼수정할 항목을 클릭해주세요!</p>
    </div>
  );
};

export default EditMessage;
