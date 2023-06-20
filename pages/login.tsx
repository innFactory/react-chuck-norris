import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthPaper } from "../src/auth/components/AuthPaper";
import { LoginForm, LoginFormData } from "../src/auth/components/LoginForm";
import { useAuth } from "../src/auth/context/AuthContext";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const onLogin = async (data: LoginFormData, callback: () => void) => {
    await login(data.email, data.password);
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
        <LoginForm onSubmit={onLogin} />
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
