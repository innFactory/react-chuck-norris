"use client";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {Box} from "@mui/material";
import {Form, Formik} from "formik";
import {useState} from "react";
import {z} from "zod";
import {FormikTextField} from "@/components/formikInputs/FormikTextField";
import {LoadingButton} from "@/components/default/LoadingButton";

interface SignupFormProps {
    onSubmit: (data: SignupFormData, callback: () => void) => void;
}

export interface SignupFormData {
    email: string;
    password: string;
    passwordConfirmation: string;
}

const signupSchema = z.object({
    email: z.string()
        .nonempty("This field is required")
        .email("Invalid email address"),
    password: z.string()
        .nonempty("This field is required")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 10 characters long"
        ),
    passwordConfirmation: z.string()
        .nonempty("This field is required"),
});


export const SignupForm: React.FC<SignupFormProps> = (props) => {
    const [loading, setLoading] = useState(false);

    const initialValues: SignupFormData = {
        email: "",
        password: "",
        passwordConfirmation: "",
    };

    const onSubmit = (data: SignupFormData) => {
        setLoading(true);
        props.onSubmit(data, () => {
            setLoading(false);
        });
    };

    const validate = (values: SignupFormData) => {
        const errors: Partial<SignupFormData> = {};

        try {
            signupSchema.parse(values);
        } catch (err) {
            if (err instanceof z.ZodError) {
                err.errors.forEach((error) => {
                    const field = error.path[0];
                    if (field && typeof field === "string") {
                        errors[field as keyof SignupFormData] = error.message;
                    }
                });
            }
        }

        if (values.password !== values.passwordConfirmation) {
            errors.passwordConfirmation = "Passwords do not match";
        }

        return errors;
    };

    return (
        <Formik<SignupFormData>
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {({handleSubmit}) => (
                <Form onSubmit={handleSubmit} placeholder={undefined} onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}>
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
                            endIcon={<PersonAddIcon/>}
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
            )}
        </Formik>
    );
};
