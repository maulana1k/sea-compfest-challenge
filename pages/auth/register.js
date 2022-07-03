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

function Register({ host }) {
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const verifyId = (id) => {
    if (id.length !== 5) return false;
    const sum = parseInt(id[0]) + parseInt(id[1]) + parseInt(id[2]);
    return sum === parseInt(id.substring(3));
  };
  const submit = (e) => {
    e.preventDefault();
    if (!verifyId(id)) {
      toast({
        title: "ID not verified as student!",
        status: "error",
        position: "top",
        isClosable: true,
      });
      return;
    }
    axios
      .post("/api/auth/register", {
        id,
        username,
        password,
      })
      .then((res) => {
        toast({
          title: "Registration success",
          status: "success",
          position: "top",
          isClosable: true,
        });
        console.log(res);
        localStorage.setItem("honestycanteen", res.data.student._id);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AuthLayout>
      <Stack direction={"column"} spacing="10">
        <Stack>
          <Heading>Create account.</Heading>
          <Text color={"gray"}>
            Already have an account?{" "}
            <Button color={"linkedin.500"} variant={"link"}>
              <Link href={"/auth/login"}>Log in.</Link>
            </Button>
          </Text>
        </Stack>
        <form onSubmit={submit}>
          <Stack spacing="2">
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
              <FormLabel>Username</FormLabel>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                mb={"4"}
                type="text"
                id="username"
                placeholder={"ex: felicia"}
                variant="filled"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                mb={"4"}
                type="password"
                id="password"
                placeholder="*******"
                variant="filled"
              />
            </FormControl>

            <Stack direction={"row"} justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
            </Stack>
            <Button
              borderRadius="lg"
              size={"lg"}
              w="full"
              variant={"solid"}
              colorScheme="linkedin"
              type="submit"
            >
              Create account
            </Button>
          </Stack>
        </form>
      </Stack>
    </AuthLayout>
  );
}

export default Register;

export async function getServerSideProps(c) {
  return {
    props: {
      host: "http://" + c.req.headers.host,
    },
  };
}
