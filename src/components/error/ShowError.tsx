import classes from './ShowError.module.css'

const ShowError = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) => {
  return (
    <div className={classes.error}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default ShowError;
