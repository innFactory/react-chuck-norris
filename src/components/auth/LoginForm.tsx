"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {Box} from "@mui/material";
import {Form, Formik} from "formik";
import Link from "next/link";
import {useState} from "react";
import {z} from "zod";
import {FormikTextField} from "@/components/formikInputs/FormikTextField";
import {LoadingButton} from "@/components/default/LoadingButton";

interface LoginFormProps {
    onSubmit: (data: LoginFormData, callback: () => void) => void;
}

export interface LoginFormData {
    email: string;
    password: string;
}

const loginSchema = z.object({
    email: z.string()
        .nonempty("This field is required")
        .email("Invalid email address"),
    password: z.string()
        .nonempty("This field is required"),
});

export const LoginForm: React.FC<LoginFormProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [emailForReset, setEmailForReset] = useState("");

    const initialValues: LoginFormData = {
        email: "",
        password: "",
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailForReset(value);
    };

    const onSubmit = (data: LoginFormData) => {
        setLoading(true);

        setEmailForReset(data.email);

        props.onSubmit(data, () => {
            setLoading(false);
        });
    };

    const validate = (values: LoginFormData) => {
        try {
            loginSchema.parse(values);
            return {};
        } catch (err) {
            const errors: Partial<LoginFormData> = {};
            if (err instanceof z.ZodError) {
                err.errors.forEach((error) => {
                    const field = error.path[0];
                    if (field && typeof field === "string") {
                        errors[field as keyof LoginFormData] = error.message;
                    }
                });
            }
            return errors;
        }
    };

    return (
        <Formik<LoginFormData>
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
                                    query: emailForReset ? {email: emailForReset} : {},
                                }}
                            >
                                {"Reset Password"}
                            </Link>
                        </Box>
                        <LoadingButton
                            variant="contained"
                            type="submit"
                            endIcon={<ArrowForwardIcon/>}
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
            )}
        </Formik>
    );
};
