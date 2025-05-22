"use client"

import {Container} from "@mui/material";
import {Box} from "@mui/system";
import Link from "next/link";
import {useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import {LoginForm, LoginFormData} from "@/components/auth/LoginForm";
import {AuthPaper} from "@/components/auth/AuthPaper";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const {user, login} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const onLogin = async (data: LoginFormData, callback: () => void) => {
        login(data.email, data.password);
        callback();
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <AuthPaper
                title="Welcome to the Chuck Norris Challenge!"
                subtitle="Login"
            >
                <LoginForm onSubmit={onLogin}/>
            </AuthPaper>
            <Box
                sx={{
                    display: "flex",
                    marginTop: 2,
                }}
            >
                <Link
                    href={{
                        pathname: "/signup",
                    }}
                >
                    {"Create an account"}
                </Link>
            </Box>
        </Container>
    );
}
