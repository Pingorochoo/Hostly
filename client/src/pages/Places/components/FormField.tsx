import type { ChangeEventHandler, ComponentProps, ReactNode } from "react";

type InputHeaderProps = {
  title: string;
  description: string;
};

type InputFieldProps = {
  type?: ComponentProps<"input">["type"];
  isTextarea?: boolean;
  name: string;
  value?: string | number;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

type FormFieldProps = InputFieldProps & {
  title?: string;
  description: string;
  children?: ReactNode;
};

const InputHeader = ({ title, description }: InputHeaderProps) => {
  return (
    <div className="mb-3">
      <h3 className="text-gray-900 font-medium first-letter:uppercase mb-1">
        {title}
      </h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

const InputField = ({
  name,
  value,
  placeholder,
  type = "text",
  isTextarea = false,
  min,
  max,
  onChange,
}: InputFieldProps) => {
  const baseClassName =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  if (isTextarea) {
    return (
      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${baseClassName} resize-none`}
      />
    );
  }

  return (
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      min={min}
      max={max}
      onChange={onChange}
      className={baseClassName}
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
}: FormFieldProps) => {
  const label = title || name;

  if (children) {
    return (
      <div className="block">
        <InputHeader title={label} description={description} />
        {children}
      </div>
    );
  }

  return (
    <label htmlFor={name} className="block">
      <InputHeader title={label} description={description} />

      <InputField name={name} placeholder={placeholder || label} {...rest} />
    </label>
  );
};
export default FormField;
