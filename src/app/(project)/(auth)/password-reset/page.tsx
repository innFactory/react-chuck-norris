"use client"
import {Container} from "@mui/material";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import {AuthPaper} from "@/components/auth/AuthPaper";
import {PasswordResetForm, PasswordResetFormData} from "@/components/auth/PasswordResetForm";

export default function LoginPage() {
    const {user, passwordReset} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);

    const onPasswordReset = async (
        data: PasswordResetFormData,
        callback: () => void
    ) => {
        await passwordReset(data.email);
        callback();
        router.push("/");
    };

    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <AuthPaper
                title=" Reset your password!"
                subtitle="Request an email for password reset"
            >
                <PasswordResetForm onSubmit={onPasswordReset}/>
            </AuthPaper>
        </Container>
    );
}
