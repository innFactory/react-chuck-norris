import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import { LoadingButton } from "../../app/components/LoadingButton";
import { FormikTextField } from "../../app/components/formikInputs/FormikTextField";
import { ValidationMessages } from "../../app/components/formikInputs/ValidationMessages";

interface LoginFormProps {
  onSubmit: (data: LoginFormData, callback: () => void) => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");

  const validationSchema: yup.ObjectSchema<LoginFormData> = yup.object({
    email: yup
      .string()
      .email(ValidationMessages.NOT_A_EMAIL)
      .required(ValidationMessages.REQUIRED),
    password: yup.string().required(ValidationMessages.REQUIRED),
  });
  const initialValues: LoginFormData = {
    email: "",
    password: "",
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailForReset(value);
  };

  const onSubmit = (data: LoginFormData, resetForm: () => void) => {
    setLoading(true);

    setEmailForReset(data.email);

    props.onSubmit(data, () => {
      setLoading(false);
    });
  };

  return (
    <Formik<LoginFormData>
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
                onChange={handleEmailChange}
              />
              <FormikTextField
                name="password"
                type="password"
                label="Enter your password"
                sx={{
                  marginTop: 2,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  marginTop: 0.5,
                }}
              >
                <Link
                  href={{
                    pathname: "/password-reset",
                    query: emailForReset ? { email: emailForReset } : {},
                  }}
                >
                  {"Reset Password"}
                </Link>
              </Box>
              <LoadingButton
                variant="contained"
                type="submit"
                endIcon={<ArrowForwardIcon />}
                loading={loading}
                sx={{
                  marginTop: 2,
                  marginBottom: 1,
                }}
              >
                Login
              </LoadingButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
