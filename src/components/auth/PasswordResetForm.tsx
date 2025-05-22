"use client";

import LockResetIcon from "@mui/icons-material/LockReset";
import {Box, Button, TextField} from "@mui/material";
import Link from "next/link";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
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

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({onSubmit}) => {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<PasswordResetFormData>({
        defaultValues: {
            email: searchParams.get("email") || "",
        },
        resolver: zodResolver(passwordResetSchema),
    });

    const onFormSubmit = (data: PasswordResetFormData) => {
        setLoading(true);
        onSubmit(data, () => {
            setLoading(false);
            reset();
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

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    marginTop: 0.5,
                }}
            >
                <Link href="/">{"Back to login"}</Link>
            </Box>

            <Button
                variant="contained"
                type="submit"
                endIcon={<LockResetIcon/>}
                disabled={loading}
                sx={{
                    marginTop: 2,
                    marginBottom: 1,
                }}
            >
                {loading ? "Loading..." : "Reset"}
            </Button>
        </form>
    );
};
