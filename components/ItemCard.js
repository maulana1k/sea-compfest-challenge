import { Box, Button, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import CheckoutModal from "./modal/Checkout";
import moment from "moment";
function ItemCard({ id, name, src, price, desc, timestamp, mysale, update }) {
  return (
    <Box
      id={"item-card"}
      bg={"white"}
      w={{ base: 150, md: 200 }}
      h={{ base: 250, md: 300 }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ shadow: "md" }}
    >
      <Stack id="item-content">
        <div>
          <Image
            alt="items"
            priority
            width={300}
            height={200}
            layout="responsive"
            src={"https://res.cloudinary.com/demo/image/fetch/" + src}
          />
        </div>
        <Box p={"4"}>
          <Stack>
            <Text fontSize={"md"}>
              <b>{name}</b>
            </Text>
            <Box>Rp {price},00</Box>
            <Box fontWeight={"light"} fontSize={"sm"} color="gray">
              {moment(timestamp).fromNow()}
            </Box>
          </Stack>
        </Box>
      </Stack>
      <VStack
        h="full"
        m={4}
        pos="relative"
        id="item-desc"
        justifyContent={"center"}
        alignItems="end"
      >
        <Text fontWeight={"bold"}>Description:</Text>
        <Box>{desc}</Box>
        {!mysale && <CheckoutModal update={update} id={id} />}
      </VStack>
    </Box>
  );
}

export default ItemCard;
