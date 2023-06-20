import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";
import { LoadingButton } from "../../app/components/LoadingButton";
import { FormikTextField } from "../../app/components/formikInputs/FormikTextField";
import { ValidationMessages } from "../../app/components/formikInputs/ValidationMessages";

interface SignupFormProps {
  onSubmit: (data: SignupFormData, callback: () => void) => void;
}

export interface SignupFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const SignupForm: React.FC<SignupFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues: SignupFormData = {
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema: yup.ObjectSchema<SignupFormData> = yup.object({
    email: yup
      .string()
      .email(ValidationMessages.NOT_A_EMAIL)
      .required(ValidationMessages.REQUIRED),
    password: yup
      .string()
      .matches(
        RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$"),
        ValidationMessages.NOT_A_VALID_PASSWORD
      )
      .required(ValidationMessages.REQUIRED),
    passwordConfirmation: yup
      .string()
      .oneOf(
        [yup.ref("password"), undefined],
        ValidationMessages.NOT_MATCHING_PASSWORD
      )
      .required(ValidationMessages.REQUIRED),
  });

  const onSubmit = async (data: SignupFormData, resetForm: () => void) => {
    setLoading(true);
    props.onSubmit(data, () => {
      setLoading(false);
    });
  };

  return (
    <Formik<SignupFormData>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(e, { resetForm }) => {
        onSubmit(e, resetForm);
      }}
    >
      {({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "400px",
              }}
            >
              <FormikTextField
                name="email"
                type="email"
                label="Enter your email"
              />
              <FormikTextField
                name="password"
                type="password"
                label="Enter your password"
                sx={{
                  marginTop: 2,
                }}
              />
              <FormikTextField
                name="passwordConfirmation"
                type="password"
                label="Confirm your password"
                sx={{
                  marginTop: 2,
                }}
              />
              <LoadingButton
                variant="contained"
                type="submit"
                endIcon={<PersonAddIcon />}
                loading={loading}
                sx={{
                  marginTop: 2,
                  marginBottom: 1,
                }}
              >
                Create account
              </LoadingButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
