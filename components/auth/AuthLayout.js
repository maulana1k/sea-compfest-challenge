import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
} from "@chakra-ui/react";
function AuthLayout({ children }) {
  return (
    <Container h={"calc(100vh)"} maxW={""} centerContent>
      <HStack justify={"space-between"} w={"full"} px="12" py="6">
        <Heading size={"md"} color="facebook.500">
          Honesty Canteen
        </Heading>
        <HStack spacing={"10"}>
          <Button variant={"link"}>About</Button>
          <Button variant={"link"}>Support Us</Button>
        </HStack>
      </HStack>
      <Box
        bg={"white"}
        m="auto"
        px={"14"}
        py="10"
        border={"1px"}
        borderColor="gray.200"
        borderRadius={"2xl"}
        w={"35%"}
      >
        {children}
      </Box>
    </Container>
  );
}

export default AuthLayout;
