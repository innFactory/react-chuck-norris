import { Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Typography variant="h1">404 - Page Not Found</Typography>
      <Link href="/">Go back home</Link>
    </>
  );
}
