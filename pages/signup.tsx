import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthPaper } from "../src/auth/components/AuthPaper";
import { SignupForm, SignupFormData } from "../src/auth/components/SignupForm";
import { useAuth } from "../src/auth/context/AuthContext";

export default function LoginPage() {
  const { user, signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

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
        <SignupForm onSubmit={onSignup} />
      </AuthPaper>
    </Container>
  );
}
