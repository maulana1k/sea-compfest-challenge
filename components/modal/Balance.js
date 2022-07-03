import {
  Button,
  Divider,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormLabel,
  Input,
  ModalBody,
  Stack,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import useUser from "../../context/useUser";

function BalanceModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useUser();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [ammount, setAmmount] = useState(0);
  const toast = useToast();
  useEffect(() => {
    axios
      .get("/api/balance")
      .then((res) => {
        setCurrentBalance(res.data.currentBalance);
      })
      .catch((err) => console.log(err));
  }, []);

  const add = () => {
    const data = {
      user,
      currentBalance: parseInt(currentBalance) + parseInt(ammount),
      ammount,
      type: "add",
      timestamp: new Date().toLocaleString(),
    };
    axios
      .post("/api/balance", data)
      .then((res) => {
        setCurrentBalance(res.data.currentBalance);
        setAmmount(0);
      })
      .catch((err) => console.log(err));
  };
  const withdraw = () => {
    if (ammount > currentBalance) {
      toast({
        title: "Withdraw exceed balance ammount!",
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    const data = {
      user,
      currentBalance: parseInt(currentBalance) - parseInt(ammount),
      ammount,
      type: "withdraw",
      timestamp: new Date().toLocaleString(),
    };
    axios
      .post("/api/balance", data)
      .then((res) => {
        setCurrentBalance(res.data.currentBalance);
        setAmmount(0);
      })
      .catch((err) => console.log(err));
  };
  const formatCurrency = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<MdAccountBalanceWallet />}
        variant={"outline"}
      >
        {formatCurrency(currentBalance)}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Canteen's Balance</ModalHeader>
          <Divider />
          <ModalBody>
            <Stack py={4} spacing={8}>
              <Heading>{formatCurrency(currentBalance)}</Heading>
              <Stack>
                <FormLabel>Ammount</FormLabel>
                <Input
                  type={"number"}
                  onChange={(e) => setAmmount(e.target.value)}
                  value={ammount}
                  placeholder="set ammount to be added or withdraw"
                />
              </Stack>
              <ButtonGroup justifyContent={"end"}>
                <Button onClick={add} colorScheme={"green"}>
                  Add
                </Button>
                <Button onClick={withdraw} colorScheme={"red"}>
                  Withdraw
                </Button>
                <Button onClick={onClose} variant={"outline"}>
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

export default BalanceModal;
