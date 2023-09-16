const ShowError = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default ShowError;
