"use client"

import {Container} from "@mui/material";
import {useRouter} from "next/navigation";
import {AuthPaper} from "@/components/auth/AuthPaper";
import {useAuth} from "@/context/AuthContext";
import {useEffect} from "react";
import {SignupForm, SignupFormData} from "@/components/auth/SignUpForm";

export default function LoginPage() {
    const {user, signup} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const onSignup = async (data: SignupFormData, callback: () => void) => {
        await signup(data.email, data.password);
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
                title="Create an account!"
                subtitle="Chuck Norris's password is the last 9 digits of pi"
            >
                <SignupForm onSubmit={onSignup}/>
            </AuthPaper>
        </Container>
    );
}
