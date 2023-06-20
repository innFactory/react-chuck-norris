import LockResetIcon from "@mui/icons-material/LockReset";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";
import { LoadingButton } from "../../app/components/LoadingButton";
import { FormikTextField } from "../../app/components/formikInputs/FormikTextField";
import { ValidationMessages } from "../../app/components/formikInputs/ValidationMessages";

interface PasswordResetFormProps {
  onSubmit: (data: PasswordResetFormData, callback: () => void) => void;
}

export interface PasswordResetFormData {
  email: string;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validationSchema: yup.ObjectSchema<PasswordResetFormData> = yup.object({
    email: yup
      .string()
      .email(ValidationMessages.NOT_A_EMAIL)
      .required(ValidationMessages.REQUIRED),
  });
  const initialValues: PasswordResetFormData = {
    email: router.query.email as string,
  };

  const onSubmit = async (
    data: PasswordResetFormData,
    resetForm: () => void
  ) => {
    setLoading(true);

    props.onSubmit(data, () => {
      setLoading(false);
    });
  };

  return (
    <Formik<PasswordResetFormData>
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  marginTop: 0.5,
                }}
              >
                <Link href="/">{"Back to login"}</Link>
              </Box>
              <LoadingButton
                variant="contained"
                type="submit"
                endIcon={<LockResetIcon />}
                loading={loading}
                sx={{
                  marginTop: 2,
                  marginBottom: 1,
                }}
              >
                Reset
              </LoadingButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
