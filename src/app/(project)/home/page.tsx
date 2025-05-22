"use client"

import React, {useEffect} from 'react';
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import Container from "@mui/material/Container";
import ChucksAppBar from "@/components/default/Navbar";
import {Typography} from "@mui/material";
import {Box} from "@mui/system";
import {RandomJoke} from "@/components/functionality/RandomJoke";

export default function Page() {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);


    return (
        <>
            <ChucksAppBar/>
            <Container maxWidth="xl">
                <Typography variant="h1">Home</Typography>
                <Box
                    sx={{
                        my: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <RandomJoke/>
                </Box>
            </Container>
        </>
    );
}
