import LoginForm from "@/components/login/LoginForm";
import { Flex } from "@chakra-ui/react";

export default function SignInPage() {
  return (
    <Flex height="100vh" width="100vw" align="center" justify="center">
      <LoginForm />
    </Flex>
  );
}
