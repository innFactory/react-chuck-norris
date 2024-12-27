"use client";

import LockResetIcon from "@mui/icons-material/LockReset";
import {Box} from "@mui/material";
import {Form, Formik} from "formik";
import Link from "next/link";
import {useState} from "react";
import {z} from "zod";
import {FormikTextField} from "@/components/formikInputs/FormikTextField";
import {LoadingButton} from "@/components/default/LoadingButton";
import {useSearchParams} from "next/navigation";

interface PasswordResetFormProps {
    onSubmit: (data: PasswordResetFormData, callback: () => void) => void;
}

export interface PasswordResetFormData {
    email: string;
}

const passwordResetSchema = z.object({
    email: z
        .string()
        .nonempty("This field is required")
        .email("Invalid email address"),
});

export const PasswordResetForm: React.FC<PasswordResetFormProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();

    const initialValues: PasswordResetFormData = {
        email: searchParams.get("email") || "",
    };

    const onSubmit = (data: PasswordResetFormData, resetForm: () => void) => {
        setLoading(true);
        props.onSubmit(data, () => {
            setLoading(false);
            resetForm();
        });
    };

    const validate = (values: PasswordResetFormData) => {
        try {
            passwordResetSchema.parse(values);
            return {};
        } catch (err) {
            const errors: Partial<PasswordResetFormData> = {};
            if (err instanceof z.ZodError) {
                err.errors.forEach((error) => {
                    const field = error.path[0];
                    if (field && typeof field === "string") {
                        errors[field as keyof PasswordResetFormData] = error.message;
                    }
                });
            }
            return errors;
        }
    };

    return (
        <Formik<PasswordResetFormData>
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values, resetForm);
            }}
        >
            {({handleSubmit}) => (
                <Form
                    onSubmit={handleSubmit}
                    placeholder={undefined} onPointerEnterCapture={undefined}
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
                            endIcon={<LockResetIcon/>}
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
            )}
        </Formik>
    );
};
