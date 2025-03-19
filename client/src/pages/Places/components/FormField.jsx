const InputHeader = ({ title, description }) => {
  return (
    <div className="mb-3">
      <h3 className="text-gray-900 font-medium first-letter:uppercase mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 text-sm">{description}</p>
      )}
    </div>
  );
};

const InputField = ({ type = "text", isTextarea = false, ...rest }) => {
  const baseClassName = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";
  
  if (isTextarea) {
    return (
      <textarea 
        id={rest.name}
        rows={4}
        className={`${baseClassName} resize-none`}
        {...rest}
      />
    );
  }
  
  return (
    <input 
      type={type}
      id={rest.name}
      className={baseClassName}
      {...rest}
    />
  );
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
    <Wrapper htmlFor={name} className="block">
      <InputHeader title={title || name} description={description} />
      {children || (
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