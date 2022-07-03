import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import useUser from "../../context/useUser";
import axios from "axios";

function AddSaleModal({ update }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useUser();
  const [itemData, setItemData] = useState({
    name: "",
    image_url: "",
    description: "",
    price: 0,
    sold: false,
  });
  const setFormData = (key, val) => {
    const data = new Object({ ...itemData });
    data.author = user;
    data[key] = val;
    console.log(data);
    setItemData(data);
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("/api/sell", itemData)
      .then((res) => {
        console.log(res.data);
        update.setReload(!update.reload);
        onClose();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Button isDisabled={!user} colorScheme={"linkedin"} onClick={onOpen}>
        Add Sale
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add item to store</ModalHeader>
          <Divider />
          <ModalBody>
            <form onSubmit={submit}>
              <Stack py={4}>
                <FormControl isRequired>
                  <FormLabel>Product name</FormLabel>
                  <Input
                    onChange={(e) => setFormData("name", e.target.value)}
                    variant={"filled"}
                    type={"text"}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <Input
                    onChange={(e) => setFormData("price", e.target.value)}
                    variant={"filled"}
                    type={"number"}
                    min={0}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    onChange={(e) => setFormData("description", e.target.value)}
                    variant={"filled"}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Image url</FormLabel>
                  <Input
                    onChange={(e) => setFormData("image_url", e.target.value)}
                    variant={"filled"}
                    type={"text"}
                  />
                </FormControl>
                <ButtonGroup justifyContent={"end"}>
                  <Button type="submit" colorScheme={"linkedin"}>
                    Sell
                  </Button>
                  <Button onClick={onClose} variant={"outline"}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddSaleModal;

export async function getServerSideProps(c) {
  try {
    const host = "http://" + c.req.headers.host;
    return {
      props: {
        host,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        host: "not connected",
      },
    };
  }
}
