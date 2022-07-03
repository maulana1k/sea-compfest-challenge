import { SearchIcon } from "@chakra-ui/icons";
import {
  Container,
  Text,
  HStack,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Select,
} from "@chakra-ui/react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdSort,
  MdSortByAlpha,
} from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

import MainLayout from "./MainLayout";
function StoreLayout({ sort, order, children }) {
  const { asc, setAsc } = order;
  const { sortby, setSortby } = sort;
  const router = useRouter();
  const tabMenu = [
    ["All item", "/"],
    ["My sale", "/mysale"],
  ];

  const changeOrder = () => setAsc(!asc);
  const changeSort = (e) => setSortby(e.target.value);
  return (
    <MainLayout>
      <Container maxW={"container.lg"}>
        <HStack spacing={"4"} py={4}>
          <Select onChange={changeSort} icon={<MdSort />} value={sortby} w="40">
            <option value={"name"}>Name</option>
            <option value={"timestamp"}>Date </option>
          </Select>
          <Button onClick={changeOrder} borderRadius={"lg"} variant={"outline"}>
            <MdSortByAlpha />
            {asc ? <MdArrowUpward /> : <MdArrowDownward />}
          </Button>
        </HStack>
        <HStack>
          {tabMenu.map((tab) =>
            router.pathname == tab[1] ? (
              <Box
                key={tab}
                fontWeight={"bold"}
                borderBottom={"2px"}
                borderColor="gray.800"
                py={2}
                px={4}
              >
                <Link href={tab[1]}>{tab[0]}</Link>
              </Box>
            ) : (
              <Box key={tab} py={2} px={4}>
                <Link href={tab[1]}>{tab[0]}</Link>
              </Box>
            )
          )}
        </HStack>
        <Divider />
        {children}
      </Container>
    </MainLayout>
  );
}

export default StoreLayout;
