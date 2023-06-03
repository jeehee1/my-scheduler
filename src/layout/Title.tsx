import classes from './Title.module.css'

const Title = ({children}:{children:any}) => {
  return <h1 className={classes.title}>{children}</h1>;
};

export default Title;
