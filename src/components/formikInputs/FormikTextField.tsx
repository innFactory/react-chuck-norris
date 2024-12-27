import { TextField, TextFieldProps } from "@mui/material";
import { useFormikContext } from "formik";

export const FormikTextField = ({
  name,
  ...props
}: TextFieldProps): JSX.Element => {
  const { handleChange, handleBlur, errors, touched, values } =
    // eslint-disable-next-line
    useFormikContext<any>(); // any is required here to access properties via character identifier

  if (!name) {
    throw Error("Name must be the formik attribute name.");
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
    handleChange(e);
  };

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.onBlur?.(e);
    handleBlur(e);
  };

  return (
    <TextField
      {...props}
      name={name}
      id={name}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      error={touched[name] && Boolean(errors[name])}
      value={values[name]}
      helperText={errors[name] && touched[name] ? errors[name] + "" : undefined}
    />
  );
};
