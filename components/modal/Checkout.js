import {
  Button,
  ButtonGroup,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import useUser from "../../context/useUser";

function CheckoutModal(props) {
  const { id, update } = props;
  const user = useUser();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const checkout = () => {
    axios
      .put("/api/checkout/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    update.setReload(!update.reload);
    onClose();
  };
  return (
    <>
      <Button
        isDisabled={!user}
        onClick={onOpen}
        position={"absolute"}
        w={"full"}
        bottom="8"
        colorScheme={"linkedin"}
        id="item-button"
      >
        Buy
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure to buy?</ModalHeader>
          <Divider />
          <ModalBody>
            <Stack spacing={3} py={3}>
              <Text fontWeight={"bold"}>Please Attention</Text>
              <Text>
                Yout must add Canteen's Balance equal to item price that you had
                bought
              </Text>

              <ButtonGroup justifyContent={"end"}>
                <Button onClick={checkout} colorScheme={"linkedin"}>
                  Continue
                </Button>
                <Button onClick={onClose} variant={"outline"} colorScheme="red">
                  Cancel
                </Button>
              </ButtonGroup>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CheckoutModal;

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
