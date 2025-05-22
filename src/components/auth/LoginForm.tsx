"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {Box, Button, TextField} from "@mui/material";
import Link from "next/link";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

interface LoginFormProps {
    onSubmit: (data: LoginFormData, callback: () => void) => void;
}

export interface LoginFormData {
    email: string;
    password: string;
}

const loginSchema = z.object({
    email: z
        .string()
        .nonempty("This field is required")
        .email("Invalid email address"),
    password: z.string().nonempty("This field is required"),
});

export const LoginForm: React.FC<LoginFormProps> = ({onSubmit}) => {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    const emailValue = watch("email");

    const onFormSubmit = (data: LoginFormData) => {
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
                        query: emailValue ? {email: emailValue} : {},
                    }}
                >
                    {"Reset Password"}
                </Link>
            </Box>

            <Button
                variant="contained"
                type="submit"
                endIcon={<ArrowForwardIcon/>}
                disabled={loading}
                sx={{
                    marginTop: 2,
                    marginBottom: 1,
                }}
            >
                {loading ? "Loading..." : "Login"}
            </Button>
        </form>
    );
};
