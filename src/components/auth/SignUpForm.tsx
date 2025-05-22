"use client";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

interface SignupFormProps {
    onSubmit: (data: SignupFormData, callback: () => void) => void;
}

export interface SignupFormData {
    email: string;
    password: string;
    passwordConfirmation: string;
}

const signupSchema = z.object({
    email: z
        .string()
        .nonempty("This field is required")
        .email("Invalid email address"),
    password: z
        .string()
        .nonempty("This field is required")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 10 characters long"
        ),
    passwordConfirmation: z.string().nonempty("This field is required"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});

export const SignupForm: React.FC<SignupFormProps> = ({onSubmit}) => {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<SignupFormData>({
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        },
        resolver: zodResolver(signupSchema),
    });

    const onFormSubmit = (data: SignupFormData) => {
        setLoading(true);
        onSubmit(data, () => {
            setLoading(false);
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "400px",
            }}
        >
            <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Enter your email"
                        type="email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Enter your password"
                        type="password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        margin="normal"
                        sx={{marginTop: 2}}
                    />
                )}
            />

            <Controller
                name="passwordConfirmation"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Confirm your password"
                        type="password"
                        fullWidth
                        error={!!errors.passwordConfirmation}
                        helperText={errors.passwordConfirmation?.message}
                        margin="normal"
                        sx={{marginTop: 2}}
                    />
                )}
            />

            <Button
                variant="contained"
                type="submit"
                endIcon={<PersonAddIcon/>}
                disabled={loading}
                sx={{
                    marginTop: 2,
                    marginBottom: 1,
                }}
            >
                {loading ? "Loading..." : "Create account"}
            </Button>
        </form>
    );
};
