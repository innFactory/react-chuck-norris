"use client"

import React from 'react';
import Button from "@mui/material/Button";
import {redirect} from "next/navigation";

export default function HomePage() {

    redirect("/home")

    return (
        <>
            <div>
                <Button>
                    Bitte kehre zum Home zurück
                </Button>
            </div>
        </>
    );
}
