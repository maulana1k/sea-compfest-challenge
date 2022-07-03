import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Checkbox,
  Button,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AuthLayout from "../../components/auth/AuthLayout";

function Login({ host }) {
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const toast = useToast();
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(host + "/api/auth/login", { id, password })
      .then((res) => {
        toast({
          title: "Login succesfull",
          status: "success",
          position: "top",
          isClosable: true,
        });
        localStorage.setItem("honestycanteen", res.data.student._id);
        router.push("/");
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  };
  return (
    <AuthLayout>
      <Stack direction={"column"} spacing="10">
        <Stack>
          <Heading>Login.</Heading>
          <Text color={"gray"}>
            Don't have an account?{" "}
            <Button color={"linkedin.500"} variant={"link"}>
              <Link href={"/auth/register"}>Create new.</Link>
            </Button>
          </Text>
        </Stack>
        <form onSubmit={submit}>
          <Stack spacing="6">
            <FormControl isRequired>
              <FormLabel>Student ID</FormLabel>
              <Input
                onChange={(e) => setId(e.target.value)}
                mb={"4"}
                type="text"
                id="student"
                placeholder={"ex: 82717"}
                variant="filled"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                variant="filled"
                id="password"
                placeholder="******"
              />
            </FormControl>
            <Stack direction={"row"} justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant={"link"}>Forgot password?</Button>
            </Stack>

            <Button
              borderRadius="lg"
              size={"lg"}
              variant={"solid"}
              colorScheme="linkedin"
              type="submit"
            >
              Log in
            </Button>
          </Stack>
        </form>
      </Stack>
    </AuthLayout>
  );
}

export default Login;

export const getServerSideProps = async (c) => {
  return {
    props: {
      host: "http://" + c.req.headers.host,
    },
  };
};
