import classes from "./Diet.module.css";
import Card from "../layout/Card";
import Title from "../layout/Title";

const Diet = ({
  diet,
}: {
  diet:{[key:string]:string};
}) => {
  const type = ["breakfast", "lunch", "dinner", "snacks"];
  const showDiet = [];
  for (let t = 0; t < 4; t++) {
    let selectedType = type[t];
    showDiet.push(
      <div className={classes.diet} key={type[t]}>
        <span className={classes.type}>{selectedType}</span>
        <p>{diet[selectedType]}</p>
      </div>
    );
  }
  return (
    <>
      <Title>Diet Plan</Title>
      <Card>{showDiet}</Card>
    </>
  );
};

export default Diet;
