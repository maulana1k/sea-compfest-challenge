import {
  Avatar,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdLogout } from "react-icons/md";

import useUser from "../context/useUser";
import BalanceModal from "./modal/Balance";

function MainLayout({ children }) {
  const user = useUser();
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("honestycanteen");
    router.push("/auth/login");
  };
  return (
    <Container p={0} h={"calc(100vh)"} maxW="" centerContent>
      <HStack
        justify={"space-between"}
        w={"full"}
        px={{ base: "2", md: "32" }}
        py="4"
        bg={"white"}
      >
        <Heading size={"md"} color="gray.700">
          Honesty Canteen
        </Heading>
        {user ? (
          <HStack spacing={6}>
            <BalanceModal />
            <Button onClick={logout} rightIcon={<MdLogout />} variant={"ghost"}>
              <Avatar size={"sm"} />
            </Button>
          </HStack>
        ) : (
          <HStack spacing={6}>
            <Link href={"/auth/login"}>
              <Button size={"sm"} colorScheme={"linkedin"}>
                Login
              </Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button size={"sm"} variant={"link"}>
                Register
              </Button>
            </Link>
          </HStack>
        )}
      </HStack>
      <Divider />

      {children}
    </Container>
  );
}

export default MainLayout;
