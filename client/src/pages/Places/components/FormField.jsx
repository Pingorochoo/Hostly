const InputHeader = ({ title, description }) => {
  return (
    <>
      <p className="text-2xl first-letter:uppercase">{title}</p>
      {description && (
        <span className="text-gray-500 text-sm">{description}</span>
      )}
    </>
  );
};
const InputField = ({ type = "text", isTextarea = false, ...rest }) => {
  if (isTextarea) {
    return <textarea id={rest.name} {...rest} />;
  }
  return <input type={type} id={rest.name} {...rest} />;
};
const FormField = ({
  title,
  description,
  name,
  placeholder,
  children,
  ...rest
}) => {
  const Wrapper = children ? "div" : "label";
  return (
    <Wrapper htmlFor={name}>
      <InputHeader title={title || name} description={description} />
      {children ? (
        children
      ) : (
        <InputField
          name={name}
          placeholder={placeholder || title || name}
          {...rest}
        />
      )}
    </Wrapper>
  );
};

export default FormField;
